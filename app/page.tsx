import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  de: {
    brand:"Exclusive Seat",tagline:"macht Reservierungen einfacher",
    ownerBtn:"Eigentümer",restBtn:"Restaurant",logout:"Abmelden",
    reserve:"Tisch reservieren",selectRest:"Restaurant auswählen",
    search:"Restaurants suchen…",noResults:"Keine Restaurants gefunden",
    noRestaurants:"Keine Restaurants verfügbar",
    favorites:"Favoriten",allRests:"Alle",
    bookTable:"TISCH RESERVIEREN →",
    date:"Datum",time:"Uhrzeit",guests:"Gäste",yourName:"Ihr Name",
    email:"E-Mail (optional)",findTable:"Tisch suchen →",
    step1:"Details",step2:"Bestätigen",
    restaurant:"Restaurant",table:"Tisch",capacity:"Plätze",
    name:"Name",confirmBooking:"Reservierung bestätigen",
    edit:"Bearbeiten",back:"← Zurück",
    reservationCode:"Reservierungscode",confirmed:"Reservierung bestätigt!",
    rateExp:"Erlebnis bewerten",feedback:"Feedback (optional)",
    submitRating:"Bewertung absenden",thanksRating:"Danke für Ihr Feedback!",
    backHome:"← Zur Startseite",
    ownerDash:"Eigentümer-Dashboard",platformAdmin:"Plattformverwaltung",
    restaurants:"Restaurants",reservations:"Reservierungen",ratings:"Bewertungen",
    allRest:"Alle Restaurants",addRest:"+ Restaurant hinzufügen",cancel:"Abbrechen",
    newRest:"Neues Restaurant",cuisine:"Küche",address:"Adresse",
    password:"Passwort",createRest:"Restaurant erstellen",namePassReq:"Name und Passwort erforderlich",
    status:"Status",actions:"Aktionen",active:"Aktiv",inactive:"Inaktiv",
    deactivate:"Deaktivieren",activate:"Aktivieren",layout:"Layout",
    filterByRest:"Nach Restaurant filtern",
    noReservations:"Keine Reservierungen",noRatings:"Noch keine Bewertungen",
    restDash:"Restaurant-Dashboard",openingHours:"Öffnungszeiten",
    rules:"Regeln",vacation:"Urlaub",saveHours:"Öffnungszeiten speichern",
    saved:"Gespeichert!",reservRules:"Reservierungsregeln",
    maxGuestsDay:"Max. Gäste pro Tag",slotDuration:"Slot-Dauer (Min.)",
    saveRules:"Regeln speichern",vacPeriods:"Urlaub / Schließzeiten",
    from:"Von",to:"Bis",addPeriod:"Zeitraum hinzufügen",
    remove:"Entfernen",noVacation:"Keine Urlaubszeiten eingetragen",
    todayMap:"Tischplan",readOnly:"Nur-Lese-Ansicht. Bitten Sie den Eigentümer, das Layout zu bearbeiten.",
    available:"Verfügbar",reserved:"Reserviert",locked:"Gesperrt",
    upcoming:"Bevorstehend",past:"Vergangen",cancelled:"Storniert",all:"Alle",
    cancelRes:"Stornieren",
    ownerUser:"Benutzername",ownerLogin:"Eigentümer-Login",restLogin:"Restaurant-Login",
    restNameLabel:"Restaurantname",loginBtn:"Anmelden",invalidCreds:"Ungültige Anmeldedaten",
    restDeactivated:"Restaurant ist derzeit deaktiviert",invalidRest:"Ungültiger Restaurantname oder Passwort",
    tableLockedMsg:"Dieser Tisch wird gerade reserviert",
    noTableAvail:"Kein passender Tisch für diese Gruppengröße und Zeit verfügbar",
    closedDay:"Restaurant geschlossen am",openHours:"Restaurant geöffnet",
    vacationMsg:"Restaurant hat Urlaub an diesem Datum",
    maxCapReached:"Maximale Gästekapazität für dieses Datum erreicht",
    selectDate:"Bitte Datum wählen",selectTime:"Bitte Uhrzeit wählen",
    enterName:"Bitte Namen eingeben",selectGuests:"Gästeanzahl wählen",
    seats:"Plätze",ownerLayoutEdit:"Ziehen zum Verschieben",
    addTable:"+ Tisch",addWall:"+ Wand",deleteSelected:"Auswahl löschen",
    newTable:"Neuer Tisch",tableCapacity:"Kapazität",
    addTableBtn:"Tisch hinzufügen",language:"Sprache",
    demo:"Demo",image:"Bild",
    guestCount:(n)=>`${n} ${n===1?"Gast":"Gäste"}`,
    minutes:(n)=>`${n} Min.`,
    fromDate:"Von-Datum muss vor Bis-Datum liegen",periodAdded:"Hinzugefügt!",
    code:"Code",
    createReservation:"Reservierung erstellen",manualReservation:"Manuelle Reservierung",
    selectTable:"Tisch wählen (optional)",autoAssign:"Automatisch zuweisen",
    tableNum:"Tisch",reservationCreated:"Reservierung erstellt!",
    phone:"Telefon (optional)",notes:"Notizen (optional)",
    emailHint:"E-Mail eingeben für Bestätigung und Erinnerung",
    emailConfirmSent:"Bestätigung wurde an Ihre E-Mail gesendet",
    emailReminderNote:"Sie erhalten 30 Min. vor der Reservierung eine Erinnerung",
    emailInvalid:"Ungültige E-Mail-Adresse",
    resizeWall:"Wall: Ziehen = bewegen · Ecke ziehen = skalieren",
    wallWidth:"Breite",wallHeight:"Höhe",
    selTable:"Tisch auswählen",
  },
  en: {
    brand:"Exclusive Seat",tagline:"makes booking easier",
    ownerBtn:"Owner",restBtn:"Restaurant",logout:"Logout",
    reserve:"Reserve a Table",selectRest:"Select a restaurant to begin",
    search:"Search restaurants…",noResults:"No restaurants found",
    noRestaurants:"No restaurants available",
    favorites:"Favorites",allRests:"All",
    bookTable:"BOOK A TABLE →",
    date:"Date",time:"Time",guests:"Guests",yourName:"Your Name",
    email:"Email (optional)",findTable:"Find a Table →",
    step1:"Details",step2:"Confirm",
    restaurant:"Restaurant",table:"Table",capacity:"Capacity",
    name:"Name",confirmBooking:"Confirm Reservation",
    edit:"Edit",back:"← Back",
    reservationCode:"Reservation Code",confirmed:"Reservation confirmed!",
    rateExp:"Rate Your Experience",feedback:"Feedback (optional)",
    submitRating:"Submit Rating",thanksRating:"Thank you for your feedback!",
    backHome:"← Back to Home",
    ownerDash:"Owner Dashboard",platformAdmin:"Platform Administration",
    restaurants:"Restaurants",reservations:"Reservations",ratings:"Ratings",
    allRest:"All Restaurants",addRest:"+ Add Restaurant",cancel:"Cancel",
    newRest:"New Restaurant",cuisine:"Cuisine",address:"Address",
    password:"Password",createRest:"Create Restaurant",namePassReq:"Name and password required",
    status:"Status",actions:"Actions",active:"Active",inactive:"Inactive",
    deactivate:"Deactivate",activate:"Activate",layout:"Layout",
    filterByRest:"Filter by Restaurant",
    noReservations:"No reservations yet",noRatings:"No ratings yet",
    restDash:"Restaurant Dashboard",openingHours:"Opening Hours",
    rules:"Rules",vacation:"Vacation",saveHours:"Save Hours",
    saved:"Saved!",reservRules:"Reservation Rules",
    maxGuestsDay:"Max Guests Per Day",slotDuration:"Slot Duration (min)",
    saveRules:"Save Rules",vacPeriods:"Vacation / Closed Periods",
    from:"From",to:"To",addPeriod:"Add Period",
    remove:"Remove",noVacation:"No vacation periods set",
    todayMap:"Table Map",readOnly:"Read-only. Ask the owner to edit the layout.",
    available:"Available",reserved:"Reserved",locked:"Locked",
    upcoming:"Upcoming",past:"Past",cancelled:"Cancelled",all:"All",
    cancelRes:"Cancel",
    ownerUser:"Username",ownerLogin:"Owner Login",restLogin:"Restaurant Login",
    restNameLabel:"Restaurant Name",loginBtn:"Login",invalidCreds:"Invalid credentials",
    restDeactivated:"Restaurant is currently deactivated",invalidRest:"Invalid restaurant name or password",
    tableLockedMsg:"This table is currently being reserved",
    noTableAvail:"No available table for that party size and time",
    closedDay:"Restaurant is closed on",openHours:"Restaurant is open",
    vacationMsg:"Restaurant is on vacation on this date",
    maxCapReached:"Maximum guest capacity reached for this date",
    selectDate:"Please select a date",selectTime:"Please select a time",
    enterName:"Please enter your name",selectGuests:"Select number of guests",
    seats:"seats",ownerLayoutEdit:"Drag to move tables and walls",
    addTable:"+ Table",addWall:"+ Wall",deleteSelected:"Delete Selected",
    newTable:"New Table",tableCapacity:"Capacity",
    addTableBtn:"Add Table",language:"Language",
    demo:"Demo",image:"Image",
    guestCount:(n)=>`${n} ${n===1?"guest":"guests"}`,
    minutes:(n)=>`${n} min`,
    fromDate:"From date must be before To date",periodAdded:"Added!",
    code:"Code",
    createReservation:"Create Reservation",manualReservation:"Manual Reservation",
    selectTable:"Select Table (optional)",autoAssign:"Auto-assign",
    tableNum:"Table",reservationCreated:"Reservation created!",
    phone:"Phone (optional)",notes:"Notes (optional)",
    emailHint:"Enter email to receive confirmation and reminder",
    emailConfirmSent:"Confirmation sent to your email",
    emailReminderNote:"You will receive a reminder 30 min before your reservation",
    emailInvalid:"Invalid email address",
    resizeWall:"Wall: drag = move · drag corner = resize",
    wallWidth:"Width",wallHeight:"Height",
    selTable:"Select table",
  },
  it: {
    brand:"Exclusive Seat",tagline:"prenotare non è mai stato così facile",
    ownerBtn:"Proprietario",restBtn:"Ristorante",logout:"Esci",
    reserve:"Prenota un Tavolo",selectRest:"Seleziona un ristorante",
    search:"Cerca ristoranti…",noResults:"Nessun ristorante trovato",
    noRestaurants:"Nessun ristorante disponibile",
    favorites:"Preferiti",allRests:"Tutti",
    bookTable:"PRENOTA UN TAVOLO →",
    date:"Data",time:"Orario",guests:"Ospiti",yourName:"Il Tuo Nome",
    email:"Email (facoltativo)",findTable:"Trova un Tavolo →",
    step1:"Dettagli",step2:"Conferma",
    restaurant:"Ristorante",table:"Tavolo",capacity:"Posti",
    name:"Nome",confirmBooking:"Conferma Prenotazione",
    edit:"Modifica",back:"← Indietro",
    reservationCode:"Codice Prenotazione",confirmed:"Prenotazione confermata!",
    rateExp:"Valuta la tua esperienza",feedback:"Feedback (facoltativo)",
    submitRating:"Invia valutazione",thanksRating:"Grazie per il tuo feedback!",
    backHome:"← Torna alla Home",
    ownerDash:"Dashboard Proprietario",platformAdmin:"Amministrazione Piattaforma",
    restaurants:"Ristoranti",reservations:"Prenotazioni",ratings:"Valutazioni",
    allRest:"Tutti i Ristoranti",addRest:"+ Aggiungi Ristorante",cancel:"Annulla",
    newRest:"Nuovo Ristorante",cuisine:"Cucina",address:"Indirizzo",
    password:"Password",createRest:"Crea Ristorante",namePassReq:"Nome e password obbligatori",
    status:"Stato",actions:"Azioni",active:"Attivo",inactive:"Inattivo",
    deactivate:"Disattiva",activate:"Attiva",layout:"Layout",
    filterByRest:"Filtra per Ristorante",
    noReservations:"Nessuna prenotazione",noRatings:"Ancora nessuna valutazione",
    restDash:"Dashboard Ristorante",openingHours:"Orari di Apertura",
    rules:"Regole",vacation:"Ferie",saveHours:"Salva Orari",
    saved:"Salvato!",reservRules:"Regole di Prenotazione",
    maxGuestsDay:"Max Ospiti al Giorno",slotDuration:"Durata Slot (min)",
    saveRules:"Salva Regole",vacPeriods:"Ferie / Periodi di Chiusura",
    from:"Da",to:"A",addPeriod:"Aggiungi Periodo",
    remove:"Rimuovi",noVacation:"Nessun periodo di ferie",
    todayMap:"Mappa Tavoli",readOnly:"Solo lettura. Chiedi al proprietario di modificare il layout.",
    available:"Disponibile",reserved:"Prenotato",locked:"Bloccato",
    upcoming:"Prossimi",past:"Passati",cancelled:"Annullati",all:"Tutti",
    cancelRes:"Annulla",
    ownerUser:"Nome utente",ownerLogin:"Login Proprietario",restLogin:"Login Ristorante",
    restNameLabel:"Nome Ristorante",loginBtn:"Accedi",invalidCreds:"Credenziali non valide",
    restDeactivated:"Il ristorante è attualmente disattivato",invalidRest:"Nome ristorante o password non validi",
    tableLockedMsg:"Questo tavolo è in fase di prenotazione",
    noTableAvail:"Nessun tavolo disponibile per quella dimensione e orario",
    closedDay:"Il ristorante è chiuso il",openHours:"Il ristorante è aperto",
    vacationMsg:"Il ristorante è in ferie in questa data",
    maxCapReached:"Capacità massima ospiti raggiunta per questa data",
    selectDate:"Seleziona una data",selectTime:"Seleziona un orario",
    enterName:"Inserisci il tuo nome",selectGuests:"Seleziona il numero di ospiti",
    seats:"posti",ownerLayoutEdit:"Trascina per spostare tavoli e pareti",
    addTable:"+ Tavolo",addWall:"+ Parete",deleteSelected:"Elimina Selezionato",
    newTable:"Nuovo Tavolo",tableCapacity:"Capacità",
    addTableBtn:"Aggiungi Tavolo",language:"Lingua",
    demo:"Demo",image:"Immagine",
    guestCount:(n)=>`${n} ${n===1?"ospite":"ospiti"}`,
    minutes:(n)=>`${n} min`,
    fromDate:"La data 'Da' deve essere prima della data 'A'",periodAdded:"Aggiunto!",
    code:"Codice",
    createReservation:"Crea Prenotazione",manualReservation:"Prenotazione Manuale",
    selectTable:"Seleziona Tavolo (opzionale)",autoAssign:"Assegna automaticamente",
    tableNum:"Tavolo",reservationCreated:"Prenotazione creata!",
    phone:"Telefono (opzionale)",notes:"Note (opzionale)",
    emailHint:"Inserisci email per ricevere conferma e promemoria",
    emailConfirmSent:"Conferma inviata alla tua email",
    emailReminderNote:"Riceverai un promemoria 30 min prima della prenotazione",
    emailInvalid:"Indirizzo email non valido",
    resizeWall:"Parete: trascina = sposta · angolo = ridimensiona",
    wallWidth:"Larghezza",wallHeight:"Altezza",
    selTable:"Seleziona tavolo",
  },
};

