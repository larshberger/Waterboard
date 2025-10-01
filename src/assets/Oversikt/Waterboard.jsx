import { useState } from 'react'
import PlussMinusKnapp from '../Knapp/PlussMinusKnapp'

export default function Waterboard({ goal }) {
  const [total, setTotal] = useState(0)

  const handleDelta = (liters) => {
    setTotal(prev => prev + liters) // evt. rund ved visning, ikke i state
  }

  const fixFloat = (x) => x.toLocaleString('nn-NO', {maximumFractionDigits: 3})

  return (
    <div>
      <h3>Totalt drukket: {fixFloat(total)} l av {goal} l</h3>

      <PlussMinusKnapp label="vannflaske (0,5 l)" liters={0.5} onDelta={handleDelta} />
      <PlussMinusKnapp label="stort glass vann (0,4 l)" liters={0.4} onDelta={handleDelta} />
      <PlussMinusKnapp label="lite glass vann (0,2 l)"  liters={0.2} onDelta={handleDelta} />
    </div>
  )
}
