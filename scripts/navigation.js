// Navigation Main Module - Orchestrates all navigation functionality
/**
 * Initializes navigation after DOM load
 */
function initNavigation() {
  // Initialize mobile navigation
  if (window.navigationMobile) {
    window.navigationMobile.initMobileNavigation();
  }

  // Initialize core navigation
  if (window.navigationCore) {
    window.navigationCore.initContentContainer();
    window.navigationCore.initNavigationEventListeners();
    window.navigationCore.initDynamicEventListeners();
  }
}

// Global navigation functions for backward compatibility
window.navigationHandler = {
  navigateToHome: () => window.navigationCore?.navigateToHome(),
  navigateToMenu: () => window.navigationCore?.navigateToMenu(),
  navigateToAbout: () => window.navigationCore?.navigateToAbout(),
  navigateToContact: () => window.navigationCore?.navigateToContact(),
  navigateToPrivacy: () => window.navigationCore?.navigateToPrivacy(),
  navigateToBasket: () => window.navigationCore?.navigateToBasket(),
  navigateToMenuCategory: (category) =>
    window.navigationCore?.navigateToMenuCategory(category),
};

// Event listeners for initialization
document.addEventListener("DOMContentLoaded", () => {
  // Ensure all modules are loaded before initializing
  let checkModules = setInterval(() => {
    if (
      window.navigationCore &&
      window.navigationMobile &&
      window.navigationForms
    ) {
      clearInterval(checkModules);
      initNavigation();
    }
  }, 50);

  // Timeout fallback
  setTimeout(() => {
    clearInterval(checkModules);
    if (
      !window.navigationCore ||
      !window.navigationMobile ||
      !window.navigationForms
    ) {
      console.warn(
        "Some navigation modules are not loaded. Navigation functionality may be limited."
      );
    }
  }, 5000);
});

document.addEventListener("htmlIncluded", initNavigation);
document.addEventListener("contentLoaded", initNavigation);

// Event delegation for buttons in #content
document.addEventListener("DOMContentLoaded", function () {
  let content = document.getElementById("content");
  if (content) {
    content.addEventListener("click", function (e) {
      if (e.target && e.target.id === "heroOrderBtn") {
        e.preventDefault();
        window.navigationHandler.navigateToMenu();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      let card = e.target.closest(".feature_card");
      if (card) {
        e.preventDefault();
        let category = card.getAttribute("data-category");
        if (category && window.navigationHandler) {
          window.navigationHandler.navigateToMenuCategory(category);
        }
        let action = card.getAttribute("data-action");
        if (action === "menu" && window.navigationHandler) {
          window.navigationHandler.navigateToMenu();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });
  }
});

// Export for modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initNavigation,
  };
}
