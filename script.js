document.addEventListener("DOMContentLoaded", () => {
  const settingsBtn = document.getElementById("settings-btn");
  const adminPanel = document.getElementById("admin-panel");
  const pinModal = document.getElementById("pin-modal");
  const pinInput = document.getElementById("pin-input");
  const pinSubmit = document.getElementById("pin-submit");
  const aboutText = document.getElementById("about-text");
  const aboutInput = document.getElementById("about-input");
  const logoImg = document.getElementById("logo");
  const logoInput = document.getElementById("logo-input");
  const saveBtn = document.getElementById("save-btn");

  const ADMIN_PIN = "latte112233";

  // Show PIN modal on settings click
  settingsBtn.addEventListener("click", () => {
    pinModal.classList.remove("hidden");
  });

  // Verify PIN
  pinSubmit.addEventListener("click", () => {
    if (pinInput.value === ADMIN_PIN) {
      adminPanel.classList.remove("hidden");
      pinModal.classList.add("hidden");
      pinInput.value = "";
      aboutInput.value = aboutText.innerText;
    } else {
      alert("Wrong PIN!");
    }
  });

  // Change Logo
  logoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        logoImg.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Save changes
  saveBtn.addEventListener("click", () => {
    aboutText.innerText = aboutInput.value;
    localStorage.setItem("aboutText", aboutInput.value);
    localStorage.setItem("logoSrc", logoImg.src);
    alert("Changes saved!");
  });

  // Load saved data
  if (localStorage.getItem("aboutText")) {
    aboutText.innerText = localStorage.getItem("aboutText");
  }
  if (localStorage.getItem("logoSrc")) {
    logoImg.src = localStorage.getItem("logoSrc");
  }
});