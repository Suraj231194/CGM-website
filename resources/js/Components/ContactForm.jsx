import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm({ products = [], sourcePage = '', defaultRole = '' }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        role: defaultRole || '',
        product_interest: '',
        message: '',
        consent: false,
        source_page: sourcePage,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/leads', {
            onSuccess: () => reset(),
        });
    };

    if (recentlySuccessful) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700 text-sm">
                    Your inquiry has been submitted successfully. Our team will be in touch within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-sm"
                    placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-sm"
                    placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone (Optional)</label>
                <input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-sm"
                    placeholder="+1 555 000 0000"
                />
            </div>

            {/* Role */}
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1.5">I am a *</label>
                <select
                    id="role"
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-sm bg-white"
                >
                    <option value="">Select your role</option>
                    <option value="patient">Patient</option>
                    <option value="caregiver">Caregiver</option>
                    <option value="hcp">Healthcare Provider</option>
                    <option value="distributor">Distributor</option>
                    <option value="other">Other</option>
                </select>
                {errors.role && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} />{errors.role}</p>}
            </div>

            {/* Product Interest */}
            <div>
                <label htmlFor="product_interest" className="block text-sm font-medium text-slate-700 mb-1.5">Product of Interest</label>
                <select
                    id="product_interest"
                    value={data.product_interest}
                    onChange={(e) => setData('product_interest', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-sm bg-white"
                >
                    <option value="">Select a product (optional)</option>
                    {products.map((p) => (
                        <option key={p.id || p.slug} value={p.slug}>{p.name}</option>
                    ))}
                </select>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                <textarea
                    id="message"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-sm resize-none"
                    placeholder="Tell us how we can help..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p>}
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
                <input
                    id="consent"
                    type="checkbox"
                    checked={data.consent}
                    onChange={(e) => setData('consent', e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                />
                <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed">
                    I consent to biogenixCGM contacting me regarding my inquiry. I have read and agree to the Privacy Policy. *
                </label>
            </div>
            {errors.consent && <p className="text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} />{errors.consent}</p>}

            <button
                type="submit"
                disabled={processing}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {processing ? 'Submitting...' : 'Submit Request'}
            </button>
        </form>
    );
}
