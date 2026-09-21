import { Quote, Star } from 'lucide-react';

export default function TestimonialCard({ quote, author, role, rating = 5 }) {
    return (
        <div className="card p-8 relative group">
            {/* Decorative Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-12 h-12 text-teal-700" />
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${
                            i < rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200 fill-slate-200'
                        }`}
                    />
                ))}
            </div>

            {/* Quote Text */}
            <blockquote className="text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                &ldquo;{quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm">
                    {author?.charAt(0) || 'U'}
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-800">{author}</p>
                    {role && <p className="text-xs text-slate-500">{role}</p>}
                </div>
            </div>
        </div>
    );
}