const LangCtx = createContext({ lang:"de", t:T.de, setLang:()=>{} });
const useLang = () => useContext(LangCtx);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DAYS_KEY = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DAYS_LABELS = {
  de:["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],
  en:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
  it:["Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato","Domenica"],
};
const OWNER = { u:"owner", p:"owner123" };
const LOCK_MS = 3 * 60 * 1000;
const REST_IMGS = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=75",
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=75",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=75",
];

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const ls = {
  get:(k,d)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch{ return d; } },
  set:(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
};

// ─── INIT ─────────────────────────────────────────────────────────────────────
function initData() {
  if (ls.get("es3_init",false)) return;
  const r1="rest_1", r2="rest_2";
  ls.set("es3_restaurants",[
    {id:r1,name:"Noir & Table",cuisine:"Französisch",address:"12 Rue de la Paix",password:"rest1",active:true,imgIdx:0},
    {id:r2,name:"The Obsidian",cuisine:"Zeitgenössisch",address:"7 Black Stone Ave",password:"rest2",active:true,imgIdx:1},
  ]);
  ls.set("es3_tables",[
    {id:"t1",rid:r1,capacity:2,x:40,y:40,w:44,h:44},
    {id:"t2",rid:r1,capacity:2,x:110,y:40,w:44,h:44},
    {id:"t3",rid:r1,capacity:4,x:40,y:130,w:52,h:52},
    {id:"t4",rid:r1,capacity:4,x:120,y:130,w:52,h:52},
    {id:"t5",rid:r1,capacity:6,x:220,y:60,w:62,h:52},
    {id:"t6",rid:r2,capacity:2,x:40,y:40,w:44,h:44},
    {id:"t7",rid:r2,capacity:4,x:120,y:40,w:52,h:52},
    {id:"t8",rid:r2,capacity:6,x:40,y:140,w:62,h:52},
  ]);
  ls.set("es3_walls",[
    {id:"w1",rid:r1,x:0,y:0,w:480,h:6},{id:"w2",rid:r1,x:0,y:0,w:6,h:320},
    {id:"w3",rid:r2,x:0,y:0,w:480,h:6},{id:"w4",rid:r2,x:0,y:0,w:6,h:320},
  ]);
  const hrs={};
  [r1,r2].forEach(rid=>{
    hrs[rid]={};
    DAYS_KEY.forEach(d=>{ hrs[rid][d]={open:true,from:"12:00",to:"22:00"}; });
    hrs[rid]["Sunday"]={open:false,from:"12:00",to:"20:00"};
  });
  ls.set("es3_hours",hrs);
  ls.set("es3_reservations",[]);
  ls.set("es3_vacations",{[r1]:[],[r2]:[]});
  ls.set("es3_rules",{[r1]:{maxGuests:30,slotMinutes:90},[r2]:{maxGuests:24,slotMinutes:90}});
  ls.set("es3_locks",{});
  ls.set("es3_init",true);
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2,10);
const code = () => Math.random().toString(36).slice(2,8).toUpperCase();
const today = () => new Date().toISOString().slice(0,10);
function dayKey(ds) { const d=new Date(ds+"T12:00:00"); return DAYS_KEY[((d.getDay()+6)%7)]; }
function getLocks() {
  const locks=ls.get("es3_locks",{});
  const now=Date.now();
  const clean={};
  Object.entries(locks).forEach(([k,v])=>{ if(now-v.ts<LOCK_MS) clean[k]=v; });
  return clean;
}
function setLocks(l) { ls.set("es3_locks",l); }

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Mono:wght@300;400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#080808;--sf:#111;--sf2:#181818;--sf3:#1e1e1e;
  --bd:#242424;--bd2:#333;--bd3:#444;
  --tx:#efefef;--tx2:#999;--tx3:#555;
  --ac:#c8a96e;--ac2:rgba(200,169,110,.14);
  --gl:rgba(255,255,255,.05);--gl2:rgba(255,255,255,.1);
  --er:#e05252;--ok:#52c47a;--wn:#e8a44a;
  --fd:'Cormorant Garamond',Georgia,serif;
  --fm:'DM Mono',monospace;
  /* Spacing scale */
  --sp-xs:8px;--sp-sm:12px;--sp-md:16px;--sp-lg:24px;--sp-xl:32px;
}

/* ── RESET & BASE ── */
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
html,body,#root{height:100%;min-height:100%}
body{
  background:var(--bg);color:var(--tx);
  font-family:var(--fm);font-size:13px;line-height:1.65;
  -webkit-font-smoothing:antialiased;
  min-height:100vh;
  /* prevent horizontal overflow at root */
  overflow-x:hidden;
}
.app{min-height:100vh;display:flex;flex-direction:column;overflow-x:hidden}

/* ── TOPBAR ── */
.topbar{
  display:flex;align-items:center;justify-content:space-between;
  padding:11px 16px;
  border-bottom:1px solid var(--bd);
  position:sticky;top:0;z-index:200;
  background:rgba(8,8,8,.97);backdrop-filter:blur(12px);
  gap:10px;
}
.brand{display:flex;align-items:baseline;gap:8px;cursor:pointer;user-select:none;min-width:0;flex-shrink:1}
.brand-name{
  font-family:var(--fd);font-size:17px;font-weight:300;
  letter-spacing:.15em;color:var(--tx);
  text-shadow:0 0 20px rgba(255,255,255,.15);
  white-space:nowrap;
}
.brand-name b{font-weight:600}
.brand-tag{font-size:9px;color:var(--tx3);letter-spacing:.2em;text-transform:uppercase;display:none;white-space:nowrap}
@media(min-width:600px){
  .topbar{padding:13px 24px}
  .brand-name{font-size:19px}
  .brand-tag{display:block}
}
.tb-right{display:flex;align-items:center;gap:6px;flex-shrink:0}

/* ── BUTTONS ── */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:5px;
  padding:9px 16px;
  border:1px solid var(--bd2);background:transparent;color:var(--tx2);
  font-family:var(--fm);font-size:11px;letter-spacing:.08em;text-transform:uppercase;
  cursor:pointer;transition:all .18s;white-space:nowrap;border-radius:2px;
  /* larger touch targets on mobile */
  min-height:40px;
}
.btn:hover{border-color:var(--tx);color:var(--tx);box-shadow:0 0 10px var(--gl2)}
.btn-p{border-color:var(--tx);color:var(--tx);background:var(--gl)}
.btn-p:hover{background:var(--tx);color:var(--bg);box-shadow:0 0 16px rgba(255,255,255,.15)}
.btn-a{border-color:var(--ac);color:var(--ac);background:var(--ac2)}
.btn-a:hover{background:var(--ac);color:#000}
.btn-g{border-color:transparent}
.btn-g:hover{border-color:var(--bd2)}
.btn-d{border-color:var(--er);color:var(--er)}
.btn-d:hover{background:var(--er);color:#000}
.btn-ok{border-color:var(--ok);color:var(--ok)}
.btn-ok:hover{background:var(--ok);color:#000}
.btn-sm{padding:6px 10px;font-size:9.5px;min-height:32px}
.btn-lg{padding:13px 28px;font-size:12px;min-height:46px;width:100%}
@media(min-width:600px){.btn-lg{width:auto}}
.btn:disabled{opacity:.3;cursor:not-allowed;pointer-events:none}

/* ── MAIN CONTENT ── */
.main{flex:1;padding:16px;width:100%;max-width:1080px;margin:0 auto}
@media(min-width:600px){.main{padding:20px 24px}}
@media(min-width:900px){.main{padding:28px 32px}}

/* ── CARD ── */
.card{background:var(--sf);border:1px solid var(--bd);padding:16px;margin-bottom:14px;border-radius:2px}
@media(min-width:600px){.card{padding:20px}}
.card-t{font-family:var(--fd);font-size:17px;font-weight:300;letter-spacing:.1em;margin-bottom:10px}

/* ── GRIDS ── */
/* Mobile: always 1 col. Tablet+: 2 col */
.g2{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:520px){.g2{grid-template-columns:1fr 1fr;gap:14px}}
/* Three column — only on wide screens */
.g3{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:700px){.g3{grid-template-columns:repeat(3,1fr);gap:14px}}

/* ── FORMS ── */
.field{margin-bottom:13px}
.lbl{display:block;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--tx3);margin-bottom:5px}
.inp,.sel,.txta{
  width:100%;padding:10px 12px;
  background:var(--sf2);border:1px solid var(--bd);color:var(--tx);
  font-family:var(--fm);font-size:14px;
  transition:border-color .18s;outline:none;-webkit-appearance:none;border-radius:2px;
  /* larger on mobile */
  min-height:42px;
}
.inp:focus,.sel:focus,.txta:focus{border-color:var(--bd3);box-shadow:0 0 6px var(--gl)}
.sel{cursor:pointer}
.txta{resize:vertical;min-height:72px}

/* ── TABS ── */
.tabs{
  display:flex;border-bottom:1px solid var(--bd);margin-bottom:18px;
  overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;
}
.tabs::-webkit-scrollbar{display:none}
.tab{
  padding:10px 14px;cursor:pointer;font-size:10px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--tx3);border-bottom:2px solid transparent;
  white-space:nowrap;transition:all .18s;flex-shrink:0;
}
.tab:hover{color:var(--tx2)}
.tab.act{color:var(--tx);border-bottom-color:var(--ac)}

/* ── DATA TABLE ── */
.dt{width:100%;border-collapse:collapse;min-width:420px}
.dt th{text-align:left;padding:7px 10px;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:var(--tx3);border-bottom:1px solid var(--bd)}
.dt td{padding:9px 10px;border-bottom:1px solid var(--bd);font-size:12px}
.dt tr:last-child td{border-bottom:none}
.dt tr:hover td{background:var(--gl)}
/* Card-style rows for tiny screens */
@media(max-width:500px){
  .dt-card thead{display:none}
  .dt-card tr{display:flex;flex-direction:column;padding:10px 0;border-bottom:1px solid var(--bd)}
  .dt-card td{padding:3px 0;border:none;font-size:12px}
  .dt-card td::before{content:attr(data-label)' ';font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--tx3);margin-right:6px}
}

