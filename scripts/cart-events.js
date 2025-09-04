// Cart Event Handlers and Checkout
/**
 * Initializes all event listeners for the cart modal
 */
let initCartModal = () => {
  document.addEventListener("click", handleCartModalClicks);
};

/**
 * Handles all clicks for the cart modal
 * @param {Event} e - The click event
 */
let handleCartModalClicks = (e) => {
  if (isCartOpenButton(e.target.id)) {
    e.preventDefault();
    e.stopPropagation();
    if (window.cartUI) {
      window.cartUI.openCartModal();
    }
  } else if (isCartCloseButton(e.target.id)) {
    if (window.cartUI) {
      window.cartUI.closeCartModal();
    }
  } else if (e.target.id === "cartEmptyMenuBtn") {
    handleEmptyCartMenuClick();
  } else if (e.target.id === "cartCheckoutBtn") {
    processCheckout();
  }
};

/**
 * Checks if a button is for opening the cart
 * @param {string} buttonId - The button ID
 * @returns {boolean} True if it is an open button
 */
let isCartOpenButton = (buttonId) => {
  return (
    buttonId === "basketBtn" ||
    buttonId === "mobileBasketBtn" ||
    buttonId === "mobileCartFAB"
  );
};

/**
 * Checks if a button is for closing the cart
 * @param {string} buttonId - The button ID
 * @returns {boolean} True if it is a close button
 */
let isCartCloseButton = (buttonId) => {
  return buttonId === "cartModalClose" || buttonId === "cartModalOverlay";
};

/**
 * Handles click on "Back to menu" in empty cart
 */
let handleEmptyCartMenuClick = () => {
  if (window.cartUI) {
    window.cartUI.closeCartModal();
  }
  if (window.navigationHandler) {
    window.navigationHandler.navigateToMenu();
  }
};

/**
 * Initializes the "Back to menu" button in the empty cart
 */
let initEmptyCartButton = () => {
  let checkModal = setInterval(() => {
    let emptyCartBtn = document.getElementById("cartEmptyMenuBtn");
    if (emptyCartBtn) {
      clearInterval(checkModal);
      emptyCartBtn.addEventListener("click", handleEmptyCartButtonClick);
    }
  }, 100);

  setTimeout(() => clearInterval(checkModal), 5000);
};

/**
 * Handles click on the "Back to menu" button
 * @param {Event} e - The click event
 */
let handleEmptyCartButtonClick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (window.cartUI) {
    window.cartUI.closeCartModal();
  }

  if (window.navigationHandler) {
    window.navigationHandler.navigateToMenu();
  }
};

/**
 * Processes the checkout with popup confirmations
 */
let processCheckout = () => {
  if (!window.cartCore) return;

  let cart = window.cartCore.getCart();
  if (cart.length === 0) return;

  let checkoutBtn = document.getElementById("cartCheckoutBtn");
  if (checkoutBtn) {
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "Wird bearbeitet...";

    showCheckoutPopup("Bestellung wurde aufgegeben!", "success");
    scheduleThankYouMessage(checkoutBtn);
  }
};

/**
 * Schedules the thank you message after checkout
 * @param {HTMLButtonElement} checkoutBtn - The checkout button
 */
let scheduleThankYouMessage = (checkoutBtn) => {
  setTimeout(() => {
    showCheckoutPopup("Danke für deine Bestellung!", "success");
    scheduleCartClear(checkoutBtn);
  }, 2000);
};

/**
 * Schedules clearing the cart after checkout
 * @param {HTMLButtonElement} checkoutBtn - The checkout button
 */
let scheduleCartClear = (checkoutBtn) => {
  setTimeout(() => {
    if (window.cartCore) {
      window.cartCore.clearCart();
    }
    if (window.cartUI) {
      window.cartUI.closeCartModal();
    }
    checkoutBtn.disabled = false;
    checkoutBtn.textContent = "Zur Kasse";
  }, 2000);
};

/**
 * Shows a checkout popup with a message
 * @param {string} message - The message to display
 * @param {string} type - The popup type (success/error)
 */
let showCheckoutPopup = (message, type = "success") => {
  let popup = createCheckoutPopup(message, type);
  showPopupWithAnimation(popup);
};

/**
 * Creates a checkout popup element
 * @param {string} message - The message
 * @param {string} type - The popup type
 * @returns {HTMLElement} The popup element
 */
let createCheckoutPopup = (message, type) => {
  let popup = document.createElement("div");
  popup.className = "checkout-popup";
  popup.innerHTML = `
    <div class="checkout-popup_content checkout-popup_content--${type}">
      <span class="checkout-popup_icon">${
        type === "success" ? "✅" : "❌"
      }</span>
      <p class="checkout-popup_text">${message}</p>
    </div>
  `;

  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.zIndex = "10001";
  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.3s ease";

  return popup;
};

/**
 * Shows popup with animation
 * @param {HTMLElement} popup - The popup element
 */
let showPopupWithAnimation = (popup) => {
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);

  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
      }
    }, 300);
  }, 1500);
};

/**
 * Initializes event listeners for page load events
 */
let initPageLoadedListener = () => {
  document.addEventListener("pageLoaded", (event) => {
    if (event.detail.page === "menu") {
      if (window.cartCore) {
        window.cartCore.initAddButtons();
      }
      if (window.cartUI) {
        window.cartUI.showMobileCartFAB();
      }
    } else {
      if (window.cartUI) {
        window.cartUI.hideMobileCartFAB();
      }
    }
  });
};

// Make globally available
if (!window.cartEvents) {
  window.cartEvents = {
    initCartModal,
    initEmptyCartButton,
    initPageLoadedListener,
    processCheckout,
  };
}

// Export for modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initCartModal,
    initEmptyCartButton,
    initPageLoadedListener,
    processCheckout,
  };
}
