import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import StatusBadge, { PAYMENT_METHOD_LABELS } from '@/Components/StatusBadge';
import { formatDate, formatPrice } from '@/lib/format';
import { ArrowLeft, Calendar, FileText, CheckCircle, Truck, Package, XCircle, AlertCircle, CreditCard, Receipt } from 'lucide-react';

export default function Show({ order }) {
    const statusSteps = ['placed', 'confirmed', 'shipped', 'delivered'];
    const currentStepIndex = statusSteps.indexOf(order.status);

    const getStepIcon = (step) => {
        switch (step) {
            case 'placed': return <FileText size={18} aria-hidden="true" />;
            case 'confirmed': return <CheckCircle size={18} aria-hidden="true" />;
            case 'shipped': return <Truck size={18} aria-hidden="true" />;
            case 'delivered': return <Package size={18} aria-hidden="true" />;
            default: return null;
        }
    };

    const getStepLabel = (step) => {
        return step.charAt(0).toUpperCase() + step.slice(1);
    };

    return (
        <MainLayout>
            <Head title={`Order #${order.order_number}`} />
            <section className="container-page pb-20 pt-8 md:pt-12">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 space-y-4">
                        <Link href="/orders" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-brand-700">
                            <ArrowLeft size={16} aria-hidden="true" /> Back to history
                        </Link>
                        <div className="flex flex-wrap items-end justify-between gap-3">
                            <div>
                                <h1 className="section-heading">Order details</h1>
                                <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-500">
                                    <Calendar size={14} aria-hidden="true" /> Placed {formatDate(order.created_at, { withTime: true })}
                                </p>
                            </div>
                            <span className="chip tabular-nums">#{order.order_number}</span>
                        </div>
                    </div>

                    {/* Status Timeline Progress */}
                    {order.status === 'cancelled' ? (
                        <div className="card mb-8 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50/30 p-5 text-red-700">
                            <XCircle size={24} className="flex-shrink-0 text-red-700" aria-hidden="true" />
                            <div>
                                <div className="font-bold">This order has been cancelled</div>
                                <div className="mt-0.5 text-xs text-ink-500">Please contact customer support if you need further clarification.</div>
                            </div>
                        </div>
                    ) : (
                        <div className="card mb-8 p-6 md:p-8">
                            <h2 className="eyebrow mb-8">Delivery progress</h2>
                            <div className="relative isolate flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                                {statusSteps.map((step, idx) => {
                                    const isCompleted = idx <= currentStepIndex;
                                    const isCurrent = idx === currentStepIndex;

                                    return (
                                        <div key={step} className="relative z-10 flex w-full flex-1 flex-row items-center gap-3 md:flex-col" aria-current={isCurrent ? 'step' : undefined}>
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${isCompleted ? 'border-brand-700 bg-brand-700 text-white' : 'border-ink-900/10 bg-white text-ink-300'} ${isCurrent ? 'ring-4 ring-brand-100' : ''}`}>
                                                {getStepIcon(step)}
                                            </div>
                                            <div className="text-left md:text-center">
                                                <div className={`text-sm font-semibold ${isCompleted ? 'text-ink-900' : 'text-ink-500'}`}>
                                                    {getStepLabel(step)}
                                                </div>
                                                <div className="mt-0.5 text-xs text-ink-500">
                                                    {isCurrent ? 'Current Status' : isCompleted ? 'Completed' : 'Pending'}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {/* Connector line for larger screens, from the first step's centre to the last */}
                                <div className="absolute left-[12.5%] right-[12.5%] top-5 -z-10 hidden h-0.5 rounded-full bg-ink-900/10 md:block" />
                                <div
                                    className="absolute left-[12.5%] top-5 -z-10 hidden h-0.5 rounded-full bg-brand-600 transition-all duration-500 md:block"
                                    style={{ width: `${(Math.max(currentStepIndex, 0) / (statusSteps.length - 1)) * 75}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Items & Invoice details */}
                        <div className="min-w-0 space-y-6 lg:col-span-2">
                            <div className="card p-6">
                                <h2 className="mb-4 flex items-center gap-3 border-b border-ink-900/[0.06] pb-4 font-display text-xl font-normal text-ink-950">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
                                        <Package size={18} aria-hidden="true" />
                                    </span>
                                    Ordered Items
                                </h2>
                                <div className="divide-y divide-ink-900/[0.06]">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-ink-900/10 bg-sand-100">
                                                {item.product?.image_url ? (
                                                    <img src={item.product.image_url} alt={item.product_name} className="h-10 w-auto object-contain" />
                                                ) : (
                                                    <span className="font-bold text-brand-700">{item.product_name[0]}</span>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-sm font-bold text-ink-900">{item.product_name}</h3>
                                                <p className="mt-1 text-xs tabular-nums text-ink-500">{formatPrice(item.price)} each</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold tabular-nums text-ink-900">{formatPrice(item.price * item.quantity)}</div>
                                                <div className="mt-1 text-xs tabular-nums text-ink-500">Qty: {item.quantity}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Status & Details */}
                            <div className="card p-6">
                                <h2 className="mb-4 flex items-center gap-3 border-b border-ink-900/[0.06] pb-4 font-display text-xl font-normal text-ink-950">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
                                        <CreditCard size={18} aria-hidden="true" />
                                    </span>
                                    Payment Information
                                </h2>
                                <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
                                    <div className="min-w-0">
                                        <div className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Payment Method</div>
                                        <div className="font-semibold text-ink-900">{PAYMENT_METHOD_LABELS[order.payment_method] ?? order.payment_method}</div>
                                        {order.transaction_id && (
                                            <div className="mt-3 rounded-lg border border-ink-900/[0.06] bg-sand-100 p-2.5">
                                                <div className="mb-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">UPI Transaction ID</div>
                                                <div className="break-all text-xs font-medium tabular-nums text-ink-700 select-all">{order.transaction_id}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Payment Status</div>
                                        <StatusBadge kind="payment" value={order.payment_status} />
                                        {order.payment_status === 'pending_verification' && (
                                            <p className="mt-2 flex items-start gap-1 text-xs text-ink-500">
                                                <AlertCircle size={12} className="mt-0.5 flex-shrink-0 text-amber-800" aria-hidden="true" />
                                                Our accounting team is validating your scanned payment. The order status will update to 'Confirmed' soon.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping address details & summary */}
                        <div className="min-w-0 space-y-6">
                            <div className="card p-6">
                                <h2 className="mb-4 flex items-center gap-3 border-b border-ink-900/[0.06] pb-4 font-display text-xl font-normal text-ink-950">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
                                        <Truck size={18} aria-hidden="true" />
                                    </span>
                                    Shipping Information
                                </h2>
                                <div className="space-y-1 break-words text-sm leading-relaxed text-ink-700 [overflow-wrap:anywhere]">
                                    <p className="font-bold text-ink-900">{order.shipping_address.name}</p>
                                    <p>{order.shipping_address.address_line_1}</p>
                                    {order.shipping_address.address_line_2 && <p>{order.shipping_address.address_line_2}</p>}
                                    <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
                                    <div className="mt-4 space-y-1 border-t border-ink-900/[0.06] pt-3 text-xs">
                                        <p><span className="font-medium text-ink-500">Contact:</span> {order.shipping_address.phone}</p>
                                        <p><span className="font-medium text-ink-500">Email:</span> {order.shipping_address.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-6">
                                <h2 className="mb-4 flex items-center gap-3 border-b border-ink-900/[0.06] pb-4 font-display text-xl font-normal text-ink-950">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
                                        <Receipt size={18} aria-hidden="true" />
                                    </span>
                                    Invoice Summary
                                </h2>
                                <div className="space-y-2.5 text-sm">
                                    <div className="flex justify-between text-ink-500">
                                        <span>Items Subtotal</span>
                                        <span className="font-medium tabular-nums text-ink-900">{formatPrice(order.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-ink-500">
                                        <span>Shipping & Handling</span>
                                        <span className="font-medium tabular-nums text-ink-900">{formatPrice(order.shipping_charge)}</span>
                                    </div>
                                    <hr className="my-1 border-ink-900/[0.06]" />
                                    <div className="flex items-baseline justify-between pt-1">
                                        <span className="font-bold text-ink-900">Grand Total</span>
                                        <span className="font-display text-2xl tabular-nums text-ink-950">{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
