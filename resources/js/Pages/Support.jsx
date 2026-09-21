import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import FaqAccordion from '@/Components/FaqAccordion';
import SectionHeader from '@/Components/SectionHeader';
import { useState } from 'react';
import { Search, ArrowRight, Download, Headphones, Mail, Phone } from 'lucide-react';

export default function Support({ faqs, resources }) {
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
            <Head title="Support & FAQ — biogenixCGM" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-teal-800 to-teal-900 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">How Can We Help?</h1>
                    <p className="text-teal-100 mb-8 animate-fade-in-up animate-delay-100">Search our FAQ or browse by category to find answers quickly.</p>
                    <div className="relative max-w-xl mx-auto animate-fade-in-up animate-delay-200">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search frequently asked questions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 shadow-xl text-sm focus:ring-2 focus:ring-teal-400"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto px-4 py-16">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-teal-700 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-teal-50 border border-slate-200'}`}
                        >
                            {cat === 'all' ? 'All' : cat}
                        </button>
                    ))}
                </div>

                {filtered.length > 0 ? (
                    <FaqAccordion faqs={filtered} />
                ) : (
                    <p className="text-center text-slate-400 py-12">No FAQs match your search. Try different keywords or contact our support team.</p>
                )}
            </section>

            {/* Contact Escalation */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Still Need Help?</h2>
                    <p className="text-slate-500 mb-8">Our support team is available 24/7 to assist you.</p>
                    <div className="grid sm:grid-cols-3 gap-6">
                        <div className="card p-6 text-center">
                            <Phone size={28} className="text-teal-700 mx-auto mb-3" />
                            <h3 className="font-semibold text-slate-800 mb-1">Call Us</h3>
                            <p className="text-sm text-slate-500">1-800-BIOGENIXCGM-1</p>
                        </div>
                        <div className="card p-6 text-center">
                            <Mail size={28} className="text-teal-700 mx-auto mb-3" />
                            <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
                            <p className="text-sm text-slate-500">support@biogenixcgm.com</p>
                        </div>
                        <div className="card p-6 text-center">
                            <Headphones size={28} className="text-teal-700 mx-auto mb-3" />
                            <h3 className="font-semibold text-slate-800 mb-1">Live Chat</h3>
                            <p className="text-sm text-slate-500">Available in the biogenixCGM App</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <Link href="/contact" className="btn-primary">
                            Contact Us <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
