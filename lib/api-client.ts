import {
  addApiLog,
  getApiLogs,
  type ApiLogEntry,
} from '@/lib/api-log'
import {
  appendDigit,
  compute,
  type Operator,
} from '@/lib/calculator'

const useStaticApi = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

function apiUrl(path: string) {
  return `${basePath}${path}`
}

async function calculateLocal(a: string, b: string, operator: Operator) {
  const start = Date.now()
  const body = { a, b, operator }
  const result = compute(a, b, operator)
  const response = {
    a,
    b,
    operator,
    result,
    expression: `${a} ${operator} ${b} = ${result}`,
  }

  addApiLog({
    route: '/api/calculate',
    method: 'POST',
    request: body,
    response,
    durationMs: Date.now() - start,
  })

  return response
}

async function digitLocal(
  value: string,
  digit: string,
  waitingForNewValue: boolean
) {
  const start = Date.now()
  const body = { value, digit, waitingForNewValue }
  const { display, waitingForNewValue: newWaiting } = appendDigit(
    value,
    digit,
    waitingForNewValue
  )
  const response = {
    display,
    waitingForNewValue: newWaiting,
    action: 'append',
  }

  addApiLog({
    route: '/api/number',
    method: 'POST',
    request: body,
    response,
    durationMs: Date.now() - start,
  })

  return response
}

export async function apiCalculate(a: string, b: string, operator: Operator) {
  if (useStaticApi) {
    const data = await calculateLocal(a, b, operator)
    return data.result
  }

  const res = await fetch(apiUrl('/api/calculate'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ a, b, operator }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error ?? 'Calculation failed')
  }
  return data.result as string
}

export async function apiDigit(
  value: string,
  digit: string,
  waitingForNewValue: boolean
) {
  if (useStaticApi) {
    const data = await digitLocal(value, digit, waitingForNewValue)
    return {
      display: data.display as string,
      waitingForNewValue: data.waitingForNewValue as boolean,
    }
  }

  const res = await fetch(apiUrl('/api/number'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value, digit, waitingForNewValue }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error ?? 'Number request failed')
  }
  return {
    display: data.display as string,
    waitingForNewValue: data.waitingForNewValue as boolean,
  }
}

export async function apiGetLogs(): Promise<ApiLogEntry[]> {
  if (useStaticApi) {
    return getApiLogs()
  }

  const res = await fetch(apiUrl('/api/logs'))
  const data = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch logs')
  }
  return data.logs ?? []
}

export function isStaticApiMode() {
  return useStaticApi
}
