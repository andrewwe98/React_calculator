import React from 'react'
import { useState } from 'react'


const [displaynum, setdisplaynum] = useState('0')



export const display = () => {
  return (
    <input type="text" className="w-full h-12 mb-4 text-right text-2xl border rounded-lg p-2 bg-transparent" placeholder={displaynum} />
  )
}
