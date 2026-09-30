import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/Components/Reveal';

/**
 * The closing call to action: calm, and with exactly one primary choice. Dark by default;
 * `tone="light"` gives a soft petrol-tinted panel for pages that already end on a dark band.
 */
export default function CtaBand({
    eyebrow = 'We are here to help',
    title = 'Find the right device for your day.',
    text = 'Talk to our team about which biogenixCGM product fits your therapy and lifestyle. We are with you at every step.',
    primary = { label: 'Request information', href: '/contact' },
    secondary = { label: 'Explore products', href: '/products' },
    tone = 'dark',
}) {
    const light = tone === 'light';

    return (
        <section className="container-page py-20 md:py-24">
            <Reveal className={`relative overflow-hidden rounded-5xl px-6 py-16 text-center sm:px-12 md:py-20 ${light ? 'ring-1 ring-ink-900/[0.06] bg-[radial-gradient(60%_80%_at_85%_0%,rgba(175,217,214,0.55),transparent_70%),linear-gradient(135deg,#eef7f6_0%,#ffffff_55%,#f3f1ea_100%)]' : 'bg-radiance grain'}`}>
                {/* Concentric rings echo the sensor, radiating from behind the headline. */}
                <svg className={`pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 ${light ? 'opacity-[0.07]' : 'opacity-[0.14]'}`} viewBox="0 0 900 900" aria-hidden="true">
                    {[120, 200, 280, 360, 440].map((r) => (
                        <circle key={r} cx="450" cy="450" r={r} fill="none" stroke={light ? '#1d5859' : '#7de3d3'} strokeWidth="1" />
                    ))}
                </svg>
                <div className="relative mx-auto max-w-2xl">
                    <p className={`eyebrow eyebrow-center mb-5 ${light ? '' : 'eyebrow-light'}`}>{eyebrow}</p>
                    <h2 className={`text-balance font-display text-display-sm font-normal md:text-display-md ${light ? 'text-ink-950' : 'text-white'}`}>{title}</h2>
                    <p className={`mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed ${light ? 'text-ink-500' : 'text-white/70'}`}>{text}</p>
                    <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                        <Link href={primary.href} className={`${light ? 'btn-primary' : 'btn-light'} gap-2`}>
                            {primary.label} <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                        {secondary && (
                            <Link href={secondary.href} className={light ? 'btn-secondary' : 'btn-ghost-light'}>
                                {secondary.label}
                            </Link>
                        )}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
