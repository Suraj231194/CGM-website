import { Star } from 'lucide-react';

export default function TestimonialCard({ quote, author, role, rating = 5, featured = false }) {
    return (
        <figure className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 md:p-10 ${featured ? 'bg-radiance grain text-white' : 'border border-ink-900/[0.06] bg-white'}`}>
            {featured && (
                <svg className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 opacity-20" viewBox="0 0 320 320" aria-hidden="true">
                    {[60, 100, 140].map((r) => (
                        <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="#7de3d3" strokeWidth="1.5" />
                    ))}
                    <circle cx="160" cy="160" r="30" fill="none" stroke="#7de3d3" strokeWidth="10" />
                </svg>
            )}
            <div className="relative flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={15}
                        aria-hidden="true"
                        className={i < rating ? 'fill-amber-400 text-amber-400' : featured ? 'fill-white/15 text-white/15' : 'fill-ink-100 text-ink-100'}
                    />
                ))}
            </div>

            <blockquote className={`relative mt-6 flex-1 text-pretty font-display font-normal leading-snug ${featured ? 'text-2xl md:text-[2rem]' : 'text-xl text-ink-900'}`}>
                &ldquo;{quote}&rdquo;
            </blockquote>

            <figcaption className="relative mt-8 flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${featured ? 'bg-glow text-ink-950' : 'bg-brand-50 text-brand-700'}`}>
                    {author?.charAt(0) || 'U'}
                </span>
                <span>
                    <span className={`block text-sm font-semibold ${featured ? 'text-white' : 'text-ink-900'}`}>{author}</span>
                    {role && <span className={`block text-xs ${featured ? 'text-white/60' : 'text-ink-400'}`}>{role}</span>}
                </span>
            </figcaption>
        </figure>
    );
}