/* ── BADGE ── */
.badge{display:inline-block;padding:2px 7px;font-size:9px;letter-spacing:.1em;text-transform:uppercase;border:1px solid currentColor;border-radius:2px}
.bg{color:var(--ok)}.br{color:var(--er)}.by{color:var(--wn)}.bgr{color:var(--tx3)}

/* ── ALERTS ── */
.alert{padding:10px 14px;margin-bottom:12px;border-left:3px solid var(--bd2);background:var(--sf2);font-size:12px;border-radius:0 2px 2px 0;line-height:1.5}
.ae{border-color:var(--er);color:var(--er)}.as{border-color:var(--ok);color:var(--ok)}.aw{border-color:var(--wn);color:var(--wn)}

/* ── PAGE TITLE ── */
.pg-t{font-family:var(--fd);font-size:24px;font-weight:300;letter-spacing:.07em;margin-bottom:3px;text-shadow:0 0 24px rgba(255,255,255,.07)}
.pg-s{font-size:10px;color:var(--tx3);letter-spacing:.16em;text-transform:uppercase;margin-bottom:16px}
@media(min-width:600px){.pg-t{font-size:30px}}

/* ── RESTAURANT CARDS ── */
/* Mobile: 1 col, small screen: 2 col, large: auto-fill */
.rc-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;margin-top:4px;
}
@media(min-width:480px){.rc-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:860px){.rc-grid{grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}}
.rc{background:var(--sf);border:1px solid var(--bd);cursor:pointer;transition:all .22s;position:relative;overflow:hidden;border-radius:2px}
.rc:hover{border-color:var(--bd3);transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,.6)}
/* Image taller on mobile for thumb target */
.rc-img{width:100%;height:150px;object-fit:cover;display:block;filter:brightness(.72);transition:filter .22s}
.rc:hover .rc-img{filter:brightness(.88)}
@media(min-width:600px){.rc-img{height:130px}}
.rc-body{padding:14px 16px 16px}
.rc-fav{
  position:absolute;top:10px;right:10px;
  background:rgba(0,0,0,.65);border:none;color:var(--tx2);cursor:pointer;
  font-size:16px;width:34px;height:34px;
  display:flex;align-items:center;justify-content:center;
  border-radius:50%;transition:all .18s;z-index:2;
}
.rc-fav:hover{background:rgba(0,0,0,.88);color:var(--wn)}
.rc-fav.faved{color:var(--ac)}
.rc-name{font-family:var(--fd);font-size:18px;font-weight:400;letter-spacing:.06em;margin-bottom:4px}
.rc-meta{font-size:11px;color:var(--tx3)}
.rc-cta{font-size:10px;color:var(--tx3);letter-spacing:.14em;margin-top:10px;transition:color .18s}
.rc:hover .rc-cta{color:var(--ac)}

/* ── LANGUAGE SELECTOR ── */
.lang-sel{background:var(--sf2);border:1px solid var(--bd);color:var(--tx2);font-family:var(--fm);font-size:11px;padding:6px 8px;cursor:pointer;border-radius:2px;outline:none;min-height:34px}
.lang-sel:hover{border-color:var(--bd2);color:var(--tx)}

/* ── CANVAS WRAPPER ── */
/* Scrollable on mobile, constrained on desktop */
.cv-wrap{
  position:relative;background:var(--sf2);border:1px solid var(--bd);
  overflow:auto;border-radius:2px;
  /* full width on mobile, capped on desktop */
  width:100%;-webkit-overflow-scrolling:touch;
}
.cv-inner{position:relative}

/* ── TABLE ON CANVAS ── */
.cv-tbl{position:absolute;display:flex;align-items:center;justify-content:center;flex-direction:column;user-select:none}
.tbl-body{
  background:var(--sf);border:1px solid var(--bd2);border-radius:2px;
  display:flex;align-items:center;justify-content:center;flex-direction:column;
  width:100%;height:100%;position:absolute;inset:0;z-index:1;
  transition:border-color .15s,background .15s;
}
.cv-tbl.av .tbl-body{border-color:#2e2e2e}
.cv-tbl.rs .tbl-body{border-color:var(--er);background:rgba(224,82,82,.06)}
.cv-tbl.lk .tbl-body{border-color:var(--wn);background:rgba(232,164,74,.06)}
.cv-tbl.drag-able{cursor:grab}
.cv-tbl.drag-able:hover .tbl-body{border-color:var(--bd3);box-shadow:0 0 8px var(--gl2)}
.cv-tbl.dragging .tbl-body{cursor:grabbing;border-color:var(--tx);box-shadow:0 0 14px var(--gl2);z-index:20}
.tbl-label{font-size:8px;color:var(--tx3);line-height:1.2;text-align:center}

/* ── CHAIRS ── */
.ch-top,.ch-bot{position:absolute;left:50%;transform:translateX(-50%);display:flex;gap:2px;z-index:0;pointer-events:none}
.ch-top{bottom:calc(100% + 1px)}
.ch-bot{top:calc(100% + 1px)}
.ch-lft,.ch-rgt{position:absolute;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:2px;z-index:0;pointer-events:none}
.ch-lft{right:calc(100% + 1px)}
.ch-rgt{left:calc(100% + 1px)}
.ch{background:var(--sf3);border:1px solid var(--bd2);border-radius:1px;flex-shrink:0}
.ch.h{width:10px;height:7px}
.ch.v{width:7px;height:10px}
.cv-tbl.rs .ch{border-color:rgba(224,82,82,.35);background:rgba(224,82,82,.06)}
.cv-tbl.lk .ch{border-color:rgba(232,164,74,.35);background:rgba(232,164,74,.06)}

/* ── WALL ── */
.cv-wall{position:absolute;background:#1c1c1c;border:1px solid #272727;user-select:none;border-radius:1px;cursor:grab}
.cv-wall.drag-able:hover{border-color:#3a3a3a}
.cv-wall.dragging{cursor:grabbing;border-color:var(--tx);z-index:20}
.wall-resize-handle{position:absolute;bottom:-4px;right:-4px;width:12px;height:12px;background:var(--bd3);cursor:se-resize;z-index:5;border:1px solid var(--tx2);border-radius:1px}

/* ── MODAL ── */
.modal-ov{
  position:fixed;inset:0;background:rgba(0,0,0,.9);backdrop-filter:blur(5px);
  display:flex;align-items:flex-end;justify-content:center;
  z-index:1000;padding:0;
}
/* Slide-up sheet on mobile */
.modal{
  background:var(--sf);border:1px solid var(--bd2);
  padding:20px 18px;width:100%;max-height:92vh;overflow-y:auto;
  position:relative;border-radius:4px 4px 0 0;
  animation:slideUp .22s ease;
}
@keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}
/* Centered dialog on larger screens */
@media(min-width:600px){
  .modal-ov{align-items:center;padding:16px}
  .modal{max-width:480px;border-radius:2px;padding:26px;animation:fadeIn .18s ease}
}
@keyframes fadeIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
.modal-t{font-family:var(--fd);font-size:19px;font-weight:300;margin-bottom:14px;padding-right:28px}
.modal-x{position:absolute;top:14px;right:14px;background:none;border:none;color:var(--tx3);cursor:pointer;font-size:18px;transition:color .15s;line-height:1;padding:4px;min-width:32px;min-height:32px;display:flex;align-items:center;justify-content:center}
.modal-x:hover{color:var(--tx)}

/* ── CONFIRMATION ── */
.conf-box{border:1px solid var(--bd2);padding:20px;text-align:center;background:var(--sf);border-radius:2px}
@media(min-width:500px){.conf-box{padding:26px}}
.conf-code{font-family:var(--fd);font-size:28px;letter-spacing:.2em;text-shadow:0 0 16px rgba(200,169,110,.35);margin:12px 0;color:var(--ac)}
@media(min-width:400px){.conf-code{font-size:34px}}
.conf-row{display:flex;justify-content:space-between;align-items:baseline;gap:8px;padding:7px 0;border-bottom:1px solid var(--bd);font-size:12px}
.conf-row:last-child{border-bottom:none}
.conf-k{color:var(--tx3);text-transform:uppercase;letter-spacing:.1em;font-size:9.5px;flex-shrink:0}

/* ── SPINNER ── */
.spin{display:inline-block;width:14px;height:14px;border:2px solid var(--bd2);border-top-color:var(--tx);border-radius:50%;animation:sp .5s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}

/* ── BACK BUTTON ── */
.back{
  display:inline-flex;align-items:center;gap:6px;
  color:var(--tx3);cursor:pointer;font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  margin-bottom:16px;transition:color .18s;background:none;border:none;
  padding:6px 0;min-height:36px;
}
.back:hover{color:var(--tx)}

/* ── TOGGLE ROWS ── */
.tog-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--bd);gap:10px;flex-wrap:wrap}
.tog{position:relative;width:36px;height:20px;cursor:pointer;flex-shrink:0}
.tog input{opacity:0;width:0;height:0;position:absolute}
.tog-s{position:absolute;inset:0;background:var(--bd2);transition:background .18s;border-radius:2px}
.tog-s::before{content:'';position:absolute;width:14px;height:14px;left:3px;top:3px;background:var(--tx3);transition:transform .18s,background .18s;border-radius:1px}
.tog input:checked+.tog-s{background:#2a2a2a}
.tog input:checked+.tog-s::before{transform:translateX(16px);background:var(--tx)}
/* Time inputs on mobile: stack vertically */
.tog-time{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.tog-time .inp{width:90px;min-width:80px}

/* ── EMPTY STATE ── */
.empty{text-align:center;padding:44px 20px;color:var(--tx3)}
.empty-t{font-family:var(--fd);font-size:17px;font-weight:300;margin-bottom:4px;color:var(--tx2)}
.empty-s{font-size:11px}

/* ── STEPS ── */
.steps{display:flex;margin-bottom:22px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.steps::-webkit-scrollbar{display:none}
.stp{flex:1;text-align:center;padding:9px 4px;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);border-bottom:2px solid var(--bd);white-space:nowrap;min-width:70px}
.stp.act{color:var(--tx);border-bottom-color:var(--ac)}
.stp.done{color:var(--tx2);border-bottom-color:var(--bd2)}

/* ── STARS ── */
.stars{display:flex;gap:6px}
.star{font-size:26px;cursor:pointer;color:var(--tx3);transition:color .1s;line-height:1;padding:2px}
.star.on{color:var(--ac);text-shadow:0 0 8px rgba(200,169,110,.4)}

/* ── SECTION TITLE ── */
.sec-t{font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--tx3);margin-bottom:10px;padding-bottom:5px;border-bottom:1px solid var(--bd)}

/* ── HERO ── */
.hero{padding:24px 0 12px;text-align:center;margin-bottom:4px}
.hero-title{font-family:var(--fd);font-size:32px;font-weight:300;letter-spacing:.1em;margin-bottom:5px;text-shadow:0 0 36px rgba(255,255,255,.08)}
.hero-title b{font-weight:600}
.hero-sub{font-size:10px;color:var(--tx3);letter-spacing:.24em;text-transform:uppercase}
.hero-div{width:36px;height:1px;background:var(--ac);margin:11px auto;opacity:.5}
@media(min-width:480px){.hero-title{font-size:40px}.hero{padding:32px 0 16px}}
@media(min-width:800px){.hero-title{font-size:48px}}

/* ── FILTER TABS ── */
.f-tabs{display:flex;gap:6px;margin-bottom:13px;flex-wrap:wrap}
.f-tab{
  font-size:10px;letter-spacing:.1em;text-transform:uppercase;
  cursor:pointer;padding:7px 12px;border:1px solid var(--bd);color:var(--tx3);
  transition:all .18s;border-radius:2px;min-height:34px;
  display:flex;align-items:center;
}
.f-tab:hover{border-color:var(--bd2);color:var(--tx2)}
.f-tab.act{border-color:var(--ac);color:var(--ac);background:rgba(200,169,110,.1)}

/* ── SEARCH ── */
.s-wrap{position:relative;margin-bottom:14px}
.s-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--tx3);font-size:14px;pointer-events:none}
.s-inp{padding-left:36px !important}

