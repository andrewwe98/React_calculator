import { NextResponse } from 'next/server'
import { addApiLog, appendDigit, compute, parseNumber, type Operator } from '@/lib/calculator'

export async function POST(request: Request) {
  const start = Date.now()

  try {
    const body = await request.json()
    const { a, b, operator } = body as {
      a?: string
      b?: string
      operator?: Operator
    }

    if (typeof a !== 'string' || typeof b !== 'string' || !operator) {
      const response = { error: 'Missing required fields: a, b, operator' }
      addApiLog({
        route: '/api/calculate',
        method: 'POST',
        request: body,
        response,
        durationMs: Date.now() - start,
      })
      return NextResponse.json(response, { status: 400 })
    }

    const validOperators: Operator[] = ['+', '-', '*', '/']
    if (!validOperators.includes(operator)) {
      const response = { error: 'Invalid operator. Use +, -, *, or /' }
      addApiLog({
        route: '/api/calculate',
        method: 'POST',
        request: body,
        response,
        durationMs: Date.now() - start,
      })
      return NextResponse.json(response, { status: 400 })
    }

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

    return NextResponse.json(response)
  } catch {
    const response = { error: 'Invalid JSON body' }
    addApiLog({
      route: '/api/calculate',
      method: 'POST',
      request: null,
      response,
      durationMs: Date.now() - start,
    })
    return NextResponse.json(response, { status: 400 })
  }
}
