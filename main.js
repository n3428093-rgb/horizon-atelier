// ===== PRODUCT MANAGEMENT =====
let cart = [];
let detailQty = 1;
let currentProduct = null;

// Open product detail view
function openProduct(el) {
    const name = el.getAttribute('data-name');
    const price = parseInt(el.getAttribute('data-price'));
    const image = el.getAttribute('data-image');
    const desc = el.getAttribute('data-desc');
    const des = el.getAttribute('data-des');

    currentProduct = { name, price, image };
    detailQty = 1;

    document.getElementById("detail-container").innerHTML = `
    <img src="${image}" alt="${name}">
    <div class="detail-info">
      <h2>${name}</h2>
      <p>${desc}</p>
      <p>${des}</p>
      <p>₦${price.toLocaleString()}</p>
      <div class="quantity-controls">
        <button class="cartbtn" onclick="updateDetailQty(-1)">−</button>
        <span id="detail-qty">1</span>
        <button class="cartbtn" onclick="updateDetailQty(1)">+</button>
      </div>
      <button class="checkout-btn" onclick="addToCart()">Add to Cart & Checkout</button>
    </div>
  `;

    const gridElement = document.querySelector(".video-grid");
    const mainBodyElement = document.querySelector(".main-body");
    if (gridElement) gridElement.style.display = "none";
    if (mainBodyElement) mainBodyElement.style.display = "none";

    const detailElement = document.getElementById("product-detail");
    if (detailElement) detailElement.classList.add("active");
}

// Back to product list
function backToList() {
    const detailElement = document.getElementById("product-detail");
    if (detailElement) detailElement.classList.remove("active");

    const gridElement = document.querySelector(".video-grid");
    if (gridElement) gridElement.style.display = "grid";
}

// Update product quantity in detail view
function updateDetailQty(change) {
    detailQty = Math.max(1, detailQty + change);
    const qtyElement = document.getElementById("detail-qty");
    if (qtyElement) qtyElement.textContent = detailQty;
}

// Add product to cart
function addToCart() {
    if (!currentProduct) return;
    const existing = cart.find(i => i.name === currentProduct.name);
    if (existing) existing.quantity += detailQty;
    else cart.push({ ...currentProduct, quantity: detailQty });

    renderCart();
    openSlide();
}

// Render cart items and totals
function renderCart() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <div class="quantity-controls">
          <button class="cartbtn" onclick="updateCartQty('${item.name}', -1)">-</button>
          <span>${item.quantity}</span>
          <button class="cartbtn" onclick="updateCartQty('${item.name}', 1)">+</button>
          <button class="cartbtn-clear" onclick="removeFromCart('${item.name}')">🗑️</button>
        </div>
      </div>
      <p>₦${(item.price * item.quantity).toLocaleString()}</p>
    `;
        container.appendChild(div);
    });

    const totalElement = document.getElementById("cart-total");
    if (totalElement) totalElement.textContent = total.toLocaleString();

    const countElement = document.getElementById("cart-count");
    if (countElement) countElement.textContent = cart.reduce((s, i) => s + i.quantity, 0);
}

// Update quantity of item in cart
function updateCartQty(name, change) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) removeFromCart(name);
    else renderCart();
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    renderCart();
}

// ===== NAVIGATION & MENU =====

// Open slide-out navigation menu
function openNav() {
    const navElement = document.querySelector("#myNav");
    if (navElement) navElement.style.width = "40%";
}

// Close slide-out navigation menu
function closeNav() {
    const navElement = document.querySelector("#myNav");
    if (navElement) navElement.style.width = "0";
}

// Open checkout slide
function openSlide() {
    renderCart();
    const slideElement = document.getElementById("checkoutSlide");
    if (slideElement) slideElement.classList.add("active");
}

// Close checkout slide
function closeSlide() {
    const slideElement = document.getElementById("checkoutSlide");
    if (slideElement) slideElement.classList.remove("active");
}

// ===== CHECKOUT =====

// Submit checkout form
function submitCheckout(e) {
    e.preventDefault();
    const nameElement = document.getElementById("name");
    const name = nameElement ? nameElement.value : "Valued Customer";
    alert(`Thank you ${name}! Your order has been placed.`);
    cart = [];
    renderCart();
    closeSlide();
    const formElement = document.getElementById("checkoutForm");
    if (formElement) formElement.reset();
}

// ===== CATEGORY TOGGLES (for casual, wedding, etc pages) =====

// Show women's collection
function womenOpen() {
    const womenGrid = document.getElementById("women-grid");
    const menGrid = document.getElementById("men-grid");
    if (menGrid) menGrid.style.display = "none";
    if (womenGrid) womenGrid.style.display = "grid";
}

// Show men's collection
function menOpen() {
    const womenGrid = document.getElementById("women-grid");
    const menGrid = document.getElementById("men-grid");
    if (womenGrid) womenGrid.style.display = "none";
    if (menGrid) menGrid.style.display = "grid";
}

// ===== EVENTS PAGE =====

// Toggle event details expansion
function toggleDetails(button) {
    const card = button.closest('.event-card');
    if (!card) return;

    const detailsElement = card.querySelector('.event-details');
    if (!detailsElement) return;

    const isExpanded = detailsElement.classList.contains('expanded');

    if (isExpanded) {
        detailsElement.classList.remove('expanded');
        button.textContent = 'View Details';
    } else {
        detailsElement.classList.add('expanded');
        button.textContent = 'View Less';
    }
}

// ===== PAGE EFFECTS =====

// Reveal About section on scroll using IntersectionObserver
(function() {
    const about = document.getElementById('about');
    if (!about) return;

    // If user prefers reduced motion, reveal immediately
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
        about.classList.add('reveal');
        return;
    }

    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });

    obs.observe(about);
})();

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.textContent = '0';
});