/* ── LEGEND ── */
.legend{display:flex;gap:12px;font-size:9.5px;color:var(--tx3);margin-top:8px;flex-wrap:wrap}
.ld{display:inline-block;width:8px;height:8px;border:1px solid currentColor;margin-right:3px;border-radius:1px;vertical-align:middle}

/* ── SCROLLABLE TABLE WRAPPER ── */
.sc-x{overflow-x:auto;-webkit-overflow-scrolling:touch}

/* ── RESPONSIVE TABLE LAYOUT (booking page canvas) ── */
/* On narrow screens, canvas scrolls horizontally — fine */
.canvas-scroll-hint{
  font-size:9.5px;color:var(--tx3);margin-bottom:6px;
  display:block;
}
@media(min-width:600px){.canvas-scroll-hint{display:none}}

/* ── DASHBOARD LAYOUT ── */
/* On large screens, tabs become a side nav */
@media(min-width:900px){
  .dash-layout{display:grid;grid-template-columns:160px 1fr;gap:28px;align-items:start}
  .dash-tabs{
    display:flex;flex-direction:column;
    border-bottom:none;margin-bottom:0;
    border-right:1px solid var(--bd);
    padding-right:0;
  }
  .dash-tabs .tab{
    border-bottom:none;border-right:2px solid transparent;
    text-align:left;padding:10px 16px 10px 0;
  }
  .dash-tabs .tab.act{border-right-color:var(--ac);border-bottom:none}
  .dash-content{min-width:0}
}

/* ── OWNER RESTAURANT TABLE — action buttons wrap on mobile ── */
.act-btns{display:flex;gap:5px;flex-wrap:wrap}

/* ── OPENING HOURS — responsive tog rows ── */
@media(max-width:499px){
  .tog-row{flex-direction:column;align-items:flex-start;gap:8px}
  .tog-row-label{display:flex;align-items:center;gap:10px;width:100%}
}

/* ── RESERVATION FORM ── */
.booking-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px}
.booking-actions .btn{flex:1;min-width:120px}

