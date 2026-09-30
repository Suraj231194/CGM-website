// Shared formatting for the account pages (profile, order history, order details,
// order confirmation). ProductCard and MainLayout keep their own price helpers.

export const formatPrice = (v) => `₹${Number(v).toLocaleString('en-IN')}`;

export const formatDate = (d, { withTime = false } = {}) =>
    new Date(d).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}),
    });
