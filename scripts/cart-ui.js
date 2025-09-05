// Cart UI Management
let cartModal = null;

/**
 * Loads the cart modal from the template file
 */
let loadCartModal = async () => {
  let response = await fetch("templates/cart-modal.html");
  if (response.ok) {
    let html = await response.text();
    document.body.insertAdjacentHTML("beforeend", html);
    cartModal = document.getElementById("cartModal");
  }
};

/**
 * Checks if mobile FAB already exists
 * @returns {boolean} True if FAB exists
 */
let fabExists = () => {
  return !!document.getElementById("mobileCartFAB");
};

/**
 * Creates FAB button element
 * @returns {HTMLElement} FAB button element
 */
let createFABElement = () => {
  let fab = document.createElement("button");
  fab.id = "mobileCartFAB";
  fab.className = "mobile-cart-fab";
  fab.style.display = "none";
  return fab;
};

/**
 * Sets FAB button content
 * @param {HTMLElement} fab - FAB element
 */
let setFABContent = (fab) => {
  if (window.templateHTML && window.templateHTML.getFABContent) {
    fab.innerHTML = window.templateHTML.getFABContent();
  } else {
    fab.innerHTML = `🛒<span class="mobile-cart-fab_count" id="mobileCartFABCount">0</span>`;
  }
};

/**
 * Adds event listener to FAB
 * @param {HTMLElement} fab - FAB element
 */
let addFABEventListener = (fab) => {
  fab.addEventListener("click", openCartModal);
};

/**
 * Creates the mobile cart FAB button
 * @returns {HTMLElement} The created FAB element
 */
let createMobileCartFAB = () => {
  if (fabExists()) return;

  let fab = createFABElement();
  setFABContent(fab);
  addFABEventListener(fab);
  document.body.appendChild(fab);
  return fab;
};

/**
 * Opens the cart modal
 */
let openCartModal = () => {
  if (cartModal) {
    cartModal.classList.add("cart-modal--open");
    document.body.style.overflow = "hidden";
    renderCartItems();
  }
};

/**
 * Closes the cart modal
 */
let closeCartModal = () => {
  if (cartModal) {
    cartModal.classList.remove("cart-modal--open");
    document.body.style.overflow = "";
  }
};

/**
 * Renders all items in the cart modal
 */
let renderCartItems = () => {
  let cartEmpty = document.getElementById("cartEmpty");
  let cartItems = document.getElementById("cartItems");
  let cartFooter = document.getElementById("cartModalFooter");

  let cart = window.cartCore ? window.cartCore.getCart() : [];

  let deliveryInfo = document.getElementById("cartDeliveryInfo");
  if (!deliveryInfo) {
    deliveryInfo = document.createElement("div");
    deliveryInfo.id = "cartDeliveryInfo";
    deliveryInfo.style.marginTop = "1em";
    cartFooter.appendChild(deliveryInfo);
  }
  // Beispiel: Entfernung aus localStorage oder Default
  let distanceKm = parseFloat(localStorage.getItem("deliveryDistance")) || 2;
  let orderValue = window.cartCore.getCartTotal();
  let delivery = window.delivery
    ? window.delivery.calculateDelivery(distanceKm, orderValue)
    : null;
  if (delivery) {
    deliveryInfo.innerHTML =
      `<strong>Lieferung:</strong> ${delivery.info}<br>` +
      (delivery.deliveryCost !== null
        ? `Lieferkosten: <b>${
            delivery.deliveryCost === 0
              ? "kostenlos"
              : delivery.deliveryCost.toFixed(2) + " €"
          }</b><br>`
        : "Lieferkosten nach Absprache<br>") +
      `Mindestbestellwert: <b>${delivery.minOrder} €</b><br>` +
      `<span style='font-size:0.9em;color:#666;'>${delivery.freePickup}</span>`;
  }

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    cartItems.innerHTML = "";
    cartFooter.style.display = "block";
  } else {
    cartEmpty.style.display = "none";
    cartFooter.style.display = "block";
    cartItems.innerHTML = generateCartItemsHTML();
    updateCartTotal();
    initCartItemEventListeners();
  }
};

