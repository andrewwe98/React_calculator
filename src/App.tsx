import React, { useState } from 'react'
import { Display } from './components/display/display'


function App() {
  const [display, setDisplay] = useState('0')
  const [previous, setPrevious] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleDigit = (d: string) => {
    console.log('digit clicked', d)
    if (d === '.') {
      if (waitingForNewValue) {
        setDisplay('0.')
        setWaitingForNewValue(false)
        return
      }
      if (display.includes('.')) return
      setDisplay(prev => prev + '.')
      return
    }

    if (waitingForNewValue) {
      setDisplay(d)
      setWaitingForNewValue(false)
      return
    }

    setDisplay(prev => (prev === '0' ? d : prev + d))
  }

  const compute = (a: string, b: string, op: string) => {
    const x = parseFloat(a)
    const y = parseFloat(b)
    if (isNaN(x) || isNaN(y)) return '0'
    switch (op) {
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

  const handleOperator = (op: string) => {
    if (previous !== null && operator && !waitingForNewValue) {
      const result = compute(previous, display, operator)
      setDisplay(result)
      setPrevious(result)
      setOperator(op)
      setWaitingForNewValue(true)
    } else {
      setPrevious(display)
      setOperator(op)
      setWaitingForNewValue(true)
    }
  }

  const handleEquals = () => {
    if (previous === null || operator === null) return
    const result = compute(previous, display, operator)
    setDisplay(result)
    setPrevious(null)
    setOperator(null)
    setWaitingForNewValue(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setPrevious(null)
    setOperator(null)
    setWaitingForNewValue(false)
  }

  return (
    <div className="min-h-screen w-screen bg-[radial-gradient(circle_at_top,_#fff,_#43f223)] flex items-center justify-center">
      <div className="w-60 border rounded-lg shadow-xl p-8 overflow-hidden bg-white">
        <Display value={display} />
        <div className="grid grid-cols-4 gap-2">
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('7')}>7</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('8')}>8</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('9')}>9</button>
          <button className="h-12 bg-green-500 rounded-lg text-xl text-white border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleOperator('/')}>/</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('4')}>4</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('5')}>5</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('6')}>6</button>
          <button className="h-12 bg-green-500 rounded-lg text-xl text-white border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleOperator('*')}>*</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('1')}>1</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('2')}>2</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('3')}>3</button>
          <button className="h-12 bg-green-500 rounded-lg text-xl text-white border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleOperator('-')}>-</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('0')}>{'0'}</button>
          <button type="button" className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleDigit('.')}>.</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={handleEquals}>=</button>
          <button className="h-12 bg-green-500 rounded-lg text-xl text-white border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5" onClick={() => handleOperator('+')}>+</button>
        </div>
        <div className="mt-4">
          <button type="button" className="w-full h-10 bg-gray-300 rounded-lg text-lg border transition duration-150 hover:bg-opacity-90" onClick={handleClear}>C</button>
        </div>
      </div>
    </div>
  )
}

export default App
