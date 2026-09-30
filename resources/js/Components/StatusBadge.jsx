/*
 * One status vocabulary for the account pages. The class strings live in this .jsx file
 * (not in lib/) so Tailwind's content glob sees them and they are not purged.
 *
 * Keys match the backend exactly: orders are placed/confirmed/shipped/delivered/cancelled,
 * payments pending/pending_verification/paid/failed, tickets open/in_progress/resolved/closed.
 */
const NEUTRAL = 'bg-sand-100 text-ink-700 ring-ink-900/10';
const SOFT_BRAND = 'bg-brand-50 text-brand-700 ring-brand-600/15';
const SOLID_BRAND = 'bg-brand-700 text-white ring-brand-700';
const SUCCESS = 'bg-green-50 text-green-800 ring-green-700/15';
const DANGER = 'bg-red-50 text-red-800 ring-red-700/15';
const WARNING = 'bg-amber-50 text-amber-800 ring-amber-700/15';

export const ORDER_STATUS = {
    placed: { label: 'Placed', cls: NEUTRAL },
    confirmed: { label: 'Confirmed', cls: SOFT_BRAND },
    shipped: { label: 'Shipped', cls: SOLID_BRAND },
    delivered: { label: 'Delivered', cls: SUCCESS },
    cancelled: { label: 'Cancelled', cls: DANGER },
};

export const PAYMENT_STATUS = {
    pending: { label: 'Awaiting payment', cls: WARNING },
    pending_verification: { label: 'Verifying payment', cls: SOFT_BRAND },
    paid: { label: 'Paid', cls: SUCCESS },
    failed: { label: 'Payment failed', cls: DANGER },
};

export const TICKET_STATUS = {
    open: { label: 'Open', cls: SOFT_BRAND },
    in_progress: { label: 'In progress', cls: SOLID_BRAND },
    resolved: { label: 'Resolved', cls: SUCCESS },
    closed: { label: 'Closed', cls: 'bg-sand-100 text-ink-600 ring-ink-900/10' },
};

export const PAYMENT_METHOD_LABELS = {
    cod: 'Cash on delivery',
    online: 'UPI',
};

const MAPS = {
    order: ORDER_STATUS,
    payment: PAYMENT_STATUS,
    ticket: TICKET_STATUS,
};

export default function StatusBadge({ kind, value }) {
    // Unknown values fall back to the raw value on the neutral 'placed' style.
    const entry = MAPS[kind]?.[value];
    const label = entry ? entry.label : value;
    const cls = entry ? entry.cls : NEUTRAL;

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${cls}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {label}
        </span>
    );
}
