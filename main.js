
let cart = [];
let detailQty = 1;
let currentProduct = null;

// Open Summary Page
function openProduct(el) {
    const name = el.getAttribute('data-name');
    const price = parseInt(el.getAttribute('data-price'));
    const image = el.getAttribute('data-image');
    const desc = el.getAttribute('data-desc');
    const des = el.getAttribute('data-des')

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

    document.querySelector(".video-grid").style.display = "none";
    document.querySelector(".main-body").style.display = "none";
    // document.querySelector(".women-section").style.display = "none";
    document.getElementById("product-detail").classList.add("active");
}

// Back to list
function backToList() {
    document.getElementById("product-detail").classList.remove("active");
    document.querySelector(".video-grid").style.display = "grid";
}

// Quantity
function updateDetailQty(change) {
    detailQty = Math.max(1, detailQty + change);
    document.getElementById("detail-qty").textContent = detailQty;
}

// Add to Cart
function addToCart() {
    const existing = cart.find(i => i.name === currentProduct.name);
    if (existing) existing.quantity += detailQty;
    else cart.push({ ...currentProduct, quantity: detailQty });

    renderCart();
    openSlide();
}

// Render Cart
function renderCart() {
    const container = document.getElementById("cart-items");
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
    document.getElementById("cart-total").textContent = total.toLocaleString();
    document.getElementById("cart-count").textContent = cart.reduce((s, i) => s + i.quantity, 0);
}

// Update quantity in cart
function updateCartQty(name, change) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) removeFromCart(name);
    renderCart();
}

// Remove item
function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    renderCart();
}

// Slide open/close
function openSlide() {
    renderCart(); // ensure cart is updated before showing
    document.getElementById("checkoutSlide").classList.add("active");
}
function closeSlide() { document.getElementById("checkoutSlide").classList.remove("active"); }

// Submit Checkout
function submitCheckout(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    alert(`Thank you ${name}! Your order has been placed.`);
    cart = [];
    renderCart();
    closeSlide();
    document.getElementById("checkoutForm").reset();
}
function menOpen() {
    document.getElementById("women-grid").style.display = "none";
    document.getElementById("men-grid").style.display = "grid";
}
function womenOpen() {
    document.getElementById("men-grid").style.display = "none";
    document.getElementById("women-grid").style.display = "grid";
}

// Open Summary Page
function openProduct(el) {
    const name = el.getAttribute('data-name');
    const price = parseInt(el.getAttribute('data-price'));
    const image = el.getAttribute('data-image');
    const desc = el.getAttribute('data-desc');
    const des = el.getAttribute('data-des')

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

    document.querySelector(".video-grid").style.display = "none";
    // document.querySelector(".main-body").style.display = "none";
    document.querySelector(".women-container").style.display = "none";
    document.getElementById("product-detail").classList.add("active");
}

// Back to list
function backToList() {
    document.getElementById("product-detail").classList.remove("active");
    document.querySelector(".video-grid").style.display = "grid";
      // document.querySelector(".women-container").style.display = "block";
}

// Quantity
function updateDetailQty(change) {
    detailQty = Math.max(1, detailQty + change);
    document.getElementById("detail-qty").textContent = detailQty;
}

// Add to Cart
function addToCart() {
    const existing = cart.find(i => i.name === currentProduct.name);
    if (existing) existing.quantity += detailQty;
    else cart.push({ ...currentProduct, quantity: detailQty });

    renderCart();
    openSlide();
}

// Render Cart
function renderCart() {
    const container = document.getElementById("cart-items");
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
    document.getElementById("cart-total").textContent = total.toLocaleString();
    document.getElementById("cart-count").textContent = cart.reduce((s, i) => s + i.quantity, 0);
}

// Update quantity in cart
function updateCartQty(name, change) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) removeFromCart(name);
    renderCart();
}

// Remove item
function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    renderCart();
}

// Slide open/close
function openSlide() {
    renderCart(); // ensure cart is updated before showing
    document.getElementById("checkoutSlide").classList.add("active");
}
function closeSlide() { document.getElementById("checkoutSlide").classList.remove("active"); }

// Submit Checkout
function submitCheckout(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    alert(`Thank you ${name}! Your order has been placed.`);
    cart = [];
    renderCart();
    closeSlide();
    document.getElementById("checkoutForm").reset();
}
function openNav(){
    document.querySelector("#myNav").style.width = "40%";
}

function closeNav(){
    document.querySelector("#myNav").style.width = "0"
}
