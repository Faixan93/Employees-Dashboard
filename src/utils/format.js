/**
 * Formats an ISO date string into a human-readable date.
 *
 * @param {string} iso - ISO 8601 date string (e.g., "2025-08-09T10:00:00Z").
 * @returns {string} - Formatted date string based on the user's locale, 
 *                     or an empty string if no date is provided.
 */
export const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString();
};
