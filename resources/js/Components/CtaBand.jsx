import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/Components/Reveal';

/** The closing call to action: dark, calm, and with exactly one primary choice. */
export default function CtaBand({
    eyebrow = 'We are here to help',
    title = 'Find the right device for your day.',
    text = 'Talk to our team about which biogenixCGM product fits your therapy and lifestyle. We are with you at every step.',
    primary = { label: 'Request information', href: '/contact' },
    secondary = { label: 'Explore products', href: '/products' },
}) {
    return (
        <section className="container-page py-20 md:py-24">
            <Reveal className="bg-radiance grain relative overflow-hidden rounded-5xl px-6 py-16 text-center sm:px-12 md:py-20">
                {/* Concentric rings echo the sensor, radiating from behind the headline. */}
                <svg className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]" viewBox="0 0 900 900" aria-hidden="true">
                    {[120, 200, 280, 360, 440].map((r) => (
                        <circle key={r} cx="450" cy="450" r={r} fill="none" stroke="#7de3d3" strokeWidth="1" />
                    ))}
                </svg>
                <div className="relative mx-auto max-w-2xl">
                    <p className="eyebrow eyebrow-light mb-5 justify-center">{eyebrow}</p>
                    <h2 className="text-balance font-display text-display-sm font-normal text-white md:text-display-md">{title}</h2>
                    <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/70">{text}</p>
                    <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link href={primary.href} className="btn-light gap-2">
                            {primary.label} <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                        {secondary && (
                            <Link href={secondary.href} className="btn-ghost-light">
                                {secondary.label}
                            </Link>
                        )}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
