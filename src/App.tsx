import React from 'react'
import { display } from './components/display/display'




function App() {
        





  return (
    <div className="min-h-screen w-screen bg-[radial-gradient(circle_at_top,_#fff,_#43f223)] flex items-center justify-center">
      <div className="w-60 border rounded-lg shadow-xl p-8 overflow-hidden bg-white">
        {display()}
        <div className="grid grid-cols-4 gap-2">
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">7</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">8</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">9</button>
          <button className="h-12 bg-orange-500 rounded-lg text-xl text-white border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">/</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">4</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">5</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">6</button>
          <button className="h-12 bg-orange-500 rounded-lg text-xl text-white border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">*</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">1</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">2</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">3</button>
          <button className="h-12 bg-orange-500 rounded-lg text-xl text-white border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">-</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">0</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">.</button>
          <button className="h-12 bg-gray-200 rounded-lg text-xl border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">=</button>
          <button className="h-12 bg-orange-500 rounded-lg text-xl text-white border transition duration-150 hover:bg-opacity-90 hover:-translate-y-0.5">+</button>
        </div>
      </div>
    </div>
  )
}

export default App
