'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { apiGetLogs, isStaticApiMode } from '@/lib/api-client'
import type { ApiLogEntry } from '@/lib/api-log'

export default function BackendPage() {
  const [logs, setLogs] = useState<ApiLogEntry[]>([])
  const [connected, setConnected] = useState(false)

  const fetchLogs = useCallback(async () => {
    try {
      const logs = await apiGetLogs()
      setLogs(logs)
      setConnected(true)
    } catch {
      setConnected(false)
    }
  }, [])

  useEffect(() => {
    fetchLogs()
    const interval = setInterval(fetchLogs, 1500)
    return () => clearInterval(interval)
  }, [fetchLogs])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(67,242,35,0.03)_50%)] bg-[length:100%_4px] animate-scan opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Backend API Monitor
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              Live feed of calculator API requests
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  connected
                    ? 'bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]'
                    : 'bg-red-400'
                }`}
              />
              <span className="text-sm text-slate-400">
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg border border-green-500/40 text-green-400 text-sm hover:bg-green-500/10 transition-all hover:animate-glow"
            >
              ← Calculator
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Requests', value: logs.length, icon: '⚡' },
            {
              label: 'Calculate Calls',
              value: logs.filter((l) => l.route === '/api/calculate').length,
              icon: '🧮',
            },
            {
              label: 'Number Calls',
              value: logs.filter((l) => l.route === '/api/number').length,
              icon: '🔢',
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-green-400 tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <section className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur overflow-hidden animate-glow">
          <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-semibold text-green-400">Request Log</h2>
            <span className="text-xs text-slate-500 font-mono">
              {isStaticApiMode()
                ? 'client-side API (GitHub Pages)'
                : 'polling /api/logs every 1.5s'}
            </span>
          </div>

          <div className="max-h-[480px] overflow-y-auto divide-y divide-slate-800/80">
            {logs.length === 0 ? (
              <div className="p-12 text-center text-slate-500 animate-pulse">
                <p className="text-lg mb-2">Waiting for API traffic…</p>
                <p className="text-sm">
                  Use the calculator to see requests appear here
                </p>
              </div>
            ) : (
              logs.map((log, index) => (
                <div
                  key={log.id}
                  className="px-5 py-4 hover:bg-slate-800/40 transition-colors animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        log.method === 'POST'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {log.method}
                    </span>
                    <span className="font-mono text-sm text-emerald-300">
                      {log.route}
                    </span>
                    <span className="text-xs text-slate-500 ml-auto tabular-nums">
                      {log.durationMs}ms ·{' '}
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800">
                      <div className="text-slate-500 mb-1">Request</div>
                      <pre className="text-slate-300 whitespace-pre-wrap break-all">
                        {JSON.stringify(log.request, null, 2)}
                      </pre>
                    </div>
                    <div className="rounded-lg bg-slate-950/60 p-3 border border-green-900/40">
                      <div className="text-green-600 mb-1">Response</div>
                      <pre className="text-green-300 whitespace-pre-wrap break-all">
                        {JSON.stringify(log.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 animate-fade-in">
            <h3 className="font-semibold text-green-400 mb-3">API Routes</h3>
            <ul className="space-y-2 text-sm font-mono">
              <li className="flex items-center gap-2">
                <span className="text-green-500">POST</span>
                <span>/api/calculate</span>
                <span className="text-slate-500">— arithmetic</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">POST</span>
                <span>/api/number</span>
                <span className="text-slate-500">— append digit</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">GET</span>
                <span>/api/number?n=42</span>
                <span className="text-slate-500">— parse number</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">GET</span>
                <span>/api/logs</span>
                <span className="text-slate-500">— request log</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 animate-fade-in">
            <h3 className="font-semibold text-green-400 mb-3">Architecture</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              The calculator frontend uses{' '}
              <code className="text-green-400">fetch()</code> to call API
              routes when running on a Node server. On GitHub Pages, the same
              logic runs client-side via a static API shim. This dashboard
              displays animated, real-time API activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
