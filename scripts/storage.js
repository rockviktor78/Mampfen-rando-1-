/**
 * Saves cart data to LocalStorage
 * @param {Array} cartData - The cart data to save
 */
let saveCart = (cartData) => {
  localStorage.setItem("mampfen-rando-cart", JSON.stringify(cartData));
};

/**
 * Loads cart data from LocalStorage
 * @returns {Array} The saved cart data or an empty array
 */
let loadCart = () => {
  let cartData = localStorage.getItem("mampfen-rando-cart");
  return cartData ? JSON.parse(cartData) : [];
};

/**
 * Deletes all cart data from LocalStorage
 */
let clearCart = () => {
  localStorage.removeItem("mampfen-rando-cart");
};

window.storageHandler = {
  saveCart,
  loadCart,
  clearCart,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { saveCart, loadCart, clearCart };
}
