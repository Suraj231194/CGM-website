import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHero from '@/Components/PageHero';
import Reveal from '@/Components/Reveal';
import CtaBand from '@/Components/CtaBand';
import SafetyNotice from '@/Components/SafetyNotice';
import { ArrowRight, Check } from 'lucide-react';

export default function Compare({ products = [] }) {
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
            <Head title="Compare Products" />

            <PageHero
                eyebrow="Compare"
                title="Compare Our Products"
                subtitle="See how our devices stack up side by side to find the perfect fit for your diabetes management needs."
                breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'Compare' }]}
            />

            {/* Comparison Table */}
            <section className="container-page section-pad">
                <Reveal className="rounded-5xl border border-ink-900/[0.06] bg-white shadow-soft">
                    <div className="overflow-x-auto rounded-5xl">
                        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
                            <caption className="sr-only">Side-by-side comparison of biogenixCGM products</caption>
                            {/* Product Headers */}
                            <thead>
                                <tr>
                                    <th scope="col" className="sticky left-0 z-20 w-[22%] bg-white p-6 align-bottom md:p-8">
                                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">{products.length} products</span>
                                    </th>
                                    {products.map((p) => (
                                        <th key={p.id} scope="col" className="p-6 align-top font-normal md:p-8">
                                            <div className="product-stage mx-auto aspect-square w-28 rounded-3xl md:w-32">
                                                <img src={p.image_url} alt="" width="1024" height="1024" loading="lazy" className="h-[86%] w-auto object-contain" />
                                            </div>
                                            <p className="mt-5 text-center font-display text-2xl text-ink-950">{p.name}</p>
                                            <p className="mx-auto mt-2 line-clamp-2 max-w-[16rem] text-center text-sm leading-relaxed text-ink-500">{p.short_description}</p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* Comparison Rows by Category */}
                            {categories.map((category) => (
                                <tbody key={category}>
                                    <tr>
                                        <th colSpan={products.length + 1} scope="colgroup" className="border-t border-ink-900/[0.06] bg-sand-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 md:px-8">
                                            {category}
                                        </th>
                                    </tr>
                                    {rows
                                        .filter((r) => r.category === category)
                                        .map((row) => (
                                            <tr key={row.label} className="group">
                                                <th scope="row" className="sticky left-0 z-10 border-t border-ink-900/[0.06] bg-white px-6 py-4 text-[0.9375rem] font-medium text-ink-800 group-hover:bg-sand-50 md:px-8">
                                                    {row.label}
                                                </th>
                                                {products.map((p) => {
                                                    const cell = row.values[p.id];
                                                    return (
                                                        <td key={p.id} className="border-t border-ink-900/[0.06] px-6 py-4 text-center text-[0.9375rem] group-hover:bg-sand-50/60 md:px-8">
                                                            {cell ? (
                                                                <span className={`inline-flex items-center gap-2 ${cell.highlight ? 'font-semibold text-ink-950' : 'text-ink-500'}`}>
                                                                    {cell.highlight && (
                                                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-white">
                                                                            <Check size={12} strokeWidth={3} aria-hidden="true" />
                                                                            <span className="sr-only">Highlighted:</span>
                                                                        </span>
                                                                    )}
                                                                    {cell.value}
                                                                </span>
                                                            ) : (
                                                                <span className="text-ink-200" aria-label="Not applicable">—</span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                </tbody>
                            ))}

                            {/* CTA Row */}
                            <tfoot>
                                <tr>
                                    <td className="sticky left-0 border-t border-ink-900/[0.06] bg-white p-6 md:p-8" />
                                    {products.map((p) => (
                                        <td key={p.id} className="border-t border-ink-900/[0.06] p-6 text-center md:p-8">
                                            <Link href={`/products/${p.slug}`} className="btn-primary w-full gap-1.5 !px-4 text-sm">
                                                View {p.name} <ArrowRight size={15} aria-hidden="true" />
                                            </Link>
                                        </td>
                                    ))}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </Reveal>
                <p className="mt-5 flex items-center justify-center gap-2 text-sm text-ink-400">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-700 text-white"><Check size={10} strokeWidth={3} aria-hidden="true" /></span>
                    marks a standout capability for that device.
                </p>
            </section>

            <CtaBand
                eyebrow="Still deciding?"
                title="Talk it through with a specialist."
                text="Every therapy is personal. Our team can help you weigh the options with your healthcare provider."
                secondary={{ label: 'Explore products', href: '/products' }}
            />

            <SafetyNotice />
        </MainLayout>
    );
}
