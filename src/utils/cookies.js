// Cookie and LocalStorage persistence helper for user state & cart

/**
 * Set a cookie with expiration days and SameSite protection
 */
export function setCookie(name, value, days = 365) {
  try {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    const stringified = typeof value === 'object' ? JSON.stringify(value) : String(value);
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(stringified)}${expires}; path=/; SameSite=Lax`;
  } catch (e) {
    // Fallback if cookies restricted
  }
}

/**
 * Get a cookie by name
 */
export function getCookie(name) {
  try {
    const nameEQ = encodeURIComponent(name) + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        const rawValue = decodeURIComponent(c.substring(nameEQ.length, c.length));
        try {
          return JSON.parse(rawValue);
        } catch {
          return rawValue;
        }
      }
    }
  } catch (e) {
    // Fallback if cookies restricted
  }
  return null;
}

/**
 * Persist cart items to cookie and localStorage
 */
export function saveCartState(cartItems) {
  try {
    localStorage.setItem('ecommerce_cart_v1', JSON.stringify(cartItems));
  } catch (e) {}
  setCookie('ecommerce_cart_v1', cartItems, 30);
}

/**
 * Load cart items from cookie or localStorage fallback
 */
export function loadCartState() {
  const fromCookie = getCookie('ecommerce_cart_v1');
  if (Array.isArray(fromCookie)) {
    return fromCookie;
  }
  try {
    const fromStorage = localStorage.getItem('ecommerce_cart_v1');
    if (fromStorage) {
      const parsed = JSON.parse(fromStorage);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

/**
 * Persist selected currency
 */
export function saveCurrencyState(currency) {
  try {
    localStorage.setItem('ecommerce_currency_v1', currency);
  } catch (e) {}
  setCookie('ecommerce_currency_v1', currency, 365);
}

/**
 * Load selected currency
 */
export function loadCurrencyState() {
  const fromCookie = getCookie('ecommerce_currency_v1');
  if (typeof fromCookie === 'string' && fromCookie) {
    return fromCookie;
  }
  try {
    const fromStorage = localStorage.getItem('ecommerce_currency_v1');
    if (fromStorage) return fromStorage;
  } catch (e) {}
  return 'USD';
}
