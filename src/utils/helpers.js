/**
 * Formats a number as Nigerian Naira (NGN)
 */
export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

/**
 * Formats a date string or object into a readable format
 */
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Generates a unique booking reference
 */
export const generateBookingReference = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "ZM-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Calculates the total price for a set of tickets
 */
export const calculateBookingTotal = (selectedTickets) => {
  return Object.entries(selectedTickets).reduce((total, [price, count]) => {
    return total + (Number(price) * Number(count));
  }, 0);
};

/**
 * Truncates text to a specified length
 */
export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + "...";
};
