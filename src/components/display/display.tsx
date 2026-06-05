import React from 'react'
import { useState } from 'react'





export const display = (displaynum: string) => {
  return (
    <input type="text" className="w-full h-12 mb-4 text-right text-2xl border rounded-lg p-2 bg-transparent" placeholder={displaynum} />
  )
}
