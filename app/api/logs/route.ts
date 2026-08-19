import { NextResponse } from 'next/server'
import { getApiLogs } from '@/lib/api-log'

export async function GET() {
  return NextResponse.json({ logs: getApiLogs() })
}
