import { useEffect, useMemo, useState } from 'react'
import PlussMinusKnapp from '../Knapp/PlussMinusKnapp'
import { loadDay, saveDay, todayKey } from '../storage'


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

  return (
  <div>
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
  </div>
  )
}