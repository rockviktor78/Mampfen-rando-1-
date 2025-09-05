// Global verfügbar machen
if (!window.delivery) {
  window.delivery = { calculateDelivery };
}
// Lieferservice-Berechnung für Warenkorb und Checkout

export function calculateDelivery(distanceKm, orderValue) {
  let minOrder = 0;
  let deliveryCost = 0;
  let info = "";

  if (orderValue >= 25) {
    deliveryCost = 0;
    info = "Ab 25 € Bestellwert überall kostenfreie Lieferung.";
    minOrder = 0;
  } else if (distanceKm <= 3) {
    minOrder = 12;
    deliveryCost = 0;
    info = "0–3 km: Mindestbestellwert 12 €, Lieferung kostenlos.";
  } else if (distanceKm <= 5) {
    minOrder = 15;
    deliveryCost = 2.0;
    info = "3–5 km: Mindestbestellwert 15 €, Lieferung +2,00 €.";
  } else if (distanceKm <= 7) {
    minOrder = 20;
    deliveryCost = 3.5;
    info = "5–7 km: Mindestbestellwert 20 €, Lieferung +3,50 €.";
  } else {
    minOrder = 25;
    deliveryCost = null;
    info = "über 7 km: Mindestbestellwert 25 €, Lieferkosten nach Absprache.";
  }

  return {
    minOrder,
    deliveryCost,
    info,
    freePickup: "Selbstabholung: immer kostenlos, 10% Rabatt möglich.",
  };
}
