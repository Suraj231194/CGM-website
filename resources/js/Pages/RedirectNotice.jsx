import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState, useEffect } from 'react';
import { ExternalLink, ArrowLeft, AlertTriangle, Shield } from 'lucide-react';

export default function RedirectNotice({ product, redirectLink }) {
    const [countdown, setCountdown] = useState(5);
    const [eventSent, setEventSent] = useState(false);

    useEffect(() => {
        if (countdown <= 0) {
            handleContinue();
            return;
        }
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const sendEvent = () => {
        if (eventSent) return;
        setEventSent(true);
        fetch('/redirect-events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
            },
            body: JSON.stringify({
                product_id: product.id,
                redirect_link_id: redirectLink.id,
                source_page: window.location.pathname,
            }),
        }).catch(() => {});
    };

    const handleContinue = () => {
        sendEvent();
        window.location.href = redirectLink.destination_url;
    };

    return (
        <MainLayout>
            <Head title={`Leaving biogenixCGM — ${product.name}`} />

            <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-100 to-teal-50 py-16">
                <div className="max-w-lg mx-auto px-4 w-full">
                    <div className="card p-8 text-center animate-fade-in-up">
                        {/* Warning Icon */}
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={32} className="text-amber-500" />
                        </div>

                        <h1 className="text-2xl font-bold text-slate-800 mb-3">
                            You Are Leaving biogenixCGM
                        </h1>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            You will be redirected to an external website to purchase the <strong className="text-slate-700">{product.name}</strong> via <strong className="text-slate-700">{redirectLink.label}</strong>. biogenixCGM is not responsible for the content or policies of external websites.
                        </p>

                        {/* Countdown */}
                        <div className="bg-slate-50 rounded-xl p-4 mb-6">
                            <p className="text-sm text-slate-500">
                                Redirecting automatically in
                            </p>
                            <p className="text-3xl font-bold text-teal-700 mt-1">{countdown}s</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleContinue}
                                className="btn-primary flex-1"
                            >
                                Continue to Store <ExternalLink size={16} className="ml-2" />
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="btn-secondary flex-1"
                            >
                                <ArrowLeft size={16} className="mr-2" /> Go Back
                            </button>
                        </div>

                        {/* Destination */}
                        <div className="mt-6 pt-5 border-t border-slate-100">
                            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                                <Shield size={12} />
                                Destination: {redirectLink.destination_url}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
