import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ArrowLeft, Calendar, FileText, CheckCircle, Truck, Package, XCircle, AlertCircle } from 'lucide-react';

export default function Show({ order }) {
    const formattedDate = new Date(order.created_at).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const statusSteps = ['placed', 'confirmed', 'shipped', 'delivered'];
    const currentStepIndex = statusSteps.indexOf(order.status);

    const getStepIcon = (step) => {
        switch (step) {
            case 'placed': return <FileText size={18} />;
            case 'confirmed': return <CheckCircle size={18} />;
            case 'shipped': return <Truck size={18} />;
            case 'delivered': return <Package size={18} />;
            default: return null;
        }
    };

    const getStepLabel = (step) => {
        return step.charAt(0).toUpperCase() + step.slice(1);
    };

    const paymentMethodLabel = {
        cod: 'Cash on Delivery',
        online: 'Online Payment (UPI/QR Scan)',
    };

    const paymentStatusStyle = {
        pending: 'bg-amber-50 text-amber-700 border-amber-100',
        pending_verification: 'bg-orange-50 text-orange-700 border-orange-100',
        paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        failed: 'bg-rose-50 text-rose-700 border-rose-100',
    };

    const paymentStatusLabel = {
        pending: 'Pending Payment',
        pending_verification: 'Payment Verifying',
        paid: 'Payment Success',
        failed: 'Payment Failed',
    };

    return (
        <MainLayout>
            <Head title={`Order #${order.order_number} Details — BiogenixCGM`} />
            <section className="max-w-5xl mx-auto px-4 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <Link href="/orders" className="inline-flex items-center text-slate-500 hover:text-teal-700 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to History
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800">Order details for #{order.order_number}</h1>
                </div>

                {/* Status Timeline Progress */}
                {order.status === 'cancelled' ? (
                    <div className="card p-5 bg-red-50/30 border-red-100 border rounded-2xl flex items-center gap-3 text-red-700 mb-8">
                        <XCircle size={24} className="text-red-500 flex-shrink-0" />
                        <div>
                            <div className="font-bold">This order has been cancelled</div>
                            <div className="text-xs text-slate-500 mt-0.5">Please contact customer support if you need further clarification.</div>
                        </div>
                    </div>
                ) : (
                    <div className="card p-8 mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Delivery Progress</h2>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
                            {statusSteps.map((step, idx) => {
                                const isCompleted = idx <= currentStepIndex;
                                const isCurrent = idx === currentStepIndex;

                                return (
                                    <div key={step} className="flex flex-row md:flex-col items-center gap-3 flex-1 relative z-10 w-full">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-slate-300 border-slate-200'} ${isCurrent ? 'ring-4 ring-teal-100' : ''}`}>
                                            {getStepIcon(step)}
                                        </div>
                                        <div className="text-left md:text-center">
                                            <div className={`text-sm font-bold ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                                                {getStepLabel(step)}
                                            </div>
                                            <div className="text-xs text-slate-400 mt-0.5">
                                                {isCurrent ? 'Current Status' : isCompleted ? 'Completed' : 'Pending'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* Connector Line for larger screens */}
                            <div className="hidden md:block absolute left-10 right-10 top-5 h-0.5 bg-slate-100 -z-10" />
                            <div
                                className="hidden md:block absolute left-10 top-5 h-0.5 bg-teal-700 -z-10 transition-all duration-500"
                                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 80}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Items & Invoice details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-slate-800 border-b pb-4 mb-4 border-slate-100">Ordered Items</h3>
                            <div className="divide-y divide-slate-100">
                                {order.items.map((item) => (
                                    <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                                        <div className="w-16 h-16 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-center flex-shrink-0">
                                            {item.product?.image_url ? (
                                                <img src={item.product.image_url} alt={item.product_name} className="h-10 w-auto object-contain" />
                                            ) : (
                                                <span className="font-bold text-teal-600">{item.product_name[0]}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-slate-800 text-sm truncate">{item.product_name}</h4>
                                            <p className="text-slate-400 text-xs mt-1">₹{Number(item.price).toLocaleString('en-IN')} each</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-slate-800">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</div>
                                            <div className="text-xs text-slate-400 mt-1">Qty: {item.quantity}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Status & Details */}
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-slate-800 border-b pb-4 mb-4 border-slate-100">Payment Information</h3>
                            <div className="grid sm:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Payment Method</div>
                                    <div className="font-semibold text-slate-800">{paymentMethodLabel[order.payment_method]}</div>
                                    {order.transaction_id && (
                                        <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                                            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">UPI Transaction ID</div>
                                            <div className="font-mono text-slate-700 text-xs select-all font-semibold">{order.transaction_id}</div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Payment Status</div>
                                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${paymentStatusStyle[order.payment_status]}`}>
                                        {paymentStatusLabel[order.payment_status]}
                                    </span>
                                    {order.payment_status === 'pending_verification' && (
                                        <p className="text-[11px] text-slate-400 mt-2 flex items-start gap-1">
                                            <AlertCircle size={12} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                            Our accounting team is validating your scanned payment. The order status will update to 'Confirmed' soon.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping address details & summary */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-slate-800 border-b pb-4 mb-4 border-slate-100 font-bold">Shipping Information</h3>
                            <div className="text-sm text-slate-600 leading-relaxed space-y-1">
                                <p className="font-bold text-slate-800">{order.shipping_address.name}</p>
                                <p>{order.shipping_address.address_line_1}</p>
                                {order.shipping_address.address_line_2 && <p>{order.shipping_address.address_line_2}</p>}
                                <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
                                <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1">
                                    <p><span className="text-slate-400 font-medium">Contact:</span> {order.shipping_address.phone}</p>
                                    <p><span className="text-slate-400 font-medium">Email:</span> {order.shipping_address.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-slate-800 border-b pb-4 mb-4 border-slate-100">Invoice Summary</h3>
                            <div className="space-y-2.5 text-sm">
                                <div className="flex justify-between text-slate-500">
                                    <span>Items Subtotal</span>
                                    <span className="font-medium text-slate-800">₹{Number(order.subtotal).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Shipping & Handling</span>
                                    <span className="font-medium text-slate-800">₹{Number(order.shipping_charge).toLocaleString('en-IN')}</span>
                                </div>
                                <hr className="border-slate-100 my-1" />
                                <div className="flex justify-between items-baseline pt-1">
                                    <span className="font-bold text-slate-800">Grand Total</span>
                                    <span className="font-extrabold text-teal-700 text-xl">₹{Number(order.total).toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
