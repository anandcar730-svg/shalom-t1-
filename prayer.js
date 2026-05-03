```javascript id="4v8n2k"
/* =========================
   CONFIG
========================= */
const API_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

/* =========================
   ELEMENTS
========================= */
const form = document.getElementById("prayerForm");
const status = document.getElementById("status");

/* =========================
   FORM SUBMIT
========================= */
if (form) {
  form.addEventListener("submit", function(e){
    e.preventDefault();

    // Get values
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const campus = document.getElementById("campus").value;
    const request = document.getElementById("request").value.trim();

    // Validation
    if (!name || !request) {
      showStatus("Please fill required fields ❗", "error");
      return;
    }

    // Optional phone validation
    if (phone && !/^[0-9]{10}$/.test(phone)) {
      showStatus("Enter valid 10-digit phone number", "error");
      return;
    }

    // Show loading
    showStatus("Submitting prayer...", "loading");

    // Send data
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        type: "prayer",
        name,
        phone,
        campus,
        request
      })
    })
    .then(res => res.text())
    .then(() => {
      showStatus("Prayer submitted successfully 🙏", "success");
      form.reset();
    })
    .catch(() => {
      showStatus("Submission failed. Try again.", "error");
    });
  });
}

/* =========================
   STATUS MESSAGE FUNCTION
========================= */
function showStatus(message, type){
  if (!status) return;

  status.innerText = message;

  // Reset classes
  status.style.color = "#fff";

  if (type === "success") status.style.color = "#00ffae";
  if (type === "error") status.style.color = "#ff4d4d";
  if (type === "loading") status.style.color = "#ffaa00";
}
```
