'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Display } from '@/components/display/display'
import { apiCalculate, apiDigit } from '@/lib/api-client'

type Operator = '+' | '-' | '*' | '/'

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previous, setPrevious] = useState<string | null>(null)
  const [operator, setOperator] = useState<Operator | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDigit = async (d: string) => {
    setLoading(true)
    try {
      const result = await apiDigit(display, d, waitingForNewValue)
      setDisplay(result.display)
      setWaitingForNewValue(result.waitingForNewValue)
    } catch {
      setDisplay('Error')
    } finally {
      setLoading(false)
    }
  }

  const handleOperator = async (op: Operator) => {
    setLoading(true)
    try {
      if (previous !== null && operator && !waitingForNewValue) {
        const result = await apiCalculate(previous, display, operator)
        setDisplay(result)
        setPrevious(result)
        setOperator(op)
        setWaitingForNewValue(true)
      } else {
        setPrevious(display)
        setOperator(op)
        setWaitingForNewValue(true)
      }
    } catch {
      setDisplay('Error')
    } finally {
      setLoading(false)
    }
  }

  const handleEquals = async () => {
    if (previous === null || operator === null) return
    setLoading(true)
    try {
      const result = await apiCalculate(previous, display, operator)
      setDisplay(result)
      setPrevious(null)
      setOperator(null)
      setWaitingForNewValue(true)
    } catch {
      setDisplay('Error')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPrevious(null)
    setOperator(null)
    setWaitingForNewValue(false)
  }

  const buttonClass =
    'h-12 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
  const digitClass = `${buttonClass} bg-gray-200`
  const opClass = `${buttonClass} bg-green-500 text-white`

  return (
    <div className="min-h-screen w-screen bg-[radial-gradient(circle_at_top,_#fff,_#43f223)] flex flex-col items-center justify-center gap-4">
      <nav className="flex gap-4 text-sm font-medium">
        <span className="text-green-800 underline underline-offset-4">Calculator</span>
        <Link
          href="/backend"
          className="text-green-700 hover:text-green-900 transition-colors"
        >
          Backend Dashboard
        </Link>
      </nav>

      <div className="w-60 border rounded-lg shadow-xl p-8 overflow-hidden bg-white relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
            <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <Display value={display} />
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9'].map((d) => (
            <button
              key={d}
              type="button"
              className={digitClass}
              disabled={loading}
              onClick={() => handleDigit(d)}
            >
              {d}
            </button>
          ))}
          <button
            type="button"
            className={opClass}
            disabled={loading}
            onClick={() => handleOperator('/')}
          >
            /
          </button>

          {['4', '5', '6'].map((d) => (
            <button
              key={d}
              type="button"
              className={digitClass}
              disabled={loading}
              onClick={() => handleDigit(d)}
            >
              {d}
            </button>
          ))}
          <button
            type="button"
            className={opClass}
            disabled={loading}
            onClick={() => handleOperator('*')}
          >
            *
          </button>

          {['1', '2', '3'].map((d) => (
            <button
              key={d}
              type="button"
              className={digitClass}
              disabled={loading}
              onClick={() => handleDigit(d)}
            >
              {d}
            </button>
          ))}
          <button
            type="button"
            className={opClass}
            disabled={loading}
            onClick={() => handleOperator('-')}
          >
            -
          </button>

          <button
            type="button"
            className={digitClass}
            disabled={loading}
            onClick={() => handleDigit('0')}
          >
            0
          </button>
          <button
            type="button"
            className={digitClass}
            disabled={loading}
            onClick={() => handleDigit('.')}
          >
            .
          </button>
          <button
            type="button"
            className={digitClass}
            disabled={loading}
            onClick={handleEquals}
          >
            =
          </button>
          <button
            type="button"
            className={opClass}
            disabled={loading}
            onClick={() => handleOperator('+')}
          >
            +
          </button>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="w-full h-10 bg-gray-300 rounded-lg text-lg border transition duration-150 hover:bg-opacity-90 disabled:opacity-50"
            disabled={loading}
            onClick={handleClear}
          >
            C
          </button>
        </div>
      </div>
    </div>
  )
}
