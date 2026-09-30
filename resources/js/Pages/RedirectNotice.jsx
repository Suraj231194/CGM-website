import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

const SECONDS = 5;
const RING = 2 * Math.PI * 44;

export default function RedirectNotice({ product, redirectLink }) {
    const [countdown, setCountdown] = useState(SECONDS);
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

    let host = redirectLink.destination_url;
    try {
        host = new URL(redirectLink.destination_url).host;
    } catch {
        // Leave the raw value if it is not a parseable URL.
    }

    return (
        <MainLayout>
            <Head title={`Leaving biogenixCGM — ${product.name}`} />

            <section className="bg-aurora flex min-h-[72vh] items-center py-16">
                <div className="container-page max-w-xl">
                    <div className="animate-fade-in-up rounded-5xl bg-white p-8 text-center shadow-lift ring-1 ring-ink-900/[0.05] sm:p-12">
                        {/* Countdown ring */}
                        <div className="relative mx-auto h-28 w-28" role="timer" aria-live="polite" aria-label={`Redirecting in ${countdown} seconds`}>
                            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
                                <circle cx="50" cy="50" r="44" fill="none" stroke="#eef7f6" strokeWidth="6" />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="44"
                                    fill="none"
                                    stroke="#1d5859"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray={RING}
                                    strokeDashoffset={RING * (1 - countdown / SECONDS)}
                                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                                />
                            </svg>
                            <span className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="font-display text-4xl leading-none text-ink-950">{countdown}</span>
                                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">seconds</span>
                            </span>
                        </div>

                        <h1 className="mt-8 font-display text-3xl text-ink-950 sm:text-4xl">You Are Leaving biogenixCGM</h1>
                        <p className="mt-4 leading-relaxed text-ink-500">
                            You will be redirected to an external website to purchase the <strong className="font-semibold text-ink-800">{product.name}</strong> via <strong className="font-semibold text-ink-800">{redirectLink.label}</strong>. biogenixCGM is not responsible for the content or policies of external websites.
                        </p>

                        {/* Buttons */}
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <button type="button" onClick={handleContinue} className="btn-primary flex-1 gap-2">
                                Continue to Store <ExternalLink size={16} aria-hidden="true" />
                            </button>
                            <button type="button" onClick={() => window.history.back()} className="btn-secondary flex-1 gap-2">
                                <ArrowLeft size={16} aria-hidden="true" /> Go Back
                            </button>
                        </div>

                        {/* Destination */}
                        <p className="mt-8 flex items-center justify-center gap-2 border-t border-ink-900/[0.06] pt-6 text-xs text-ink-400">
                            <ShieldCheck size={14} className="text-brand-600" aria-hidden="true" />
                            Destination: <span className="font-medium text-ink-600" title={redirectLink.destination_url}>{host}</span>
                        </p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
