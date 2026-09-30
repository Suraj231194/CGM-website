import { Link } from '@inertiajs/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Logo from '@/Components/Logo';
import GlucoseTrace from '@/Components/GlucoseTrace';

export default function GuestLayout({ children }) {
    return (
        <div className="grid min-h-screen bg-canvas lg:grid-cols-[1fr_1.05fr]">
            {/* Brand panel */}
            <aside className="bg-radiance grain relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
                <Logo tone="dark" />
                <div className="relative max-w-md">
                    <p className="font-display text-4xl leading-tight">Your glucose, your day, one calm view.</p>
                    <div className="mt-10 rounded-4xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                        <GlucoseTrace tone="dark" axis={false} className="h-32" id="guest-trace" />
                        <p className="mt-4 text-xs text-white/45">Illustrative data</p>
                    </div>
                </div>
                <p className="flex items-center gap-2 text-sm text-white/55">
                    <ShieldCheck size={16} className="text-glow" aria-hidden="true" /> Your account and data are protected with encryption.
                </p>
            </aside>

            {/* Form */}
            <main className="flex flex-col px-5 py-8 sm:px-8">
                <div className="flex items-center justify-between">
                    <div className="lg:invisible"><Logo /></div>
                    <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-brand-700">
                        <ArrowLeft size={16} aria-hidden="true" /> Back to site
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center py-10">
                    <div className="w-full max-w-md animate-fade-in-up rounded-5xl bg-white px-7 py-10 shadow-lift ring-1 ring-ink-900/[0.05] sm:px-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
