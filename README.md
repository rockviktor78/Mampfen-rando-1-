# Mampfen-rando - Restaurant Lieferservice

## Projektübersicht

Mampfen-rando ist eine Single-Page-Application (SPA) für einen italienischen Lieferservice, entwickelt als Multi-Page-Application (MPA) mit dynamischem Content-Loading. Das Projekt verwendet moderne JavaScript-Module und ein Template-basiertes System ohne externe Frameworks.

## 🚀 Kompletter Application Lifecycle

### 1. Initialisierung (DOM Ready)

```javascript
// 1. HTML-Templates werden geladen
document.addEventListener("DOMContentLoaded", includeHTML);

// 2. Module werden parallel initialisiert
// - templateHTML.js (HTML-Templates)
// - storage.js (LocalStorage)
// - data.js (Gerichte-Daten)
// - cart-core.js (Warenkorb-Kern)
// - cart-ui.js (Warenkorb-UI)
// - cart-events.js (Warenkorb-Events)
// - navigation-core.js (Navigation-Kern)
// - navigation-mobile.js (Mobile Navigation)
// - navigation-forms.js (Formulare)
```

### 2. Template-System Aufbau

```
┌─ includeHTML.js lädt statische Templates
│  ├─ templates/header.html → Header mit Navigation
│  ├─ templates/footer.html → Footer mit Legal-Links
│  └─ templates/home-content.html → Standard-Startseite
│
├─ templateHTML.js stellt HTML-Funktionen bereit
│  ├─ getCartItemHTML() → Warenkorb-Items
│  ├─ getFABContent() → Mobile Warenkorb-Button
│  └─ getPopupHTML() → Success/Error Popups
│
└─ Event: 'htmlIncluded' wird gefeuert
```

### 3. Modul-Initialisierung (Reihenfolge)

#### Phase 1: Core-Module

```javascript
// storage.js - LocalStorage Handler
window.storageHandler = { saveCart, loadCart, clearCart }

// data.js - Statische Daten
window.dishesData = [...] // Gerichte-Array

// templateHTML.js - HTML-Templates
window.templateHTML = { getCartItemHTML, getFABContent, ... }
```

#### Phase 2: Cart-Module

```javascript
// cart-core.js - Warenkorb-Logik
window.cartCore = {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
  clearCart,
  getCart,
  getCartTotal,
};

// cart-ui.js - Warenkorb-Interface
window.cartUI = {
  loadCartModal,
  openCartModal,
  closeCartModal,
  createMobileCartFAB,
  renderCartItems,
};

// cart-events.js - Event-Handler
window.cartEvents = {
  initCartModal,
  processCheckout,
  initPageLoadedListener,
};
```

#### Phase 3: Navigation-Module

```javascript
// navigation-core.js - Seiten-Navigation
window.navigationCore = {
  navigateToHome,
  navigateToMenu,
  navigateToAbout,
  navigateToContact,
  navigateToMenuCategory,
};

// navigation-mobile.js - Mobile Menü
window.navigationMobile = {
  toggleMobileMenu,
  openMobileMenu,
  closeMobileMenu,
};

// navigation-forms.js - Formulare & Popups
window.navigationForms = {
  initContactForm,
  showSuccessPopup,
  showErrorPopup,
};
```

### 4. Event-System und Koordination

#### Custom Events

```javascript
// 'htmlIncluded' - Statische Templates geladen
document.dispatchEvent(new CustomEvent("htmlIncluded"));

// 'pageLoaded' - Neue Seite geladen
document.dispatchEvent(
  new CustomEvent("pageLoaded", {
    detail: { page: "menu", container: contentElement },
  })
);

// 'contentLoaded' - Content dynamisch geladen
document.dispatchEvent(new CustomEvent("contentLoaded"));
```

#### Event-Delegation

```javascript
// Global Click Handler für dynamische Inhalte
document.addEventListener('click', (e) => {
  // Feature Cards → Navigation
  if (e.target.closest('.feature_card')) { ... }

  // Add Buttons → Warenkorb
  if (e.target.classList.contains('add_btn')) { ... }

  // Cart Buttons → Modal öffnen
  if (e.target.id === 'basketBtn') { ... }
})
```

### 5. Navigation Lifecycle

#### Seitenwechsel-Prozess

```
User Click → Navigation Handler → Content Loading → Event Trigger → Module Init
     ↓              ↓                    ↓              ↓              ↓
[Menu Button] → navigateToMenu() → fetch(template) → 'pageLoaded' → initAddButtons()
```

#### Beispiel: Menu-Seite laden

