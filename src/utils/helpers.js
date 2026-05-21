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
  return `BK-${Math.floor(100000 + Math.random() * 900000)}`;
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

/**
 * Gets selected tickets from ticket types and quantities
 */
export const getSelectedTickets = (ticketTypes, quantities) => {
  return ticketTypes.map(ticket => ({
    ...ticket,
    quantity: quantities[ticket.id] || 0,
  })).filter(ticket => ticket.quantity > 0);
};