/* ── MISC UTILITY ── */
.w-full{width:100%}
.mt-sm{margin-top:8px}
.mt-md{margin-top:14px}
.flex-wrap{display:flex;flex-wrap:wrap;gap:8px}
`;

// ─── CHAIRS ───────────────────────────────────────────────────────────────────
function Chairs({ cap }) {
  // Spread chairs: top and bottom rows, sides if needed
  const half = Math.floor(cap / 2);
  const top = Math.ceil(cap / 2);
  const bot = Math.floor(cap / 2);
  const arr = n => Array.from({ length: n });
  return (
    <>
      {top > 0 && <div className="ch-top">{arr(top).map((_,i) => <div key={i} className="ch h" />)}</div>}
      {bot > 0 && <div className="ch-bot">{arr(bot).map((_,i) => <div key={i} className="ch h" />)}</div>}
    </>
  );
}

// ─── CANVAS VIEW (read-only) ──────────────────────────────────────────────────
function CanvasView({ tables, walls, bookedIds=[], lockedIds=[], W=480, H=280 }) {
  return (
    <div className="cv-wrap" style={{ maxWidth: W, height: H }}>
      <div className="cv-inner" style={{ width: W, height: H }}>
        {walls.map(w => (
          <div key={w.id} className="cv-wall"
            style={{ left:w.x, top:w.y, width:w.w, height:w.h }} />
        ))}
        {tables.map(tb => {
          const st = bookedIds.includes(tb.id) ? "rs" : lockedIds.includes(tb.id) ? "lk" : "av";
          return (
            <div key={tb.id} className={`cv-tbl ${st}`}
              style={{ left:tb.x, top:tb.y, width:tb.w, height:tb.h }}>
              <Chairs cap={tb.capacity} />
              <div className="tbl-body">
                <span className="tbl-label">{tb.capacity}p</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang_] = useState(ls.get("es3_lang","de"));
  const setLang = l => { setLang_(l); ls.set("es3_lang",l); };
  const t = T[lang] || T.de;

  useEffect(() => { initData(); }, []);

  const [role, setRole] = useState(null);
  const [rid, setRid] = useState(null);
  const [page, setPage] = useState("home");
  const [bookRid, setBookRid] = useState(null);
  const [conf, setConf] = useState(null);
  const [loginModal, setLoginModal] = useState(null);
  const [favs, setFavs] = useState(ls.get("es3_favs",[]));

  const toggleFav = id => {
    const next = favs.includes(id) ? favs.filter(f=>f!==id) : [...favs,id];
    setFavs(next); ls.set("es3_favs",next);
  };

  const logout = () => { setRole(null); setRid(null); setPage("home"); };
  const goHome = () => setPage(role==="owner"?"ownerDash":role==="restaurant"?"restDash":"home");

  const onLogin = (r, id) => {
    setRole(r); setRid(id); setLoginModal(null);
    setPage(r==="owner"?"ownerDash":"restDash");
  };

  return (
    <LangCtx.Provider value={{ lang, t, setLang }}>
      <style>{CSS}</style>
      <div className="app">
        <Topbar role={role} rid={rid} onOwner={()=>setLoginModal("owner")}
          onRest={()=>setLoginModal("restaurant")} onLogout={logout}
          onHome={goHome} onRoot={()=>{setPage("home");setRole(null);setRid(null);}} />
        <div className="main">
          {page==="home"       && <HomePage favs={favs} onToggleFav={toggleFav} onBook={id=>{setBookRid(id);setPage("booking");}} />}
          {page==="booking"    && <BookingPage rid={bookRid} onBack={()=>setPage("home")} onConfirm={c=>{setConf(c);setPage("confirmation");}} />}
          {page==="confirmation" && <ConfirmPage data={conf} onHome={()=>setPage("home")} />}
          {page==="ownerDash"  && role==="owner"      && <OwnerDash />}
          {page==="restDash"   && role==="restaurant" && <RestDash rid={rid} />}
        </div>
      </div>
      {loginModal && <LoginModal type={loginModal} onClose={()=>setLoginModal(null)} onSuccess={onLogin} />}
    </LangCtx.Provider>
  );
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
function Topbar({ role, rid, onOwner, onRest, onLogout, onHome, onRoot }) {
  const { t, lang, setLang } = useLang();
  const rests = ls.get("es3_restaurants",[]);
  const rest = rests.find(r=>r.id===rid);
  return (
    <div className="topbar">
      <div className="brand" onClick={onRoot}>
        <div className="brand-name"><b>Exclusive</b> Seat</div>
        <div className="brand-tag">{t.tagline}</div>
      </div>
      <div className="tb-right">
        <select className="lang-sel" value={lang} onChange={e=>setLang(e.target.value)}>
          <option value="de">🇩🇪 DE</option>
          <option value="en">🇬🇧 EN</option>
          <option value="it">🇮🇹 IT</option>
        </select>
        {!role && <>
          <button className="btn btn-g btn-sm" onClick={onOwner}>{t.ownerBtn}</button>
          <button className="btn btn-sm" onClick={onRest}>{t.restBtn}</button>
        </>}
        {role==="owner" && <>
          <span style={{fontSize:9,color:"var(--tx3)",letterSpacing:".12em",textTransform:"uppercase"}}>{t.ownerBtn}</span>
          <button className="btn btn-g btn-sm" onClick={onLogout}>{t.logout}</button>
        </>}
        {role==="restaurant" && <>
          <span style={{fontSize:9,color:"var(--tx3)",letterSpacing:".12em",textTransform:"uppercase"}}>{rest?.name}</span>
          <button className="btn btn-g btn-sm" onClick={onLogout}>{t.logout}</button>
        </>}
      </div>
    </div>
  );
}

// ─── LOGIN MODAL ──────────────────────────────────────────────────────────────
function LoginModal({ type, onClose, onSuccess }) {
  const { t } = useLang();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setErr(""); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (type==="owner") {
        if (user===OWNER.u && pass===OWNER.p) return onSuccess("owner",null);
        setErr(t.invalidCreds);
      } else {
        const r = ls.get("es3_restaurants",[]).find(x=>x.name.toLowerCase()===user.toLowerCase()&&x.password===pass);
        if (!r) return setErr(t.invalidRest);
        if (!r.active) return setErr(t.restDeactivated);
        onSuccess("restaurant",r.id);
      }
    }, 360);
  };

  return (
    <div className="modal-ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-t">{type==="owner"?t.ownerLogin:t.restLogin}</div>
        {err && <div className="alert ae">{err}</div>}
        <div className="field">
          <label className="lbl">{type==="owner"?t.ownerUser:t.restNameLabel}</label>
          <input className="inp" value={user} onChange={e=>setUser(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} autoFocus />
        </div>
        <div className="field">
          <label className="lbl">{t.password}</label>
          <input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
        </div>
        <p style={{fontSize:9.5,color:"var(--tx3)",marginBottom:12}}>
          {t.demo}: {type==="owner"?"owner / owner123":'"Noir & Table" / rest1 · "The Obsidian" / rest2'}
        </p>
        <button className="btn btn-p" style={{width:"100%"}} onClick={submit} disabled={loading}>
          {loading?<span className="spin"/>:t.loginBtn}
        </button>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ favs, onToggleFav, onBook }) {
  const { t } = useLang();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const all = ls.get("es3_restaurants",[]).filter(r=>r.active);
  const shown = all.filter(r => {
    const ms = r.name.toLowerCase().includes(search.toLowerCase()) ||
               (r.cuisine||"").toLowerCase().includes(search.toLowerCase());
    const mf = filter==="favs" ? favs.includes(r.id) : true;
    return ms && mf;
  });

  return (
    <div>
      <div className="hero">
        <div className="hero-title"><b>Exclusive</b> Seat</div>
        <div className="hero-div" />
        <div className="hero-sub">{t.tagline}</div>
      </div>

      <div className="s-wrap">
        <span className="s-icon">🔍</span>
        <input className="inp s-inp" value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} />
      </div>

      <div className="f-tabs">
        <div className={`f-tab ${filter==="all"?"act":""}`} onClick={()=>setFilter("all")}>{t.allRests}</div>
        <div className={`f-tab ${filter==="favs"?"act":""}`} onClick={()=>setFilter("favs")}>
          ★ {t.favorites}{favs.length>0?` (${favs.length})`:""}
        </div>
      </div>

      {shown.length===0
        ? <div className="empty"><div className="empty-t">{search?t.noResults:t.noRestaurants}</div></div>
        : <div className="rc-grid">
            {shown.map((r,i)=>(
              <div key={r.id} className="rc" onClick={()=>onBook(r.id)}>
                <img className="rc-img"
                  src={REST_IMGS[r.imgIdx??i%REST_IMGS.length]}
                  alt={r.name}
                  onError={e=>{e.target.style.display="none";}} />
                <button className={`rc-fav${favs.includes(r.id)?" faved":""}`}
                  onClick={e=>{e.stopPropagation();onToggleFav(r.id);}}>
                  {favs.includes(r.id)?"★":"☆"}
                </button>
                <div className="rc-body">
                  <div className="rc-name">{r.name}</div>
                  <div className="rc-meta">{r.cuisine}{r.address?` · ${r.address}`:""}</div>
                  <div className="rc-cta">{t.bookTable}</div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

// ─── BOOKING PAGE ─────────────────────────────────────────────────────────────
function BookingPage({ rid, onBack, onConfirm }) {
  const { t } = useLang();
  const rest = ls.get("es3_restaurants",[]).find(r=>r.id===rid);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(today());
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [assigned, setAssigned] = useState(null);
  const [lockedId, setLockedId] = useState(null);

  // Release lock on unmount
  useEffect(() => () => {
    if (lockedId) {
      const lk = getLocks(); delete lk[lockedId]; setLocks(lk);
    }
  }, [lockedId]);

  const hours = ls.get("es3_hours",{})[rid] || {};
  const vacations = ls.get("es3_vacations",{})[rid] || [];
  const rules = ls.get("es3_rules",{})[rid] || { maxGuests:30 };

  const validate = () => {
    setErr("");
    if (!date) return setErr(t.selectDate);
    if (!name.trim()) return setErr(t.enterName);

    if (vacations.some(v=>date>=v.from&&date<=v.to)) return setErr(t.vacationMsg);

    const dk = dayKey(date);
    const dh = hours[dk];
    if (!dh||!dh.open) return setErr(`${t.closedDay} ${dk}`);
    if (time<dh.from||time>dh.to) return setErr(`${t.openHours} ${dh.from}–${dh.to}`);

    const res = ls.get("es3_reservations",[]);
    const dayRes = res.filter(r=>r.rid===rid&&r.date===date&&r.status!=="cancelled");
    if (dayRes.reduce((s,r)=>s+r.guests,0)+guests>rules.maxGuests) return setErr(t.maxCapReached);

    const tables = ls.get("es3_tables",[]).filter(tb=>tb.rid===rid);
    const locks = getLocks();
    const bookedIds = res.filter(r=>r.rid===rid&&r.date===date&&r.time===time&&r.status!=="cancelled").map(r=>r.tableId);
    const lockedIds = Object.keys(locks);

    // Strict: exact match first, then smallest larger
    const free = tb => !bookedIds.includes(tb.id) && !lockedIds.includes(tb.id);
    let avail = tables.filter(tb=>tb.capacity===guests&&free(tb));
    if (avail.length===0) avail = tables.filter(tb=>tb.capacity>guests&&free(tb)).sort((a,b)=>a.capacity-b.capacity);

    if (avail.length===0) {
      const anyLocked = tables.some(tb=>tb.capacity>=guests&&lockedIds.includes(tb.id)&&!bookedIds.includes(tb.id));
      return setErr(anyLocked ? t.tableLockedMsg : t.noTableAvail);
    }

    const tbl = avail[0];
    const lk = getLocks(); lk[tbl.id]={ts:Date.now(),rid,date,time}; setLocks(lk);
    setLockedId(tbl.id);
    setAssigned(tbl);
    setStep(1);
  };

  const confirmBooking = () => {
    setLoading(true);
    setTimeout(()=>{
      const res = ls.get("es3_reservations",[]);
      const newRes = {
        id:uid(), rid, tableId:assigned.id,
        date, time, guests, name, email,
        status:"confirmed", code:code(),
        createdAt:new Date().toISOString(),
        rating:null, feedback:"",
        tableCapacity: assigned.capacity,
      };
      const lk = getLocks(); delete lk[assigned.id]; setLocks(lk); setLockedId(null);
      ls.set("es3_reservations",[...res,newRes]);
      // Send emails if provided
      if (email && validateEmail(email)) {
        const restObj = ls.get("es3_restaurants",[]).find(r=>r.id===rid);
        scheduleEmails({...newRes, tableCapacity:assigned.capacity}, restObj?.name||"");
      }
      setLoading(false);
      onConfirm({...newRes, restName:rest?.name, tableCapacity:assigned.capacity});
    }, 700);
  };

  const dk = dayKey(date);
  const dh = hours[dk];
  const timeOpts = [];
  if (dh && dh.open) {
    let [h,m] = dh.from.split(":").map(Number);
    const [eh,em] = dh.to.split(":").map(Number);
    while (h<eh||(h===eh&&m<=em)) {
      timeOpts.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
      m+=30; if(m>=60){m-=60;h++;}
    }
  }

  const tables = ls.get("es3_tables",[]).filter(tb=>tb.rid===rid);
  const walls  = ls.get("es3_walls",[]).filter(w=>w.rid===rid);
  const res    = ls.get("es3_reservations",[]);
  const locks  = getLocks();
  const bookedIds = res.filter(r=>r.rid===rid&&r.date===date&&r.time===time&&r.status!=="cancelled").map(r=>r.tableId);
  const lockedIds = Object.keys(locks);

  return (
    <div>
      <button className="back" onClick={onBack}>{t.back}</button>
      <div className="pg-t">{rest?.name}</div>
      <div className="pg-s">{rest?.cuisine}{rest?.address?` · ${rest.address}`:""}</div>

      <div className="steps">
        {[t.step1,t.step2].map((s,i)=>(
          <div key={s} className={`stp ${i===step?"act":i<step?"done":""}`}>{s}</div>
        ))}
      </div>

      {err && <div className="alert ae">{err}</div>}

      {step===0 && (
        <div className="card">
          <div className="card-t">{t.reserve}</div>
          <div className="g2">
            <div className="field">
              <label className="lbl">{t.date}</label>
              <input className="inp" type="date" value={date} min={today()} onChange={e=>setDate(e.target.value)} />
            </div>
            <div className="field">
              <label className="lbl">{t.time}</label>
              <select className="sel" value={time} onChange={e=>setTime(e.target.value)}>
                {timeOpts.length===0
                  ? <option>{t.closedDay}</option>
                  : timeOpts.map(o=><option key={o} value={o}>{o}</option>)
                }
              </select>
            </div>
          </div>
          <div className="field">
            <label className="lbl">{t.guests}</label>
            <select className="sel" value={guests} onChange={e=>setGuests(Number(e.target.value))}>
              {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{t.guestCount(n)}</option>)}
            </select>
          </div>
          <div className="field">
            <label className="lbl">{t.yourName}</label>
            <input className="inp" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div className="field">
            <label className="lbl">{t.email}</label>
            <input className="inp" type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder={t.emailHint} />
            {email && !validateEmail(email) && (
              <div style={{fontSize:10,color:"var(--wn)",marginTop:3}}>⚠ {t.emailInvalid}</div>
            )}
            {email && validateEmail(email) && (
              <div style={{fontSize:10,color:"var(--ok)",marginTop:3}}>✉ {t.emailHint}</div>
            )}
          </div>

          <div style={{marginTop:16}}>
            <div className="sec-t">{t.todayMap}</div>
            <span className="canvas-scroll-hint">← {t.available} / {t.reserved} / {t.locked} →</span>
            <CanvasView tables={tables} walls={walls} bookedIds={bookedIds} lockedIds={lockedIds} W={480} H={260} />
            <div className="legend">
              <span><span className="ld" style={{borderColor:"#333",color:"#333"}}/>{t.available}</span>
              <span><span className="ld" style={{borderColor:"var(--er)",color:"var(--er)"}}/>{t.reserved}</span>
              <span><span className="ld" style={{borderColor:"var(--wn)",color:"var(--wn)"}}/>{t.locked}</span>
            </div>
          </div>

          <div className="booking-actions" style={{marginTop:16}}>
            <button className="btn btn-a btn-lg" onClick={validate}>{t.findTable}</button>
          </div>
        </div>
      )}

      {step===1 && assigned && (
        <div className="card">
          <div className="card-t">{t.confirmBooking}</div>
          <div style={{marginBottom:16}}>
            {[
              [t.restaurant, rest?.name],
              [t.date, date],[t.time, time],
              [t.guests, t.guestCount(guests)],
              [t.table, `${t.capacity} ${assigned.capacity}`],
              [t.name, name],
              email?[t.email,email]:null,
            ].filter(Boolean).map(([k,v])=>(
              <div className="conf-row" key={k}>
                <span className="conf-k">{k}</span><span>{v}</span>
              </div>
            ))}
          </div>
          <div className="booking-actions">
            <button className="btn" onClick={()=>setStep(0)}>{t.edit}</button>
            <button className="btn btn-p btn-lg" onClick={confirmBooking} disabled={loading}>
              {loading?<span className="spin"/>:t.confirmBooking}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CONFIRMATION PAGE ────────────────────────────────────────────────────────
function ConfirmPage({ data, onHome }) {
  const { t } = useLang();
  const [rating, setRating] = useState(0);
  const [fb, setFb] = useState("");
  const [rated, setRated] = useState(false);

  const submitRating = () => {
    if (!rating) return;
    const all = ls.get("es3_reservations",[]);
    const i = all.findIndex(r=>r.id===data.id);
    if (i!==-1){ all[i].rating=rating; all[i].feedback=fb; ls.set("es3_reservations",all); }
    setRated(true);
  };

  return (
    <div>
      <div className="alert as">✓ {t.confirmed}</div>
      <div className="conf-box">
        <div style={{fontSize:9.5,letterSpacing:".2em",color:"var(--tx3)",textTransform:"uppercase"}}>{t.reservationCode}</div>
        <div className="conf-code">{data.code}</div>
        <div style={{textAlign:"left",marginTop:12}}>
          {[
            [t.restaurant, data.restName],[t.date,data.date],[t.time,data.time],
            [t.guests,data.guests],[t.table,`${t.capacity} ${data.tableCapacity}`],
            [t.name,data.name],
            data.email?[t.email,data.email]:null,
          ].filter(Boolean).map(([k,v])=>(
            <div className="conf-row" key={k}><span className="conf-k">{k}</span><span>{v}</span></div>
          ))}
        </div>
      </div>
      <EmailNotice email={data.email} />

      <div className="card" style={{marginTop:13}}>
        <div className="card-t">{t.rateExp}</div>
        {rated
          ? <div className="alert as">{t.thanksRating}</div>
          : <>
              <div className="stars" style={{marginBottom:10}}>
                {[1,2,3,4,5].map(s=>(
                  <span key={s} className={`star${s<=rating?" on":""}`} onClick={()=>setRating(s)}>★</span>
                ))}
              </div>
              <div className="field">
                <label className="lbl">{t.feedback}</label>
                <textarea className="txta" value={fb} onChange={e=>setFb(e.target.value)} rows={2}/>
              </div>
              <button className="btn btn-a" onClick={submitRating} disabled={!rating}>{t.submitRating}</button>
            </>
        }
      </div>
      <button className="btn btn-lg" style={{marginTop:12,width:"100%"}} onClick={onHome}>{t.backHome}</button>
    </div>
  );
}

// ─── OWNER DASHBOARD ──────────────────────────────────────────────────────────
function OwnerDash() {
  const { t } = useLang();
  const [tab, setTab] = useState("restaurants");
  const [editR, setEditR] = useState(null);
  const [layoutRid, setLayoutRid] = useState(null);

  if (layoutRid) return <LayoutEditor rid={layoutRid} onBack={()=>setLayoutRid(null)} />;

  return (
    <div>
      <div className="pg-t">{t.ownerDash}</div>
      <div className="pg-s">{t.platformAdmin}</div>
      <div className="dash-layout">
        <div className="tabs dash-tabs">
          {[["restaurants",t.restaurants],["reservations",t.reservations],["ratings",t.ratings]].map(([k,l])=>(
            <div key={k} className={`tab ${tab===k?"act":""}`} onClick={()=>setTab(k)}>{l}</div>
          ))}
        </div>
        <div className="dash-content">
          {tab==="restaurants" && <OwnerRests onEdit={setEditR} onLayout={setLayoutRid} />}
          {tab==="reservations" && <OwnerRes />}
          {tab==="ratings" && <OwnerRatings />}
        </div>
      </div>
      {editR && <EditRestModal rest={editR} onClose={()=>setEditR(null)} />}
    </div>
  );
}

function OwnerRests({ onEdit, onLayout }) {
  const { t } = useLang();
  const [rests, setRests] = useState(ls.get("es3_restaurants",[]));
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({name:"",cuisine:"",address:"",password:"",imgIdx:0});
  const [err, setErr] = useState("");

  const reload = () => setRests(ls.get("es3_restaurants",[]));
  const toggle = id => {
    const u = rests.map(r=>r.id===id?{...r,active:!r.active}:r);
    ls.set("es3_restaurants",u); setRests(u);
  };
  const add = () => {
    if (!form.name||!form.password) return setErr(t.namePassReq);
    const nr = {id:uid(),...form,active:true};
    // init hours
    const hrs=ls.get("es3_hours",{}); hrs[nr.id]={};
    DAYS_KEY.forEach(d=>{ hrs[nr.id][d]={open:true,from:"12:00",to:"22:00"}; });
    ls.set("es3_hours",hrs);
    const vac=ls.get("es3_vacations",{}); vac[nr.id]=[]; ls.set("es3_vacations",vac);
    const ru=ls.get("es3_rules",{}); ru[nr.id]={maxGuests:30,slotMinutes:90}; ls.set("es3_rules",ru);
    const u=[...rests,nr]; ls.set("es3_restaurants",u); setRests(u);
    setForm({name:"",cuisine:"",address:"",password:"",imgIdx:0}); setShowAdd(false); setErr("");
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13}}>
        <div className="sec-t" style={{margin:0}}>{t.allRest}</div>
        <button className="btn btn-p btn-sm" onClick={()=>setShowAdd(!showAdd)}>
          {showAdd?t.cancel:t.addRest}
        </button>
      </div>
      {showAdd && (
        <div className="card">
          <div className="card-t">{t.newRest}</div>
          {err && <div className="alert ae">{err}</div>}
          <div className="g2">
            <div className="field"><label className="lbl">{t.name}</label>
              <input className="inp" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
            <div className="field"><label className="lbl">{t.cuisine}</label>
              <input className="inp" value={form.cuisine} onChange={e=>setForm({...form,cuisine:e.target.value})} /></div>
          </div>
          <div className="field"><label className="lbl">{t.address}</label>
            <input className="inp" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></div>
          <div className="field"><label className="lbl">{t.password}</label>
            <input className="inp" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></div>
          <div className="field"><label className="lbl">{t.image}</label>
            <select className="sel" value={form.imgIdx} onChange={e=>setForm({...form,imgIdx:Number(e.target.value)})}>
              {REST_IMGS.map((_,i)=><option key={i} value={i}>{t.image} {i+1}</option>)}
            </select></div>
          <button className="btn btn-p" onClick={add}>{t.createRest}</button>
        </div>
      )}
      <div className="sc-x">
        <table className="dt">
          <thead><tr><th>{t.name}</th><th>{t.cuisine}</th><th>{t.address}</th><th>{t.status}</th><th>{t.actions}</th></tr></thead>
          <tbody>
            {rests.map(r=>(
              <tr key={r.id}>
                <td>{r.name}</td><td>{r.cuisine}</td><td>{r.address}</td>
                <td><span className={`badge ${r.active?"bg":"br"}`}>{r.active?t.active:t.inactive}</span></td>
                <td>
                  <div className="act-btns">
                    <button className="btn btn-sm" onClick={()=>onEdit(r)}>{t.edit}</button>
                    <button className="btn btn-sm" onClick={()=>onLayout(r.id)}>{t.layout}</button>
                    <button className={`btn btn-sm ${r.active?"btn-d":"btn-ok"}`} onClick={()=>toggle(r.id)}>
                      {r.active?t.deactivate:t.activate}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditRestModal({ rest, onClose }) {
  const { t } = useLang();
  const [form, setForm] = useState({...rest});
  const [msg, setMsg] = useState("");
  const save_ = () => {
    const u=ls.get("es3_restaurants",[]).map(r=>r.id===rest.id?form:r);
    ls.set("es3_restaurants",u); setMsg(t.saved); setTimeout(onClose,800);
  };
  return (
    <div className="modal-ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-t">{t.edit}: {rest.name}</div>
        {msg && <div className="alert as">{msg}</div>}
        {["name","cuisine","address","password"].map(f=>(
          <div className="field" key={f}>
            <label className="lbl">{f}</label>
            <input className="inp" value={form[f]||""} onChange={e=>setForm({...form,[f]:e.target.value})} />
          </div>
        ))}
        <button className="btn btn-p" style={{width:"100%"}} onClick={save_}>{t.saved}</button>
      </div>
    </div>
  );
}

function OwnerRes() {
  const { t } = useLang();
  const rests = ls.get("es3_restaurants",[]);
  const [filter, setFilter] = useState("all");
  const res = ls.get("es3_reservations",[]);
  const shown = filter==="all"?res:res.filter(r=>r.rid===filter);
  return (
    <div>
      <div className="field" style={{maxWidth:220}}>
        <label className="lbl">{t.filterByRest}</label>
        <select className="sel" value={filter} onChange={e=>setFilter(e.target.value)}>
          <option value="all">{t.allRests}</option>
          {rests.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>
      {shown.length===0
        ? <div className="empty"><div className="empty-t">{t.noReservations}</div></div>
        : <div className="sc-x">
            <table className="dt">
              <thead><tr><th>{t.code}</th><th>{t.restaurant}</th><th>{t.name}</th><th>{t.date}</th><th>{t.time}</th><th>{t.guests}</th><th>{t.status}</th></tr></thead>
              <tbody>
                {shown.slice().reverse().map(r=>(
                  <tr key={r.id}>
                    <td style={{fontFamily:"var(--fd)",letterSpacing:".1em",color:"var(--ac)"}}>{r.code}</td>
                    <td>{rests.find(x=>x.id===r.rid)?.name}</td>
                    <td>{r.name}</td><td>{r.date}</td><td>{r.time}</td><td>{r.guests}</td>
                    <td><span className={`badge ${r.status==="confirmed"?"bg":"bgr"}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div>
  );
}

