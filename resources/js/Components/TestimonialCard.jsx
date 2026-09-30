export default function TestimonialCard({ quote, author, role, featured = false }) {
    return (
        <figure className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 md:p-10 ${featured ? 'bg-radiance grain text-white' : 'border border-ink-900/[0.06] bg-white'}`}>
            <blockquote className={`relative flex-1 text-pretty font-display font-normal leading-snug ${featured ? 'flex items-center text-2xl md:text-[2.25rem] md:leading-[1.15] tracking-[-0.015em]' : 'text-xl text-ink-900'}`}>
                {featured ? <p>&ldquo;{quote}&rdquo;</p> : <>&ldquo;{quote}&rdquo;</>}
            </blockquote>

            <figcaption className="relative mt-8 flex items-center gap-3">
                <span className={`h-px w-8 shrink-0 ${featured ? 'bg-white/40' : 'bg-ink-900/30'}`} aria-hidden="true" />
                <span>
                    <span className={`block text-sm font-semibold ${featured ? 'text-white' : 'text-ink-900'}`}>{author}</span>
                    {role && <span className={`block text-xs ${featured ? 'text-white/60' : 'text-ink-500'}`}>{role}</span>}
                </span>
            </figcaption>
        </figure>
    );
}
