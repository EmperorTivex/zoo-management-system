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

export const setAnimals = (animals) => setItem(STORAGE_KEYS.ANIMALS, animals);

/** @deprecated Use setAnimals instead */
export const saveAnimals = setAnimals;

/**
 * Booking data management
 */
export const getBookings = () => getItem(STORAGE_KEYS.BOOKINGS, []);

export const setBookings = (bookings) =>
  setItem(STORAGE_KEYS.BOOKINGS, bookings);

export const addBooking = (newBooking) => {
  setBookings([newBooking, ...getBookings()]);
};

export const updateBooking = (id, updates) => {
  setBookings(
    getBookings().map((b) => (b.id === id ? { ...b, ...updates } : b)),
  );
};

export const getBookingById = (id) => {
  const bookings = getBookings();
  return bookings.find((b) => b.id === id);
};

/**
 * Checkout draft management
 */
export const saveCheckoutDraft = (data) =>
  setItem(STORAGE_KEYS.CHECKOUT_DRAFT, data);

export const getCheckoutDraft = () => getItem(STORAGE_KEYS.CHECKOUT_DRAFT);

export const clearCheckoutDraft = () =>
  localStorage.removeItem(STORAGE_KEYS.CHECKOUT_DRAFT);

/**
 * Visitor data management
 */
export const getVisitors = () => getItem(STORAGE_KEYS.VISITORS, []);

export const setVisitors = (visitors) => setItem(STORAGE_KEYS.VISITORS, visitors);

/** @deprecated Use setVisitors instead */
export const saveVisitors = setVisitors;

export const getVisitorByEmail = (email) =>
  getVisitors().find(
    (v) => v.email.toLowerCase() === email.toLowerCase().trim(),
  );

export const addVisitor = (visitor) => {
  setVisitors([...getVisitors(), visitor]);
};

/**
 * Visitor auth / session
 */
export const getCurrentUser = () => getItem(STORAGE_KEYS.CURRENT_USER);

export const setCurrentUser = (user) =>
  setItem(STORAGE_KEYS.CURRENT_USER, user);

export const clearCurrentUser = () =>
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

/**
 * Staff session
 */
export const getStaffSession = () => getItem(STORAGE_KEYS.STAFF_SESSION);

export const setStaffSession = (session) =>
  setItem(STORAGE_KEYS.STAFF_SESSION, session);

export const clearStaffSession = () =>
  localStorage.removeItem(STORAGE_KEYS.STAFF_SESSION);

export const logoutCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  clearStaffSession();
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  window.location.reload();
};
