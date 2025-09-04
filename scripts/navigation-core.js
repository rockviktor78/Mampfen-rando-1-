// Navigation Core Module
// Navigation state
let navigationCurrentPage = "home";
let navigationContentContainer = null;

/**
 * Initializes the content container
 */
let initContentContainer = () => {
  navigationContentContainer = document.getElementById("content");
};

/**
 * Navigates to the home page
 */
let navigateToHome = () => {
  loadContent("templates/home-content.html", "home");
};

/**
 * Navigates to the menu page
 */
let navigateToMenu = () => {
  loadContent("templates/menu-content.html", "menu");
};

/**
 * Navigates to the about page
 */
let navigateToAbout = () => {
  loadContent("templates/about-content.html", "about");
};

/**
 * Navigates to the contact page
 */
let navigateToContact = () => {
  loadContent("templates/contact-content.html", "contact");
};

/**
 * Navigates to the privacy page
 */
let navigateToPrivacy = () => {
  loadContent("templates/privacy-content.html", "privacy");
};

/**
 * Navigates to the basket
 */
let navigateToBasket = () => {
  if (window.navigationMobile) {
    window.navigationMobile.closeMenuIfNavigating();
  }
};

/**
 * Loads content from a template path
 * @param {string} templatePath - Path to the template
 * @param {string} pageName - Name of the page
 */
let loadContent = async (templatePath, pageName) => {
  if (!navigationContentContainer) return;

  let response = await fetch(templatePath);
  if (response.ok) {
    let html = await response.text();
    navigationContentContainer.innerHTML = html;
    navigationCurrentPage = pageName;

    updateActiveStates();
    triggerPageLoadedEvent(pageName);
    handleMenuPageFAB(pageName);
  }

  if (window.navigationMobile) {
    window.navigationMobile.closeMenuIfNavigating();
  }
};

/**
 * Triggers a custom event when a page is loaded
 * @param {string} pageName - The name of the loaded page
 */
let triggerPageLoadedEvent = (pageName) => {
  let event = new CustomEvent("pageLoaded", {
    detail: { page: pageName, container: navigationContentContainer },
  });
  document.dispatchEvent(event);
};

/**
 * Handles FAB updates for the menu page
 * @param {string} pageName - The name of the loaded page
 */
let handleMenuPageFAB = (pageName) => {
  if (pageName === "menu" && window.cartHandler) {
    setTimeout(() => {
      window.cartHandler.showMobileCartFAB();
    }, 100);
  }
};

/**
 * Updates active navigation button states
 */
let updateActiveStates = () => {
  document
    .querySelectorAll(".header_nav-btn, .header_mobile-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });

  let activeButtons = {
    home: ["homeBtn", "mobileHomeBtn"],
    menu: ["menuBtn", "mobileMenuBtn"],
    about: ["aboutBtn", "mobileAboutBtn"],
    contact: ["contactBtn", "mobileContactBtn"],
  };

  if (activeButtons[navigationCurrentPage]) {
    activeButtons[navigationCurrentPage].forEach((btnId) => {
      let btn = document.getElementById(btnId);
      if (btn && !btn.classList.contains("header_nav-btn--basket")) {
        btn.classList.add("active");
      }
    });
  }
};

/**
 * Navigates to a specific menu category
 * @param {string} category - The category (pizza, pasta, etc.)
 */
let navigateToMenuCategory = (category) => {
  navigateToMenu();
  setTimeout(() => {
    scrollToCategoryElement(category);
  }, 300);
};

/**
 * Scrolls to a category element
 * @param {string} category - The category to scroll to
 */
let scrollToCategoryElement = (category) => {
  let categoryElement = document.querySelector(`[data-category="${category}"]`);
  if (!categoryElement) {
    categoryElement = findCategoryByTitle(category);
  }
  if (categoryElement) {
    categoryElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

/**
 * Finds a category element by its title
 * @param {string} category - The category to search
 * @returns {Element|null} The found element or null
 */
let findCategoryByTitle = (category) => {
  return Array.from(document.querySelectorAll(".category_title")).find((el) =>
    el.textContent.trim().toLowerCase().includes(category)
  );
};

/**
 * Initializes all navigation event listeners
 */
let initNavigationEventListeners = () => {
  document
    .getElementById("logoHomeBtn")
    ?.addEventListener("click", navigateToHome);
  document
    .getElementById("mobileHomeBtn")
    ?.addEventListener("click", navigateToHome);
  document
    .getElementById("mobileMenuBtn")
    ?.addEventListener("click", navigateToMenu);
  document
    .getElementById("mobileAboutBtn")
    ?.addEventListener("click", navigateToAbout);
  document
    .getElementById("mobileContactBtn")
    ?.addEventListener("click", navigateToContact);
  document
    .getElementById("mobileBasketBtn")
    ?.addEventListener("click", navigateToBasket);

  document.getElementById("homeBtn")?.addEventListener("click", navigateToHome);
  document.getElementById("menuBtn")?.addEventListener("click", navigateToMenu);
  document
    .getElementById("aboutBtn")
    ?.addEventListener("click", navigateToAbout);
  document
    .getElementById("contactBtn")
    ?.addEventListener("click", navigateToContact);
  document
    .getElementById("basketBtn")
    ?.addEventListener("click", navigateToBasket);
};

/**
 * Initializes event listeners for dynamically loaded content
 */
let initDynamicEventListeners = () => {
  document.addEventListener("pageLoaded", (event) => {
    if (event.detail.page === "home" && window.navigationForms) {
      window.navigationForms.initHeroButton();
      window.navigationForms.initFeatureCards();
    }

    if (event.detail.page === "contact" && window.navigationForms) {
      window.navigationForms.initContactForm();
    }
  });
};

// Make globally available
if (!window.navigationCore) {
  window.navigationCore = {
    navigateToHome,
    navigateToMenu,
    navigateToAbout,
    navigateToContact,
    navigateToPrivacy,
    navigateToBasket,
    navigateToMenuCategory,
    initContentContainer,
    initNavigationEventListeners,
    initDynamicEventListeners,
  };
}

// Export for modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    navigateToHome,
    navigateToMenu,
    navigateToAbout,
    navigateToContact,
    navigateToPrivacy,
    navigateToBasket,
    navigateToMenuCategory,
    initContentContainer,
    initNavigationEventListeners,
    initDynamicEventListeners,
  };
}
