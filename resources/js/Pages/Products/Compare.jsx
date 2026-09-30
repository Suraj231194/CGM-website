import { Fragment } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHero from '@/Components/PageHero';
import Reveal from '@/Components/Reveal';
import CtaBand from '@/Components/CtaBand';
import SafetyNotice from '@/Components/SafetyNotice';
import { ArrowRight } from 'lucide-react';

const formatPrice = (v) => `₹${Number(v).toLocaleString('en-IN')}`;

// Narrow phone columns: let a camel-cased name such as "biogenixCGM" wrap at the case change, not mid-word.
const withCaseBreaks = (text) =>
    String(text ?? '')
        .replace(/([a-z])([A-Z])/g, '$1\u0000$2')
        .split('\u0000')
        .map((part, i) => (i === 0 ? part : <Fragment key={i}><wbr />{part}</Fragment>));

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
                title="Compare our products"
                subtitle="See how our devices stack up side by side to find the perfect fit for your diabetes management needs."
                breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'Compare' }]}
            />

            {/* Comparison Table */}
            <section className="container-page section-pad">
                <Reveal className="rounded-5xl border border-ink-900/[0.06] bg-white shadow-soft">
                    {/* `relative` keeps the absolutely positioned sr-only text from widening the page on phones. */}
                    <div className="relative overflow-x-auto overscroll-x-contain rounded-5xl">
                        <table className="w-full table-fixed border-separate border-spacing-0 text-left">
                            <caption className="sr-only">Side-by-side comparison of biogenixCGM products</caption>
                            {/* Product Headers */}
                            <thead>
                                <tr>
                                    <th scope="col" className="sticky left-0 z-20 w-0 bg-white p-0 align-bottom md:w-[22%] md:p-8">
                                        <span className="sr-only">Feature</span>
                                    </th>
                                    {products.map((p) => {
                                        // The price shown is what the cart charges; it is struck only when there is a real saving.
                                        const hasSalePrice = Number(p.sale_price) > 0;
                                        const onSale = hasSalePrice && Number(p.price) > Number(p.sale_price);
                                        return (
                                            <th key={p.id} scope="col" className="px-1.5 py-4 align-top font-normal md:px-4 md:py-8 lg:p-8">
                                                <div className="product-stage mx-auto aspect-square w-16 rounded-2xl sm:w-24 md:w-32 md:rounded-3xl">
                                                    <img
                                                        src={p.image_url}
                                                        alt=""
                                                        width="1024"
                                                        height="1024"
                                                        loading="lazy"
                                                        className={`h-[86%] w-auto object-contain ${p.slug === 'horizon-smart-pen' ? 'scale-[1.1]' : 'scale-[1.4]'}`}
                                                    />
                                                </div>
                                                <p className="mt-3 break-words text-center font-display text-lg text-ink-950 md:mt-5 md:text-2xl">{withCaseBreaks(p.name)}</p>
                                                <p className="mt-1.5 flex flex-wrap justify-center gap-x-2 text-sm font-semibold tabular-nums text-ink-900">
                                                    {formatPrice(hasSalePrice ? p.sale_price : p.price)}
                                                    {onSale && (
                                                        <del className="font-normal text-ink-400">
                                                            <span className="sr-only">Original price </span>
                                                            {formatPrice(p.price)}
                                                        </del>
                                                    )}
                                                </p>
                                                <p className="mx-auto mt-2 line-clamp-2 max-w-[16rem] text-center text-sm leading-relaxed text-ink-500 max-md:hidden">{p.short_description}</p>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>

                            {/* Comparison Rows by Category */}
                            {categories.map((category) => (
                                <tbody key={category}>
                                    <tr>
                                        <th colSpan={products.length + 1} scope="colgroup" className="border-t border-ink-900/[0.06] bg-sand-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 md:px-8">
                                            {category}
                                        </th>
                                    </tr>
                                    {rows
                                        .filter((r) => r.category === category)
                                        .map((row) => (
                                            <Fragment key={row.label}>
                                                {/* On phones the label gets its own full-width line above the values. */}
                                                <tr aria-hidden="true" className="md:hidden">
                                                    <td colSpan={products.length + 1} className="border-t border-ink-900/[0.06] px-4 pt-4 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                                                        {row.label}
                                                    </td>
                                                </tr>
                                                <tr className="group">
                                                    <th scope="row" className="sticky left-0 z-10 border-t border-ink-900/[0.06] bg-white px-6 py-4 text-[0.9375rem] font-medium text-ink-800 group-hover:bg-sand-50 max-md:w-0 max-md:border-0 max-md:p-0 max-md:text-[0px] md:px-8">
                                                        {row.label}
                                                    </th>
                                                    {products.map((p) => {
                                                        const cell = row.values[p.id];
                                                        const na = !cell || /^n\/?a$/i.test(String(cell.value).trim());
                                                        return (
                                                            <td
                                                                key={p.id}
                                                                className={`break-words border-t border-ink-900/[0.06] px-1.5 pb-4 pt-2 align-top text-center text-sm max-md:border-t-0 md:px-8 md:py-4 md:align-middle md:text-[0.9375rem] ${cell?.highlight ? 'bg-brand-50/60' : ''} group-hover:bg-sand-50/60`}
                                                            >
                                                                {na ? (
                                                                    <>
                                                                        <span aria-hidden="true" className="text-ink-400">—</span>
                                                                        <span className="sr-only">Not applicable</span>
                                                                    </>
                                                                ) : (
                                                                    <span className={cell.highlight ? 'font-semibold text-ink-950' : 'text-ink-500'}>
                                                                        {cell.highlight && <span className="sr-only">Standout: </span>}
                                                                        {withCaseBreaks(cell.value)}
                                                                    </span>
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            </Fragment>
                                        ))}
                                </tbody>
                            ))}

                            {/* CTA Row */}
                            <tfoot>
                                <tr>
                                    <td className="sticky left-0 border-t border-ink-900/[0.06] bg-white p-0 md:p-8" />
                                    {products.map((p) => (
                                        <td key={p.id} className="border-t border-ink-900/[0.06] px-1.5 py-4 text-center md:px-4 lg:p-8">
                                            <Link href={`/products/${p.slug}`} className="btn-primary w-full gap-1.5 !px-3 text-sm md:!px-4">
                                                <span className="xl:hidden">Details<span className="sr-only"> for {p.name}</span></span>
                                                <span className="hidden xl:inline">View {p.name}</span>
                                                <ArrowRight size={15} className="max-[359px]:hidden" aria-hidden="true" />
                                            </Link>
                                        </td>
                                    ))}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </Reveal>
                <p className="mt-5 flex items-center justify-center gap-2 text-sm text-ink-500">
                    <span className="h-4 w-6 rounded bg-brand-50 ring-1 ring-brand-100" aria-hidden="true" /> Tinted cells mark a standout capability for that device.
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
