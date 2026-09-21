import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Package, Calendar, Eye, ArrowRight, ClipboardCheck } from 'lucide-react';

export default function Index({ orders }) {
    const getStatusStyle = (status) => {
        const styles = {
            placed: 'bg-blue-50 text-blue-700 border-blue-100',
            confirmed: 'bg-yellow-50 text-yellow-700 border-yellow-100',
            shipped: 'bg-indigo-50 text-indigo-700 border-indigo-100',
            delivered: 'bg-green-50 text-green-700 border-green-100',
            cancelled: 'bg-red-50 text-red-700 border-red-100',
        };
        return styles[status] || 'bg-slate-50 text-slate-700 border-slate-100';
    };

    const getPaymentStatusStyle = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-700',
            pending_verification: 'bg-orange-50 text-orange-700',
            paid: 'bg-emerald-50 text-emerald-700',
            failed: 'bg-rose-50 text-rose-700',
        };
        return styles[status] || 'bg-slate-50 text-slate-700';
    };

    const paymentStatusLabels = {
        pending: 'Pending',
        pending_verification: 'Verifying',
        paid: 'Paid',
        failed: 'Failed',
    };

    return (
        <MainLayout>
            <Head title="Order History — BiogenixCGM" />
            <section className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
                    <ClipboardCheck size={32} className="text-teal-700" /> Order History
                </h1>

                {orders.length === 0 ? (
                    <div className="card p-12 text-center max-w-xl mx-auto">
                        <Package size={56} className="text-slate-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-slate-700 mb-2">No orders found</h2>
                        <p className="text-slate-500 mb-6">You haven't placed any orders yet. Explore our products to make your first purchase!</p>
                        <Link href="/products" className="btn-primary">Browse Products <ArrowRight size={16} className="ml-1.5" /></Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const date = new Date(order.created_at).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            });

                            return (
                                <div key={order.id} className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-teal-100 border border-transparent transition">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="font-bold text-slate-800 font-mono text-base">#{order.order_number}</span>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle(order.status)} uppercase tracking-wider`}>
                                                {order.status}
                                            </span>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getPaymentStatusStyle(order.payment_status)}`}>
                                                Payment: {paymentStatusLabels[order.payment_status]}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {date}</span>
                                            <span>•</span>
                                            <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                                            <span>•</span>
                                            <span className="font-semibold text-slate-700 uppercase">{order.payment_method}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                                        <div className="text-right">
                                            <div className="text-xs text-slate-400 font-medium">Order Total</div>
                                            <div className="text-xl font-bold text-teal-700">₹{Number(order.total).toLocaleString('en-IN')}</div>
                                        </div>

                                        <Link
                                            href={`/orders/${order.id}`}
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 transition"
                                        >
                                            View Details <Eye size={16} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
