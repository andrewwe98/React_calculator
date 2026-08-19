export type Operator = '+' | '-' | '*' | '/'

export type ApiLogEntry = {
  id: string
  timestamp: number
  route: string
  method: string
  request: unknown
  response: unknown
  durationMs: number
}

const MAX_LOGS = 50
const logs: ApiLogEntry[] = []

export function addApiLog(entry: Omit<ApiLogEntry, 'id' | 'timestamp'>) {
  const log: ApiLogEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
    ...entry,
  }
  logs.unshift(log)
  if (logs.length > MAX_LOGS) {
    logs.length = MAX_LOGS
  }
  return log
}

export function getApiLogs(): ApiLogEntry[] {
  return [...logs]
}

export function compute(a: string, b: string, operator: Operator): string {
  const x = parseFloat(a)
  const y = parseFloat(b)

  if (isNaN(x) || isNaN(y)) {
    return '0'
  }

  switch (operator) {
    case '+':
      return String(x + y)
    case '-':
      return String(x - y)
    case '*':
      return String(x * y)
    case '/':
      return y === 0 ? 'Error' : String(x / y)
    default:
      return b
  }
}

export function appendDigit(
  current: string,
  digit: string,
  waitingForNewValue: boolean
): { display: string; waitingForNewValue: boolean } {
  if (digit === '.') {
    if (waitingForNewValue) {
      return { display: '0.', waitingForNewValue: false }
    }
    if (current.includes('.')) {
      return { display: current, waitingForNewValue }
    }
    return { display: current + '.', waitingForNewValue }
  }

  if (waitingForNewValue) {
    return { display: digit, waitingForNewValue: false }
  }

  return {
    display: current === '0' ? digit : current + digit,
    waitingForNewValue,
  }
}

export function parseNumber(value: string): {
  value: string
  parsed: number | null
  isValid: boolean
} {
  const trimmed = value.trim()
  if (trimmed === '' || trimmed === '.') {
    return { value: '0', parsed: 0, isValid: true }
  }

  const parsed = parseFloat(trimmed)
  const isValid = !isNaN(parsed) && isFinite(parsed)

  return {
    value: trimmed,
    parsed: isValid ? parsed : null,
    isValid,
  }
}
