import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHero from '@/Components/PageHero';
import Reveal from '@/Components/Reveal';
import BlogCover from '@/Components/BlogCover';
import { useState } from 'react';
import { ArrowRight, Calendar, ShieldCheck } from 'lucide-react';

const formatDate = (value, month = 'short') =>
    new Date(value).toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric' });

export default function Index({ posts = [] }) {
    const [filter, setFilter] = useState('all');
    const categories = ['all', ...new Set(posts.map((p) => p.category))];
    const filtered = filter === 'all' ? posts : posts.filter((p) => p.category === filter);
    const [featured, ...rest] = filtered;
    // Alternate the cover mirror within each category so neighbouring posts do not repeat.
    const counts = {};
    const variantOf = Object.fromEntries(filtered.map((p) => [p.id, (counts[p.category] = (counts[p.category] ?? -1) + 1)]));

    return (
        <MainLayout>
            <Head title="Learning center" />

            <PageHero
                eyebrow="Learning center"
                title="Expert guidance, medically reviewed."
                subtitle="Expert-written, medically-reviewed articles to help you understand diabetes management technology and live your best life."
                breadcrumbs={[{ label: 'Learning center' }]}
            />

            <section className="container-page section-pad">
                {/* Category Tabs */}
                <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setFilter(cat)}
                            aria-pressed={filter === cat}
                            className={`rounded-full px-5 py-2.5 text-sm font-medium transition duration-300 ${filter === cat ? 'bg-brand-800 text-white shadow-soft' : 'border border-ink-900/10 bg-white text-ink-600 hover:border-brand-600 hover:text-brand-700'}`}
                        >
                            {cat === 'all' ? 'All articles' : cat}
                        </button>
                    ))}
                </div>

                {/* Featured article */}
                {featured && (
                    <Reveal>
                        <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-5xl border border-ink-900/[0.06] bg-white transition duration-500 ease-premium hover:shadow-lift lg:grid-cols-[1.2fr_1fr]">
                            <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                                <BlogCover category={featured.category} variant={variantOf[featured.id]} eager className="transition-transform duration-700 ease-premium group-hover:scale-[1.03]" />
                            </div>
                            <div className="flex flex-col justify-center p-8 sm:p-12">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Featured · {featured.category}</p>
                                <h2 className="mt-4 text-balance font-display text-display-xs text-ink-950 transition-colors group-hover:text-brand-700 xl:text-display-sm">{featured.title}</h2>
                                <p className="mt-4 line-clamp-3 text-lg leading-relaxed text-ink-500">{featured.excerpt}</p>
                                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-400">
                                    <span className="font-medium text-ink-700">{featured.author}</span>
                                    <span className="flex items-center gap-1.5"><Calendar size={14} aria-hidden="true" />{formatDate(featured.published_at)}</span>
                                    {featured.reviewer && (
                                        <span className="flex items-center gap-1.5 text-brand-700"><ShieldCheck size={14} aria-hidden="true" /> Medically reviewed</span>
                                    )}
                                </div>
                                <span className="link-arrow mt-8">Read article <ArrowRight size={16} aria-hidden="true" /></span>
                            </div>
                        </Link>
                    </Reveal>
                )}

                {/* Blog Grid */}
                {rest.length > 0 && (
                    <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                        {rest.map((post, i) => (
                            <Reveal key={post.id} delay={(i % 3) * 100}>
                                <Link href={`/blog/${post.slug}`} className="group block">
                                    <div className="aspect-[16/10] overflow-hidden rounded-4xl">
                                        <BlogCover category={post.category} variant={variantOf[post.id]} className="transition-transform duration-700 ease-premium group-hover:scale-105" />
                                    </div>
                                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{post.category}</p>
                                    <h2 className="mt-2 line-clamp-2 text-xl font-semibold leading-snug tracking-tight text-ink-950 transition-colors group-hover:text-brand-700">
                                        {post.title}
                                    </h2>
                                    <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-500">{post.excerpt}</p>
                                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-400">
                                        <span className="font-medium text-ink-600">{post.author}</span>
                                        <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{formatDate(post.published_at)}</span>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                )}

                {filtered.length === 0 && (
                    <p className="rounded-4xl border border-dashed border-ink-900/15 py-16 text-center text-ink-400">No articles in this category yet.</p>
                )}
            </section>
        </MainLayout>
    );
}
