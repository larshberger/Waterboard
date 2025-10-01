import { useState } from 'react'
import './PlussMinusKnapp.css'

export default function PlussMinusKnapp({ label, liters, onDelta }) {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(n => n + 1)
    onDelta?.(liters)
  }

  const decrease = () => {
    if (count === 0) return
    setCount(n => n - 1)
    onDelta?.(-liters)
  }

  return (
    <div className="pm-wrap">
      <p>{count} × {label}</p>
      <button type="button" className="icon-btn" onClick={increment}>+1</button>
      <button type="button" className="icon-btn danger" onClick={decrease} disabled={count === 0}>-1</button>
    </div>
  )
}
