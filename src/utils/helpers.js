export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

/**
 * This is to format  a date string or object into a readable format
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
 * This code genrates a unique booking reference
 *
 */
export const generateBookingReference = () => {
  return `BK-${Math.floor(100000 + Math.random() * 900000)}`;
};
