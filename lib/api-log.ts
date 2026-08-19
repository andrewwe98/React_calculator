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
