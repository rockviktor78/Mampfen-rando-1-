// Navigation Forms and Popups Module
/**
 * Initializes the contact form with validation
 */
let initContactForm = () => {
  let contactForm = document.querySelector(".form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }
};

/**
 * Handles the contact form submission
 * @param {Event} e - The submit event
 */
let handleContactFormSubmit = (e) => {
  e.preventDefault();
  let contactForm = e.target;
  let formBtn = contactForm.querySelector(".form_btn");

  if (validateContactForm(contactForm)) {
    processContactFormSubmission(formBtn, contactForm);
  }
};

/**
 * Validates the contact form
 * @param {HTMLFormElement} contactForm - The contact form
 * @returns {boolean} True if valid, false otherwise
 */
let validateContactForm = (contactForm) => {
  let nameInput = contactForm.querySelector('input[placeholder="Name"]');
  let emailInput = contactForm.querySelector('input[placeholder="E-Mail"]');
  let messageInput = contactForm.querySelector(
    'textarea[placeholder="Nachricht"]'
  );

  if (
    !nameInput.value.trim() ||
    !emailInput.value.trim() ||
    !messageInput.value.trim()
  ) {
    showErrorPopup("Bitte füllen Sie alle Felder aus!");
    return false;
  }

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    showErrorPopup("Bitte geben Sie eine gültige E-Mail-Adresse ein!");
    return false;
  }

  return true;
};

/**
 * Processes the form submission
 * @param {HTMLButtonElement} formBtn - The submit button
 * @param {HTMLFormElement} contactForm - The contact form
 */
let processContactFormSubmission = (formBtn, contactForm) => {
  formBtn.textContent = "Wird gesendet...";
  formBtn.disabled = true;

  setTimeout(() => {
    showSuccessPopup();
    contactForm.reset();
    formBtn.textContent = "Senden";
    formBtn.disabled = false;
  }, 1000);
};

/**
 * Shows a success popup
 */
let showSuccessPopup = () => {
  let popup = document.createElement("div");
  popup.className = "success-popup";
  popup.innerHTML = `
    <div class="success-popup_content success-popup_content--success">
      <span class="success-popup_icon">✅</span>
      <p class="success-popup_text">Nachricht erfolgreich gesendet!</p>
    </div>
  `;
  showPopup(popup);
};

/**
 * Shows an error popup
 * @param {string} message - The error message
 */
let showErrorPopup = (message) => {
  let popup = document.createElement("div");
  popup.className = "success-popup";
  popup.innerHTML = `
    <div class="success-popup_content success-popup_content--error">
      <span class="success-popup_icon">❌</span>
      <p class="success-popup_text">${message}</p>
    </div>
  `;
  showPopup(popup);
};

/**
 * Shows a popup in the correct position
 * @param {HTMLElement} popup - The popup element
 */
let showPopup = (popup) => {
  let formBtn = document.querySelector(".form_btn");

  if (formBtn) {
    let btnRect = formBtn.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    popup.style.position = "absolute";
    popup.style.top = `${btnRect.bottom + scrollTop + 10}px`;
    popup.style.left = `${btnRect.left}px`;
    popup.style.right = "auto";
    popup.style.transform = "none";
  }

  document.body.appendChild(popup);
  setTimeout(() => popup.classList.add("success-popup--show"), 10);
  hidePopupAfterDelay(popup);
};

/**
 * Hides the popup after a delay
 * @param {HTMLElement} popup - The popup to hide
 */
let hidePopupAfterDelay = (popup) => {
  setTimeout(() => {
    popup.classList.remove("success-popup--show");
    setTimeout(() => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
      }
    }, 300);
  }, 3000);
};

/**
 * Initializes feature card listeners
 */
let initFeatureCards = () => {
  initPizzaFeatureCard();
  initPastaFeatureCard();
  initSaladFeatureCard();
  initDessertFeatureCard();
  initDeliveryFeatureCard();
};

/**
 * Initializes pizza feature card
 */
let initPizzaFeatureCard = () => {
  let pizzaCard = document.getElementById("pizzaFeatureCard");
  if (pizzaCard) {
    pizzaCard.addEventListener("click", () => {
      if (window.navigationCore) {
        window.navigationCore.navigateToMenuCategory("pizza");
      }
    });
  }
};

/**
 * Initializes pasta feature card
 */
let initPastaFeatureCard = () => {
  let pastaCard = document.getElementById("pastaFeatureCard");
  if (pastaCard) {
    pastaCard.addEventListener("click", () => {
      if (window.navigationCore) {
        window.navigationCore.navigateToMenuCategory("pasta");
      }
    });
  }
};

/**
 * Initializes salad feature card
 */
let initSaladFeatureCard = () => {
  let saladCard = document.getElementById("saladFeatureCard");
  if (saladCard) {
    saladCard.addEventListener("click", () => {
      if (window.navigationCore) {
        window.navigationCore.navigateToMenuCategory("salad");
      }
    });
  }
};

/**
 * Initializes dessert feature card
 */
let initDessertFeatureCard = () => {
  let dessertCard = document.getElementById("dessertFeatureCard");
  if (dessertCard) {
    dessertCard.addEventListener("click", () => {
      if (window.navigationCore) {
        window.navigationCore.navigateToMenuCategory("dessert");
      }
    });
  }
};

/**
 * Initializes delivery feature card
 */
let initDeliveryFeatureCard = () => {
  let deliveryCard = document.getElementById("deliveryFeatureCard");
  if (deliveryCard) {
    deliveryCard.addEventListener("click", () => {
      if (window.navigationCore) {
        window.navigationCore.navigateToMenu();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
};

/**
 * Initializes the hero button event listener
 */
let initHeroButton = () => {
  let heroBtn = document.getElementById("heroOrderBtn");
  if (heroBtn) {
    heroBtn.addEventListener("click", () => {
      if (window.navigationCore) {
        window.navigationCore.navigateToMenu();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
};

// Make globally available
if (!window.navigationForms) {
  window.navigationForms = {
    initContactForm,
    initFeatureCards,
    initHeroButton,
    showSuccessPopup,
    showErrorPopup,
  };
}

// Export for modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initContactForm,
    initFeatureCards,
    initHeroButton,
    showSuccessPopup,
    showErrorPopup,
  };
}
