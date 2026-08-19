export type Operator = '+' | '-' | '*' | '/'

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
