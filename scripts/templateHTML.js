// --- Ausgelagerte HTML-Templates ---

export function getSuccessPopupHTML() {
  return `
		<div class="success-popup_content success-popup_content--success">
			<span class="success-popup_icon">✅</span>
			<p class="success-popup_text">Nachricht erfolgreich gesendet!</p>
		</div>
	`;
}

export function getErrorPopupHTML(message) {
  return `
		<div class="success-popup_content success-popup_content--error">
			<span class="success-popup_icon">❌</span>
			<p class="success-popup_text">${message}</p>
		</div>
	`;
}

// export function getFABContent() {
//   return `
// 		🛒
// 		<span class="mobile-cart-fab_count" id="mobileCartFABCount">0</span>
// 	`;
// }

export function getCartItemHTML(item) {
  return `
		<div class="cart-item">
			<div class="cart-item_info">
				<div class="cart-item_name">${item.name}</div>
				<div class="cart-item_price-info">
					<div class="cart-item_single-price">${item.price.toFixed(2)} € × ${
    item.quantity
  }</div>
					<div class="cart-item_total-price">${(item.price * item.quantity).toFixed(
            2
          )} €</div>
				</div>
			</div>
			<div class="cart-item_controls">
				<button class="cart-item_btn cart-item_btn--decrease" data-item="${
          item.name
        }" data-action="decrease">−</button>
				<span class="cart-item_quantity">${item.quantity}</span>
				<button class="cart-item_btn cart-item_btn--increase" data-item="${
          item.name
        }" data-action="increase">+</button>
				<button class="cart-item_btn cart-item_btn--delete" data-item="${
          item.name
        }" data-action="delete" title="Gericht entfernen">×</button>
			</div>
		</div>
	`;
}

export function getAddToCartMessageHTML(itemName) {
  return `
		<span class="add-to-cart-message__icon">✓</span>
		<span class="add-to-cart-message__text">${itemName} hinzugefügt</span>
	`;
}

export function getCheckoutPopupHTML(message, type) {
  return `
		<div class="checkout-popup_content checkout-popup_content--${type}">
			<span class="checkout-popup_icon">${type === "success" ? "✅" : "❌"}</span>
			<p class="checkout-popup_text">${message}</p>
		</div>
	`;
}
// HTML-Templates ausgelagert aus cart-ui.js
// HTML-Templates für Popups aus navigation-forms.js
export function getSuccessPopupHTML() {
  return `
		<div class="success-popup_content success-popup_content--success">
			<span class="success-popup_icon">✅</span>
			<p class="success-popup_text">Nachricht erfolgreich gesendet!</p>
		</div>
	`;
}

export function getErrorPopupHTML(message) {
  return `
		<div class="success-popup_content success-popup_content--error">
			<span class="success-popup_icon">❌</span>
			<p class="success-popup_text">${message}</p>
		</div>
	`;
}

export function getCartItemHTML(item) {
  return `
		<div class="cart-item">
			<div class="cart-item_info">
				<div class="cart-item_name">${item.name}</div>
				<div class="cart-item_price-info">
					<div class="cart-item_single-price">${item.price.toFixed(2)} € × ${
    item.quantity
  }</div>
					<div class="cart-item_total-price">${(item.price * item.quantity).toFixed(
            2
          )} €</div>
				</div>
			</div>
			<div class="cart-item_controls">
				<button class="cart-item_btn cart-item_btn--decrease" data-item="${
          item.name
        }" data-action="decrease">−</button>
				<span class="cart-item_quantity">${item.quantity}</span>
				<button class="cart-item_btn cart-item_btn--increase" data-item="${
          item.name
        }" data-action="increase">+</button>
				<button class="cart-item_btn cart-item_btn--delete" data-item="${
          item.name
        }" data-action="delete" title="Gericht entfernen">×</button>
			</div>
		</div>
	`;
}
