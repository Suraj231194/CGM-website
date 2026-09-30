import Reveal from '@/Components/Reveal';

/**
 * A section's eyebrow, heading and optional subtitle. `compact` uses the split-column heading
 * scale, which steps down at lg so a heading beside a visual does not overpower it.
 */
export default function SectionHeader({ title, subtitle, eyebrow, centered = false, tone = 'light', compact = false, action, className = '' }) {
    const dark = tone === 'dark';

    return (
        <Reveal className={`mb-12 md:mb-16 ${centered ? 'mx-auto max-w-3xl text-center' : 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between'} ${className}`}>
            <div className={centered ? '' : 'max-w-2xl'}>
                {eyebrow && <p className={`eyebrow mb-4 ${centered ? 'eyebrow-center' : ''} ${dark ? 'eyebrow-light' : ''}`}>{eyebrow}</p>}
                <h2 className={`${compact ? 'section-heading-split' : 'section-heading'} ${dark ? '!text-white' : ''}`}>{title}</h2>
                {subtitle && (
                    <p className={`section-subheading mt-4 text-pretty ${centered ? 'mx-auto' : ''} ${dark ? '!text-white/65' : ''}`}>
                        {subtitle}
                    </p>
                )}
            </div>
            {action && !centered && <div className="shrink-0">{action}</div>}
        </Reveal>
    );
}
