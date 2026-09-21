import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import SectionHeader from '@/Components/SectionHeader';
import { Check, ArrowRight } from 'lucide-react';

export default function Compare({ products }) {
    // Build comparison rows grouped by category
    const allLabels = {};
    products.forEach((p) => {
        (p.comparison_items || []).forEach((item) => {
            const key = `${item.category}|||${item.label}`;
            if (!allLabels[key]) {
                allLabels[key] = { category: item.category, label: item.label, values: {} };
            }
            allLabels[key].values[p.id] = { value: item.value, highlight: item.highlight };
        });
    });

    const rows = Object.values(allLabels);
    const categories = [...new Set(rows.map((r) => r.category))];

    return (
        <MainLayout>
            <Head title="Compare Products — biogenixCGM" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-slate-50 to-teal-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 animate-fade-in-up">
                        Compare Our Products
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
                        See how our devices stack up side by side to find the perfect fit for your diabetes management needs.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="overflow-x-auto">
                    <div className="min-w-[700px]">
                        {/* Product Headers */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div></div>
                            {products.map((p) => (
                                <div key={p.id} className="text-center card p-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                        <img src={p.image_url} alt={p.name} className="h-14 w-auto object-contain" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">{p.name}</h3>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.short_description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Comparison Rows by Category */}
                        {categories.map((category) => (
                            <div key={category} className="mb-6">
                                <div className="bg-gradient-to-r from-teal-700 to-teal-800 rounded-xl px-6 py-3 mb-3">
                                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{category}</h4>
                                </div>
                                {rows
                                    .filter((r) => r.category === category)
                                    .map((row, i) => (
                                        <div key={row.label} className={`grid grid-cols-4 gap-4 px-4 py-3.5 rounded-xl ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                            <div className="text-sm font-medium text-slate-700 flex items-center">{row.label}</div>
                                            {products.map((p) => {
                                                const cell = row.values[p.id];
                                                return (
                                                    <div key={p.id} className="text-center text-sm">
                                                        {cell ? (
                                                            <span className={`inline-flex items-center gap-1 ${cell.highlight ? 'text-teal-700 font-semibold' : 'text-slate-600'}`}>
                                                                {cell.highlight && <Check size={14} className="text-teal-600" />}
                                                                {cell.value}
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-300">—</span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                            </div>
                        ))}

                        {/* CTA Row */}
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            <div></div>
                            {products.map((p) => (
                                <div key={p.id} className="text-center">
                                    <Link href={`/products/${p.slug}`} className="btn-primary text-sm w-full">
                                        View {p.name} <ArrowRight size={14} className="ml-1" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
