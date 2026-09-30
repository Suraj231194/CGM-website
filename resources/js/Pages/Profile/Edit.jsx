import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import MainLayout from '@/Layouts/MainLayout';
import StatusBadge, { PAYMENT_METHOD_LABELS } from '@/Components/StatusBadge';
import { formatDate, formatPrice } from '@/lib/format';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import {
    ClipboardList,
    Calendar,
    Eye,
    CreditCard,
    Truck,
    FileText,
    ArrowLeft,
    ShieldAlert,
    Settings,
    ShoppingBag,
    CheckCircle2,
    MessageSquare,
    Send,
    AlertTriangle,
    Check
} from 'lucide-react';

export default function Edit({ mustVerifyEmail, status, orders = [], tickets = [] }) {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('settings'); // settings | orders | tickets
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Sync selected ticket with latest data from props when props.tickets changes
    const activeTicket = selectedTicket
        ? tickets.find(t => t.id === selectedTicket.id) || selectedTicket
        : null;

    const [replyMessage, setReplyMessage] = useState('');
    const [replying, setReplying] = useState(false);
    const [replyError, setReplyError] = useState(null);

    const submitReply = (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        if (replying || !replyMessage.trim()) return;

        setReplying(true);
        setReplyError(null);

        axios.post(`/support-tickets/${activeTicket.id}/reply`, {
            message: replyMessage,
        })
        .then(() => {
            setReplyMessage('');
            router.reload({ only: ['tickets'] });
        })
        .catch((err) => {
            console.error('Error replying to ticket:', err);
            setReplyError(err.response?.data?.message || 'Failed to send reply. Please try again.');
        })
        .finally(() => {
            setReplying(false);
        });
    };

    // Calculate user statistics (cancelled orders are not money spent)
    const totalSpent = orders
        .filter((o) => o.status !== 'cancelled')
        .reduce((sum, order) => sum + Number(order.total), 0);
    const completedOrders = orders.filter(o => o.status === 'delivered').length;

    // Account identity: the signed-in user first, the latest shipping address as a fallback
    const displayName = auth.user?.name || orders[0]?.shipping_address?.name;
    const displayEmail = auth.user?.email || orders[0]?.shipping_address?.email;
    const memberSince = auth.user?.created_at ? `Member since ${formatDate(auth.user.created_at)}` : 'Registered member';

    // Tab rail styles (full literals so Tailwind sees every class)
    const tabClass = (active) =>
        `inline-flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition lg:rounded-2xl lg:px-5 lg:py-3.5 ${active ? 'bg-brand-800 text-white shadow-soft' : 'bg-white text-ink-600 ring-1 ring-ink-900/[0.06] hover:text-brand-700'}`;
    const tabCountClass = (active) =>
        `ml-auto rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${active ? 'bg-white/15 text-white' : 'bg-sand-100 text-ink-600'}`;

    // Helper for visual order tracker steps
    const orderSteps = ['placed', 'confirmed', 'shipped', 'delivered'];
    const getStepIndex = (status) => orderSteps.indexOf(status);

    return (
        <MainLayout>
            <Head title="My account" />

            <div className="pb-20 pt-8 md:pt-12">
                <div className="container-page space-y-8">

                    {/* Profile Header Card */}
                    <div className="relative overflow-hidden rounded-4xl bg-radiance grain text-white shadow-lift">
                        <div className="relative z-10 flex flex-col justify-between gap-8 p-6 text-white sm:p-8 md:p-10 lg:flex-row lg:items-center">
                            {/* Profile details */}
                            <div className="flex min-w-0 items-center gap-5 sm:gap-6">
                                <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white/10 font-display text-3xl font-normal text-white ring-1 ring-white/20 sm:h-20 sm:w-20" aria-hidden="true">
                                    {(auth.user?.name || orders[0]?.shipping_address?.name || 'M')[0].toUpperCase()}
                                </div>
                                <div className="min-w-0 space-y-1">
                                    <h1 className="flex flex-wrap items-center gap-3 font-display text-3xl font-normal tracking-tight sm:text-4xl">
                                        <span className="min-w-0 break-words">{displayName || 'Your account'}</span>
                                        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-sans text-xs font-medium tracking-normal text-white/80">Member</span>
                                    </h1>
                                    {displayEmail && (
                                        <p className="break-words text-sm text-white/70">{displayEmail}</p>
                                    )}
                                    <p className="mt-1 flex items-center gap-1 text-xs text-white/60">
                                        <Calendar size={12} aria-hidden="true" /> {memberSince}
                                    </p>
                                </div>
                            </div>

                            {/* Dashboard Metrics */}
                            <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-3 sm:p-5 lg:gap-6">
                                <div className="col-span-2 space-y-1 border-b border-white/10 pb-3 sm:col-span-1 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
                                    <span className="block text-xs font-medium uppercase tracking-[0.14em] text-white/70">Total Spent</span>
                                    <span className="block font-display text-3xl tabular-nums text-white">{formatPrice(totalSpent)}</span>
                                </div>
                                <div className="space-y-1 sm:border-r sm:border-white/10 sm:pr-4">
                                    <span className="block text-xs font-medium uppercase tracking-[0.14em] text-white/70">Device Orders</span>
                                    <span className="block font-display text-3xl tabular-nums text-white">{orders.length}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-xs font-medium uppercase tracking-[0.14em] text-white/70">Delivered</span>
                                    <span className="flex items-center gap-1 font-display text-3xl tabular-nums text-glow">
                                        {completedOrders} <CheckCircle2 size={20} aria-hidden="true" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid items-start gap-8 lg:grid-cols-12">
                        {/* Left Column Navigation Rail (a scrolling row on phones, a column from lg) */}
                        <nav aria-label="Account sections" className="-m-1.5 flex gap-2 overflow-x-auto p-1.5 lg:col-span-3 lg:flex-col lg:gap-1.5">
                            <button
                                type="button"
                                onClick={() => { setActiveTab('settings'); setSelectedOrder(null); setSelectedTicket(null); }}
                                aria-pressed={activeTab === 'settings'}
                                className={tabClass(activeTab === 'settings')}
                            >
                                <Settings size={18} aria-hidden="true" /> Account settings
                            </button>
                            <button
                                type="button"
                                onClick={() => { setActiveTab('orders'); setSelectedTicket(null); }}
                                aria-pressed={activeTab === 'orders'}
                                className={tabClass(activeTab === 'orders')}
                            >
                                <ShoppingBag size={18} aria-hidden="true" /> Order history
                                {orders.length > 0 && (
                                    <span className={tabCountClass(activeTab === 'orders')}>
                                        {orders.length}
                                    </span>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setActiveTab('tickets'); setSelectedOrder(null); }}
                                aria-pressed={activeTab === 'tickets'}
                                className={tabClass(activeTab === 'tickets')}
                            >
                                <MessageSquare size={18} aria-hidden="true" /> Support tickets
                                {tickets.length > 0 && (
                                    <span className={tabCountClass(activeTab === 'tickets')}>
                                        {tickets.length}
                                    </span>
                                )}
                            </button>
                        </nav>

                        {/* Right Column Content View */}
                        <div className="min-w-0 space-y-6 lg:col-span-9">

                            {/* Settings View */}
                            {activeTab === 'settings' && (
                                <div className="space-y-6">
                                    <div className="card p-6 md:p-8">
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                        />
                                    </div>

                                    <div className="card p-6 md:p-8">
                                        <UpdatePasswordForm />
                                    </div>

                                    <div className="card border-red-200/70 p-6 md:p-8">
                                        <DeleteUserForm />
                                    </div>
                                </div>
                            )}

                            {/* Orders View */}
                            {activeTab === 'orders' && (
                                <div className="space-y-6">

                                    {/* Order Details Panel */}
                                    {selectedOrder ? (
                                        <div className="card animate-fade-in space-y-8 p-6 md:p-8">
                                            {/* Header details */}
                                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-900/[0.06] pb-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedOrder(null)}
                                                    className="inline-flex items-center text-sm font-semibold text-ink-500 transition hover:text-brand-700"
                                                >
                                                    <ArrowLeft size={16} className="mr-1.5" aria-hidden="true" /> Back to history
                                                </button>
                                                <h2 className="text-sm font-semibold tracking-tight tabular-nums text-ink-900">Order #{selectedOrder.order_number}</h2>
                                            </div>

                                            {/* Visual Progress Tracker */}
                                            {selectedOrder.status !== 'cancelled' ? (
                                                <div className="py-4">
                                                    <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Delivery progress</h3>
                                                    <div className="relative">
                                                        {/* Connector line */}
                                                        <div className="absolute left-4 right-4 top-4 z-0 h-1 -translate-y-1/2 rounded-full bg-ink-900/10">
                                                            <div
                                                                className="h-full rounded-full bg-brand-600 transition-all duration-500"
                                                                style={{ width: `${(Math.max(getStepIndex(selectedOrder.status), 0) / (orderSteps.length - 1)) * 100}%` }}
                                                            />
                                                        </div>

                                                        {/* Progress Steps */}
                                                        <ol className="relative z-10 flex justify-between">
                                                            {orderSteps.map((step, idx) => {
                                                                const isCompleted = idx <= getStepIndex(selectedOrder.status);
                                                                const isActive = step === selectedOrder.status;
                                                                return (
                                                                    <li key={step} className="flex flex-col items-center text-center" aria-current={isActive ? 'step' : undefined}>
                                                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition duration-300 ${isCompleted ? 'border-brand-700 bg-brand-700 text-white' : 'border-ink-900/10 bg-white text-ink-500'}`}>
                                                                            {isCompleted ? <Check size={14} aria-hidden="true" /> : idx + 1}
                                                                        </div>
                                                                        <span className={`mt-2.5 text-xs font-semibold capitalize ${isActive ? 'text-brand-700' : isCompleted ? 'text-ink-700' : 'text-ink-500'}`}>
                                                                            {step}
                                                                        </span>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ol>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-800">
                                                    <ShieldAlert size={20} className="flex-shrink-0" aria-hidden="true" />
                                                    <p className="text-sm font-medium">This order has been cancelled.</p>
                                                </div>
                                            )}

                                            {/* Details Breakdown */}
                                            <div className="grid gap-8 border-t border-ink-900/[0.06] pt-4 md:grid-cols-2">
                                                {/* Invoice */}
                                                <div className="min-w-0 space-y-4">
                                                    <h3 className="flex items-center gap-1.5 text-sm font-bold text-ink-900"><FileText size={18} className="text-brand-700" aria-hidden="true" /> Invoice Summary</h3>
                                                    <div className="divide-y divide-ink-900/[0.06] rounded-2xl border border-ink-900/[0.06] bg-sand-100 p-5">
                                                        {selectedOrder.items.map((item) => (
                                                            <div key={item.id} className="flex justify-between gap-4 py-3 text-sm font-medium first:pt-0 last:pb-0">
                                                                <span className="min-w-0 truncate text-ink-600">
                                                                    {item.product_name} <span className="ml-1 font-semibold text-ink-500">× {item.quantity}</span>
                                                                </span>
                                                                <span className="shrink-0 font-semibold tabular-nums text-ink-900">{formatPrice(item.price * item.quantity)}</span>
                                                            </div>
                                                        ))}
                                                        <hr className="my-3 border-ink-900/[0.06]" />
                                                        <div className="flex justify-between pt-1 text-sm text-ink-500">
                                                            <span>Subtotal</span>
                                                            <span className="tabular-nums">{formatPrice(selectedOrder.subtotal)}</span>
                                                        </div>
                                                        <div className="flex justify-between pt-1 text-sm text-ink-500">
                                                            <span>Shipping Charge</span>
                                                            <span className="tabular-nums">{formatPrice(selectedOrder.shipping_charge)}</span>
                                                        </div>
                                                        <div className="flex items-baseline justify-between pt-3.5 text-sm font-semibold text-ink-950">
                                                            <span>Grand Total</span>
                                                            <span className="text-base tabular-nums text-brand-700">{formatPrice(selectedOrder.total)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Ship/Pay Details */}
                                                <div className="min-w-0 space-y-6">
                                                    {/* Shipping Address details */}
                                                    <div className="space-y-3">
                                                        <h3 className="flex items-center gap-1.5 text-sm font-bold text-ink-900"><Truck size={18} className="text-brand-700" aria-hidden="true" /> Shipping Destination</h3>
                                                        <div className="break-words pl-6 text-sm leading-relaxed text-ink-700">
                                                            <p className="font-semibold text-ink-900">{selectedOrder.shipping_address.name}</p>
                                                            <p className="mt-1">{selectedOrder.shipping_address.address_line_1}</p>
                                                            {selectedOrder.shipping_address.address_line_2 && <p>{selectedOrder.shipping_address.address_line_2}</p>}
                                                            <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} - {selectedOrder.shipping_address.pincode}</p>
                                                        </div>
                                                    </div>

                                                    {/* Payment details */}
                                                    <div className="space-y-3 border-t border-ink-900/[0.06] pt-4">
                                                        <h3 className="flex items-center gap-1.5 text-sm font-bold text-ink-900"><CreditCard size={18} className="text-brand-700" aria-hidden="true" /> Payment Transaction</h3>
                                                        <div className="space-y-2.5 pl-6 text-sm text-ink-700">
                                                            <p><span className="font-semibold text-ink-500">Method:</span> {PAYMENT_METHOD_LABELS[selectedOrder.payment_method] ?? selectedOrder.payment_method}</p>
                                                            <p className="flex flex-wrap items-center gap-2">
                                                                <span className="font-semibold text-ink-500">Status:</span>
                                                                <StatusBadge kind="payment" value={selectedOrder.payment_status} />
                                                            </p>
                                                            {selectedOrder.transaction_id && (
                                                                <p className="flex flex-wrap items-center gap-1">
                                                                    <span className="font-semibold text-ink-500">Ref ID:</span>
                                                                    <code className="break-all rounded-md border border-ink-900/[0.06] bg-sand-100 px-2 py-0.5 font-sans text-xs font-medium tabular-nums text-ink-700 select-all">{selectedOrder.transaction_id}</code>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Orders List View */
                                        <div className="space-y-4">
                                            {orders.length === 0 ? (
                                                <div className="card px-6 py-12 text-center sm:p-12">
                                                    <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-700">
                                                        <ClipboardList size={32} aria-hidden="true" />
                                                    </div>
                                                    <h3 className="mb-1 text-base font-bold text-ink-700">No orders found</h3>
                                                    <p className="mx-auto mb-6 max-w-xs text-sm text-ink-500">You haven't ordered any Continuous Glucose Monitors or Smart Pens yet.</p>
                                                    <Link href="/products" className="btn-primary px-5 py-2.5 text-sm">Explore Our Devices</Link>
                                                </div>
                                            ) : (
                                                orders.map((order) => (
                                                    <div key={order.id} className="card flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center md:p-6">
                                                        <div className="min-w-0 space-y-2">
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                <span className="text-sm font-semibold tracking-tight tabular-nums text-ink-900">#{order.order_number}</span>
                                                                <StatusBadge kind="order" value={order.status} />
                                                                <StatusBadge kind="payment" value={order.payment_status} />
                                                            </div>
                                                            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500">
                                                                <span className="flex items-center gap-1"><Calendar size={13} aria-hidden="true" /> {formatDate(order.created_at)}</span>
                                                                <span aria-hidden="true">•</span>
                                                                <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                                                                <span aria-hidden="true">•</span>
                                                                <span>{PAYMENT_METHOD_LABELS[order.payment_method] ?? order.payment_method}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-ink-900/[0.06] pt-3 sm:justify-end sm:border-0 sm:pt-0">
                                                            <div className="text-left sm:text-right">
                                                                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Grand Total</div>
                                                                <div className="font-display text-2xl tabular-nums text-ink-950">{formatPrice(order.total)}</div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => setSelectedOrder(order)}
                                                                className="link-arrow"
                                                            >
                                                                View Details <Eye size={14} aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Support Tickets View */}
                            {activeTab === 'tickets' && (
                                <div className="space-y-6 animate-fade-in">
                                    {activeTicket ? (
                                        /* Ticket Details & Chat Conversation */
                                        <div className="card space-y-8 p-6 md:p-8">
                                            {/* Header */}
                                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-900/[0.06] pb-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedTicket(null)}
                                                    className="inline-flex items-center text-sm font-semibold text-ink-500 transition hover:text-brand-700"
                                                >
                                                    <ArrowLeft size={16} className="mr-1.5" aria-hidden="true" /> Back to tickets
                                                </button>
                                                <h2 className="text-sm font-semibold tracking-tight tabular-nums text-ink-900">Ticket #TKT-{activeTicket.id}</h2>
                                            </div>

                                            {/* Ticket Info Card */}
                                            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-ink-900/[0.06] bg-sand-100 p-5 md:flex-row">
                                                <div className="min-w-0 space-y-1">
                                                    <h3 className="break-words text-base font-bold text-ink-900">{activeTicket.subject}</h3>
                                                    <p className="text-xs text-ink-500">Opened on {formatDate(activeTicket.created_at, { withTime: true })}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <StatusBadge kind="ticket" value={activeTicket.status} />
                                                </div>
                                            </div>

                                            {/* Attached Document/Image preview */}
                                            {activeTicket.image_path && (
                                                <div className="rounded-2xl border border-ink-900/[0.06] bg-sand-100 p-4">
                                                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Attached Issue Image</span>
                                                    <a href={activeTicket.image_path} target="_blank" rel="noopener noreferrer" className="group relative inline-block overflow-hidden rounded-xl border border-ink-900/[0.06] bg-white p-1 transition hover:shadow-md">
                                                        <img src={activeTicket.image_path} alt="Support attachment" className="max-h-48 rounded-lg object-contain" />
                                                        <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-ink-950/40 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                                                            <Eye size={16} aria-hidden="true" /> View Full Image
                                                        </div>
                                                    </a>
                                                </div>
                                            )}

                                            {/* Message bubbles thread */}
                                            <div className="max-h-[450px] space-y-4 overflow-y-auto border-t border-ink-900/[0.06] pr-2 pt-4">
                                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Conversation History</h3>

                                                {activeTicket.messages?.map((msg) => {
                                                    const isAdminMsg = msg.user?.role === 'admin';
                                                    const isMe = !isAdminMsg && (msg.user_id === auth.user.id);
                                                    const senderName = isAdminMsg ? 'Support Team' : (isMe ? 'You' : msg.user?.name || 'User');

                                                    return (
                                                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                                            <div className="mb-1 flex items-center gap-1.5 px-1">
                                                                <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">{senderName}</span>
                                                                <span className="text-xs text-ink-500">• {new Date(msg.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                                                            </div>
                                                            <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                                                                isMe
                                                                    ? 'rounded-3xl rounded-tr-md bg-brand-700 text-white'
                                                                    : 'rounded-3xl rounded-tl-md bg-sand-100 text-ink-800'
                                                            }`}>
                                                                <p className="whitespace-pre-line break-words">{msg.message}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Reply form */}
                                            <form onSubmit={(e) => e.preventDefault()} className="space-y-3 border-t border-ink-900/[0.06] pt-6">
                                                {activeTicket.status === 'closed' && (
                                                    <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                                                        <AlertTriangle size={14} className="mt-px shrink-0" aria-hidden="true" />
                                                        <span>Note: This ticket is currently closed. Sending a reply will automatically reopen it.</span>
                                                    </div>
                                                )}
                                                <div className="space-y-1">
                                                    <label htmlFor="reply_message" className="field-label">Send a response</label>
                                                    <textarea
                                                        id="reply_message"
                                                        rows="3"
                                                        value={replyMessage}
                                                        onChange={(e) => setReplyMessage(e.target.value)}
                                                        placeholder="Type your follow-up concern here..."
                                                        className="field"
                                                        required
                                                    />
                                                    {replyError && (
                                                        <p className="field-error" role="alert">{replyError}</p>
                                                    )}
                                                </div>
                                                <div className="flex justify-start">
                                                    <button
                                                        type="button"
                                                        onClick={submitReply}
                                                        aria-disabled={!replyMessage.trim() || replying}
                                                        className={`btn-primary relative z-30 gap-1.5 !px-5 !py-2.5 text-sm ${
                                                            (!replyMessage.trim() || replying)
                                                                ? 'opacity-50 cursor-not-allowed'
                                                                : 'cursor-pointer'
                                                        }`}
                                                    >
                                                        {replying ? 'Sending...' : 'Send Message'} <Send size={14} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        /* Ticket List View */
                                        <div className="space-y-4">
                                            {tickets.length === 0 ? (
                                                <div className="card px-6 py-12 text-center sm:p-12">
                                                    <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-700">
                                                        <MessageSquare size={32} aria-hidden="true" />
                                                    </div>
                                                    <h3 className="mb-1 text-base font-bold text-ink-700">No support tickets</h3>
                                                    <p className="mx-auto mb-6 max-w-xs text-sm text-ink-500">Have questions or issues? Open a support ticket using the widget at the bottom right of the page.</p>
                                                </div>
                                            ) : (
                                                tickets.map((ticket) => (
                                                    <div
                                                        key={ticket.id}
                                                        role="button"
                                                        tabIndex={0}
                                                        onClick={() => setSelectedTicket(ticket)}
                                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTicket(ticket); } }}
                                                        className="card card-interactive group flex cursor-pointer flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center md:p-6"
                                                    >
                                                        <div className="min-w-0 flex-1 space-y-2">
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                <span className="text-sm font-semibold tracking-tight tabular-nums text-ink-900">#TKT-{ticket.id}</span>
                                                                <StatusBadge kind="ticket" value={ticket.status} />
                                                            </div>
                                                            <h4 className="truncate text-sm font-bold text-ink-900">{ticket.subject}</h4>
                                                            <p className="line-clamp-1 text-xs text-ink-500">{ticket.description}</p>
                                                            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500">
                                                                <span className="flex items-center gap-1"><Calendar size={13} aria-hidden="true" /> Created: {formatDate(ticket.created_at)}</span>
                                                                <span aria-hidden="true">•</span>
                                                                <span>{ticket.messages?.length || 0} messages</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-shrink-0 items-center justify-between gap-6 border-t border-ink-900/[0.06] pt-3 sm:justify-end sm:border-0 sm:pt-0">
                                                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900 group-hover:underline">
                                                                Open Chat <Eye size={14} aria-hidden="true" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
