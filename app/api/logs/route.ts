import { NextResponse } from 'next/server'
import { getApiLogs } from '@/lib/calculator'

export async function GET() {
  return NextResponse.json({ logs: getApiLogs() })
}
