import { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ShoppingCart,
    Truck,
    CreditCard,
    CheckCircle,
    Loader2,
    ShieldCheck,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';
import axios from 'axios';

export default function Checkout({ cartItems = [], subtotal = 0, paymentSettings = null, user = null }) {
    const { errors: serverErrors } = usePage().props;

    const [shippingCharge, setShippingCharge] = useState(null);
    const [loadingShipping, setLoadingShipping] = useState(false);
    const [shippingError, setShippingError] = useState('');

    const [checkoutForm, setCheckoutForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        pincode: '',
        payment_method: 'cod',
        transaction_id: '',
        notes: '',
    });

    const [errors, setErrors] = useState({});
    const [submittingOrder, setSubmittingOrder] = useState(false);

    // Sync validation errors from session flash/props
    useEffect(() => {
        if (serverErrors) {
            setErrors(serverErrors);
        }
    }, [serverErrors]);

    // Fetch shipping charges
    useEffect(() => {
        if (checkoutForm.pincode && /^\d{6}$/.test(checkoutForm.pincode)) {
            setLoadingShipping(true);
            setShippingError('');
            axios.get(`/checkout/shipping-charge?pincode=${checkoutForm.pincode}`)
                .then((res) => {
                    setShippingCharge(Number(res.data.charge));
                })
                .catch((err) => {
                    setShippingError('Error matching pincode. Fallback charge applied.');
                    setShippingCharge(99);
                })
                .finally(() => {
                    setLoadingShipping(false);
                });
        } else {
            setShippingCharge(null);
        }
    }, [checkoutForm.pincode]);

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        setSubmittingOrder(true);
        setErrors({});

        router.post('/checkout', checkoutForm, {
            onError: (errs) => {
                setErrors(errs);
                setSubmittingOrder(false);
            },
            onFinish: () => {
                setSubmittingOrder(false);
            }
        });
    };

    const grandTotal = subtotal + (shippingCharge || 0);

    return (
        <MainLayout>
            <Head title="Secure Checkout — BiogenixCGM" />

            <div className="bg-slate-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Back Button */}
                    <button 
                        type="button"
                        onClick={() => window.history.back()} 
                        className="flex items-center gap-1.5 text-slate-500 hover:text-teal-700 text-sm font-semibold mb-6 transition"
                    >
                        <ArrowLeft size={16} /> Back to Shopping
                    </button>

                    <h1 className="text-3xl font-extrabold text-slate-800 mb-8 flex items-center gap-2">
                        <ShieldCheck className="text-teal-700" size={32} /> Secure Checkout
                    </h1>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Form Details */}
                        <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-6">
                            {/* Shipping Address */}
                            <div className="card p-6 bg-white border border-slate-100 space-y-6">
                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-3">
                                    <Truck size={20} className="text-teal-700" /> Shipping Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-600 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            value={checkoutForm.name}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                                            className={`w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500 ${errors.name ? 'border-red-300' : ''}`}
                                            required
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1">Contact Phone *</label>
                                        <input
                                            type="text"
                                            value={checkoutForm.phone}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                                            className={`w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500 ${errors.phone ? 'border-red-300' : ''}`}
                                            required
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            value={checkoutForm.email}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                                            className={`w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500 ${errors.email ? 'border-red-300' : ''}`}
                                            required
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-600 mb-1">Address Line 1 *</label>
                                        <input
                                            type="text"
                                            value={checkoutForm.address_line_1}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, address_line_1: e.target.value })}
                                            className={`w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500 ${errors.address_line_1 ? 'border-red-300' : ''}`}
                                            placeholder="Flat no., Building, Street name"
                                            required
                                        />
                                        {errors.address_line_1 && <p className="text-red-500 text-xs mt-1">{errors.address_line_1}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-600 mb-1">Address Line 2 (Landmark / Suite)</label>
                                        <input
                                            type="text"
                                            value={checkoutForm.address_line_2}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, address_line_2: e.target.value })}
                                            className="w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500"
                                            placeholder="Apartment, suite, unit, landmark, etc. (optional)"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1">Pincode *</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                maxLength={6}
                                                value={checkoutForm.pincode}
                                                onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                                                className={`w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500 ${errors.pincode ? 'border-red-300' : ''}`}
                                                placeholder="6-digit pincode"
                                                required
                                            />
                                            {loadingShipping && <Loader2 className="animate-spin absolute right-3 top-3 text-slate-400" size={16} />}
                                        </div>
                                        {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                                        {shippingError && <p className="text-red-500 text-xs mt-1">{shippingError}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1">City *</label>
                                        <input
                                            type="text"
                                            value={checkoutForm.city}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                                            className={`w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500 ${errors.city ? 'border-red-300' : ''}`}
                                            required
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-600 mb-1">State *</label>
                                        <input
                                            type="text"
                                            value={checkoutForm.state}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}
                                            className={`w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500 ${errors.state ? 'border-red-300' : ''}`}
                                            required
                                        />
                                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-600 mb-1">Order Notes</label>
                                        <textarea
                                            value={checkoutForm.notes}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                                            className="w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500 h-20"
                                            placeholder="Notes about your order, e.g. special instructions for delivery"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment details */}
                            <div className="card p-6 bg-white border border-slate-100 space-y-6">
                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-3">
                                    <CreditCard size={20} className="text-teal-700" /> Payment Method
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className={`border p-4 rounded-xl cursor-pointer flex items-start gap-3 hover:bg-slate-50 transition ${checkoutForm.payment_method === 'cod' ? 'border-teal-600 bg-teal-50/10' : 'border-slate-200'}`}>
                                        <input 
                                            type="radio" 
                                            name="payment_method"
                                            checked={checkoutForm.payment_method === 'cod'} 
                                            onChange={() => setCheckoutForm({ ...checkoutForm, payment_method: 'cod' })} 
                                            className="mt-0.5 text-teal-600 focus:ring-teal-500" 
                                        />
                                        <div>
                                            <div className="font-bold text-slate-850 text-sm">Cash on Delivery</div>
                                            <div className="text-xs text-slate-500 mt-0.5">Pay with cash upon delivery.</div>
                                        </div>
                                    </label>
                                    <label className={`border p-4 rounded-xl cursor-pointer flex items-start gap-3 hover:bg-slate-50 transition ${checkoutForm.payment_method === 'online' ? 'border-teal-600 bg-teal-50/10' : 'border-slate-200'}`}>
                                        <input 
                                            type="radio" 
                                            name="payment_method"
                                            checked={checkoutForm.payment_method === 'online'} 
                                            onChange={() => setCheckoutForm({ ...checkoutForm, payment_method: 'online' })} 
                                            className="mt-0.5 text-teal-600 focus:ring-teal-500" 
                                        />
                                        <div>
                                            <div className="font-bold text-slate-850 text-sm">Pay Online (UPI)</div>
                                            <div className="text-xs text-slate-500 mt-0.5">Instant secure payment via UPI code.</div>
                                        </div>
                                    </label>
                                </div>

                                {checkoutForm.payment_method === 'online' && (
                                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 animate-fade-in text-sm">
                                        {paymentSettings ? (
                                            <div className="flex flex-col md:flex-row gap-5 items-center">
                                                {paymentSettings.qr_code_image && (
                                                    <div className="w-32 h-32 bg-white border p-1 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                                        <img src={paymentSettings.qr_code_image} alt="UPI QR Code" className="max-h-full object-contain" />
                                                    </div>
                                                )}
                                                <div className="space-y-2">
                                                    <p className="font-bold text-slate-800">Scan & Pay using any UPI app:</p>
                                                    <p className="text-xs text-slate-500 leading-relaxed">
                                                        Scan the QR code or send payment to the UPI ID below. Once completed, enter the 12-digit transaction ID below to verify your payment.
                                                    </p>
                                                    {paymentSettings.upi_id && (
                                                        <div className="mt-1 bg-teal-50 text-teal-800 px-3 py-1 border border-teal-100 rounded-lg font-mono font-bold select-all w-fit text-sm">
                                                            UPI ID: {paymentSettings.upi_id}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-slate-400 italic">No UPI config loaded.</p>
                                        )}

                                        <div className="pt-2">
                                            <label className="block text-xs font-bold text-slate-700 mb-1">Transaction ID / UPI Ref Number *</label>
                                            <input
                                                type="text"
                                                value={checkoutForm.transaction_id}
                                                onChange={(e) => setCheckoutForm({ ...checkoutForm, transaction_id: e.target.value })}
                                                className={`w-full rounded-xl border-slate-200 text-sm py-2.5 px-3.5 focus:border-teal-500 focus:ring-teal-500 ${errors.transaction_id ? 'border-red-300' : ''}`}
                                                placeholder="Enter 12-digit transaction reference number"
                                                required
                                            />
                                            {errors.transaction_id && <p className="text-red-500 text-xs mt-1">{errors.transaction_id}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="card p-6 bg-white border border-slate-100 space-y-6">
                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-3">
                                    <ShoppingCart size={20} className="text-teal-700" /> Order Summary
                                </h2>

                                {/* Cart Items */}
                                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-12 h-12 bg-slate-50 border rounded-lg p-0.5 flex items-center justify-center flex-shrink-0">
                                                    <img src={item.product.image_url} alt={item.product.name} className="max-h-full max-w-full object-contain" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.product.name}</h4>
                                                    <span className="text-slate-550 text-xs">Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <span className="font-bold text-slate-800 text-sm">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Calculation */}
                                <div className="space-y-3 pt-3 border-t text-sm text-slate-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-slate-800">₹{Number(subtotal).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping & Handling</span>
                                        <span className="font-bold text-slate-800">
                                            {shippingCharge !== null ? `₹${shippingCharge}` : loadingShipping ? 'Calculating...' : 'Enter pincode'}
                                        </span>
                                    </div>
                                    <hr className="border-slate-100 my-2" />
                                    <div className="flex justify-between items-baseline pt-2">
                                        <span className="font-bold text-slate-800 text-base">Grand Total</span>
                                        <span className="text-2xl font-black text-teal-700">₹{Number(grandTotal).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCheckoutSubmit}
                                    disabled={submittingOrder || shippingCharge === null}
                                    className="btn-primary w-full py-4 text-center justify-center font-bold flex items-center gap-2 disabled:opacity-50"
                                >
                                    {submittingOrder ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Confirm Order <CheckCircle size={18} />
                                        </>
                                    )}
                                </button>
                                {shippingCharge === null && (
                                    <p className="text-xs text-center text-red-500 flex items-center justify-center gap-1">
                                        <AlertCircle size={14} /> Enter a valid 6-digit delivery pincode to proceed.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
