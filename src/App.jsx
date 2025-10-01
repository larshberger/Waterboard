import './App.css'
import Waterboard from './assets/Oversikt/Waterboard'

export default function App() {
  const now = new Date();
  const ukedag = now.toLocaleDateString('nb-NO', { weekday: 'long', timeZone: 'Europe/Oslo' });
  const dato   = now.toLocaleDateString('nb-NO', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Europe/Oslo' });
  // ukedag: "onsdag", dato: "01. oktober 2025"


  return (
    <div>
      <h1>WELCOME TO YOUR WATERBOARD</h1>
      <h2>{ukedag} {dato}</h2>

      <Waterboard 
      goal={50}
      />
      
    </div>
  )
}
