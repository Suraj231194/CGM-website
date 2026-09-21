import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import SectionHeader from '@/Components/SectionHeader';
import { useState } from 'react';
import { Download, Play, FileText, BookOpen } from 'lucide-react';

const typeIcons = { manual: FileText, guide: BookOpen, video: Play, document: Download };
const typeLabels = { manual: 'Manual', guide: 'Guide', video: 'Video', document: 'Document' };

export default function Resources({ resources }) {
    const [filter, setFilter] = useState('all');
    const types = ['all', ...new Set(resources.map((r) => r.type))];
    const filtered = filter === 'all' ? resources : resources.filter((r) => r.type === filter);

    return (
        <MainLayout>
            <Head title="Resources & Downloads — biogenixCGM" />

            <section className="bg-gradient-to-br from-slate-50 to-teal-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 animate-fade-in-up">Resources & Downloads</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
                        Access user manuals, quick-start guides, video tutorials, and educational materials for all biogenixCGM products.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-16">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-10 justify-center">
                    {types.map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filter === t ? 'bg-teal-700 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-teal-50 border border-slate-200'}`}
                        >
                            {t === 'all' ? 'All' : typeLabels[t] || t}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((r) => {
                        const Icon = typeIcons[r.type] || Download;
                        return (
                            <div key={r.id} className="card p-6 flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                                    <Icon size={22} className="text-teal-700" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-slate-800 mb-1">{r.title}</h3>
                                    {r.product && <p className="text-xs text-slate-500 mb-2">{r.product.name}</p>}
                                    <span className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full capitalize">{r.type}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {filtered.length === 0 && (
                    <p className="text-center text-slate-400 py-12">No resources found for this filter.</p>
                )}
            </section>
        </MainLayout>
    );
}
