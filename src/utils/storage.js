import { STORAGE_KEYS } from "./constants";

/**
 * Basic localStorage wrappers
 */
export const getItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return fallback;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
};

/**
 * Animal data management
 */
export const seedAnimals = (defaultAnimals) => {
  if (!getItem(STORAGE_KEYS.ANIMALS)) {
    setItem(STORAGE_KEYS.ANIMALS, defaultAnimals);
  }
};

export const getAnimals = () => getItem(STORAGE_KEYS.ANIMALS, []);

export const saveAnimals = (data) => setItem(STORAGE_KEYS.ANIMALS, data);

/**
 * Booking data management
 */
export const getBookings = () => getItem(STORAGE_KEYS.BOOKINGS, []);

export const saveBookings = (bookings) => setItem(STORAGE_KEYS.BOOKINGS, bookings);

export const addBooking = (newBooking) => {
  const currentBookings = getBookings();
  setItem(STORAGE_KEYS.BOOKINGS, [newBooking, ...currentBookings]);
};

export const getBookingById = (id) => {
  const bookings = getBookings();
  return bookings.find((b) => b.id === id);
};

/**
 * Checkout draft management
 */
export const saveCheckoutDraft = (data) => setItem(STORAGE_KEYS.CHECKOUT_DRAFT, data);

export const getCheckoutDraft = () => getItem(STORAGE_KEYS.CHECKOUT_DRAFT);

export const clearCheckoutDraft = () => localStorage.removeItem(STORAGE_KEYS.CHECKOUT_DRAFT);

/**
 * Visitor data management
 */
export const getVisitors = () => getItem(STORAGE_KEYS.VISITORS, []);

export const saveVisitors = (data) => setItem(STORAGE_KEYS.VISITORS, data);

/**
 * Auth / Session management
 */
export const getCurrentUser = () => getItem(STORAGE_KEYS.CURRENT_USER);

export const setCurrentUser = (user) =>
  setItem(STORAGE_KEYS.CURRENT_USER, user);

export const logoutCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  localStorage.removeItem(STORAGE_KEYS.STAFF_SESSION);
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  window.location.reload();
};
