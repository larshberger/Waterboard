import './App.css'
import Waterboard from './assets/Oversikt/Waterboard'
import VANN from './assets/VANN.png'

export default function App() {
  const now = new Date();
  const ukedag = now.toLocaleDateString('nb-NO', { weekday: 'long', timeZone: 'Europe/Oslo' });
  const dato   = now.toLocaleDateString('nb-NO', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Europe/Oslo' });
  // ukedag: "onsdag", dato: "01. oktober 2025"


  return (
    <div className="shell">

    {/* Venstre bilde */}      
      <img
        className="side-img"
        src={VANN}
        alt="bilde av en ung mann som drikker vann"
        loading="lazy"
        decoding="async"
        style={{ display: 'block', margin: '0 auto 12px', height: 'auto' }}
      />

      {/* Midtinnhold */}
      <main className="content">
        <h1>WATERBOARD</h1>
        <h2>{ukedag} {dato}</h2>
        <Waterboard goal={5} />
      </main>

      {/* Høyre bilde (speilet for symmetri) */}
      <img
        className="side-img"
        src={VANN}
        alt="bilde av en ung mann som drikker vanm"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

    </div>
  )
}
