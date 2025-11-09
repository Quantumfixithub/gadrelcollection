let cart = JSON.parse(localStorage.getItem("cart")) || [];

function getCategoryFromPage() {
  const path = window.location.pathname;
  if (path.includes("mens")) return "Men";
  if (path.includes("womens")) return "Women";
  if (path.includes("accessories")) return "Accessories";
  return null;
}

function loadCategoryProducts() {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const category = getCategoryFromPage();
      const filtered = data.filter(p => p.gender === category || p.category === category);
      displayProducts(filtered);
    });
}

function displayProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₦${product.price}</p>
      ${product.sale ? '<span class="sale-tag">SALE</span>' : ''}
      <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategoryProducts();
  updateCartCount();
});
