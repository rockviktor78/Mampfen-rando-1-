# Copilot Instructions für Lieferando-Clone MPA

## Projekt-Konventionen

- **Pseudo-MPA mit includeHTML.js**: Eine zentrale index.html mit dynamischem Content-Loading über Templates
- Navigation über Hash-URLs (#home, #menu, #basket, #order)
- Für DOM-Zugriffe in allen JavaScript-Dateien immer `getElementById` verwenden. Kein `getElementsByClassName`.
- Für Styling in CSS immer Klassen (`.css`) mit Bindestrich verwenden (z.B. `.menu-item`).
- Für JavaScript-Selektoren immer IDs (`id="..."`) im HTML verwenden, im Kamelcase-Stil (z.B. `menuContainer`).
- IDs sind ausschließlich für JavaScript-Zugriffe reserviert.
- Klassen sind ausschließlich für CSS-Styles reserviert.
- Immer `let` oder `const` verwenden, niemals `var`.
- HTML-Tag Elemente immer zum stylen mit class="" versehen, niemals ohne.

## JavaScript-Datei-Beschränkungen

- **Maximale Dateigröße**: Jede JavaScript-Datei darf maximal 399 Zeilen lang sein.
- **HTML-Template-Auslagerung**: Alle HTML-Inhalte müssen in die zentrale `templateHTML.js` Datei ausgelagert werden.
- **Template-Struktur**: HTML-Templates werden als Funktionen in einem `templates`-Objekt organisiert.
- **Keine Inline-HTML**: JavaScript-Dateien dürfen keine HTML-Strings oder Template-Literals mit HTML-Inhalten enthalten.

## Template-System

```javascript
// templateHTML.js Struktur
const templates = {
  componentName: function (param1, param2) {
    return /*html*/ `<div>HTML Content</div>`;
  },
  // Weitere Templates...
};
window.templates = templates;
```

## Projekt-Struktur

```
/
├── index.html              # Zentrale HTML-Datei mit Content-Container
├── assets/
│   ├── images/            # Restaurant- und Gericht-Bilder
│   └── icons/             # Icons für UI
├── styles/
│   ├── global.css         # Globale Styles und CSS-Variablen
│   ├── layout.css         # Allgemeine Layout-Strukturen
│   ├── components/        # Modulare Komponenten-Styles
│   │   ├── header.css     # Header-spezifische Styles
│   │   ├── footer.css     # Footer-spezifische Styles
│   │   ├── buttons.css    # Button-Komponenten
│   │   ├── cards.css      # Card-Komponenten
│   │   └── forms.css      # Formular-Komponenten
│   └── pages/             # Seiten-spezifische Styles
│       ├── home.css       # Startseite-spezifische Styles
│       ├── menu.css       # Speisekarte-spezifische Styles
│       ├── basket.css     # Warenkorb-spezifische Styles
│       └── order.css      # Bestellbestätigung-spezifische Styles
├── scripts/
│   ├── templateHTML.js   # Zentrale HTML-Template-Sammlung
│   ├── includeHTML.js    # Template-Loading System
│   ├── navigation.js     # Button-basierte Navigation
│   ├── storage.js        # LocalStorage-Verwaltung
│   ├── cart-core.js      # Warenkorb-Kern-Logik
│   ├── cart-ui.js        # Warenkorb-UI-Funktionen
│   ├── cart-init.js      # Warenkorb-Initialisierung
│   ├── utils.js          # Hilfsfunktionen
│   ├── home.js           # Startseite-spezifische Logik
│   ├── menu.js           # Speisekarte-spezifische Logik
│   ├── basket.js         # Warenkorb-spezifische Logik
│   └── order.js          # Bestellbestätigung-spezifische Logik
└── templates/
    ├── header.html       # Header-Template
    ├── footer.html       # Footer-Template
    ├── home-content.html # Startseite-Content
    ├── menu-content.html # Speisekarte-Content
    ├── basket-content.html # Warenkorb-Content
    └── order-content.html # Bestellbestätigung-Content
```

## includeHTML.js System

- **Template-Loading**: HTML-Templates werden dynamisch über `includeHTML()` geladen
- **Button-Navigation**: Einfache Button/Link-basierte Navigation ohne URL-Änderung
- **Content-Container**: Zentraler `<div id="content">` für dynamische Inhalte
- **Shared Components**: Header und Footer werden einmalig geladen
- **Page-specific Scripts**: Verschiedene JS-Module für verschiedene "Seiten"

## Lieferando-Features

- **Restaurant-Auswahl**: Keine
<!-- - **Speisekarte**: Kategorisierte Gerichte (Pizza, Pasta, Salate, Desserts) -->
- **Warenkorb**: Hinzufügen, Entfernen, Menge ändern
- **Bestellprozess**: Bestellbestätigung
- **Persistierung**: LocalStorage für Warenkorb zwischen Seitenaufrufen
- **Lieferkosten**: Feste Lieferkosten (z.B. 5.00€) für Bestellungen unter 25.00€ mit Angabe im Warenkorb und mit Berechnung im Gesamtpreis

## JavaScript-Funktionsrichtlinien

- Jede Funktion darf maximal 14 Zeilen lang sein.
- Jede Funktion soll nur eine einzige, klar definierte Aufgabe erfüllen. Sprich, HTML, Styling und Logik strikt trennen.
- Komplexe Funktionen in kleinere Hilfsfunktionen aufteilen.
- Keine verschachtelten Funktionen verwenden.
- Bei Überschreitung der Zeilenbegrenzung: Funktion in mehrere spezialisierte Funktionen aufteilen.
- Arrow Functions bevorzugen, außer bei Konstruktoren oder Event Handlers die `this` benötigen.
- Konsistente Benennung: Funktionen im Kamelcase-Stil (z.B. `loadMenuItems`, `updateCartTotal`).
- **HTML-Templates**: Alle HTML-Inhalte müssen in `templateHTML.js` als Funktionen organisiert werden.
- **Template-Verwendung**: JavaScript-Dateien verwenden `window.templates.functionName()` für HTML-Erzeugung.

## Verbot von JavaScript-Klassen

- **Keine ES6-Klassen verwenden:**  
  Für das gesamte Projekt dürfen **keine JavaScript-Klassen** (`class ... {}`) verwendet werden.  
  Stattdessen ist ausschließlich mit Funktionen (ohne Arrow Functions) und Modulen (`import`/`export`) zu arbeiten.
- **Keine Konstruktoren und Methoden:**  
  Konstruktor-basierte Ansätze (`constructor()`, Methoden in Klassen) sind nicht erlaubt.
- **Komponenten und Logik als reine Funktionen:**  
  Alle wiederverwendbaren Komponenten, Logik und Utilities werden als reine Funktionen oder Module implementiert.
- **Gemeinsamer Zustand ohne Klassen:**  
  Gemeinsame Daten (wie z. B. der Warenkorb) werden über einfache Funktionen, Objekte oder Module verwaltet. Für die Persistierung kann z. B. `localStorage` genutzt werden.  
  Ein komplexes State-Management wie bei SPAs ist nicht notwendig.
  Objekte mit 'new' zu instanziieren ist nicht erlaubt.

**Beispiel (nicht erlaubt):**

```js
class MobileNavigation {
  constructor() { ... }
  openMenu() { ... }
}
```

**Korrekt (erlaubt):**

```js
/**
 * Öffnet das mobile Menü.
 */
let openMobileMenu = () => { ... };
```

**Hinweis:**  
Diese Regel gilt projektweit und betrifft alle JavaScript-Dateien.

## JSDoc-Anforderungen

- Alle JavaScript-Funktionen müssen JSDoc-Kommentare auf Deutsch haben.
- JSDoc-Format verwenden: `/** */`
- Kurze, prägnante Beschreibung der Funktionsaufgabe.
- Parameter mit `@param {type} name - Beschreibung` dokumentieren.
- Rückgabewerte mit `@returns {type} Beschreibung` dokumentieren.
- Deutsche Beschreibungen und Parameter-Erklärungen verwenden.
- Bei async Funktionen: `@async` verwenden.

## State Management Pattern

- LocalStorage für Warenkorb-Persistierung zwischen Seitenaufrufen nutzen.
- Einheitliche Datenstruktur für Warenkorb-Items.
- Shared JavaScript-Module für gemeinsame Funktionalitäten.
- Button-basierte Navigation für Seitenwechsel.

## Error Handling

- Try-catch Blöcke für potentiell fehlerhafte Operationen verwenden.
- Aussagekräftige Fehlermeldungen in deutscher Sprache.
- Console.error für Debugging-Informationen nutzen.

## Weitere Best Practices

- Keine Inline-Styles oder Inline-Eventhandler im HTML.
- Keine Magic Numbers oder Strings – stattdessen Konstanten verwenden.
- **ECMAScript Modules**: Ausschließlich moderne ES6+ Module verwenden (`import`/`export`). Keine CommonJS (`require`/`module.exports`). Target: `module: "es2020"`.
- **CSS Custom Properties (Variablen)**: Alle Farben über CSS-Variablen im :root definieren. Keine Hex-Codes direkt im CSS verwenden.
- **Relative Einheiten**: Immer `rem` für Größen, Abstände und Schriftgrößen verwenden. Keine `px` außer bei Borders (1px), box-shadow und @media. Auf zwei     Dezimalstellen runden.
- Konsistente Farbpalette: Haupt-, Sekundär-, Akzent- und Neutralfarben definieren.
- Komponenten und Funktionen klar benennen.
- Keine doppelten IDs oder Klassennamen.
- **Mobile First Design**: Styles zuerst für mobile Geräte entwickeln, dann mit Media Queries für größere Bildschirme erweitern.
- Responsive Design mit CSS sicherstellen - Breakpoints: 768px (Tablet), 1024px (Desktop), 1200px (Large Desktop).
- Touch-freundliche Buttons und Interaktionselemente (min. 2.75rem Höhe).
- Accessibility (a11y) beachten: Semantisches HTML, ARIA-Attribute wo nötig.
- Konsistente Code-Formatierung (z.B. Prettier, EditorConfig).
- Keine externen Frameworks oder Libraries verwenden.
- **Navigation**: Button-basierte Navigation mit `loadPage()` Funktionen statt Hash-URLs.

## Modulare CSS-Architektur

- **Komponenten-basierte Styles**: Jede UI-Komponente hat eigene CSS-Datei
- **BEM-ähnliche Namenskonvention**: `.header`, `.header_logo`, `.header_nav`
- **CSS Custom Properties**: Zentrale Design-Tokens in global.css
- **Import-Reihenfolge**: global.css → layout.css → components → pages
- **Keine CSS-Duplikation**: Gemeinsame Styles in globalen Dateien
- **Responsive Breakpoints**: Konsistent in allen Komponenten verwenden
