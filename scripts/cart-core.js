// Cart Core Functionality
// Basket State
let cart = [];
let cartCount = 0;

/**
 * Adds an item to the cart
 * @param {string} name - The item name
 * @param {number} price - The item price
 */
let addToCart = (name, price, buttonElement = null) => {
  let existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  cartCount += 1;
  updateCartDisplay();

  // Show confirmation message
  showAddToCartMessage(name, buttonElement);
};

/**
 * Increases the quantity of an item in the cart
 * @param {string} name - The item name
 */
let increaseQuantity = (name) => {
  let item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity += 1;
    cartCount += 1;
    updateCartDisplay();
    // Update UI
    if (window.cartUI && typeof window.cartUI.renderCartItems === "function") {
      window.cartUI.renderCartItems();
    }
  }
};

/**
 * Decreases the quantity of an item in the cart
 * @param {string} name - The item name
 */
let decreaseQuantity = (name) => {
  let item = cart.find((item) => item.name === name);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    cartCount -= 1;
    updateCartDisplay();
    // Update UI
    if (window.cartUI && typeof window.cartUI.renderCartItems === "function") {
      window.cartUI.renderCartItems();
    }
  } else if (item) {
    removeItemFromCart(name);
  }
};

/**
 * Removes an item completely from the cart
 * @param {string} name - The item name to remove
 */
let removeItemFromCart = (name) => {
  let itemToRemove = cart.find((cartItem) => cartItem.name === name);
  if (itemToRemove) {
    cartCount -= itemToRemove.quantity; // Subtract the entire quantity
    cart = cart.filter((cartItem) => cartItem.name !== name);
    updateCartDisplay();
    if (typeof renderCartItems === "function") {
      renderCartItems();
    }
    if (window.cartUI && typeof window.cartUI.renderCartItems === "function") {
      window.cartUI.renderCartItems();
    }
  }
};

/**
 * Clears the entire cart
 */
let clearCart = () => {
  cart = [];
  cartCount = 0;
  updateCartDisplay();
  // Update UI
  if (window.cartUI && typeof window.cartUI.renderCartItems === "function") {
    window.cartUI.renderCartItems();
  }
};

/**
 * Returns the current cart
 * @returns {Array} The cart with all items
 */
let getCart = () => {
  return cart;
};

/**
 * Calculates the total sum of the cart
 * @returns {number} The total sum
 */
let getCartTotal = () => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Updates the cart display in header and FAB
 */
let updateCartDisplay = () => {
  let basketCount = document.getElementById("basketCount");
  let mobileBasketCount = document.getElementById("mobileBasketCount");
  let fabCount = document.getElementById("mobileCartFABCount");

  if (basketCount) basketCount.textContent = cartCount;
  if (mobileBasketCount) mobileBasketCount.textContent = cartCount;
  if (fabCount) {
    fabCount.textContent = cartCount;
    fabCount.style.display = cartCount > 0 ? "flex" : "none";
  }
};

/**
 * Shows a confirmation message when an item is added to cart
 * @param {string} itemName - The name of the added item
 * @param {HTMLElement} buttonElement - The button element that was clicked
 */
let showAddToCartMessage = (itemName, buttonElement) => {
  let message = document.createElement("div");
  message.className = "add-to-cart-message";
  message.innerHTML = `
    <span class="add-to-cart-message__icon">✓</span>
    <span class="add-to-cart-message__text">${itemName} hinzugefügt</span>
  `;

  // Position the message relative to the button if provided
  if (buttonElement) {
    let buttonRect = buttonElement.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Check if screen width is very small (320px or less)
    if (window.innerWidth <= 320) {
      // For very small screens, position as full-width banner at top
      message.style.position = "fixed";
      message.style.top = "10px";
      message.style.left = "4px";
      message.style.right = "4px";
      message.style.width = "auto";
    } else {
      // For larger screens, position relative to the button
      message.style.position = "absolute";
      message.style.top = `${buttonRect.top + scrollTop - 50}px`;

      // Calculate left position, ensuring message doesn't go off screen
      let leftPosition = buttonRect.left + scrollLeft;
      let messageWidth = Math.min(250, window.innerWidth - 20);

      // Adjust position if message would go off right edge
      if (leftPosition + messageWidth > window.innerWidth - 10) {
        leftPosition = window.innerWidth - messageWidth - 10;
      }

      message.style.left = `${Math.max(10, leftPosition)}px`;
      message.style.width = "auto";
    }
  }

  document.body.appendChild(message);

  // Animate in
  setTimeout(() => {
    message.classList.add("add-to-cart-message--show");
  }, 10);

  // Remove after 2 seconds
  setTimeout(() => {
    message.classList.remove("add-to-cart-message--show");
    setTimeout(() => {
      if (document.body.contains(message)) {
        document.body.removeChild(message);
      }
    }, 300);
  }, 2000);
};
/**
 * Initializes all "Add" buttons in the menu
 */
let initAddButtons = () => {
  document.querySelectorAll(".add_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let dishName = btn.getAttribute("data-name");
      let dishPrice = parseFloat(btn.getAttribute("data-price"));
      addToCart(dishName, dishPrice, btn);
    });
  });
};

// Make globally available
if (!window.cartCore) {
  window.cartCore = {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    clearCart,
    getCart,
    getCartTotal,
    updateCartDisplay,
    initAddButtons,
    showAddToCartMessage,
  };
}

// Export for modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    clearCart,
    getCart,
    getCartTotal,
    updateCartDisplay,
    initAddButtons,
    showAddToCartMessage,
  };
}
