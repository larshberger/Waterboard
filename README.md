# WATERBOARD

En liten Vite + React-app for å tracke vanninntak gjennom dagen. Du trykker på +/− for ulike “drikker”, og appen lagrer antall automatisk i `localStorage` som JSON – med **dato som nøkkel**.

## Funksjoner (implementert)
- **Drikketyper** med `label` og `litersPerUnit` (f.eks. vannflaske 0.5 l).
- **+ / −-knapper** (kontrollert komponent) som oppdaterer tellingen.
- **Automatisk lagring** i `localStorage` på hver endring.
- **Dagens total** i liter + visning av mål.

## Datamodell i `localStorage`
Nøkkel: `waterboard-v1`  
Struktur per dag (`YYYY-MM-DD`):
```json
{
  "2025-10-01": {
    "drinks": {
      "vannflaske":       { "litersPerUnit": 0.5, "count": 2 },
      "stort glass vann": { "litersPerUnit": 0.4, "count": 1 },
      "lite glass vann":  { "litersPerUnit": 0.2, "count": 0 }
    }
  }
}
