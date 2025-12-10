const loginForm = document.getElementById("loginForm");
const loginSection = document.getElementById("loginSection");
const appSection = document.getElementById("appSection");
const welcomeUser = document.getElementById("welcomeUser");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value.trim();

  if (u === "admin" && p === "1234") {
    loginSection.classList.add("hidden");
    appSection.classList.remove("hidden");
    welcomeUser.textContent = `Has iniciado sesión como: ${u}`;
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});

document.getElementById("logoutBtn").onclick = () => location.reload();

const navBtns = document.querySelectorAll(".nav-btn");
const modules = document.querySelectorAll(".module");

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modules.forEach(m => m.classList.add("hidden"));
    document.getElementById(btn.dataset.section).classList.remove("hidden");
  });
});

// REGISTROS
let owners = [];
let pets = [];

document.getElementById("ownerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const owner = {
    name: document.getElementById("ownerName").value,
    phone: document.getElementById("ownerPhone").value,
    email: document.getElementById("ownerEmail").value
  };

  owners.push(owner);
  updateOwnerList();
  updateOwnerSelect();
  e.target.reset();
});

function updateOwnerList() {
  const list = document.getElementById("ownersList");
  list.innerHTML = owners.map(o => `<li>${o.name} - ${o.phone}</li>`).join("");
}

function updateOwnerSelect() {
  const select = document.getElementById("petOwnerSelect");
  select.innerHTML = `<option value="">-- Seleccione dueño --</option>` +
    owners.map((o, i) => `<option value="${i}">${o.name}</option>`).join("");
}

document.getElementById("petForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const pet = {
    name: document.getElementById("petName").value,
    species: document.getElementById("petSpecies").value,
    breed: document.getElementById("petBreed").value,
    ownerIndex: document.getElementById("petOwnerSelect").value
  };

  pets.push(pet);
  updatePetList();
  updatePetSelect();
  e.target.reset();
});

function updatePetList() {
  const list = document.getElementById("petsList");
  list.innerHTML = pets.map(p => `<li>${p.name} (${p.species})</li>`).join("");
}

function updatePetSelect() {
  const select = document.getElementById("appPetSelect");
  select.innerHTML = `<option value="">-- Seleccione mascota --</option>` +
    pets.map((p, i) => `<option value="${i}">${p.name}</option>`).join("");
}

// SERVICIOS
const services = {
  "Baño": 30,
  "Corte de Pelo": 40,
  "Baño + Corte": 60,
  "Limpieza de Orejas": 20,
  "Corte de Uñas": 15
};

const serviceSelect = document.getElementById("appServiceSelect");
const servicePriceDisplay = document.getElementById("servicePriceDisplay");

serviceSelect.innerHTML = `<option value="">-- Seleccione servicio --</option>` +
  Object.keys(services).map(s => `<option value="${s}">${s}</option>`).join("");

serviceSelect.addEventListener("change", () => {
  servicePriceDisplay.textContent = services[serviceSelect.value] || "0.00";
});
const appointmentsTBody = document.getElementById("appointmentsTBody");

document.getElementById("appointmentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("appDate").value;
  const time = document.getElementById("appTime").value;
  const petIndex = document.getElementById("appPetSelect").value;
  const service = document.getElementById("appServiceSelect").value;
  const price = services[service];

  const petName = pets[petIndex].name;

  const row = `
    <tr>
      <td>${date}</td>
      <td>${time}</td>
      <td>${petName}</td>
      <td>${service}</td>
      <td>${price} Bs.</td>
    </tr>
  `;

  appointmentsTBody.innerHTML += row;
  e.target.reset();
  servicePriceDisplay.textContent = "0.00";
});
let cart = [];

const catalogProducts = [
  {name: "Shampoo Perros", price: 25, img:"https://sucanuy.vtexassets.com/arquivos/ids/186968/2Shampoo-Procao-Cachorros-500-ML.jpg?v=637934434642500000"},
  {name: "Shampoo Gatos", price: 22, img:"https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750303772910L.jpg"},
  {name: "Juguete Pelota", price: 15, img:"https://tse4.mm.bing.net/th/id/OIP.VKdYYDCnyr9gwimrWhACIAHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"},
  {name: "Snacks", price: 12, img:"https://agrosurcancun.com/wp-content/uploads/2021/04/carnaza.png"},
];

const catalogGrid = document.getElementById("catalogGrid");

catalogGrid.innerHTML = catalogProducts.map((p, i) => `
  <div class="catalog-item">
    <img src="${p.img}" alt="${p.name}">
    <h4>${p.name}</h4>
    <p>${p.price} Bs.</p>
    <button onclick="addToCart(${i})">Agregar</button>
  </div>
`).join("");

function addToCart(index) {
  cart.push(catalogProducts[index]);
  updateCart();
}

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  updateCart();
});

function updateCart() {
  const list = document.getElementById("cartItems");
  const subtotal = cart.reduce((a, p) => a + p.price, 0);

  list.innerHTML = cart.map((p, i) => `
    <li>${p.name} - ${p.price} Bs.
      <button onclick="removeFromCart(${i})">X</button>
    </li>
  `).join("");

  document.getElementById("cartSubtotal").textContent = subtotal.toFixed(2);
  document.getElementById("cartTotal").textContent = subtotal.toFixed(2);
}

function removeFromCart(i) {
  cart.splice(i, 1);
  updateCart();
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return alert("El carrito está vacío.");

  alert("Compra realizada con éxito.");
  cart = [];
  updateCart();
});