function OwnerRatings() {
  const { t } = useLang();
  const rests = ls.get("es3_restaurants",[]);
  const rated = ls.get("es3_reservations",[]).filter(r=>r.rating);
  return (
    <div>
      {rated.length===0
        ? <div className="empty"><div className="empty-t">{t.noRatings}</div></div>
        : <div className="sc-x">
            <table className="dt">
              <thead><tr><th>{t.restaurant}</th><th>{t.name}</th><th>{t.ratings}</th><th>{t.feedback}</th></tr></thead>
              <tbody>
                {rated.slice().reverse().map(r=>(
                  <tr key={r.id}>
                    <td>{rests.find(x=>x.id===r.rid)?.name}</td>
                    <td>{r.name}</td>
                    <td style={{color:"var(--ac)",letterSpacing:".05em"}}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</td>
                    <td style={{color:"var(--tx2)"}}>{r.feedback||"—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div>
  );
}

// ─── LAYOUT EDITOR ────────────────────────────────────────────────────────────
function LayoutEditor({ rid, onBack }) {
  const { t } = useLang();
  const rest = ls.get("es3_restaurants",[]).find(r=>r.id===rid);

  // Use refs for all mutable drag state to AVOID stale closures entirely
  const tablesRef = useRef(ls.get("es3_tables",[]).filter(tb=>tb.rid===rid));
  const wallsRef  = useRef(ls.get("es3_walls",[]).filter(w=>w.rid===rid));
  const dragRef   = useRef(null); // { id, type, ox, oy, mode:'move'|'resize' }

  const [, forceRender] = useState(0);
  const rerender = () => forceRender(n=>n+1);

  const [sel, setSel]           = useState(null);
  const [showAddTbl, setShowAddTbl] = useState(false);
  const [newCap, setNewCap]     = useState(4);
  const cvRef = useRef(null);
  const CW=720, CH=520;

  const saveTables = () => {
    const a=ls.get("es3_tables",[]).filter(x=>x.rid!==rid);
    ls.set("es3_tables",[...a,...tablesRef.current]);
  };
  const saveWalls = () => {
    const a=ls.get("es3_walls",[]).filter(x=>x.rid!==rid);
    ls.set("es3_walls",[...a,...wallsRef.current]);
  };

  // Unified pointer-down for both move and resize
  const onPointerDown = (e, id, type, mode='move') => {
    e.preventDefault(); e.stopPropagation();
    setSel({id,type});
    const rect = cvRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    if (type==="table") {
      const item = tablesRef.current.find(tb=>tb.id===id);
      dragRef.current = { id, type, mode, ox: cx-item.x, oy: cy-item.y, startW:item.w, startH:item.h, startX:cx, startY:cy };
    } else {
      const item = wallsRef.current.find(w=>w.id===id);
      if (mode==='move') {
        dragRef.current = { id, type, mode, ox: cx-item.x, oy: cy-item.y };
      } else {
        // resize: anchor at top-left, drag from bottom-right corner
        dragRef.current = { id, type, mode, baseX:item.x, baseY:item.y, baseW:item.w, baseH:item.h, startX:cx, startY:cy };
      }
    }
  };

  useEffect(()=>{
    const onMove = e => {
      const d = dragRef.current; if (!d) return;
      const rect = cvRef.current?.getBoundingClientRect(); if (!rect) return;
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      if (d.type==="table") {
        const x = Math.max(0, Math.min(CW-d.startW, cx-d.ox));
        const y = Math.max(0, Math.min(CH-d.startH, cy-d.oy));
        tablesRef.current = tablesRef.current.map(tb=>tb.id===d.id?{...tb,x,y}:tb);
      } else if (d.mode==='move') {
        const x = Math.max(0, Math.min(CW-10, cx-d.ox));
        const y = Math.max(0, Math.min(CH-10, cy-d.oy));
        wallsRef.current = wallsRef.current.map(w=>w.id===d.id?{...w,x,y}:w);
      } else {
        // resize wall
        const dw = cx - d.startX;
        const dh = cy - d.startY;
        const nw = Math.max(10, d.baseW+dw);
        const nh = Math.max(6, d.baseH+dh);
        wallsRef.current = wallsRef.current.map(w=>w.id===d.id?{...w,w:nw,h:nh}:w);
      }
      rerender();
    };

    const onUp = () => {
      if (!dragRef.current) return;
      saveTables(); saveWalls();
      dragRef.current = null;
      rerender();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return()=>{ window.removeEventListener("pointermove",onMove); window.removeEventListener("pointerup",onUp); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rid]);

  const addTable = () => {
    const cap=Number(newCap);
    const w=cap>=6?58:cap>=4?50:42, h=cap>=6?50:42;
    const tb={id:uid(),rid,capacity:cap,x:80,y:80,w,h};
    tablesRef.current=[...tablesRef.current,tb];
    saveTables(); setShowAddTbl(false); rerender();
  };
  const addWall = () => {
    const w={id:uid(),rid,x:20,y:100,w:120,h:12};
    wallsRef.current=[...wallsRef.current,w];
    saveWalls(); rerender();
  };
  const delSel = () => {
    if (!sel) return;
    if (sel.type==="table"){
      tablesRef.current=tablesRef.current.filter(tb=>tb.id!==sel.id);
      saveTables();
    } else {
      wallsRef.current=wallsRef.current.filter(w=>w.id!==sel.id);
      saveWalls();
    }
    setSel(null); rerender();
  };

  const tables = tablesRef.current;
  const walls  = wallsRef.current;
  const isDragging = !!dragRef.current;
  const todayRes = ls.get("es3_reservations",[]).filter(r=>r.rid===rid&&r.date===today()&&r.status!=="cancelled");
  const locks = getLocks();

  return (
    <div>
      <button className="back" onClick={onBack}>{t.back}</button>
      <div className="pg-t">{t.layout}: {rest?.name}</div>
      <div className="pg-s">{t.ownerLayoutEdit} · {t.resizeWall}</div>

      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
        <button className="btn btn-p btn-sm" onClick={()=>setShowAddTbl(!showAddTbl)}>{t.addTable}</button>
        <button className="btn btn-sm" onClick={addWall}>{t.addWall}</button>
        {sel && <button className="btn btn-sm btn-d" onClick={delSel}>{t.deleteSelected}</button>}
      </div>

      {showAddTbl && (
        <div className="card" style={{marginBottom:10}}>
          <div className="field">
            <label className="lbl">{t.tableCapacity}</label>
            <select className="sel" value={newCap} onChange={e=>setNewCap(e.target.value)}>
              {[2,3,4,5,6,8,10].map(n=><option key={n} value={n}>{n} {t.seats}</option>)}
            </select>
          </div>
          <button className="btn btn-p btn-sm" onClick={addTable}>{t.addTableBtn}</button>
        </div>
      )}

      <div className="cv-wrap" ref={cvRef}
        style={{width:"100%",maxWidth:CW,height:CH,overflow:"hidden",touchAction:"none",userSelect:"none"}}>
        <div className="cv-inner" style={{width:CW,height:CH,position:"relative"}}>
          {walls.map(w=>{
            const isSelW = sel?.id===w.id;
            const isDrag = dragRef.current?.id===w.id;
            return (
              <div key={w.id} style={{position:"absolute",left:w.x,top:w.y,width:w.w,height:w.h}}>
                {/* Move handle (full body) */}
                <div className={`cv-wall drag-able${isDrag?" dragging":""}`}
                  style={{position:"absolute",inset:0,outline:isSelW?"1px solid var(--tx)":"none"}}
                  onPointerDown={e=>onPointerDown(e,w.id,"wall","move")} />
                {/* Resize handle (bottom-right corner) */}
                <div style={{
                  position:"absolute",bottom:-4,right:-4,width:12,height:12,
                  background:"var(--bd3)",cursor:"se-resize",zIndex:5,
                  border:"1px solid var(--tx2)",borderRadius:1,
                  display:isSelW?"block":"none"
                }}
                  onPointerDown={e=>onPointerDown(e,w.id,"wall","resize")} />
              </div>
            );
          })}
          {tables.map(tb=>{
            const isRes=todayRes.some(r=>r.tableId===tb.id);
            const isLk=!!locks[tb.id];
            const st=isRes?"rs":isLk?"lk":"av";
            const isDrag=dragRef.current?.id===tb.id;
            return (
              <div key={tb.id} className={`cv-tbl ${st} drag-able${isDrag?" dragging":""}`}
                style={{left:tb.x,top:tb.y,width:tb.w,height:tb.h,
                  outline:sel?.id===tb.id?"1px solid var(--ac)":"none"}}
                onPointerDown={e=>onPointerDown(e,tb.id,"table","move")}>
                <Chairs cap={tb.capacity} />
                <div className="tbl-body">
                  <span className="tbl-label">{tb.capacity}p</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="legend" style={{marginTop:8}}>
        <span><span className="ld" style={{borderColor:"#333",color:"#333"}}/>{t.available}</span>
        <span><span className="ld" style={{borderColor:"var(--er)",color:"var(--er)"}}/>{t.reserved}</span>
        <span><span className="ld" style={{borderColor:"var(--wn)",color:"var(--wn)"}}/>{t.locked}</span>
        {sel && <span style={{color:"var(--tx2)"}}>▸ {sel.type} {sel.id.slice(0,6)}</span>}
      </div>
    </div>
  );
}

// ─── RESTAURANT DASHBOARD ─────────────────────────────────────────────────────
function RestDash({ rid }) {
  const { t } = useLang();
  const [tab, setTab] = useState("reservations");
  const rest = ls.get("es3_restaurants",[]).find(r=>r.id===rid);

  return (
    <div>
      <div className="pg-t">{rest?.name}</div>
      <div className="pg-s">{t.restDash}</div>
      <div className="dash-layout">
        <div className="tabs dash-tabs">
          {[["reservations",t.reservations],["hours",t.openingHours],["rules",t.rules],["vacation",t.vacation],["layout",t.layout]].map(([k,l])=>(
            <div key={k} className={`tab ${tab===k?"act":""}`} onClick={()=>setTab(k)}>{l}</div>
          ))}
        </div>
        <div className="dash-content">
          {tab==="reservations" && <RestRes rid={rid} />}
          {tab==="hours"        && <RestHours rid={rid} />}
          {tab==="rules"        && <RestRules rid={rid} />}
          {tab==="vacation"     && <RestVacation rid={rid} />}
          {tab==="layout"       && <RestLayoutView rid={rid} />}
        </div>
      </div>
    </div>
  );
}

function RestRes({ rid }) {
  const { t } = useLang();
  const [filter, setFilter] = useState("upcoming");
  const [res, setRes] = useState(ls.get("es3_reservations",[]).filter(r=>r.rid===rid));
  const [showCreate, setShowCreate] = useState(false);

  const reload = () => setRes(ls.get("es3_reservations",[]).filter(r=>r.rid===rid));
  const cancel = id => {
    const a=ls.get("es3_reservations",[]).map(r=>r.id===id?{...r,status:"cancelled"}:r);
    ls.set("es3_reservations",a); reload();
  };
  const shown = res.filter(r=>{
    if (filter==="upcoming") return r.date>=today()&&r.status==="confirmed";
    if (filter==="past")     return r.date<today();
    if (filter==="cancelled") return r.status==="cancelled";
    return true;
  }).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {[["upcoming",t.upcoming],["past",t.past],["cancelled",t.cancelled],["all",t.all]].map(([k,l])=>(
            <div key={k} className={`f-tab ${filter===k?"act":""}`} onClick={()=>setFilter(k)}>{l}</div>
          ))}
        </div>
        <button className="btn btn-a btn-sm" onClick={()=>setShowCreate(true)}>+ {t.createReservation}</button>
      </div>
      {shown.length===0
        ? <div className="empty"><div className="empty-t">{t.noReservations}</div></div>
        : <div className="sc-x">
            <table className="dt">
              <thead><tr><th>{t.code}</th><th>{t.name}</th><th>{t.date}</th><th>{t.time}</th><th>{t.guests}</th><th>{t.status}</th><th></th></tr></thead>
              <tbody>
                {shown.map(r=>(
                  <tr key={r.id}>
                    <td style={{fontFamily:"var(--fd)",letterSpacing:".1em",color:"var(--ac)"}}>{r.code}</td>
                    <td>{r.name}</td><td>{r.date}</td><td>{r.time}</td><td>{r.guests}</td>
                    <td><span className={`badge ${r.status==="confirmed"?"bg":"bgr"}`}>{r.status}</span></td>
                    <td>{r.status==="confirmed"&&<button className="btn btn-sm btn-d" onClick={()=>cancel(r.id)}>{t.cancelRes}</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
      {showCreate && (
        <CreateReservationModal rid={rid} onClose={()=>setShowCreate(false)} onCreated={()=>{ reload(); setShowCreate(false); }} />
      )}
    </div>
  );
}

// ─── EMAIL UTILITY ────────────────────────────────────────────────────────────
// Since we're a frontend-only app, we simulate email by storing "outbox" in localStorage
// and showing a simulated email preview in a notification. In a real app this would call
// a backend API / email service.
function validateEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function scheduleEmails(reservation, restName) {
  if (!reservation.email) return;
  // Store in simulated outbox
  const outbox = ls.get("es3_email_outbox", []);
  const resDate = new Date(`${reservation.date}T${reservation.time}:00`);
  const reminderTime = new Date(resDate.getTime() - 30 * 60 * 1000);

  outbox.push({
    id: uid(),
    to: reservation.email,
    type: "confirmation",
    subject: `Reservation Confirmed – ${restName} – ${reservation.code}`,
    body: `Your reservation at ${restName} is confirmed.\n\nDate: ${reservation.date}\nTime: ${reservation.time}\nGuests: ${reservation.guests}\nTable capacity: ${reservation.tableCapacity || "assigned"}\nCode: ${reservation.code}`,
    scheduledAt: new Date().toISOString(),
    sent: true,
  });
  outbox.push({
    id: uid(),
    to: reservation.email,
    type: "reminder",
    subject: `Reminder: Your reservation at ${restName} in 30 minutes`,
    body: `This is a reminder that your reservation at ${restName} starts at ${reservation.time}.\n\nCode: ${reservation.code}`,
    scheduledAt: reminderTime.toISOString(),
    sent: false,
  });
  ls.set("es3_email_outbox", outbox);
}

// Email notification bubble shown on confirmation page
function EmailNotice({ email }) {
  const { t } = useLang();
  if (!email) return null;
  return (
    <div style={{
      background:"rgba(82,196,122,.07)", border:"1px solid rgba(82,196,122,.3)",
      padding:"10px 13px", marginTop:10, borderRadius:2, fontSize:11.5
    }}>
      <div style={{color:"var(--ok)",marginBottom:3}}>✉ {t.emailConfirmSent}</div>
      <div style={{color:"var(--tx3)"}}>{t.emailReminderNote}</div>
    </div>
  );
}

// ─── CREATE RESERVATION MODAL (Restaurant staff) ──────────────────────────────
function CreateReservationModal({ rid, onClose, onCreated }) {
  const { t } = useLang();
  const [date, setDate]     = useState(today());
  const [time, setTime]     = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [phone, setPhone]   = useState("");
  const [notes, setNotes]   = useState("");
  const [tableId, setTableId] = useState("auto");
  const [err, setErr]       = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const hours     = ls.get("es3_hours",{})[rid] || {};
  const vacations = ls.get("es3_vacations",{})[rid] || [];
  const rules     = ls.get("es3_rules",{})[rid] || { maxGuests:30 };
  const allTables = ls.get("es3_tables",[]).filter(tb=>tb.rid===rid);

  // Available tables for display in dropdown
  const res = ls.get("es3_reservations",[]);
  const bookedIds = res
    .filter(r=>r.rid===rid&&r.date===date&&r.time===time&&r.status!=="cancelled")
    .map(r=>r.tableId);
  const availableTables = allTables.filter(tb=>tb.capacity>=guests&&!bookedIds.includes(tb.id));

  const dh = hours[dayKey(date)];
  const timeOpts = [];
  if (dh && dh.open) {
    let [h,m] = dh.from.split(":").map(Number);
    const [eh] = dh.to.split(":").map(Number);
    const [,em] = dh.to.split(":").map(Number);
    while (h<eh||(h===eh&&m<=em)) {
      timeOpts.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
      m+=30; if(m>=60){m-=60;h++;}
    }
  }

  const submit = () => {
    setErr(""); setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      // Validate
      if (!name.trim()) return setErr(t.enterName);
      if (email && !validateEmail(email)) return setErr(t.emailInvalid);
      if (vacations.some(v=>date>=v.from&&date<=v.to)) return setErr(t.vacationMsg);
      if (!dh||!dh.open) return setErr(`${t.closedDay} ${dayKey(date)}`);
      if (time<dh.from||time>dh.to) return setErr(`${t.openHours} ${dh.from}–${dh.to}`);

      const dayRes = res.filter(r=>r.rid===rid&&r.date===date&&r.status!=="cancelled");
      if (dayRes.reduce((s,r)=>s+r.guests,0)+guests>rules.maxGuests) return setErr(t.maxCapReached);

      // Table assignment
      let assignedTable = null;
      if (tableId !== "auto") {
        const tbl = allTables.find(tb=>tb.id===tableId);
        if (!tbl) return setErr(t.noTableAvail);
        if (bookedIds.includes(tbl.id)) return setErr(t.noTableAvail);
        assignedTable = tbl;
      } else {
        // Strict: exact first, then smallest larger
        let av = allTables.filter(tb=>tb.capacity===guests&&!bookedIds.includes(tb.id));
        if (!av.length) av = allTables.filter(tb=>tb.capacity>guests&&!bookedIds.includes(tb.id)).sort((a,b)=>a.capacity-b.capacity);
        if (!av.length) return setErr(t.noTableAvail);
        assignedTable = av[0];
      }

      const newRes = {
        id:uid(), rid, tableId:assignedTable.id,
        date, time, guests, name, email, phone, notes,
        status:"confirmed", code:code(),
        createdAt:new Date().toISOString(),
        createdBy:"restaurant",
        rating:null, feedback:"",
        tableCapacity:assignedTable.capacity,
      };
      ls.set("es3_reservations",[...res, newRes]);

      // Email
      if (email) {
        const rest = ls.get("es3_restaurants",[]).find(r=>r.id===rid);
        scheduleEmails(newRes, rest?.name||"");
      }

      setSuccess(t.reservationCreated);
      setTimeout(onCreated, 1000);
    }, 400);
  };

  return (
    <div className="modal-ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{maxWidth:520}}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-t">{t.manualReservation}</div>

        {err     && <div className="alert ae">{err}</div>}
        {success && <div className="alert as">✓ {success}</div>}

        <div className="g2">
          <div className="field">
            <label className="lbl">{t.date}</label>
            <input className="inp" type="date" value={date} min={today()} onChange={e=>setDate(e.target.value)} />
          </div>
          <div className="field">
            <label className="lbl">{t.time}</label>
            <select className="sel" value={time} onChange={e=>setTime(e.target.value)}>
              {timeOpts.length===0
                ? <option value="">{t.closedDay}</option>
                : timeOpts.map(o=><option key={o} value={o}>{o}</option>)
              }
            </select>
          </div>
        </div>

        <div className="field">
          <label className="lbl">{t.guests}</label>
          <select className="sel" value={guests} onChange={e=>setGuests(Number(e.target.value))}>
            {[1,2,3,4,5,6,7,8,10,12].map(n=><option key={n} value={n}>{t.guestCount(n)}</option>)}
          </select>
        </div>

        <div className="field">
          <label className="lbl">{t.selectTable}</label>
          <select className="sel" value={tableId} onChange={e=>setTableId(e.target.value)}>
            <option value="auto">{t.autoAssign}</option>
            {availableTables.map(tb=>(
              <option key={tb.id} value={tb.id}>{t.tableNum} #{tb.id.slice(-4)} ({tb.capacity} {t.seats})</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="lbl">{t.name}</label>
          <input className="inp" value={name} onChange={e=>setName(e.target.value)} />
        </div>

        <div className="g2">
          <div className="field">
            <label className="lbl">{t.phone}</label>
            <input className="inp" value={phone} onChange={e=>setPhone(e.target.value)} />
          </div>
          <div className="field">
            <label className="lbl">{t.email}</label>
            <input className="inp" type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder={t.emailHint} />
          </div>
        </div>

        {email && validateEmail(email) && (
          <div style={{fontSize:10.5,color:"var(--ok)",marginBottom:10,opacity:.8}}>
            ✉ {t.emailHint}
          </div>
        )}

        <div className="field">
          <label className="lbl">{t.notes}</label>
          <textarea className="txta" rows={2} value={notes} onChange={e=>setNotes(e.target.value)} />
        </div>

        <button className="btn btn-p" style={{width:"100%"}} onClick={submit} disabled={loading||!!success}>
          {loading ? <span className="spin"/> : `+ ${t.createReservation}`}
        </button>
      </div>
    </div>
  );
}

function RestHours({ rid }) {
  const { t, lang } = useLang();
  const [hours, setHours] = useState(ls.get("es3_hours",{})[rid]||{});
  const [msg, setMsg] = useState("");
  const labels = DAYS_LABELS[lang]||DAYS_LABELS.en;
  const set = (d,f,v) => setHours(p=>({...p,[d]:{...p[d],[f]:v}}));
  const save_ = () => {
    const a=ls.get("es3_hours",{}); a[rid]=hours; ls.set("es3_hours",a);
    setMsg(t.saved); setTimeout(()=>setMsg(""),2000);
  };
  return (
    <div>
      <div className="sec-t">{t.openingHours}</div>
      {msg && <div className="alert as">{msg}</div>}
      {DAYS_KEY.map((d,i)=>(
        <div className="tog-row" key={d}>
          <span style={{minWidth:88,fontSize:12}}>{labels[i]}</span>
          <label className="tog">
            <input type="checkbox" checked={hours[d]?.open||false} onChange={e=>set(d,"open",e.target.checked)} />
            <span className="tog-s"/>
          </label>
          {hours[d]?.open && (
            <div className="tog-time">
              <input className="inp" type="time" value={hours[d]?.from||"12:00"} style={{width:90}} onChange={e=>set(d,"from",e.target.value)} />
              <span style={{color:"var(--tx3)"}}>–</span>
              <input className="inp" type="time" value={hours[d]?.to||"22:00"} style={{width:90}} onChange={e=>set(d,"to",e.target.value)} />
            </div>
          )}
        </div>
      ))}
      <button className="btn btn-p" style={{marginTop:13}} onClick={save_}>{t.saveHours}</button>
    </div>
  );
}

function RestRules({ rid }) {
  const { t } = useLang();
  const [rules, setRules] = useState(ls.get("es3_rules",{})[rid]||{maxGuests:30,slotMinutes:90});
  const [msg, setMsg] = useState("");
  const save_ = () => {
    const a=ls.get("es3_rules",{}); a[rid]=rules; ls.set("es3_rules",a);
    setMsg(t.saved); setTimeout(()=>setMsg(""),2000);
  };
  return (
    <div>
      <div className="sec-t">{t.reservRules}</div>
      {msg && <div className="alert as">{msg}</div>}
      <div className="g2">
        <div className="field"><label className="lbl">{t.maxGuestsDay}</label>
          <input className="inp" type="number" min={1} value={rules.maxGuests}
            onChange={e=>setRules({...rules,maxGuests:Number(e.target.value)})} /></div>
        <div className="field"><label className="lbl">{t.slotDuration}</label>
          <select className="sel" value={rules.slotMinutes} onChange={e=>setRules({...rules,slotMinutes:Number(e.target.value)})}>
            {[60,90,120,150].map(n=><option key={n} value={n}>{t.minutes(n)}</option>)}
          </select></div>
      </div>
      <button className="btn btn-p" onClick={save_}>{t.saveRules}</button>
    </div>
  );
}

function RestVacation({ rid }) {
  const { t } = useLang();
  const [vac, setVac] = useState(ls.get("es3_vacations",{})[rid]||[]);
  const [from, setFrom] = useState(""); const [to_, setTo] = useState("");
  const [msg, setMsg] = useState("");
  const sv = v => {
    setVac(v);
    const a=ls.get("es3_vacations",{}); a[rid]=v; ls.set("es3_vacations",a);
  };
  const add = () => {
    if (!from||!to_) return;
    if (from>to_) return setMsg(t.fromDate);
    sv([...vac,{id:uid(),from,to:to_}]); setFrom(""); setTo(""); setMsg(t.periodAdded);
  };
  return (
    <div>
      <div className="sec-t">{t.vacPeriods}</div>
      {msg && <div className="alert aw">{msg}</div>}
      <div className="card">
        <div className="g2">
          <div className="field"><label className="lbl">{t.from}</label>
            <input className="inp" type="date" value={from} min={today()} onChange={e=>setFrom(e.target.value)} /></div>
          <div className="field"><label className="lbl">{t.to}</label>
            <input className="inp" type="date" value={to_} min={from||today()} onChange={e=>setTo(e.target.value)} /></div>
        </div>
        <button className="btn btn-p btn-sm" onClick={add}>{t.addPeriod}</button>
      </div>
      {vac.length===0
        ? <div className="empty" style={{padding:20}}><div className="empty-t">{t.noVacation}</div></div>
        : <table className="dt">
            <thead><tr><th>{t.from}</th><th>{t.to}</th><th></th></tr></thead>
            <tbody>
              {vac.map(v=>(
                <tr key={v.id}>
                  <td>{v.from}</td><td>{v.to}</td>
                  <td><button className="btn btn-sm btn-d" onClick={()=>sv(vac.filter(x=>x.id!==v.id))}>{t.remove}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </div>
  );
}

function RestLayoutView({ rid }) {
  const { t } = useLang();
  const tables = ls.get("es3_tables",[]).filter(tb=>tb.rid===rid);
  const walls  = ls.get("es3_walls",[]).filter(w=>w.rid===rid);
  const res    = ls.get("es3_reservations",[]);
  const locks  = getLocks();
  const bookedIds = res.filter(r=>r.rid===rid&&r.date===today()&&r.status!=="cancelled").map(r=>r.tableId);
  const lockedIds = Object.keys(locks);
  return (
    <div>
      <div className="sec-t">{t.todayMap}</div>
      <p style={{fontSize:10.5,color:"var(--tx3)",marginBottom:10}}>{t.readOnly}</p>
      <CanvasView tables={tables} walls={walls} bookedIds={bookedIds} lockedIds={lockedIds} W={600} H={360} />
      <div className="legend" style={{marginTop:8}}>
        <span><span className="ld" style={{borderColor:"#333",color:"#333"}}/>{t.available}</span>
        <span><span className="ld" style={{borderColor:"var(--er)",color:"var(--er)"}}/>{t.reserved}</span>
        <span><span className="ld" style={{borderColor:"var(--wn)",color:"var(--wn)"}}/>{t.locked}</span>
      </div>
    </div>
  );
}
