import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHero from '@/Components/PageHero';
import Reveal from '@/Components/Reveal';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Download, FileText, LifeBuoy, Play } from 'lucide-react';

const typeIcons = { manual: FileText, guide: BookOpen, video: Play, document: Download };
const typeLabels = { manual: 'Manual', guide: 'Guide', video: 'Video', document: 'Document' };
const pluralLabels = { manual: 'Manuals', guide: 'Guides', video: 'Videos', document: 'Documents' };

/** A resource links out when it has a real URL; otherwise it offers a copy on request. */
const resourceHref = (r) => {
    const url = r.file_url && r.file_url !== '#' ? r.file_url : r.external_url && r.external_url !== '#' ? r.external_url : null;
    return url;
};

export default function Resources({ resources = [] }) {
    const [filter, setFilter] = useState('all');
    const types = ['all', ...new Set(resources.map((r) => r.type))];
    const filtered = filter === 'all' ? resources : resources.filter((r) => r.type === filter);

    return (
        <MainLayout>
            <Head title="Resources & Downloads" />

            <PageHero
                eyebrow="Resources"
                title="Resources & Downloads"
                subtitle="Access user manuals, quick-start guides, video tutorials, and educational materials for all biogenixCGM products."
                breadcrumbs={[{ label: 'Resources' }]}
            />

            <section className="container-page section-pad">
                {/* Filter Tabs */}
                <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter resources by type">
                        {types.map((t) => {
                            const count = t === 'all' ? resources.length : resources.filter((r) => r.type === t).length;
                            const active = filter === t;
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setFilter(t)}
                                    aria-pressed={active}
                                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition duration-300 ${active ? 'bg-ink-950 text-white shadow-soft' : 'border border-ink-900/10 bg-white text-ink-600 hover:border-brand-600 hover:text-brand-700'}`}
                                >
                                    {t === 'all' ? 'All' : pluralLabels[t] || t}
                                    <span className={`rounded-full px-1.5 text-xs tabular-nums ${active ? 'bg-white/15' : 'bg-sand-100 text-ink-500'}`}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-sm text-ink-400" aria-live="polite">
                        Showing {filtered.length} of {resources.length}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((r, i) => {
                        const Icon = typeIcons[r.type] || Download;
                        const href = resourceHref(r);
                        const inner = (
                            <>
                                <div className="flex items-start justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                                        <Icon size={21} aria-hidden="true" />
                                    </span>
                                    <span className="chip">{typeLabels[r.type] || r.type}</span>
                                </div>
                                <h2 className="mt-8 text-lg font-semibold leading-snug tracking-tight text-ink-950">{r.title}</h2>
                                <p className="mt-1.5 text-sm text-ink-400">{r.product ? r.product.name : 'All products'}</p>
                                <span className="link-arrow mt-auto pt-6">
                                    {href ? (r.type === 'video' ? 'Watch' : 'Download') : 'Request a copy'}
                                    {href ? <ArrowUpRight size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
                                </span>
                            </>
                        );
                        const className = 'group flex h-full flex-col rounded-4xl border border-ink-900/[0.06] bg-white p-7 transition duration-500 ease-premium hover:-translate-y-1 hover:border-brand-600/20 hover:shadow-lift';
                        return (
                            <Reveal key={r.id} delay={(i % 3) * 90} className="h-full">
                                {href ? (
                                    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
                                ) : (
                                    <Link href="/contact" className={className}>{inner}</Link>
                                )}
                            </Reveal>
                        );
                    })}
                </div>
                {filtered.length === 0 && (
                    <p className="rounded-4xl border border-dashed border-ink-900/15 py-16 text-center text-ink-400">No resources found for this filter.</p>
                )}
            </section>

            {/* Help */}
            <section className="container-page pb-20 md:pb-28">
                <Reveal className="flex flex-col items-start gap-6 rounded-5xl bg-white p-8 shadow-soft ring-1 ring-ink-900/[0.05] sm:p-12 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                            <LifeBuoy size={22} aria-hidden="true" />
                        </span>
                        <div>
                            <h2 className="font-display text-3xl text-ink-950">Can&rsquo;t find what you need?</h2>
                            <p className="mt-2 text-ink-500">Our support team can send the right document or walk you through it, 24/7.</p>
                        </div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                        <Link href="/support" className="btn-secondary">Visit support</Link>
                        <Link href="/contact" className="btn-primary gap-2">Contact us <ArrowRight size={18} aria-hidden="true" /></Link>
                    </div>
                </Reveal>
            </section>
        </MainLayout>
    );
}
