import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    IndianRupee,
    ShoppingBag,
    ClipboardList,
    Users,
    Mail,
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Calendar
} from 'lucide-react';

export default function Dashboard({ stats, recentOrders, recentLeads }) {
    const statCards = [
        { label: 'Total Revenue', value: `₹${Number(stats.totalRevenue).toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
        { label: 'Pending Orders', value: stats.pendingOrders, icon: AlertCircle, color: 'text-amber-600 bg-amber-50 border-amber-100' },
        { label: 'Total Orders', value: stats.totalOrders, icon: ClipboardList, color: 'text-blue-600 bg-blue-50 border-blue-100' },
        { label: 'Total Products', value: stats.totalProducts, icon: ShoppingBag, color: 'text-purple-600 bg-purple-50 border-purple-100' },
        { label: 'Registered Customers', value: stats.totalUsers, icon: Users, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
        { label: 'Unread Leads', value: stats.newLeads, icon: Mail, color: 'text-pink-600 bg-pink-50 border-pink-100' },
    ];

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

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800">Console Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Real-time health device orders and performance telemetry metrics.</p>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statCards.map((card) => (
                    <div key={card.label} className={`card p-6 flex items-center justify-between border ${card.color}`}>
                        <div>
                            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{card.label}</div>
                            <div className="text-2xl font-black">{card.value}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/80 shadow-sm">
                            <card.icon size={22} className="stroke-[2.5]" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="card overflow-hidden border border-slate-200">
                        {recentOrders.length === 0 ? (
                            <div className="p-12 text-center text-slate-400 italic">No orders received yet.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            <th className="py-3 px-5">Order #</th>
                                            <th className="py-3 px-5">Customer</th>
                                            <th className="py-3 px-5">Status</th>
                                            <th className="py-3 px-5 text-right">Total</th>
                                            <th className="py-3 px-5 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-slate-50/50">
                                                <td className="py-4 px-5 font-bold font-mono text-xs">#{order.order_number}</td>
                                                <td className="py-4 px-5">
                                                    <div className="font-semibold text-slate-800">{order.user?.name}</div>
                                                    <div className="text-xs text-slate-400">{order.user?.email}</div>
                                                </td>
                                                <td className="py-4 px-5">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusStyle(order.status)} uppercase tracking-wider`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-5 text-right font-bold text-slate-800">₹{Number(order.total).toLocaleString('en-IN')}</td>
                                                <td className="py-4 px-5 text-center">
                                                    <Link href={`/admin/orders/${order.id}`} className="text-xs font-semibold text-teal-700 hover:text-teal-850 hover:underline">
                                                        Manage
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Leads */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800">Unread Leads</h2>
                        <Link href="/admin/leads" className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1">
                            Manage Leads <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentLeads.length === 0 ? (
                            <div className="card p-6 text-center text-slate-400 italic">No inquiries captured.</div>
                        ) : (
                            recentLeads.map((lead) => {
                                const leadDate = new Date(lead.created_at).toLocaleDateString('en-IN', {
                                    month: 'short',
                                    day: 'numeric'
                                });

                                return (
                                    <div key={lead.id} className={`card p-4 border ${lead.is_read ? 'border-slate-100 bg-white/50 opacity-75' : 'border-teal-100 bg-white'}`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-slate-800 text-sm">{lead.name}</h3>
                                                <span className="text-[10px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-md mt-1 inline-block uppercase tracking-wider">{lead.role}</span>
                                            </div>
                                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Calendar size={12} /> {leadDate}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-2 italic mb-2">"{lead.message}"</p>
                                        <div className="text-[10px] text-slate-400 font-medium">Interest: {lead.product_interest || 'General'}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
