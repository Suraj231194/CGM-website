import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, ShieldAlert, Calendar, User, FileText, CheckCircle2, Truck, Eye } from 'lucide-react';

export default function Show({ order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
        payment_status: order.payment_status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/admin/orders/${order.id}/status`);
    };

    const formattedDate = new Date(order.created_at).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const paymentMethodLabel = {
        cod: 'Cash on Delivery',
        online: 'Online Payment (UPI/QR Scan)',
    };

    const statusOptions = [
        { value: 'placed', label: 'Placed (New)' },
        { value: 'confirmed', label: 'Confirmed (Payment Verified)' },
        { value: 'shipped', label: 'Shipped (In Transit)' },
        { value: 'delivered', label: 'Delivered (Completed)' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    const paymentStatusOptions = [
        { value: 'pending', label: 'Pending Payment' },
        { value: 'pending_verification', label: 'Pending Verification (Verifying Transaction ID)' },
        { value: 'paid', label: 'Paid (Payment Success)' },
        { value: 'failed', label: 'Failed' },
    ];

    return (
        <AdminLayout>
            <Head title={`Manage Order #${order.order_number}`} />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">Order #{order.order_number}</h1>
                    <p className="text-slate-500 text-sm mt-1">Status audit log, invoice items, and delivery routing records.</p>
                </div>
                <Link href="/admin/orders" className="inline-flex items-center text-slate-500 hover:text-teal-700 transition">
                    <ArrowLeft size={16} className="mr-1.5" /> Back to Orders
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Columns: Items list & shipping address */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items table */}
                    <div className="card p-6">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3.5 mb-4 border-slate-100 flex items-center gap-2">
                            <FileText size={18} className="text-teal-700" /> Invoice Items
                        </h2>
                        <div className="divide-y divide-slate-100">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                                    <div className="w-14 h-14 bg-slate-50 border rounded-lg flex items-center justify-center flex-shrink-0 p-1">
                                        {item.product?.image_url ? (
                                            <img src={item.product.image_url} alt={item.product_name} className="max-h-full max-w-full object-contain" />
                                        ) : (
                                            <span className="font-bold text-teal-600 text-xs">{item.product_name[0]}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-slate-800 text-sm truncate">{item.product_name}</div>
                                        <div className="text-xs text-slate-400 mt-1">₹{Number(item.price).toLocaleString('en-IN')} each</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-slate-900">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</div>
                                        <div className="text-xs text-slate-400 mt-1">Qty: {item.quantity}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping address details */}
                    <div className="card p-6">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3.5 mb-4 border-slate-100 flex items-center gap-2">
                            <Truck size={18} className="text-teal-700" /> Delivery Address
                        </h2>
                        {order.shipping_address ? (
                            <div className="text-sm text-slate-600 leading-relaxed grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Recipient Name</p>
                                    <p className="font-bold text-slate-800 text-base">{order.shipping_address.name}</p>
                                    <p className="text-slate-500 mt-1">{order.shipping_address.address_line_1}</p>
                                    {order.shipping_address.address_line_2 && <p className="text-slate-500">{order.shipping_address.address_line_2}</p>}
                                    <p className="text-slate-500">{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Contact Details</p>
                                    <p><span className="text-slate-400 font-semibold">Phone:</span> {order.shipping_address.phone}</p>
                                    <p><span className="text-slate-400 font-semibold">Email:</span> {order.shipping_address.email}</p>
                                    {order.notes && (
                                        <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs italic">
                                            <span className="font-bold text-slate-400 block uppercase tracking-wide not-italic mb-1">Order Notes</span>
                                            "{order.notes}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-slate-400 text-sm italic">No delivery address records found.</div>
                        )}
                    </div>
                </div>

                {/* Right side: Status updates & audit logs */}
                <div className="space-y-6">
                    {/* Status updates Form */}
                    <div className="card p-6">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 mb-5 border-slate-100">Status Controls</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Delivery Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-900 text-sm py-2.5 px-4 transition"
                                >
                                    {statusOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Payment Status</label>
                                <select
                                    value={data.payment_status}
                                    onChange={(e) => setData('payment_status', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-900 text-sm py-2.5 px-4 transition"
                                >
                                    {paymentStatusOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary w-full text-center flex items-center justify-center gap-1.5"
                            >
                                <Save size={16} /> Save Status
                            </button>
                        </form>
                    </div>

                    {/* Transaction Audit */}
                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 border-slate-100">Transaction Audit</h2>
                        <div className="space-y-3.5 text-sm">
                            <div>
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Order Placed Date</div>
                                <div className="font-semibold text-slate-700 flex items-center gap-1.5"><Calendar size={14} /> {formattedDate}</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Payment Method</div>
                                <div className="font-semibold text-slate-700">{paymentMethodLabel[order.payment_method]}</div>
                            </div>
                            {order.transaction_id && (
                                <div>
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Transaction Ref ID (UPI)</div>
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                                        <div className="font-mono text-xs select-all text-slate-700 font-semibold">{order.transaction_id}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Total Summary */}
                    <div className="card p-6">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 mb-4 border-slate-100">Totals Summary</h2>
                        <div className="space-y-2.5 text-sm">
                            <div className="flex justify-between text-slate-500">
                                <span>Items Subtotal</span>
                                <span className="font-medium text-slate-900">₹{Number(order.subtotal).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Shipping Fee</span>
                                <span className="font-medium text-slate-900">₹{Number(order.shipping_charge).toLocaleString('en-IN')}</span>
                            </div>
                            <hr className="border-slate-100 my-1.5" />
                            <div className="flex justify-between items-baseline pt-1">
                                <span className="font-bold text-slate-900">Total Revenue</span>
                                <span className="font-extrabold text-teal-700 text-xl">₹{Number(order.total).toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