```javascript
// 1. User klickt "Speisekarte"
navigationCore.navigateToMenu();

// 2. Template wird geladen
await fetch("templates/menu-content.html");
contentContainer.innerHTML = html;

// 3. Event wird gefeuert
document.dispatchEvent(
  new CustomEvent("pageLoaded", {
    detail: { page: "menu" },
  })
);

// 4. Module reagieren
cartCore.initAddButtons(); // Add-Buttons aktivieren
cartUI.showMobileCartFAB(); // Mobile Button zeigen
navigationForms.initFeatureCards(); // Falls Feature Cards vorhanden
```

### 6. Warenkorb Lifecycle

#### Item hinzufügen

```
User Click → Data Extraction → Cart Update → UI Update → Storage → Feedback
     ↓              ↓               ↓           ↓          ↓         ↓
[+ Button] → data-name/price → cart.push() → updateDisplay() → localStorage → showMessage()
```

#### Warenkorb öffnen

```
User Click → Modal Load → Content Render → Event Listeners → Display
     ↓           ↓            ↓               ↓              ↓
[🛒 Button] → loadModal() → renderItems() → initListeners() → show()
```

#### Checkout-Prozess

```
Checkout → Validation → Processing → Confirmation → Cleanup
    ↓         ↓            ↓           ↓             ↓
[Zur Kasse] → minOrder → showPopup() → thankYou → clearCart()
```

### 7. Mobile-First Responsive Lifecycle

#### Breakpoint-System

```css
/* Mobile First - Standard */
@media (max-width: 767px) {
  /* Mobile Styles */
}

/* Tablet */
@media (min-width: 768px) {
  /* Tablet Styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Desktop Styles */
}
```

#### Mobile Warenkorb-Button

```javascript
// Nur auf Menu-Seite und Mobile
if (page === "menu" && window.innerWidth <= 767) {
  showMobileCartFAB();
} else {
  hideMobileCartFAB();
}
```

### 8. Fehlerbehandlung und Fallbacks

#### Template-Loading

```javascript
// Mit Fallback bei Fehlern
try {
  let response = await fetch(templatePath);
  if (response.ok) {
    contentContainer.innerHTML = await response.text();
  } else {
    contentContainer.innerHTML = "<p>Fehler beim Laden</p>";
  }
} catch (error) {
  console.error("Template loading failed:", error);
}
```

#### Modul-Abhängigkeiten

```javascript
// Warten auf alle Module
let checkModules = setInterval(() => {
  if (window.cartCore && window.cartUI && window.cartEvents) {
    clearInterval(checkModules);
    initCart(); // Erst wenn alle geladen
  }
}, 50);

// Timeout Fallback
setTimeout(() => {
  clearInterval(checkModules);
  console.warn("Some modules not loaded");
}, 5000);
```

## 🏗️ Modularchitektur

### Core-Module

- **storage.js** - LocalStorage Verwaltung
- **data.js** - Statische Daten (Gerichte)
- **templateHTML.js** - HTML-Template Funktionen

### Navigation-Module

- **navigation-core.js** - Seiten-Navigation und Content-Loading
- **navigation-mobile.js** - Mobile Menü-Funktionalität
- **navigation-forms.js** - Kontaktformular und Popups
- **navigation.js** - Haupt-Orchestrator

### Warenkorb-Module

- **cart-core.js** - Warenkorb-Logik und State
- **cart-ui.js** - UI-Rendering und Modal-Management
- **cart-events.js** - Event-Handler und Checkout
- **cart.js** - Haupt-Orchestrator

### Utility-Module

- **includeHTML.js** - Template-Loading System

## 🔄 Event-Flow Diagramm

```
Browser Start
     ↓
DOM Ready
     ↓
includeHTML() → Templates laden
     ↓
Module Init → Warenkorb, Navigation
     ↓
Event Listeners → Click-Handler registrieren
     ↓
User Interaction
     ↓
Event Delegation → Richtige Handler finden
     ↓
State Update → Warenkorb/Navigation State
     ↓
UI Update → DOM manipulieren
     ↓
Storage Update → LocalStorage speichern
     ↓
User Feedback → Popups/Animationen
```

## 📱 Mobile-Optimierungen

### Touch-Freundlichkeit

- Minimum 44px Click-Targets
- Touch-optimierte Buttons
- Swipe-freundliche Modals

### Performance

- Lazy-Loading von Templates
- Minimale DOM-Manipulationen
- CSS-basierte Animationen

### UX-Features

- Mobile Warenkorb-FAB
- Vollbild-Modals auf Mobile
- Touch-optimierte Scrollbereiche

## 🔧 Development Workflow

