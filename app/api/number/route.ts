import { NextResponse } from 'next/server'
import { addApiLog } from '@/lib/api-log'
import { appendDigit, parseNumber } from '@/lib/calculator'

export async function POST(request: Request) {
  const start = Date.now()

  try {
    const body = await request.json()
    const { value, digit, waitingForNewValue } = body as {
      value?: string
      digit?: string
      waitingForNewValue?: boolean
    }

    if (typeof digit === 'string') {
      const current = typeof value === 'string' ? value : '0'
      const waiting = Boolean(waitingForNewValue)
      const { display, waitingForNewValue: newWaiting } = appendDigit(
        current,
        digit,
        waiting
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

      return NextResponse.json(response)
    }

    if (typeof value !== 'string') {
      const response = { error: 'Missing required field: value or digit' }
      addApiLog({
        route: '/api/number',
        method: 'POST',
        request: body,
        response,
        durationMs: Date.now() - start,
      })
      return NextResponse.json(response, { status: 400 })
    }

    const parsed = parseNumber(value)
    const response = {
      ...parsed,
      action: 'parse',
    }

    addApiLog({
      route: '/api/number',
      method: 'POST',
      request: body,
      response,
      durationMs: Date.now() - start,
    })

    return NextResponse.json(response)
  } catch {
    const response = { error: 'Invalid JSON body' }
    addApiLog({
      route: '/api/number',
      method: 'POST',
      request: null,
      response,
      durationMs: Date.now() - start,
    })
    return NextResponse.json(response, { status: 400 })
  }
}

export async function GET(request: Request) {
  const start = Date.now()
  const { searchParams } = new URL(request.url)
  const n = searchParams.get('n')

  if (n === null) {
    const response = { error: 'Missing query parameter: n' }
    addApiLog({
      route: '/api/number',
      method: 'GET',
      request: { n: null },
      response,
      durationMs: Date.now() - start,
    })
    return NextResponse.json(response, { status: 400 })
  }

  const parsed = parseNumber(n)
  const response = {
    requested: n,
    ...parsed,
    action: 'get',
  }

  addApiLog({
    route: '/api/number',
    method: 'GET',
    request: { n },
    response,
    durationMs: Date.now() - start,
  })

  return NextResponse.json(response)
}
