type DisplayProps = {
  value: string
}

export function Display({ value }: DisplayProps) {
  return (
    <input
      type="text"
      className="w-full h-12 mb-4 text-right text-2xl border rounded-lg p-2 bg-transparent text-black"
      value={value}
      readOnly
    />
  )
}
