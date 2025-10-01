import { useState } from 'react'
import PlussMinusKnapp from '../Knapp/PlussMinusKnapp'

export default function Waterboard({goal}) {
  const [total, setTotal] = useState(0)

  const handleDelta = (Liters) => {
    setTotal(prev => (prev + Liters)) 
  }

  return (
    <div>
      <h3>Totalt drukket: {total}l av {goal}l</h3>

      <PlussMinusKnapp
        label=" vannflaske (0,5l)"
        Liters={0.5}
        onClick={handleDelta}
      />

      <PlussMinusKnapp
        label="stort glass vann (0,4l)"
        Liters={0.4}
        onClick={handleDelta}
      />

      <PlussMinusKnapp
        label="lite glass vann (0,2l)"
        Liters={0.2}
        onClick={handleDelta}
      />

      
    </div>
  )
}
    
