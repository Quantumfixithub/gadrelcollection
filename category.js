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
    .then(products => {
      const category = getCategoryFromPage();
      const filtered = products.filter(p => {
        if (category === "Accessories") {
          return p.category === "Accessories" || p.category === "Bags" || p.category === "Footwear";
        }
        return p.gender === category;
      });
      displayProducts(filtered);
    })
    .catch(err => {
      console.error("Failed to load products:", err);
      const container = document.getElementById("product-list");
      if (container) {
        container.innerHTML = "<p>Unable to load products.</p>";
      }
    });
}

function displayProducts(products) {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
     <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" onclick="openModal('${product.image}', '${escapeJs(product.name)}')" />
      <h3>${escapeHtml(product.name)}</h3>
      <p>₦${product.price}</p>
      ${product.sale ? '<span class="sale-tag">SALE</span>' : ""}
      <button onclick="addToCart('${escapeJs(product.name)}', ${product.price})">Add to Cart</button>
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
  if (!cartCount) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function escapeJs(text) {
  return text.replace(/'/g, "\\'");
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategoryProducts();
  updateCartCount();
});
