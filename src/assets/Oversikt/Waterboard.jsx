import './Waterboard.css';
import { useEffect, useMemo, useState } from 'react'
import PlussMinusKnapp from '../Knapp/PlussMinusKnapp'
import { loadDay, saveDay, todayKey } from '../storage'
import iconMap from './Icons.jsx';


export default function Waterboard({ goal }) {
  // Definerer hvilke drikker som finnes (label + liter pr enhet)
  const drinks = useMemo(() => ([
    { label: 'vannflaske', liters: 0.5 },
    { label: 'stort glass', liters: 0.4 },
    { label: 'lite glass', liters: 0.2 },
  ]), []); // Skjønner ikke denne syntaksen

  // counts: { [label]: { litersPerUnit, count } }
  const [counts, setCounts] = useState({});
  const [dateKey, setDateKey] = useState(todayKey());
  const [hydrated, setHydrated] = useState(false) 

  // Første last: hent for dagens dato (eller når datoen endrer seg)
  useEffect(() => {
    const dk = todayKey();
    setDateKey(dk);
    const saved = loadDay(dk);


    // Sikrer at alle definerte drinks finnes i strukturen
    const initial = { ...saved.drinks };
    for (const d of drinks) {
      if (!initial[d.label]){
        initial[d.label] = { litersPerUnit: d.liters, count: 0 };
      }
      
      // Hvis litersPerUnit har endret seg i koden, oppdater lagret verdi
      if (initial[d.label].litersPerUnit !== d.liters) {
        initial[d.label] = { ...initial[d.label], litersPerUnit: d.liters };
        }
      }
      
    setCounts(initial);
    setHydrated(true)
  }, [drinks]);


  // Hjelper: lagre til localStorage hver gang counts endres
  useEffect(() => {
    if (!hydrated) return 
    saveDay({ drinks: counts }, dateKey)
  }, [counts, dateKey, hydrated])

  // Oppdatér antall for gitt label med +1 eller -1
  const bump = (label, delta) => {
    setCounts(prev => {
    const current = prev[label] || { litersPerUnit: drinks.find(d => d.label === label)?.liters ?? 0, count: 0 };
    const nextCount = Math.max(0, current.count + delta);
    return { ...prev, [label]: { ...current, count: nextCount } };
    });
  };

  // Hjelper: beregn total i liter fra counts
  const total = useMemo(() => {
    return Object.values(counts).reduce((sum, { litersPerUnit, count }) => sum + litersPerUnit * count, 0);
  }, [counts]);

  const fixFloat = (x) => x.toLocaleString('nb-NO', { maximumFractionDigits: 3 });

  // Hjelper: finn riktig ikonindeks (0–7) fra total og goal
  function iconIndexFromProgress(total, goal) {
    if (!goal || goal <= 0) return 0;          // unngå deling på 0
    if (total <= 0) return 0;
    if (total >= goal * 1.0) return total > goal ? 7 : 6;

    const ratio = total / goal;                 // 0 < ratio < 1
    // Del inn 0–100% i 6 like “buckets” og rund NED.
    // 0% → 0 (håndtert over), (0–16.6%] → 1, ... (83.3–<100%) → 5
    const bucket = Math.floor(ratio * 6);       // 0..5
    return Math.max(1, Math.min(5, bucket));    // tving 1..5
  }

  const iconIndex = useMemo(() => iconIndexFromProgress(total, goal), [total, goal]);
  const icon = iconMap[iconIndex];

  //selve komponenten
  return (
  <div className="shell">

    {/* Venstre bilde */}      
    <img
      className="side-img"
      src={icon}
      alt="bilde av en ung mann som drikker vann"
      loading="lazy"
      decoding="async"
      style={{ display: 'block', margin: '0 auto 12px', height: 'auto' }}
    />

    <main className ="content">
    <h3>Totalt drukket: {fixFloat(total)} l av {goal} l</h3>

    {drinks.map(d => (
      <PlussMinusKnapp
        key={d.label}
        label={`${d.label}`}
        liters={d.liters}
        count={counts[d.label]?.count ?? 0}
        onAdd={() => bump(d.label, +1)}
        onRemove={() => bump(d.label, -1)}
      />
      ))}
    </main>

    <img
        className="side-img"
        src={icon}
        alt="bilde av en ung mann som drikker vanm"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
    />

  </div>
  )
}