### 1. Neue Seite hinzufügen

```javascript
// 1. Template erstellen: templates/new-page-content.html
// 2. Navigation erweitern: navigation-core.js
navigateToNewPage = () => {
  loadContent("templates/new-page-content.html", "newpage");
};

// 3. Event-Handler registrieren
document
  .getElementById("newPageBtn")
  ?.addEventListener("click", navigateToNewPage);
```

### 2. Neue Warenkorb-Funktion

```javascript
// 1. Core-Logik: cart-core.js
newCartFunction = () => {
  /* ... */
};

// 2. UI-Update: cart-ui.js
updateUIForNewFunction = () => {
  /* ... */
};

// 3. Events: cart-events.js
handleNewFunctionEvent = () => {
  /* ... */
};
```

### 3. Styling hinzufügen

```css
/* 1. Komponente: styles/components/new-component.css */
.new-component {
  /* ... */
}

/* 2. Responsive: Mobile First */
@media (min-width: 768px) {
  .new-component {
    /* Tablet */
  }
}
```

## 📋 Debugging Guide

### Template-Probleme

```javascript
// Console-Check
console.log("Templates loaded:", window.templateHTML);
console.log("Current page:", navigationCurrentPage);
```

### Warenkorb-Issues

```javascript
// State-Check
console.log("Cart:", window.cartCore.getCart());
console.log("Count:", cartCount);
console.log("Total:", window.cartCore.getCartTotal());
```

### Event-Probleme

```javascript
// Event-Listener überprüfen
console.log("Cart UI:", window.cartUI);
console.log("Navigation:", window.navigationCore);
```

## 🚨 Häufige Probleme & Lösungen

### **AKTUELLE PROBLEME IN DEINEM CODE:**

### "templateHTML.js wird nicht korrekt geladen"

- **Ursache:** `templateHTML.js` verwendet ES6 exports, aber wird nicht als Modul importiert
- **Problem:** `window.templateHTML` ist undefined
- **Lösung:** Entweder ES6 imports verwenden oder auf window-Export umstellen

### "Doppelte Export-Blöcke in navigation-forms.js"

- **Ursache:** Zwei identische export-Blöcke am Ende der Datei (Zeile 280-293)
- **Problem:** Code-Duplikation und potentielle Konflikte
- **Lösung:** Einen der Export-Blöcke entfernen

### "Event-Handler werden mehrfach aufgerufen"

- **Ursache:** `handleCartItemClick` wird bei jedem `renderCartItems()` neu hinzugefügt
- **Problem:** Memory Leaks und mehrfache Ausführung
- **Lösung:** Event-Delegation auf Container-Level verwenden

### "Mobile Cart FAB wird nicht angezeigt"

- **Ursache:** Initialisierung ist auskommentiert in `cart-ui.js` (Zeile 281-287)
- **Problem:** FAB wird nie erstellt oder angezeigt
- **Lösung:** Initialisierung aktivieren oder in `cart.js` einbauen

### "Formspree-Integration funktioniert nicht"

- **Ursache:** Form verwendet `class="form"` aber JS sucht nach `.form`
- **Problem:** Event-Listener wird nicht gesetzt
- **Lösung:** Selektoren angleichen oder HTML/JS anpassen

### **GENERELLE PROBLEME:**

### "Module not loaded"

- **Ursache:** Script-Tags in falscher Reihenfolge oder ES6 Module-Konflikte
- **Lösung:** Module-Abhängigkeiten prüfen und Ladereihenfolge anpassen

### "Templates laden nicht"

- **Ursache:** Pfade oder CORS-Probleme
- **Lösung:** Relative Pfade und Local Server verwenden

### "Event-Handler funktionieren nicht"

- **Ursache:** Event-Delegation oder Timing-Probleme
- **Lösung:** `document.addEventListener` mit Event-Delegation verwenden

## 🔧 SOFORTIGE FIXES ERFORDERLICH:

1. **templateHTML.js korrigieren:**

   ```javascript
   // Entweder ES6 Module verwenden:
   import { getCartItemHTML } from './scripts/templateHTML.js';

   // Oder window-Export hinzufügen:
   window.templateHTML = { getCartItemHTML, getFABContent, ... };
   ```

2. **Doppelte Exports entfernen in navigation-forms.js**

3. **Cart FAB Initialisierung aktivieren in cart-ui.js**

4. **Event-Listener Cleanup in cart-ui.js:**

   ```javascript
   // Statt removeEventListener/addEventListener bei jedem Render
   // Event-Delegation auf Document-Level verwenden
   ```

5. **Form-Selektor in navigation-forms.js korrigieren**
