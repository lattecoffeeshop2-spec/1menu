const defaultMenu = {
  Hot: [
    { name: "Espresso", price: "2.5", img: "https://via.placeholder.com/150" },
    { name: "Cappuccino", price: "3.0", img: "https://via.placeholder.com/150" }
  ],
  Cold: [
    { name: "Iced Coffee", price: "3.5", img: "https://via.placeholder.com/150" }
  ],
  Milkshake: [
    { name: "Oreo Milkshake", price: "4.0", img: "https://via.placeholder.com/150" }
  ],
  Boba: [
    { name: "Strawberry Milk Boba", price: "4.5", img: "https://via.placeholder.com/150" },
    { name: "Passion Mango Boba", price: "4.5", img: "https://via.placeholder.com/150" }
  ],
  Refresher: [
    { name: "Mango Refresher", price: "3.5", img: "https://via.placeholder.com/150" }
  ],
  Frappe: [
    { name: "Mocha Frappe", price: "4.0", img: "https://via.placeholder.com/150" }
  ],
  "Sugar Free": [
    { name: "Sugar Free Latte", price: "3.0", img: "https://via.placeholder.com/150" }
  ],
  Shisha: [
    { name: "Double Apple", price: "5.0", img: "https://via.placeholder.com/150" }
  ]
};

let menu = JSON.parse(localStorage.getItem("menu")) || defaultMenu;
let aboutText = localStorage.getItem("about") || document.getElementById("about-text").innerText;
let logoSrc = localStorage.getItem("logo") || "logo.png";

const menuContainer = document.getElementById("menu-container");
const menuEditor = document.getElementById("menu-editor");
const aboutEl = document.getElementById("about-text");
const logoEl = document.getElementById("shop-logo");

function renderMenu() {
  menuContainer.innerHTML = "";
  Object.keys(menu).forEach(category => {
    const catDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.innerText = category;
    catDiv.appendChild(h3);

    menu[category].forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "menu-item";
      itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      `;
      catDiv.appendChild(itemDiv);
    });
    menuContainer.appendChild(catDiv);
  });
  aboutEl.innerText = aboutText;
  logoEl.src = logoSrc;
}
renderMenu();

document.getElementById("open-settings").onclick = () => {
  document.getElementById("admin-panel").classList.remove("hidden");
};
document.getElementById("close-panel").onclick = () => {
  document.getElementById("admin-panel").classList.add("hidden");
};
document.getElementById("pin-submit").onclick = () => {
  const pin = document.getElementById("pin-input").value;
  if(pin === "latte112233") {
    document.getElementById("admin-controls").classList.remove("hidden");
    buildEditor();
  } else {
    alert("Wrong PIN!");
  }
};

function buildEditor() {
  menuEditor.innerHTML = "";
  document.getElementById("edit-about").value = aboutText;
  Object.keys(menu).forEach(category => {
    const catDiv = document.createElement("div");
    catDiv.innerHTML = `<h4>${category}</h4>`;
    menu[category].forEach((item, idx) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `
        <input value="${item.name}" data-cat="${category}" data-idx="${idx}" class="edit-name"/>
        <input value="${item.price}" data-cat="${category}" data-idx="${idx}" class="edit-price"/>
        <input type="file" data-cat="${category}" data-idx="${idx}" class="edit-img"/>
        <button data-cat="${category}" data-idx="${idx}" class="remove-item">Remove</button>
      `;
      catDiv.appendChild(itemDiv);
    });
    menuEditor.appendChild(catDiv);
  });
}

document.getElementById("save-changes").onclick = () => {
  document.querySelectorAll(".edit-name").forEach(input => {
    const cat = input.dataset.cat, idx = input.dataset.idx;
    menu[cat][idx].name = input.value;
  });
  document.querySelectorAll(".edit-price").forEach(input => {
    const cat = input.dataset.cat, idx = input.dataset.idx;
    menu[cat][idx].price = input.value;
  });
  document.querySelectorAll(".edit-img").forEach(input => {
    if(input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        const cat = input.dataset.cat, idx = input.dataset.idx;
        menu[cat][idx].img = e.target.result;
        localStorage.setItem("menu", JSON.stringify(menu));
        renderMenu();
      };
      reader.readAsDataURL(input.files[0]);
    }
  });
  aboutText = document.getElementById("edit-about").value;
  localStorage.setItem("about", aboutText);

  if(document.getElementById("logo-upload").files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      logoSrc = e.target.result;
      localStorage.setItem("logo", logoSrc);
      renderMenu();
    };
    reader.readAsDataURL(document.getElementById("logo-upload").files[0]);
  }

  localStorage.setItem("menu", JSON.stringify(menu));
  renderMenu();
  alert("Changes saved!");
};