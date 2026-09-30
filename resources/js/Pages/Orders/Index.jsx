import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import StatusBadge, { PAYMENT_METHOD_LABELS } from '@/Components/StatusBadge';
import { formatDate, formatPrice } from '@/lib/format';
import { Package, Calendar, Eye, ArrowRight } from 'lucide-react';

export default function Index({ orders }) {
    return (
        <MainLayout>
            <Head title="Order history" />
            <section className="container-page pb-20 pt-10 md:pt-14">
                <header className="mb-10">
                    <p className="eyebrow">Your account</p>
                    <h1 className="mt-3 section-heading">Order history</h1>
                </header>

                {orders.length === 0 ? (
                    <div className="card mx-auto max-w-xl px-6 py-12 text-center sm:p-12">
                        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-700">
                            <Package size={32} aria-hidden="true" />
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-ink-700">No orders found</h2>
                        <p className="mb-6 text-ink-500">You haven't placed any orders yet. Explore our products to make your first purchase!</p>
                        <Link href="/products" className="btn-primary gap-1.5">Browse Products <ArrowRight size={16} aria-hidden="true" /></Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="card flex flex-col justify-between gap-6 p-6 hover:border-brand-600/20 md:flex-row md:items-center">
                                <div className="min-w-0 space-y-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-base font-semibold tracking-tight tabular-nums text-ink-900">#{order.order_number}</span>
                                        <StatusBadge kind="order" value={order.status} />
                                        <StatusBadge kind="payment" value={order.payment_status} />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-ink-500">
                                        <span className="flex items-center gap-1.5"><Calendar size={14} aria-hidden="true" /> {formatDate(order.created_at)}</span>
                                        <span aria-hidden="true">•</span>
                                        <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                                        <span aria-hidden="true">•</span>
                                        <span className="font-semibold text-ink-700">{PAYMENT_METHOD_LABELS[order.payment_method] ?? order.payment_method}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-ink-900/[0.06] pt-4 md:justify-end md:border-t-0 md:pt-0">
                                    <div className="text-left md:text-right">
                                        <div className="text-xs font-medium text-ink-500">Order Total</div>
                                        <div className="font-display text-2xl tabular-nums text-ink-950">{formatPrice(order.total)}</div>
                                    </div>

                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="link-arrow"
                                    >
                                        View Details <Eye size={16} aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
