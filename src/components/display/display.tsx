import React from 'react'

type DisplayProps = {
  value: string
}

export const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <input
      type="text"
      className="w-full h-12 mb-4 text-right text-2xl border rounded-lg p-2 bg-transparent text-black"
      value={value}
      readOnly
    />
  )
}
