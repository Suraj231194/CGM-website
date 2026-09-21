import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ClipboardList, Calendar, Eye, Search } from 'lucide-react';

export default function Index({ orders, filters }) {
    const statuses = ['all', 'placed', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    const currentStatus = filters.status || 'all';

    const handleFilterChange = (status) => {
        const queryParams = {};
        if (status && status !== 'all') {
            queryParams.status = status;
        }
        router.get('/admin/orders', queryParams, { preserveState: true });
    };

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
        <AdminLayout>
            <Head title="Manage Orders — BiogenixCGM" />

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800">Orders Management</h1>
                <p className="text-slate-500 text-sm mt-1">Review checkout orders, update delivery milestones, and verify UPI transaction screenshots.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-4 border-slate-200">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => handleFilterChange(status)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition uppercase tracking-wider ${currentStatus === status ? 'bg-teal-700 text-white border-teal-700 shadow-sm' : 'bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 border-slate-200'}`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="card overflow-hidden border border-slate-200">
                {orders.data.length === 0 ? (
                    <div className="p-16 text-center text-slate-400 italic">
                        No orders found matching this filter criteria.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="py-3.5 px-6">Order #</th>
                                    <th className="py-3.5 px-6">Customer</th>
                                    <th className="py-3.5 px-6">Order Date</th>
                                    <th className="py-3.5 px-6">Shipping Region</th>
                                    <th className="py-3.5 px-6">Payment Status</th>
                                    <th className="py-3.5 px-6">Delivery Status</th>
                                    <th className="py-3.5 px-6 text-right">Grand Total</th>
                                    <th className="py-3.5 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {orders.data.map((order) => {
                                    const date = new Date(order.created_at).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    });

                                    return (
                                        <tr key={order.id} className="hover:bg-slate-50/50">
                                            <td className="py-4 px-6 font-bold font-mono text-xs">#{order.order_number}</td>
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-slate-800">{order.shipping_address?.name || order.user?.name}</div>
                                                <div className="text-xs text-slate-400">{order.shipping_address?.phone || order.user?.email}</div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-500 font-medium">
                                                <span className="flex items-center gap-1"><Calendar size={13} /> {date}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-xs text-slate-700 font-semibold">{order.shipping_address?.city}, {order.shipping_address?.state}</div>
                                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">PIN: {order.shipping_address?.pincode}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${getPaymentStatusStyle(order.payment_status)}`}>
                                                    {paymentStatusLabels[order.payment_status]}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusStyle(order.status)} uppercase tracking-wider`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right font-extrabold text-slate-800">
                                                ₹{Number(order.total).toLocaleString('en-IN')}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex justify-center">
                                                    <Link
                                                        href={`/admin/orders/${order.id}`}
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-850 hover:underline"
                                                    >
                                                        Details <Eye size={14} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {orders.links && orders.links.length > 3 && (
                <div className="flex items-center justify-between mt-6 px-4">
                    <div className="text-slate-500 text-xs font-medium">
                        Showing {orders.from} to {orders.to} of {orders.total} orders
                    </div>
                    <div className="flex gap-1.5">
                        {orders.links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.url || '#'}
                                className={`px-3 py-1.5 text-xs rounded-lg border font-semibold ${link.active ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'} ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
