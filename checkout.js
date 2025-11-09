function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  cartItems.innerHTML = "";
  cartSummary.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    updateCartCount();
    return;
  }
function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    localStorage.removeItem("cart");
    cart.length = 0; // Clear the in-memory cart array
    renderCart();
  }
}

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₦${item.price} x ${item.quantity} = ₦${item.price * item.quantity}</p>
      <label>Quantity:
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" />
      </label>
      <button onclick="removeItem(${index})">Remove</button>
      <hr/>
    `;
    cartItems.appendChild(div);
  });

  cartSummary.innerHTML = `<h3>Total: ₦${total}</h3>`;
  updateCartCount();
}

function updateQuantity(index, newQty) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const quantity = parseInt(newQty);

  if (isNaN(quantity) || quantity < 1) {
    alert("Quantity must be at least 1.");
    loadCart();
    return;
  }

  cart[index].quantity = quantity;
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
