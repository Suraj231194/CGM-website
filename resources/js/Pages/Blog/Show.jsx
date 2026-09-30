import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Reveal from '@/Components/Reveal';
import BlogCover from '@/Components/BlogCover';
import CtaBand from '@/Components/CtaBand';
import { Breadcrumbs } from '@/Components/PageHero';
import { ArrowLeft, ArrowRight, Calendar, Clock, Info, ShieldCheck, User } from 'lucide-react';

const readingMinutes = (html = '') => Math.max(1, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 220));

export default function Show({ post, relatedPosts = [] }) {
    // Alternate the cover mirror within each category so the article and its related posts do not repeat.
    const counts = {};
    const variantOf = Object.fromEntries([post, ...relatedPosts].map((p) => [p.id, (counts[p.category] = (counts[p.category] ?? -1) + 1)]));

    return (
        <MainLayout>
            <Head title={post.title} />

            <article>
                {/* Header */}
                <header className="bg-aurora">
                    <div className="container-page max-w-[40rem] pb-12 pt-10 md:pb-16 md:pt-14">
                        {/* Let the crumbs shrink below their 40ch cap so a long title truncates instead of widening the page on phones. */}
                        <div className="[&_li]:min-w-0 [&_li]:max-w-full">
                            <Breadcrumbs items={[{ label: 'Learning center', href: '/blog' }, { label: post.title }]} />
                        </div>
                        <p className="chip-brand">{post.category}</p>
                        <h1 className="mt-5 text-balance font-display text-display-sm font-normal text-ink-950 md:text-display-md">{post.title}</h1>
                        {post.excerpt && <p className="mt-5 text-pretty text-xl leading-relaxed text-ink-500">{post.excerpt}</p>}
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500">
                            <span className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700"><User size={15} aria-hidden="true" /></span>
                                <span className="font-medium text-ink-800">{post.author}</span>
                            </span>
                            <span className="flex items-center gap-1.5"><Calendar size={15} aria-hidden="true" />{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <span className="flex items-center gap-1.5"><Clock size={15} aria-hidden="true" />{readingMinutes(post.body)} min read</span>
                        </div>
                        {post.reviewer && (
                            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-ink-600 shadow-soft ring-1 ring-ink-900/5">
                                <ShieldCheck size={16} className="text-brand-600" aria-hidden="true" /> Medically reviewed by <span className="font-semibold text-ink-900">{post.reviewer}</span>
                            </p>
                        )}
                    </div>
                </header>

                <div className="container-page max-w-5xl">
                    <div className="-mt-2 aspect-[16/8] overflow-hidden rounded-5xl shadow-soft">
                        <BlogCover category={post.category} variant={variantOf[post.id]} eager />
                    </div>
                </div>

                {/* Body */}
                <div className="container-page max-w-[40rem] py-14 md:py-20">
                    <div className="prose-content" dangerouslySetInnerHTML={{ __html: post.body }} />

                    <div role="note" className="mt-14 flex gap-4 rounded-3xl bg-sand-100 p-6 text-sm leading-relaxed text-ink-600">
                        <Info size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                        <p>This article is for general education and is not a substitute for professional medical advice. Talk to your healthcare provider before changing your diabetes management plan.</p>
                    </div>

                    <Link href="/blog" className="link-arrow mt-10">
                        <ArrowLeft size={16} aria-hidden="true" /> Back to the learning center
                    </Link>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="border-t border-ink-900/[0.06] bg-white">
                    <div className="container-page section-pad">
                        <div className="mb-10 flex items-end justify-between gap-6">
                            <div>
                                <p className="eyebrow mb-4">Learning center</p>
                                <h2 className="section-heading">Related articles</h2>
                            </div>
                            <Link href="/blog" className="link-arrow hidden sm:inline-flex">All articles <ArrowRight size={16} aria-hidden="true" /></Link>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {relatedPosts.map((rp, i) => (
                                <Reveal key={rp.id} delay={i * 100}>
                                    <Link href={`/blog/${rp.slug}`} className="group block">
                                        <div className="aspect-[16/10] overflow-hidden rounded-4xl">
                                            <BlogCover category={rp.category} variant={variantOf[rp.id]} className="transition-transform duration-700 ease-premium group-hover:scale-105" />
                                        </div>
                                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{rp.category}</p>
                                        <h3 className="mt-2 line-clamp-2 text-balance text-xl font-semibold leading-snug tracking-tight text-ink-950 transition-colors group-hover:text-brand-700">{rp.title}</h3>
                                        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-500">{rp.excerpt}</p>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <CtaBand
                tone="light"
                eyebrow="Keep exploring"
                title="See the technology behind the insight."
                text="Explore our connected devices, or talk to our team about which one fits your day."
                primary={{ label: 'Explore products', href: '/products' }}
                secondary={{ label: 'Request information', href: '/contact' }}
            />
        </MainLayout>
    );
}
