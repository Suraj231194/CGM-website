import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import StatusBadge, { PAYMENT_METHOD_LABELS } from '@/Components/StatusBadge';
import { formatDate, formatPrice } from '@/lib/format';
import { CheckCircle, Truck, ArrowRight, ClipboardList } from 'lucide-react';

export default function OrderConfirmation({ order }) {
    return (
        <MainLayout>
            <Head title={`Order confirmed #${order.order_number}`} />
            <div className="bg-aurora">
                <section className="container-page py-16 md:py-24">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-brand-700 ring-8 ring-brand-50/60">
                            <span className="pointer-events-none absolute inset-0 rounded-full bg-brand-200/60 animate-pulse-ring [animation-iteration-count:3] motion-reduce:hidden" aria-hidden="true" />
                            <CheckCircle size={44} className="relative" aria-hidden="true" />
                        </div>

                        <p className="eyebrow eyebrow-center mt-8">Order #{order.order_number}</p>
                        <h1 className="mt-3 section-heading">Order confirmed</h1>
                        <p className="mx-auto mb-10 mt-4 max-w-lg text-ink-500">
                            Thank you for shopping with us. We have received your order and we will process it shortly.
                        </p>

                        <div className="mx-auto mb-10 grid max-w-3xl gap-8 text-left md:grid-cols-2">
                            {/* Order Details Card */}
                            <div className="card min-w-0 space-y-4 p-6">
                                <h2 className="flex items-center gap-3 border-b border-ink-900/[0.06] pb-4 font-display text-xl font-normal text-ink-950">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
                                        <ClipboardList size={18} aria-hidden="true" />
                                    </span>
                                    Order Summary
                                </h2>

                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between gap-4 text-ink-500">
                                        <span>Order Number</span>
                                        <span className="font-semibold tabular-nums tracking-tight text-ink-900">#{order.order_number}</span>
                                    </div>
                                    <div className="flex justify-between gap-4 text-ink-500">
                                        <span>Order Date</span>
                                        <span className="font-medium text-ink-900">{formatDate(order.created_at)}</span>
                                    </div>
                                    <div className="flex justify-between gap-4 text-ink-500">
                                        <span>Payment Type</span>
                                        <span className="font-medium text-ink-900">{PAYMENT_METHOD_LABELS[order.payment_method] ?? order.payment_method}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-ink-500">
                                        <span>Payment Status</span>
                                        <StatusBadge kind="payment" value={order.payment_status} />
                                    </div>
                                    {order.transaction_id && (
                                        <div className="flex justify-between gap-4 text-ink-500">
                                            <span className="shrink-0">Transaction ID</span>
                                            <span className="min-w-0 break-all text-right text-xs font-semibold tabular-nums tracking-tight text-ink-900">{order.transaction_id}</span>
                                        </div>
                                    )}
                                </div>

                                <hr className="border-ink-900/[0.06]" />

                                <div className="space-y-3">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex min-w-0 items-center justify-between gap-4 text-sm">
                                            <span className="min-w-0 truncate text-ink-700">
                                                {item.product_name} <span className="text-ink-500">× {item.quantity}</span>
                                            </span>
                                            <span className="shrink-0 font-semibold tabular-nums text-ink-900">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                <hr className="border-ink-900/[0.06]" />

                                <div className="space-y-1.5 text-sm">
                                    <div className="flex justify-between text-ink-500">
                                        <span>Subtotal</span>
                                        <span className="font-semibold tabular-nums text-ink-900">{formatPrice(order.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-ink-500">
                                        <span>Shipping</span>
                                        <span className="font-semibold tabular-nums text-ink-900">{formatPrice(order.shipping_charge)}</span>
                                    </div>
                                    <div className="flex items-baseline justify-between pt-2 text-base">
                                        <span className="font-bold text-ink-900">Total</span>
                                        <span className="font-display text-2xl tabular-nums text-ink-950">{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address Card */}
                            <div className="card min-w-0 space-y-4 p-6">
                                <h2 className="flex items-center gap-3 border-b border-ink-900/[0.06] pb-4 font-display text-xl font-normal text-ink-950">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
                                        <Truck size={18} aria-hidden="true" />
                                    </span>
                                    Shipping Address
                                </h2>

                                <div className="space-y-1 break-words text-sm leading-relaxed text-ink-700">
                                    <p className="font-bold text-ink-900">{order.shipping_address.name}</p>
                                    <p>{order.shipping_address.address_line_1}</p>
                                    {order.shipping_address.address_line_2 && <p>{order.shipping_address.address_line_2}</p>}
                                    <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
                                    <div className="mt-3 space-y-1 border-t border-ink-900/[0.06] pt-3">
                                        <p><span className="font-medium text-ink-500">Phone:</span> {order.shipping_address.phone}</p>
                                        <p><span className="font-medium text-ink-500">Email:</span> {order.shipping_address.email}</p>
                                    </div>
                                </div>

                                {order.notes && (
                                    <div className="mt-4 rounded-2xl bg-sand-100 p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Notes</p>
                                        <p className="mt-1 break-words text-sm text-ink-700">{order.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/orders" className="btn-primary gap-2">
                                View Order History <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                            <Link href="/products" className="btn-secondary">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
