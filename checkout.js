function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    updateCartCount();
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₦${item.price}</p>
      <label>Quantity:
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" />
      </label>
      <button onclick="removeItem(${index})">Remove</button>
      <hr/>
    `;
    cartItems.appendChild(div);
  });

  updateCartCount();
}

function updateQuantity(index, newQty) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(newQty);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", loadCart);
