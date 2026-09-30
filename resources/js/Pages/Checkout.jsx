import { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ShoppingCart,
    Truck,
    CreditCard,
    CheckCircle,
    Loader2,
    ShieldCheck,
    AlertCircle,
    ArrowLeft,
    Info
} from 'lucide-react';
import axios from 'axios';

// Appended to .field when the server rejects a value.
const INVALID_FIELD = ' border-red-400 focus:border-red-500 focus:ring-red-500/15';

// Error text under a field; the input points at it through aria-describedby.
function FieldError({ id, message }) {
    if (!message) return null;

    return (
        <p id={id} className="field-error">
            <AlertCircle size={13} className="shrink-0" aria-hidden="true" /> {message}
        </p>
    );
}

// The asterisk is decorative; the input's `required` is what assistive tech announces.
function RequiredMark() {
    return <span className="text-ink-400" aria-hidden="true"> *</span>;
}

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

    // Shared field wiring: the invalid state and the id of the field's error text.
    const invalidProps = (key, id) => ({
        'aria-invalid': errors[key] ? 'true' : undefined,
        'aria-describedby': errors[key] ? `${id}-error` : undefined,
    });

    const fieldClass = (key, extra = '') => `field${extra}${errors[key] ? INVALID_FIELD : ''}`;

    // The pincode field can carry both a validation error and the shipping-lookup notice.
    const pincodeDescribedBy = [
        errors.pincode && 'checkout-pincode-error',
        shippingError && 'checkout-pincode-shipping-error',
    ].filter(Boolean).join(' ') || undefined;

    const grandTotal = subtotal + (shippingCharge || 0);

    // The confirm button sits outside the form, so a rejected submit is also announced beside it.
    const hasErrors = Object.keys(errors || {}).length > 0;

    return (
        <MainLayout>
            <Head title="Secure checkout" />

            <div className="pb-20 pt-8 md:pt-12">
                <div className="container-page">
                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-brand-700"
                    >
                        <ArrowLeft size={16} aria-hidden="true" /> Back to shopping
                    </button>

                    <div className="mb-8 md:mb-10">
                        <p className="eyebrow"><ShieldCheck size={14} aria-hidden="true" /> Secure checkout</p>
                        <h1 className="mt-3 section-heading">Checkout</h1>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                        {/* Left Column: Form Details */}
                        <form onSubmit={handleCheckoutSubmit} className="min-w-0 space-y-6 lg:col-span-7">
                            {/* Shipping Address */}
                            <div className="card space-y-6 p-6 sm:p-8">
                                <h2 className="flex items-center gap-3 border-b border-ink-900/[0.06] pb-4 font-display text-xl font-normal text-ink-950">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
                                        <Truck size={18} aria-hidden="true" />
                                    </span>
                                    Shipping details
                                </h2>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <label htmlFor="checkout-name" className="field-label">Full name<RequiredMark /></label>
                                        <input
                                            id="checkout-name"
                                            type="text"
                                            value={checkoutForm.name}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                                            className={fieldClass('name')}
                                            autoComplete="name"
                                            {...invalidProps('name', 'checkout-name')}
                                            required
                                        />
                                        <FieldError id="checkout-name-error" message={errors.name} />
                                    </div>
                                    <div>
                                        <label htmlFor="checkout-phone" className="field-label">Contact phone<RequiredMark /></label>
                                        <input
                                            id="checkout-phone"
                                            type="text"
                                            inputMode="tel"
                                            value={checkoutForm.phone}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                                            className={fieldClass('phone')}
                                            autoComplete="tel"
                                            {...invalidProps('phone', 'checkout-phone')}
                                            required
                                        />
                                        <FieldError id="checkout-phone-error" message={errors.phone} />
                                    </div>
                                    <div>
                                        <label htmlFor="checkout-email" className="field-label">Email<RequiredMark /></label>
                                        <input
                                            id="checkout-email"
                                            type="email"
                                            value={checkoutForm.email}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                                            className={fieldClass('email')}
                                            autoComplete="email"
                                            {...invalidProps('email', 'checkout-email')}
                                            required
                                        />
                                        <FieldError id="checkout-email-error" message={errors.email} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="checkout-address1" className="field-label">Address line 1<RequiredMark /></label>
                                        <input
                                            id="checkout-address1"
                                            type="text"
                                            value={checkoutForm.address_line_1}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, address_line_1: e.target.value })}
                                            className={fieldClass('address_line_1')}
                                            placeholder="Flat no., Building, Street name"
                                            autoComplete="address-line1"
                                            {...invalidProps('address_line_1', 'checkout-address1')}
                                            required
                                        />
                                        <FieldError id="checkout-address1-error" message={errors.address_line_1} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="checkout-address2" className="field-label">Address line 2 (landmark / suite)</label>
                                        <input
                                            id="checkout-address2"
                                            type="text"
                                            value={checkoutForm.address_line_2}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, address_line_2: e.target.value })}
                                            className={fieldClass('address_line_2')}
                                            placeholder="Apartment, suite, unit, landmark, etc. (optional)"
                                            autoComplete="address-line2"
                                            {...invalidProps('address_line_2', 'checkout-address2')}
                                        />
                                        <FieldError id="checkout-address2-error" message={errors.address_line_2} />
                                    </div>
                                    <div>
                                        <label htmlFor="checkout-pincode" className="field-label">Pincode<RequiredMark /></label>
                                        <div className="relative">
                                            <input
                                                id="checkout-pincode"
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={6}
                                                value={checkoutForm.pincode}
                                                onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                                                className={fieldClass('pincode', ' pr-10')}
                                                placeholder="6-digit pincode"
                                                autoComplete="postal-code"
                                                aria-invalid={errors.pincode ? 'true' : undefined}
                                                aria-describedby={pincodeDescribedBy}
                                                required
                                            />
                                            {loadingShipping && (
                                                <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
                                                    <Loader2 className="animate-spin text-ink-400" size={16} aria-hidden="true" />
                                                </span>
                                            )}
                                        </div>
                                        <FieldError id="checkout-pincode-error" message={errors.pincode} />
                                        <FieldError id="checkout-pincode-shipping-error" message={shippingError} />
                                    </div>
                                    <div>
                                        <label htmlFor="checkout-city" className="field-label">City<RequiredMark /></label>
                                        <input
                                            id="checkout-city"
                                            type="text"
                                            value={checkoutForm.city}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                                            className={fieldClass('city')}
                                            autoComplete="address-level2"
                                            {...invalidProps('city', 'checkout-city')}
                                            required
                                        />
                                        <FieldError id="checkout-city-error" message={errors.city} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="checkout-state" className="field-label">State<RequiredMark /></label>
                                        <input
                                            id="checkout-state"
                                            type="text"
                                            value={checkoutForm.state}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}
                                            className={fieldClass('state')}
                                            autoComplete="address-level1"
                                            {...invalidProps('state', 'checkout-state')}
                                            required
                                        />
                                        <FieldError id="checkout-state-error" message={errors.state} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="checkout-notes" className="field-label">Order notes</label>
                                        <textarea
                                            id="checkout-notes"
                                            value={checkoutForm.notes}
                                            onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                                            className={fieldClass('notes', ' h-24')}
                                            placeholder="Notes about your order, e.g. special instructions for delivery"
                                            {...invalidProps('notes', 'checkout-notes')}
                                        />
                                        <FieldError id="checkout-notes-error" message={errors.notes} />
                                    </div>
                                </div>
                            </div>

                            {/* Payment details */}
                            <div className="card space-y-6 p-6 sm:p-8">
                                <h2 id="checkout-payment-heading" className="flex items-center gap-3 border-b border-ink-900/[0.06] pb-4 font-display text-xl font-normal text-ink-950">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
                                        <CreditCard size={18} aria-hidden="true" />
                                    </span>
                                    Payment method
                                </h2>

                                <div role="radiogroup" aria-labelledby="checkout-payment-heading" className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${checkoutForm.payment_method === 'cod' ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600' : 'border-ink-900/10 bg-white hover:border-ink-900/25'}`}>
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            checked={checkoutForm.payment_method === 'cod'}
                                            onChange={() => setCheckoutForm({ ...checkoutForm, payment_method: 'cod' })}
                                            className="mt-0.5 rounded-full border-ink-900/50 text-brand-700 focus:ring-brand-500"
                                        />
                                        <div>
                                            <div className="text-sm font-semibold text-ink-900">Cash on delivery</div>
                                            <div className="mt-0.5 text-xs text-ink-500">Pay with cash upon delivery.</div>
                                        </div>
                                    </label>
                                    <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${checkoutForm.payment_method === 'online' ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600' : 'border-ink-900/10 bg-white hover:border-ink-900/25'}`}>
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            checked={checkoutForm.payment_method === 'online'}
                                            onChange={() => setCheckoutForm({ ...checkoutForm, payment_method: 'online' })}
                                            className="mt-0.5 rounded-full border-ink-900/50 text-brand-700 focus:ring-brand-500"
                                        />
                                        <div>
                                            <div className="text-sm font-semibold text-ink-900">Pay online (UPI)</div>
                                            <div className="mt-0.5 text-xs text-ink-500">Instant secure payment via UPI code.</div>
                                        </div>
                                    </label>
                                </div>

                                {checkoutForm.payment_method === 'online' && (
                                    <div className="animate-fade-in space-y-4 rounded-2xl border border-ink-900/[0.06] bg-sand-100 p-5 text-sm">
                                        {paymentSettings ? (
                                            <div className="flex flex-col items-center gap-5 md:flex-row">
                                                {paymentSettings.qr_code_image && (
                                                    <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl border border-ink-900/[0.06] bg-white p-1 shadow-sm">
                                                        <img src={paymentSettings.qr_code_image} alt="UPI QR Code" className="max-h-full object-contain" />
                                                    </div>
                                                )}
                                                <div className="space-y-2">
                                                    <p className="font-semibold text-ink-900">Scan &amp; pay using any UPI app:</p>
                                                    <p className="text-xs leading-relaxed text-ink-500">
                                                        Scan the QR code or send payment to the UPI ID below. Once completed, enter the 12-digit transaction ID below to verify your payment.
                                                    </p>
                                                    {paymentSettings.upi_id && (
                                                        <div className="mt-1 w-fit max-w-full select-all break-all rounded-xl bg-white px-3 py-2 text-sm font-medium tabular-nums text-ink-900 ring-1 ring-ink-900/10">
                                                            UPI ID: {paymentSettings.upi_id}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="italic text-ink-500">No UPI config loaded.</p>
                                        )}

                                        <div className="pt-2">
                                            <label htmlFor="checkout-txn" className="field-label">Transaction ID / UPI ref number<RequiredMark /></label>
                                            <input
                                                id="checkout-txn"
                                                type="text"
                                                value={checkoutForm.transaction_id}
                                                onChange={(e) => setCheckoutForm({ ...checkoutForm, transaction_id: e.target.value })}
                                                className={fieldClass('transaction_id')}
                                                placeholder="Enter 12-digit transaction reference number"
                                                autoComplete="off"
                                                {...invalidProps('transaction_id', 'checkout-txn')}
                                                required
                                            />
                                            <FieldError id="checkout-txn-error" message={errors.transaction_id} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Right Column: Order Summary */}
                        <div className="min-w-0 space-y-6 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:col-span-5">
                            <div className="card space-y-6 p-6 sm:p-8">
                                <h2 className="flex items-center gap-3 border-b border-ink-900/[0.06] pb-4 font-display text-xl font-normal text-ink-950">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
                                        <ShoppingCart size={18} aria-hidden="true" />
                                    </span>
                                    Order summary
                                </h2>

                                {/* Cart Items */}
                                <div className="max-h-72 divide-y divide-ink-900/[0.06] overflow-y-auto pr-1">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between gap-4 py-3.5">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="product-stage h-14 w-14 shrink-0 rounded-2xl">
                                                    {/* The name is printed beside the thumbnail, so the image is decorative here. */}
                                                    <img src={item.product.image_url} alt="" className="h-11 w-11 object-contain" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-ink-900">{item.product.name}</p>
                                                    <span className="text-xs text-ink-500">Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <span className="shrink-0 text-sm font-medium tabular-nums text-ink-900">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Calculation */}
                                <div className="space-y-3 border-t border-ink-900/[0.06] pt-4 text-sm text-ink-700">
                                    <div className="flex justify-between gap-4">
                                        <span>Subtotal</span>
                                        <span className="font-medium tabular-nums text-ink-900">₹{Number(subtotal).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span>Shipping &amp; handling</span>
                                        <span className="font-medium tabular-nums text-ink-900">
                                            {shippingCharge !== null ? `₹${shippingCharge.toLocaleString('en-IN')}` : loadingShipping ? 'Calculating…' : 'Enter pincode'}
                                        </span>
                                    </div>
                                    <hr className="my-2 border-ink-900/[0.06]" />
                                    <div className="flex items-baseline justify-between gap-4 pt-2">
                                        <span className="text-base font-semibold text-ink-950">Grand total</span>
                                        <span className="font-display text-3xl tabular-nums text-ink-950">₹{Number(grandTotal).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCheckoutSubmit}
                                    disabled={submittingOrder || shippingCharge === null}
                                    className="btn-primary w-full gap-2 !py-4 disabled:bg-ink-100 disabled:text-ink-500 disabled:shadow-none disabled:opacity-100"
                                >
                                    {submittingOrder ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Submitting…
                                        </>
                                    ) : (
                                        <>
                                            Confirm order <CheckCircle size={18} aria-hidden="true" />
                                        </>
                                    )}
                                </button>
                                {hasErrors && (
                                    <p role="alert" className="field-error justify-center text-center">
                                        <AlertCircle size={13} className="shrink-0" aria-hidden="true" /> Please check the highlighted fields.
                                    </p>
                                )}
                                {shippingCharge === null && (
                                    <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-500">
                                        <Info size={14} aria-hidden="true" /> Enter a valid 6-digit delivery pincode to proceed.
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
