import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { CheckCircle, Calendar, Truck, CreditCard, ArrowRight, ClipboardList } from 'lucide-react';

export default function OrderConfirmation({ order }) {
    const formattedDate = new Date(order.created_at).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const paymentMethodLabel = {
        cod: 'Cash on Delivery',
        online: 'Online Payment (UPI/QR Scan)',
    };

    const paymentStatusLabel = {
        pending: 'Pending Payment',
        pending_verification: 'Verifying Transaction ID',
        paid: 'Payment Received',
        failed: 'Payment Failed',
    };

    return (
        <MainLayout>
            <Head title={`Order Confirmed #${order.order_number} — BiogenixCGM`} />
            <section className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 shadow-md">
                        <CheckCircle size={48} />
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Order Confirmed!</h1>
                <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                    Thank you for shopping with us. We have received your order and we will process it shortly.
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto mb-10">
                    {/* Order Details Card */}
                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 border-slate-100 flex items-center gap-2">
                            <ClipboardList size={18} className="text-teal-600" /> Order Summary
                        </h2>

                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between text-slate-500">
                                <span>Order Number</span>
                                <span className="font-bold text-slate-800 font-mono">#{order.order_number}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Order Date</span>
                                <span className="font-medium text-slate-800">{formattedDate}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Payment Type</span>
                                <span className="font-medium text-slate-800">{paymentMethodLabel[order.payment_method]}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Payment Status</span>
                                <span className={`font-bold ${order.payment_status === 'paid' ? 'text-green-600' : 'text-orange-500'}`}>
                                    {paymentStatusLabel[order.payment_status]}
                                </span>
                            </div>
                            {order.transaction_id && (
                                <div className="flex justify-between text-slate-500">
                                    <span>Transaction ID</span>
                                    <span className="font-mono text-slate-800 text-xs">{order.transaction_id}</span>
                                </div>
                            )}
                        </div>

                        <hr className="border-slate-100" />

                        <div className="space-y-3">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600 truncate max-w-[200px]">
                                        {item.product_name} <span className="text-slate-400 font-bold">× {item.quantity}</span>
                                    </span>
                                    <span className="font-semibold text-slate-800">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>

                        <hr className="border-slate-100" />

                        <div className="space-y-1.5 text-sm">
                            <div className="flex justify-between text-slate-500">
                                <span>Subtotal</span>
                                <span className="font-semibold text-slate-800">₹{Number(order.subtotal).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Shipping</span>
                                <span className="font-semibold text-slate-800">₹{Number(order.shipping_charge).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-base pt-2">
                                <span className="font-bold text-slate-800">Total</span>
                                <span className="font-extrabold text-teal-700 text-lg">₹{Number(order.total).toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address Card */}
                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 border-slate-100 flex items-center gap-2">
                            <Truck size={18} className="text-teal-600" /> Shipping Address
                        </h2>

                        <div className="text-sm text-slate-600 space-y-1 leading-relaxed">
                            <p className="font-bold text-slate-800">{order.shipping_address.name}</p>
                            <p>{order.shipping_address.address_line_1}</p>
                            {order.shipping_address.address_line_2 && <p>{order.shipping_address.address_line_2}</p>}
                            <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
                            <div className="pt-3 border-t border-slate-100 mt-3 space-y-1">
                                <p><span className="text-slate-400 font-medium">Phone:</span> {order.shipping_address.phone}</p>
                                <p><span className="text-slate-400 font-medium">Email:</span> {order.shipping_address.email}</p>
                            </div>
                        </div>

                        {order.notes && (
                            <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Notes</p>
                                <p className="text-xs text-slate-600 italic">{order.notes}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/orders" className="btn-primary flex items-center gap-2">
                        View Order History <ArrowRight size={16} />
                    </Link>
                    <Link href="/products" className="btn-secondary">
                        Continue Shopping
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
