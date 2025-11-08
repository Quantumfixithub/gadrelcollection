let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadProducts() {
  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      displayProducts(data);
    });
}

function displayProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
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
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();
});
