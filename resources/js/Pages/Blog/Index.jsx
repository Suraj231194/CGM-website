import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

const categoryColors = {
    Education: 'bg-blue-50 text-blue-700',
    Lifestyle: 'bg-emerald-50 text-emerald-700',
    Technology: 'bg-purple-50 text-purple-700',
};

export default function Index({ posts }) {
    const [filter, setFilter] = useState('all');
    const categories = ['all', ...new Set(posts.map((p) => p.category))];
    const filtered = filter === 'all' ? posts : posts.filter((p) => p.category === filter);

    return (
        <MainLayout>
            <Head title="Learning Center — biogenixCGM" />

            <section className="bg-gradient-to-br from-slate-50 to-teal-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 animate-fade-in-up">Learning Center</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
                        Expert-written, medically-reviewed articles to help you understand diabetes management technology and live your best life.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-16">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-10 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-teal-700 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-teal-50 border border-slate-200'}`}
                        >
                            {cat === 'all' ? 'All Articles' : cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="card group block">
                            <div className="h-44 bg-gradient-to-br from-teal-100 to-slate-100 flex items-center justify-center">
                                <Tag size={40} className="text-teal-300 group-hover:text-teal-500 transition-colors" />
                            </div>
                            <div className="p-6">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-slate-100 text-slate-600'}`}>
                                    {post.category}
                                </span>
                                <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-slate-500 line-clamp-3 mb-4">{post.excerpt}</p>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><User size={12} />{post.author}</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
