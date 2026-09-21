import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Calendar, User, ShieldCheck, ArrowLeft, ArrowRight, Tag } from 'lucide-react';

export default function Show({ post, relatedPosts }) {
    return (
        <MainLayout>
            <Head title={`${post.title} — biogenixCGM`} />

            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Back */}
                <Link href="/blog" className="text-sm text-teal-700 hover:text-teal-800 flex items-center gap-1 mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Learning Center
                </Link>

                {/* Header */}
                <header className="mb-10">
                    <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-4">{post.category}</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 leading-tight">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        {post.reviewer && (
                            <span className="flex items-center gap-1.5 text-emerald-600">
                                <ShieldCheck size={14} /> Medically reviewed by {post.reviewer}
                            </span>
                        )}
                    </div>
                </header>

                {/* Body */}
                <div className="prose prose-slate prose-lg max-w-none mb-16" dangerouslySetInnerHTML={{ __html: post.body }} />

                {/* Related Posts */}
                {relatedPosts && relatedPosts.length > 0 && (
                    <section className="border-t border-slate-200 pt-12">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((rp) => (
                                <Link key={rp.id} href={`/blog/${rp.slug}`} className="card p-5 group block">
                                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">{rp.category}</span>
                                    <h3 className="text-sm font-bold text-slate-800 mt-2 group-hover:text-teal-700 transition-colors line-clamp-2">{rp.title}</h3>
                                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{rp.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </MainLayout>
    );
}
