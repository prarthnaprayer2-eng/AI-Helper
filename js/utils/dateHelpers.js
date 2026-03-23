// Date formatting and calculation helpers
const today = new Date();

export const fmt = d => new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short' });

export const daysUntil = d => Math.ceil((new Date(d) - today) / 86400000);

export const getToday = () => today;

export const formatDateLong = (date, options = {}) => {
  return new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    ...options
  });
};
