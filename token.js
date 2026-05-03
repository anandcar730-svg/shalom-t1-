```javascript id="6gk2ps"
/* =========================
   CONFIG
========================= */
const API_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

/* =========================
   ELEMENTS
========================= */
const form = document.getElementById("tokenForm");
const tokenBox = document.getElementById("tokenBox");
const tokenNumber = document.getElementById("tokenNumber");

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
    const cabin = document.getElementById("cabin").value;

    // Validation
    if (!name) {
      alert("Please enter visitor name");
      return;
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    // Show loading
    tokenBox.style.display = "block";
    tokenNumber.innerText = "⏳";

    // Send request
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        type: "token",
        name,
        phone,
        campus,
        cabin
      })
    })
    .then(res => res.text())
    .then(token => {

      // Show token
      tokenNumber.innerText = token;

      // Optional: sound alert (for reception)
      playBeep();

      // Reset form
      form.reset();

    })
    .catch(() => {
      tokenNumber.innerText = "Error";
      alert("Failed to generate token");
    });
  });
}

/* =========================
   SOUND ALERT (OPTIONAL)
========================= */
function playBeep(){
  const audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");
  audio.play();
}

/* =========================
   AUTO SCROLL TO TOKEN
========================= */
function scrollToToken(){
  tokenBox.scrollIntoView({ behavior: "smooth" });
}
```