/**
 * Generates HTML for cart items
 * @returns {string} HTML string for all cart items
 */
let generateCartItemsHTML = () => {
  let cart = window.cartCore ? window.cartCore.getCart() : [];

  if (window.templateHTML && window.templateHTML.getCartItemHTML) {
    return cart
      .map((item) => window.templateHTML.getCartItemHTML(item))
      .join("");
  } else {
    return cart
      .map(
        (item) =>
          `<div class="cart-item"><div class="cart-item_info"><div class="cart-item_name">${
            item.name
          }</div><div class="cart-item_price-info"><div class="cart-item_single-price">${item.price.toFixed(
            2
          )} € × ${item.quantity}</div><div class="cart-item_total-price">${(
            item.price * item.quantity
          ).toFixed(
            2
          )} €</div></div></div><div class="cart-item_controls"><button class="cart-item_btn cart-item_btn--decrease" data-item="${
            item.name
          }" data-action="decrease">−</button><span class="cart-item_quantity">${
            item.quantity
          }</span><button class="cart-item_btn cart-item_btn--increase" data-item="${
            item.name
          }" data-action="increase">+</button><button class="cart-item_btn cart-item_btn--delete" data-item="${
            item.name
          }" data-action="delete" title="Gericht entfernen">×</button></div></div>`
      )
      .join("");
  }
};

/**
 * Initializes event listeners for cart item buttons
 */
let initCartItemEventListeners = () => {
  let cartItems = document.getElementById("cartItems");
  if (cartItems) {
    // Remove existing event listeners
    cartItems.removeEventListener("click", handleCartItemClick);
    // Add new event listener
    cartItems.addEventListener("click", handleCartItemClick);
  }
};

/**
 * Handles clicks on cart item buttons
 * @param {Event} e - The click event
 */
let handleCartItemClick = (e) => {
  if (!e.target.classList.contains("cart-item_btn")) return;

  let itemName = e.target.getAttribute("data-item");
  let action = e.target.getAttribute("data-action");

  if (!itemName || !action) return;

  console.log(`Cart action: ${action} for item: ${itemName}`);

  switch (action) {
    case "increase":
      if (window.cartHandler && window.cartHandler.increaseQuantity) {
        window.cartHandler.increaseQuantity(itemName);
      }
      break;
    case "decrease":
      if (window.cartHandler && window.cartHandler.decreaseQuantity) {
        window.cartHandler.decreaseQuantity(itemName);
      }
      break;
    case "delete":
      if (window.cartHandler && window.cartHandler.removeItemFromCart) {
        window.cartHandler.removeItemFromCart(itemName);
      }
      break;
  }
};

/**
 * Updates the total sum in the cart
 */
let updateCartTotal = () => {
  let totalElement = document.getElementById("cartTotalAmount");
  if (totalElement && window.cartCore) {
    totalElement.textContent = `${window.cartCore.getCartTotal().toFixed(2)} €`;
  }
};

/**
 * Shows the mobile cart FAB button on mobile devices
 */
let showMobileCartFAB = () => {
  let fab = document.getElementById("mobileCartFAB");
  if (fab) {
    if (window.innerWidth <= 767) {
      fab.style.display = "flex";
    } else {
      fab.style.display = "none";
    }
  }
};

/**
 * Hides the mobile cart FAB button
 */
let hideMobileCartFAB = () => {
  let fab = document.getElementById("mobileCartFAB");
  if (fab) {
    fab.style.display = "none";
  }
};

// Make globally available
if (!window.cartUI) {
  window.cartUI = {
    loadCartModal,
    createMobileCartFAB,
    openCartModal,
    closeCartModal,
    renderCartItems,
    showMobileCartFAB,
    hideMobileCartFAB,
    initCartItemEventListeners,
    handleCartItemClick,
  };
}

// Export for modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadCartModal,
    createMobileCartFAB,
    openCartModal,
    closeCartModal,
    renderCartItems,
    showMobileCartFAB,
    hideMobileCartFAB,
    initCartItemEventListeners,
    handleCartItemClick,
  };
}
