let allProducts = [];

function loadProducts() {
  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
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
  alert(`${name} added to cart for ₦${price}`);
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = parseInt(cartCount.textContent) + 1;
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});
