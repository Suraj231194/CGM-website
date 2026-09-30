import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHero from '@/Components/PageHero';
import Reveal from '@/Components/Reveal';
import SafetyNotice from '@/Components/SafetyNotice';
import { ArrowRight, Layers, MessageCircle, Plus } from 'lucide-react';

const formatPrice = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

function ProductRow({ product, index }) {
    const { post, processing } = useForm({ product_id: product.id, quantity: 1 });
    const onSale = product.sale_price && product.sale_price > 0;
    const effectivePrice = onSale ? product.sale_price : product.price;
    const reversed = index % 2 === 1;

    const handleAddToCart = (e) => {
        e.preventDefault();
        post('/cart/add', { preserveScroll: true });
    };

    return (
        <Reveal as="article" className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <Link href={`/products/${product.slug}`} className="product-stage group aspect-[5/4] rounded-5xl" aria-label={`View ${product.name}`}>
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        width="1024"
                        height="1024"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-[88%] w-auto object-contain transition-transform duration-700 ease-premium group-hover:scale-105"
                    />
                ) : (
                    <span className="font-display text-7xl text-brand-700">{product.name[0]}</span>
                )}
                {onSale && (
                    <span className="absolute left-6 top-6 rounded-full bg-ink-950 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">Offer</span>
                )}
            </Link>

            <div>
                <p className="font-display text-lg text-brand-600">{String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-3 font-display text-display-sm font-normal text-ink-950 md:text-display-md">{product.name}</h2>
                <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink-500">{product.short_description}</p>
                <p className="mt-7 flex items-baseline gap-3">
                    <span className="font-display text-3xl text-ink-950">{formatPrice(effectivePrice)}</span>
                    {onSale && <span className="text-base text-ink-300 line-through">{formatPrice(product.price)}</span>}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/products/${product.slug}`} className="btn-primary gap-2">
                        Discover {product.name} <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                    <button type="button" onClick={handleAddToCart} disabled={processing} className="btn-secondary gap-2">
                        <Plus size={18} aria-hidden="true" /> Add to cart
                    </button>
                </div>
            </div>
        </Reveal>
    );
}

export default function Index({ products = [] }) {
    return (
        <MainLayout>
            <Head title="Our Products" />

            <PageHero
                eyebrow="Our products"
                title="Designed to work together."
                subtitle="Explore our connected ecosystem of diabetes management devices — each designed to help you live life with greater confidence and control."
                breadcrumbs={[{ label: 'Products' }]}
            />

            <section className="container-page section-pad space-y-24 md:space-y-32">
                {products.map((product, i) => (
                    <ProductRow key={product.id} product={product} index={i} />
                ))}
            </section>

            {/* Guidance */}
            <section className="container-page pb-20 md:pb-28">
                <Reveal className="rounded-5xl bg-white p-8 shadow-soft ring-1 ring-ink-900/[0.05] sm:p-12 lg:p-16">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                        <div>
                            <p className="eyebrow mb-4">Guidance</p>
                            <h2 className="section-heading">Not sure which product is right for you?</h2>
                            <p className="mt-4 text-lg leading-relaxed text-ink-500">Use our side-by-side comparison tool to see how each device fits your needs.</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Link href="/compare" className="group rounded-3xl border border-ink-900/[0.07] bg-canvas p-6 transition duration-500 ease-premium hover:-translate-y-1 hover:bg-white hover:shadow-lift">
                                <Layers size={22} className="text-brand-700" aria-hidden="true" />
                                <h3 className="mt-5 text-lg font-semibold text-ink-950">Compare products</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">Specs, wear time and compatibility, side by side.</p>
                                <span className="link-arrow mt-5">Open comparison <ArrowRight size={16} aria-hidden="true" /></span>
                            </Link>
                            <Link href="/contact" className="group rounded-3xl border border-ink-900/[0.07] bg-canvas p-6 transition duration-500 ease-premium hover:-translate-y-1 hover:bg-white hover:shadow-lift">
                                <MessageCircle size={22} className="text-brand-700" aria-hidden="true" />
                                <h3 className="mt-5 text-lg font-semibold text-ink-950">Talk to a specialist</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">Personal guidance on the right device for your therapy.</p>
                                <span className="link-arrow mt-5">Request information <ArrowRight size={16} aria-hidden="true" /></span>
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>

            <SafetyNotice />
        </MainLayout>
    );
}
