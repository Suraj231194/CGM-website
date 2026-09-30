import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items = [], tone = 'light' }) {
    if (!items.length) return null;
    const dark = tone === 'dark';

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${dark ? 'text-white/55' : 'text-ink-400'}`}>
                <li>
                    <Link href="/" className={`transition-colors ${dark ? 'hover:text-white' : 'hover:text-brand-700'}`}>Home</Link>
                </li>
                {items.map((item, i) => (
                    <li key={item.label} className="flex items-center gap-1.5">
                        <ChevronRight size={14} aria-hidden="true" className="opacity-60" />
                        {item.href && i < items.length - 1 ? (
                            <Link href={item.href} className={`transition-colors ${dark ? 'hover:text-white' : 'hover:text-brand-700'}`}>{item.label}</Link>
                        ) : (
                            <span aria-current="page" className={dark ? 'text-white/85' : 'text-ink-700'}>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

/**
 * The opening band of every inner page: one H1, a short promise, and optional actions or
 * a supporting visual. `tone="dark"` is used for support-led and professional pages.
 */
export default function PageHero({ eyebrow, title, subtitle, tone = 'light', align = 'center', breadcrumbs = [], aside, children }) {
    const dark = tone === 'dark';
    const centered = align === 'center' && !aside;

    return (
        <section className={`relative overflow-hidden ${dark ? 'bg-radiance grain text-white' : 'bg-aurora'}`}>
            {!dark && <div className="pointer-events-none absolute inset-0 bg-grid-faint [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" aria-hidden="true" />}
            <div className={`container-page relative py-16 md:py-24 ${aside ? 'grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
                <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
                    <div className={centered ? 'flex justify-center' : ''}>
                        <Breadcrumbs items={breadcrumbs} tone={tone} />
                    </div>
                    {eyebrow && <p className={`eyebrow mb-5 animate-fade-in-up ${dark ? 'eyebrow-light' : ''}`}>{eyebrow}</p>}
                    <h1 className={`animate-fade-in-up text-balance font-display text-display-sm font-normal sm:text-display-md lg:text-display-lg ${dark ? 'text-white' : 'text-ink-950'}`}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p className={`animate-fade-in-up animate-delay-100 mt-6 text-pretty text-lg leading-relaxed ${centered ? 'mx-auto max-w-2xl' : 'max-w-xl'} ${dark ? 'text-white/70' : 'text-ink-500'}`}>
                            {subtitle}
                        </p>
                    )}
                    {children && <div className="animate-fade-in-up animate-delay-200 mt-8">{children}</div>}
                </div>
                {aside && <div className="animate-fade-in-up animate-delay-200">{aside}</div>}
            </div>
        </section>
    );
}
