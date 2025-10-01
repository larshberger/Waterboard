const MASTER_KEY = "waterboard-v1";


// Lager et dags-nøkkel på formen YYYY-MM-DD i Europa/Oslo
export function todayKey() {
    // "sv-SE" gir ISO-lignende format YYYY-MM-DD
    return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Oslo" });
}


//Henter / leser hele json-filen
function readAll() {
    try {
        const raw = localStorage.getItem(MASTER_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        console.warn("Kunne ikke lese fra localStorage:", e);
        return {};
    }
}

//Skriver til json-filen. Objekt blir det nye innholdet
function writeAll(obj) {
    try {
        localStorage.setItem(MASTER_KEY, JSON.stringify(obj));
    } catch (e) {
        console.warn("Kunne ikke skrive til localStorage:", e);
    }   
}

//Henter dagens data ved å lage dagnøkkel og hente dataen lagret på den nøkkelen i json
export function loadDay(dateKey = todayKey()) {
    const all = readAll();
    return all[dateKey] || { drinks: {} }; // drinks: { [label]: { litersPerUnit, count } }
}

//Setter dataen på dagens dato til dataen i parameter og skriver til fil
export function saveDay(dayData, dateKey = todayKey()) {
    const all = readAll();
    all[dateKey] = dayData;
    writeAll(all);
}