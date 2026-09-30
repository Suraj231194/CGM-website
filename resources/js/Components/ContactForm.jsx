import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Lock } from 'lucide-react';

const FIELD_LABELS = {
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone',
    role: 'I am a',
    product_interest: 'Product of interest',
    message: 'Message',
    consent: 'Consent',
};

function FieldError({ id, message }) {
    if (!message) return null;
    return (
        <p id={id} className="field-error">
            <AlertCircle size={13} aria-hidden="true" />
            {message}
        </p>
    );
}

export default function ContactForm({ products = [], sourcePage = '', defaultRole = '' }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        phone: '',
        role: defaultRole || '',
        product_interest: '',
        message: '',
        consent: false,
        source_page: sourcePage,
    });

    // Inertia's `recentlySuccessful` flips back after two seconds, which made the thank-you
    // message vanish before it could be read. The confirmation now stays until dismissed.
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/leads', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubmitted(true);
            },
        });
    };

    const errorKeys = Object.keys(errors);
    const fieldProps = (name) => ({
        id: name,
        name,
        'aria-invalid': errors[name] ? 'true' : undefined,
        'aria-describedby': errors[name] ? `${name}-error` : undefined,
    });

    if (submitted) {
        return (
            <div className="animate-fade-in rounded-3xl bg-brand-50 p-8 text-center md:p-10" role="status">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-700 shadow-soft">
                    <CheckCircle2 size={28} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-3xl font-normal text-ink-950">Thank you.</h3>
                <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-600">
                    Your inquiry has been submitted successfully. Our team will be in touch within 24 hours.
                </p>
                <button
                    type="button"
                    onClick={() => {
                        clearErrors();
                        setSubmitted(false);
                    }}
                    className="mt-6 text-sm font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-700"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {errorKeys.length > 0 && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                    <p className="font-semibold">Please check the following:</p>
                    <ul className="mt-1.5 list-disc space-y-0.5 pl-5">
                        {errorKeys.map((key) => (
                            <li key={key}>
                                <a href={`#${key}`} className="underline underline-offset-2">{FIELD_LABELS[key] || key}</a>: {errors[key]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="field-label">Full name <span className="text-brand-600" aria-hidden="true">*</span></label>
                    <input
                        {...fieldProps('name')}
                        type="text"
                        autoComplete="name"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="field"
                        placeholder="Your full name"
                    />
                    <FieldError id="name-error" message={errors.name} />
                </div>

                <div>
                    <label htmlFor="email" className="field-label">Email address <span className="text-brand-600" aria-hidden="true">*</span></label>
                    <input
                        {...fieldProps('email')}
                        type="email"
                        autoComplete="email"
                        required
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="field"
                        placeholder="you@example.com"
                    />
                    <FieldError id="email-error" message={errors.email} />
                </div>

                <div>
                    <label htmlFor="phone" className="field-label">Phone <span className="font-normal text-ink-400">(optional)</span></label>
                    <input
                        {...fieldProps('phone')}
                        type="tel"
                        autoComplete="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="field"
                        placeholder="+1 555 000 0000"
                    />
                    <FieldError id="phone-error" message={errors.phone} />
                </div>

                <div>
                    <label htmlFor="role" className="field-label">I am a <span className="text-brand-600" aria-hidden="true">*</span></label>
                    <select
                        {...fieldProps('role')}
                        required
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="field pr-10"
                    >
                        <option value="">Select your role</option>
                        <option value="patient">Patient</option>
                        <option value="caregiver">Caregiver</option>
                        <option value="hcp">Healthcare Provider</option>
                        <option value="distributor">Distributor</option>
                        <option value="other">Other</option>
                    </select>
                    <FieldError id="role-error" message={errors.role} />
                </div>
            </div>

            <div>
                <label htmlFor="product_interest" className="field-label">Product of interest</label>
                <select
                    {...fieldProps('product_interest')}
                    value={data.product_interest}
                    onChange={(e) => setData('product_interest', e.target.value)}
                    className="field pr-10"
                >
                    <option value="">Select a product (optional)</option>
                    {products.map((p) => (
                        <option key={p.id || p.slug} value={p.slug}>{p.name}</option>
                    ))}
                </select>
                <FieldError id="product_interest-error" message={errors.product_interest} />
            </div>

            <div>
                <label htmlFor="message" className="field-label">Message <span className="text-brand-600" aria-hidden="true">*</span></label>
                <textarea
                    {...fieldProps('message')}
                    required
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    rows={5}
                    className="field resize-none"
                    placeholder="Tell us how we can help..."
                />
                <FieldError id="message-error" message={errors.message} />
            </div>

            <div>
                <div className="flex items-start gap-3 rounded-2xl bg-sand-50 p-4">
                    <input
                        {...fieldProps('consent')}
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => setData('consent', e.target.checked)}
                        className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-ink-900/25 text-brand-700 focus:ring-brand-500"
                    />
                    <label htmlFor="consent" className="text-sm leading-relaxed text-ink-600">
                        I consent to biogenixCGM contacting me regarding my inquiry. I have read and agree to the Privacy Policy. <span className="text-brand-600" aria-hidden="true">*</span>
                    </label>
                </div>
                <FieldError id="consent-error" message={errors.consent} />
            </div>

            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-xs text-ink-400">
                    <Lock size={13} aria-hidden="true" /> Please don&rsquo;t include medical records or test results.
                </p>
                <button type="submit" disabled={processing} className="btn-primary gap-2 sm:min-w-[200px]">
                    {processing ? (
                        <>
                            <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Submitting…
                        </>
                    ) : (
                        <>
                            Submit request <ArrowRight size={18} aria-hidden="true" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
