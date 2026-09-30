import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import FaqAccordion from '@/Components/FaqAccordion';
import SectionHeader from '@/Components/SectionHeader';
import SafetyNotice from '@/Components/SafetyNotice';
import Reveal from '@/Components/Reveal';
import { useState } from 'react';
import { ArrowRight, BookOpen, Compass, Download, Headphones, Layers, Mail, MessageSquare, Phone, Search, X } from 'lucide-react';

const quickLinks = [
    { icon: Compass, title: 'Getting started', text: 'Setup, pairing and your first days.', href: '/how-it-works' },
    { icon: BookOpen, title: 'Manuals & guides', text: 'Instructions, quick starts and videos.', href: '/resources' },
    { icon: Layers, title: 'Compare devices', text: 'Find the product that fits your therapy.', href: '/compare' },
    { icon: MessageSquare, title: 'Contact support', text: 'Talk to a specialist, any time.', href: '/contact' },
];

export default function Support({ faqs = [], resources = [] }) {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = ['all', ...new Set(faqs.map((f) => f.category))];
    const filtered = faqs.filter((f) => {
        const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
        const matchesSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <MainLayout>
            <Head title="Support & FAQ" />

            {/* Hero */}
            <section className="bg-radiance grain relative overflow-hidden text-white">
                <div className="container-page relative py-16 text-center md:py-24">
                    <p className="eyebrow eyebrow-light mb-5 justify-center animate-fade-in-up">Support</p>
                    <h1 className="animate-fade-in-up text-balance font-display text-display-sm font-normal sm:text-display-md lg:text-display-lg">How Can We Help?</h1>
                    <p className="mx-auto mt-5 max-w-xl animate-fade-in-up animate-delay-100 text-lg text-white/70">Search our FAQ or browse by category to find answers quickly.</p>
                    <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mx-auto mt-10 max-w-2xl animate-fade-in-up animate-delay-200">
                        <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
                        <Search size={20} className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
                        <input
                            id="faq-search"
                            type="search"
                            placeholder="Search frequently asked questions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-full border-0 bg-white py-5 pl-14 pr-14 text-base text-ink-900 shadow-lift placeholder:text-ink-300 focus:ring-4 focus:ring-glow/40"
                        />
                        {search && (
                            <button type="button" onClick={() => setSearch('')} className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-400 hover:bg-ink-900/5" aria-label="Clear search">
                                <X size={16} aria-hidden="true" />
                            </button>
                        )}
                    </form>
                </div>
            </section>

            {/* Quick links */}
            <section className="container-page -mt-10 relative z-10">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {quickLinks.map((q, i) => (
                        <Reveal key={q.title} delay={i * 80} className="h-full">
                            <Link href={q.href} className="group flex h-full items-start gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/[0.05] transition duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                                    <q.icon size={20} aria-hidden="true" />
                                </span>
                                <span>
                                    <span className="block font-semibold text-ink-950">{q.title}</span>
                                    <span className="mt-1 block text-sm text-ink-500">{q.text}</span>
                                </span>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container-page section-pad">
                <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                    <div>
                        <p className="eyebrow mb-4">FAQs</p>
                        <h2 className="section-heading">Answers, by topic.</h2>
                        {/* Category Tabs */}
                        <div className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:items-start" role="group" aria-label="Filter by category">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setActiveCategory(cat)}
                                    aria-pressed={activeCategory === cat}
                                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition duration-300 ${activeCategory === cat ? 'bg-ink-950 text-white shadow-soft' : 'border border-ink-900/10 bg-white text-ink-600 hover:border-brand-600 hover:text-brand-700'}`}
                                >
                                    {cat === 'all' ? 'All topics' : cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 text-sm text-ink-400" aria-live="polite">
                            {filtered.length} {filtered.length === 1 ? 'answer' : 'answers'}{search && <> for &ldquo;{search}&rdquo;</>}
                        </p>
                        {filtered.length > 0 ? (
                            <FaqAccordion key={`${activeCategory}-${search}`} faqs={filtered} />
                        ) : (
                            <div className="rounded-4xl border border-dashed border-ink-900/15 px-6 py-14 text-center">
                                <p className="text-ink-500">No FAQs match your search. Try different keywords or contact our support team.</p>
                                <Link href="/contact" className="link-arrow mt-4 justify-center">Contact support <ArrowRight size={16} aria-hidden="true" /></Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Popular downloads */}
            {resources.length > 0 && (
                <section className="bg-white">
                    <div className="container-page section-pad">
                        <SectionHeader
                            eyebrow="Downloads"
                            title="Popular guides and manuals."
                            action={<Link href="/resources" className="link-arrow">All resources <ArrowRight size={16} aria-hidden="true" /></Link>}
                        />
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {resources.slice(0, 4).map((r, i) => (
                                <Reveal key={r.id} delay={i * 80}>
                                    <Link href="/resources" className="group flex items-center gap-4 rounded-3xl border border-ink-900/[0.06] bg-canvas p-5 transition duration-500 ease-premium hover:bg-white hover:shadow-lift">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-soft">
                                            <Download size={18} aria-hidden="true" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block truncate text-sm font-semibold text-ink-900">{r.title}</span>
                                            <span className="block text-xs capitalize text-ink-400">{r.type}</span>
                                        </span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Escalation */}
            <section className="container-page section-pad">
                <SectionHeader eyebrow="Still need help?" title="Still Need Help?" subtitle="Our support team is available 24/7 to assist you." centered />
                <div className="grid gap-5 sm:grid-cols-3">
                    {[
                        { icon: Phone, title: 'Call Us', text: '1-800-BIOGENIXCGM-1', href: 'tel:1-800-BIOGENIXCGM-1' },
                        { icon: Mail, title: 'Email', text: 'support@biogenixcgm.com', href: 'mailto:support@biogenixcgm.com' },
                        { icon: Headphones, title: 'Live Chat', text: 'Available in the biogenixCGM App' },
                    ].map((c, i) => {
                        const content = (
                            <>
                                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                                    <c.icon size={24} aria-hidden="true" />
                                </span>
                                <h3 className="mt-5 font-semibold text-ink-950">{c.title}</h3>
                                <p className="mt-1 text-sm text-ink-500">{c.text}</p>
                            </>
                        );
                        return (
                            <Reveal key={c.title} delay={i * 100} className="h-full">
                                {c.href ? (
                                    <a href={c.href} className="block h-full rounded-4xl border border-ink-900/[0.06] bg-white p-8 text-center transition duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift">{content}</a>
                                ) : (
                                    <div className="h-full rounded-4xl border border-ink-900/[0.06] bg-white p-8 text-center">{content}</div>
                                )}
                            </Reveal>
                        );
                    })}
                </div>
                <div className="mt-10 text-center">
                    <Link href="/contact" className="btn-primary gap-2">
                        Contact Us <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>

            <SafetyNotice id="safety" />
        </MainLayout>
    );
}
