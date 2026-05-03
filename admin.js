```javascript id="p7k2sd"
/* =========================
   CONFIG
========================= */
const API_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

/* =========================
   ELEMENTS
========================= */
const prayerTable = document.querySelector("#prayerTable tbody");
const tokenTable = document.querySelector("#tokenTable tbody");
const filter = document.getElementById("campusFilter");
const status = document.getElementById("status");

let prayerData = [];
let tokenData = [];

/* =========================
   FETCH DATA
========================= */
async function loadData(){
  try{
    setStatus("Loading data...", "loading");

    const res = await fetch(API_URL);
    const data = await res.json();

    prayerData = data.prayers || [];
    tokenData = data.tokens || [];

    renderTables();

    setStatus("Data loaded successfully", "success");

  } catch (err){
    console.error(err);
    setStatus("Failed to load data", "error");
  }
}

/* =========================
   RENDER TABLES
========================= */
function renderTables(){
  const selectedCampus = filter.value;

  // Clear tables
  prayerTable.innerHTML = "";
  tokenTable.innerHTML = "";

  // PRAYER TABLE
  prayerData
    .filter(p => selectedCampus === "All" || p.campus === selectedCampus)
    .forEach(p => {
      const row = `
        <tr>
          <td>${formatDate(p.date)}</td>
          <td>${p.name}</td>
          <td>${p.phone || "-"}</td>
          <td>${p.campus}</td>
          <td>${p.request}</td>
        </tr>
      `;
      prayerTable.innerHTML += row;
    });

  // TOKEN TABLE
  tokenData
    .filter(t => selectedCampus === "All" || t.campus === selectedCampus)
    .forEach(t => {
      const row = `
        <tr>
          <td>${formatDate(t.date)}</td>
          <td>${t.name}</td>
          <td>${t.phone || "-"}</td>
          <td>${t.campus}</td>
          <td>${t.token}</td>
          <td>${t.cabin}</td>
        </tr>
      `;
      tokenTable.innerHTML += row;
    });
}

/* =========================
   FILTER EVENT
========================= */
if (filter){
  filter.addEventListener("change", renderTables);
}

/* =========================
   AUTO REFRESH
========================= */
setInterval(loadData, 10000); // every 10 sec

/* =========================
   FORMAT DATE
========================= */
function formatDate(dateStr){
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleString();
}

/* =========================
   STATUS HANDLER
========================= */
function setStatus(message, type){
  if (!status) return;

  status.innerText = message;
  status.style.color = "#fff";

  if (type === "success") status.style.color = "#00ffae";
  if (type === "error") status.style.color = "#ff4d4d";
  if (type === "loading") status.style.color = "#ffaa00";
}

/* =========================
   INITIAL LOAD
========================= */
loadData();
```
