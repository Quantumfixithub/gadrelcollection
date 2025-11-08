let cart = [];

function loadProducts() {
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('product-list');
      data.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>₦${product.price}</p>
          <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        container.appendChild(div);
      });
    });
}

function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById("cart-count").textContent = cart.length;
  alert(`${name} added to cart!`);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('product-list')) {
    loadProducts();
  }
});

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₦${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = total;

  // Save total to localStorage for checkout
  localStorage.setItem("cartTotal", total);
}
