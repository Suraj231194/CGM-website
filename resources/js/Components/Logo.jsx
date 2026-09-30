import { Link } from '@inertiajs/react';

/** The brand mark: the sensor's signature ring, with a live reading at its centre. */
export function LogoMark({ className = 'h-9 w-9', tone = 'light' }) {
    const tile = tone === 'dark' ? '#ffffff' : '#1d5859';
    const ring = tone === 'dark' ? '#1d5859' : '#ffffff';

    return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
            <rect width="40" height="40" rx="12" fill={tile} />
            <circle cx="20" cy="20" r="10.5" fill="none" stroke={ring} strokeWidth="3" opacity="0.95" />
            <path
                d="M11.5 21h4l2-4.5 3 9 2.2-6.5 1.3 2H28.5"
                fill="none"
                stroke="#7de3d3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Logo({ tone = 'light', className = '', href = '/' }) {
    const text = tone === 'dark' ? 'text-white' : 'text-ink-950';
    const accent = tone === 'dark' ? 'text-glow' : 'text-brand-600';

    return (
        <Link href={href} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="biogenixCGM home">
            <LogoMark
                tone={tone}
                className="h-9 w-9 shrink-0 transition-transform duration-500 ease-premium group-hover:rotate-[-8deg] group-hover:scale-105"
            />
            <span className={`text-[1.2rem] font-semibold tracking-tight ${text}`}>
                biogenix<span className={accent}>CGM</span>
            </span>
        </Link>
    );
}
