import { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ICONS as FEATURE_ICONS } from '@/Components/FeatureCard';
import FaqAccordion from '@/Components/FaqAccordion';
import SectionHeader from '@/Components/SectionHeader';
import SafetyNotice from '@/Components/SafetyNotice';
import Reveal from '@/Components/Reveal';
import { Breadcrumbs } from '@/Components/PageHero';
import {
    ArrowRight,
    Check,
    Download,
    Headphones,
    Loader2,
    Lock,
    Mail,
    Minus,
    Play,
    Plus,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
} from 'lucide-react';

const formatPrice = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

const typeLabels = { manual: 'Manual', guide: 'Guide', video: 'Video', document: 'Document' };

export default function Show({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [buyAreaVisible, setBuyAreaVisible] = useState(false);
    const buyAreaRef = useRef(null);

    const specs = product.specifications || [];
    const specGroups = specs.reduce((acc, spec) => {
        if (!acc[spec.group]) acc[spec.group] = [];
        acc[spec.group].push(spec);
        return acc;
    }, {});

    // Guests add to cart as they do everywhere else; checkout itself asks them to sign in.
    const handleAddToCart = (shouldOpenCheckout = false) => {
        setAddingToCart(true);
        router.post('/cart/add', {
            product_id: product.id,
            quantity: quantity
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setAddingToCart(false);
                if (shouldOpenCheckout) {
                    router.visit('/checkout');
                }
            },
            onError: () => {
                setAddingToCart(false);
            }
        });
    };

    // The cart charges the sale price whenever one is set; the old price is struck only when it is a real saving.
    const hasSalePrice = Number(product.sale_price) > 0;
    const effectivePrice = hasSalePrice ? product.sale_price : product.price;
    const saving = hasSalePrice ? Number(product.price) - Number(product.sale_price) : 0;
    const onSale = saving > 0;
    const inStock = product.stock == null || Number(product.stock) > 0;

    // A slim buy bar follows the reader on small screens once the main buttons scroll away.
    useEffect(() => {
        const el = buyAreaRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return undefined;
        const observer = new IntersectionObserver(([entry]) => {
            setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
            setBuyAreaVisible(entry.isIntersecting);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // While the buy bar is up, the support bubble docks above it and focused links scroll clear of it.
    // The bar only exists below md, so wider screens keep the default offset.
    useEffect(() => {
        const r = document.documentElement;
        const phone = window.matchMedia?.('(max-width: 767.98px)');
        const apply = () => {
            const docked = showStickyBar && (phone ? phone.matches : true);
            r.style.setProperty('--dock-offset', docked ? '4.5rem' : '0px');
            r.style.scrollPaddingBottom = docked ? '96px' : '';
        };
        apply();
        phone?.addEventListener?.('change', apply);
        return () => {
            phone?.removeEventListener?.('change', apply);
            r.style.removeProperty('--dock-offset');
            r.style.scrollPaddingBottom = '';
        };
    }, [showStickyBar]);

    const sections = [
        { id: 'overview', label: 'Overview', show: !!product.long_description },
        { id: 'features', label: 'Features', show: product.features?.length > 0 },
        { id: 'specifications', label: 'Specifications', show: Object.keys(specGroups).length > 0 },
        { id: 'faqs', label: 'FAQs', show: product.faqs?.length > 0 },
        { id: 'resources', label: 'Resources', show: product.resources?.length > 0 },
    ].filter((s) => s.show);

    const highlights = (product.features || []).slice(0, 3);

    return (
        <MainLayout hideSupportLauncher={buyAreaVisible}>
            <Head title={product.name} />

            {/* Product Hero (overflow-clip where supported, so the sticky image is not trapped by overflow-hidden) */}
            <section className="bg-aurora relative overflow-hidden supports-[overflow:clip]:overflow-clip">
                <div className="container-page grid gap-10 pb-16 pt-8 md:grid-cols-2 md:gap-x-8 md:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
                    <div className="md:col-span-2">
                        <Breadcrumbs items={[{ label: 'Products', href: '/products' }, { label: product.name }]} />
                    </div>

                    {/* Image Showcase */}
                    <div className="product-stage relative aspect-square rounded-5xl md:sticky md:top-24 md:self-start">
                        {onSale && (
                            <span className="absolute left-6 top-6 z-10 rounded-full bg-brand-800 px-3.5 py-1.5 text-xs font-semibold text-white">
                                Save {formatPrice(saving)}
                            </span>
                        )}
                        <img
                            src={product.image_url}
                            alt={product.name}
                            width="1024"
                            height="1024"
                            fetchpriority="high"
                            className={`h-[86%] w-auto object-contain ${product.slug === 'horizon-smart-pen' ? 'scale-[1.15]' : 'scale-[1.45]'}`}
                        />
                    </div>

                    {/* Order Specifications Panel */}
                    <div className="flex flex-col justify-center">
                        {inStock ? (
                            <span className="chip-brand w-fit !text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" /> In stock
                            </span>
                        ) : (
                            <span className="chip w-fit !text-sm">Currently unavailable</span>
                        )}
                        <h1 className="mt-5 text-balance font-display text-display-sm font-normal text-ink-950 sm:text-display-md xl:text-display-lg">{product.name}</h1>
                        <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-500">{product.short_description}</p>

                        {highlights.length > 0 && (
                            <ul className="mt-7 space-y-2.5">
                                {highlights.map((f) => (
                                    <li key={f.id} className="flex items-start gap-3 text-[0.9375rem] text-ink-700">
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                                            <Check size={12} strokeWidth={3} aria-hidden="true" />
                                        </span>
                                        {f.title}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-8 rounded-4xl border border-ink-900/[0.07] bg-white p-6 shadow-soft sm:p-7">
                            {/* Price display */}
                            <div className="flex flex-wrap items-baseline gap-3">
                                <span className="font-display text-4xl text-ink-950">
                                    {onSale && <span className="sr-only">Sale price </span>}
                                    {formatPrice(effectivePrice)}
                                </span>
                                {onSale && (
                                    <del className="text-lg text-ink-400">
                                        <span className="sr-only">Original price </span>
                                        {formatPrice(product.price)}
                                    </del>
                                )}
                            </div>

                            {/* Quantity selection stepper */}
                            <div className="mt-6 flex items-center justify-between gap-4">
                                <span id="qty-label" className="text-sm font-medium text-ink-700">Quantity</span>
                                <div className="flex items-center rounded-full border border-ink-900/10 bg-white" role="group" aria-labelledby="qty-label">
                                    <button
                                        type="button"
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                        className="flex h-11 w-11 items-center justify-center rounded-full text-ink-600 transition hover:bg-sand-100 disabled:opacity-40"
                                        disabled={quantity <= 1}
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={15} aria-hidden="true" />
                                    </button>
                                    <span className="w-10 text-center font-semibold tabular-nums text-ink-900" aria-live="polite">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                                        className="flex h-11 w-11 items-center justify-center rounded-full text-ink-600 transition hover:bg-sand-100 disabled:opacity-40"
                                        disabled={quantity >= 10}
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={15} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            {/* Buying Actions */}
                            <div ref={buyAreaRef} className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(true)}
                                    disabled={addingToCart || !inStock}
                                    className="btn-primary gap-2 !py-4"
                                >
                                    {addingToCart ? <Loader2 className="animate-spin" size={18} aria-label="Adding to cart" /> : 'Buy now'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(false)}
                                    disabled={addingToCart || !inStock}
                                    className="btn-secondary gap-2 !py-4"
                                >
                                    <ShoppingBag size={18} aria-hidden="true" /> Add to cart
                                </button>
                            </div>

                            {!inStock && (
                                <Link href="/contact" className="link-arrow mt-4">
                                    Request information <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            )}

                            <ul className="mt-6 grid gap-3 border-t border-ink-900/[0.06] pt-6 text-sm text-ink-500 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                                <li className="flex items-center gap-2"><Lock size={15} className="text-brand-600" aria-hidden="true" /> Secure checkout</li>
                                <li className="flex items-center gap-2"><Headphones size={15} className="text-brand-600" aria-hidden="true" /> 24/7 expert support</li>
                            </ul>
                        </div>

                        <p className="mt-5 flex items-start gap-2 text-sm text-ink-500">
                            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                            <span>
                                Medical device. Read all warnings before use.{' '}
                                <a href="#product-safety" className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-700">Safety information</a>
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            {/* In-page navigation */}
            {sections.length > 1 && (
                <nav aria-label="On this page" className="glass-header sticky top-16 z-30 hidden md:block">
                    <div className="container-page flex h-14 items-center gap-1 overflow-x-auto">
                        {sections.map((s) => (
                            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-white hover:text-ink-950">
                                {s.label}
                            </a>
                        ))}
                        <button type="button" onClick={() => handleAddToCart(true)} disabled={addingToCart || !inStock} className="btn-primary ml-auto !px-5 !py-2 text-sm">
                            Buy now · {formatPrice(effectivePrice)}
                        </button>
                    </div>
                </nav>
            )}

            {/* Description details */}
            {product.long_description && (
                <section id="overview" className="container-page section-pad">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <Reveal>
                            <p className="eyebrow mb-4">Overview</p>
                            <h2 className="section-heading-split">Meet the {product.name}.</h2>
                        </Reveal>
                        <Reveal delay={120}>
                            <div className="prose-content" dangerouslySetInnerHTML={{ __html: product.long_description }} />
                        </Reveal>
                    </div>
                </section>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
                <section id="features" className="bg-white">
                    <div className="container-page section-pad">
                        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                            <Reveal className="lg:sticky lg:top-40 lg:self-start">
                                <p className="eyebrow mb-4">Key features</p>
                                <h2 className="section-heading-split">What sets the {product.name} apart.</h2>
                            </Reveal>
                            <ul className="divide-y divide-ink-900/10 border-y border-ink-900/10">
                                {product.features.map((f, i) => {
                                    const Icon = FEATURE_ICONS[f.icon] || Sparkles;
                                    return (
                                        <Reveal as="li" key={f.id} delay={(i % 3) * 80} className="grid grid-cols-[2.5rem_1fr] gap-5 py-7">
                                            <Icon size={22} className="mt-0.5 text-brand-600" aria-hidden="true" />
                                            <div>
                                                <h3 className="text-lg font-semibold tracking-tight text-ink-950">{f.title}</h3>
                                                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{f.description}</p>
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* Technical Specifications */}
            {Object.keys(specGroups).length > 0 && (
                <section id="specifications" className="container-page section-pad">
                    <SectionHeader eyebrow={product.name} title="Technical specifications" subtitle="The details, measured and documented." />
                    <div className="grid gap-6 md:grid-cols-2">
                        {Object.entries(specGroups).map(([group, items], i) => (
                            <Reveal key={group} delay={(i % 2) * 100} className="rounded-4xl border border-ink-900/[0.06] bg-white p-7 md:p-8">
                                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{group}</h3>
                                <dl className="mt-4 divide-y divide-ink-900/[0.06]">
                                    {items.map((spec) => (
                                        <div key={spec.id} className="flex items-baseline justify-between gap-6 py-3.5">
                                            <dt className="text-[0.9375rem] text-ink-500">{spec.label}</dt>
                                            <dd className="text-right text-[0.9375rem] font-medium text-ink-900">{spec.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQs */}
            {product.faqs && product.faqs.length > 0 && (
                <section id="faqs" className="bg-white">
                    <div className="container-page section-pad">
                        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                            <Reveal>
                                <p className="eyebrow mb-4">Questions</p>
                                <h2 className="section-heading-split">{product.name} FAQs</h2>
                                <p className="mt-4 text-lg leading-relaxed text-ink-500">Can&rsquo;t find your answer? Our team is available 24/7.</p>
                                <Link href="/support" className="link-arrow mt-6">
                                    Visit support <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </Reveal>
                            <Reveal delay={120}>
                                <FaqAccordion faqs={product.faqs} />
                            </Reveal>
                        </div>
                    </div>
                </section>
            )}

            {/* Resources */}
            {product.resources && product.resources.length > 0 && (
                <section id="resources" className="container-page section-pad">
                    <SectionHeader
                        eyebrow="Support"
                        title="Resources and downloads"
                        action={<Link href="/resources" className="link-arrow">All resources <ArrowRight size={16} aria-hidden="true" /></Link>}
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                        {product.resources.map((r, i) => {
                            const href = r.file_url && r.file_url !== '#' ? r.file_url : r.external_url && r.external_url !== '#' ? r.external_url : null;
                            const Icon = !href ? Mail : r.type === 'video' ? Play : Download;
                            const body = (
                                <>
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                                        <Icon size={20} aria-hidden="true" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block font-semibold text-ink-900">{r.title}</span>
                                        <span className="mt-1 block text-sm text-ink-400">{typeLabels[r.type] || r.type}{!href && ' · Request a copy'}</span>
                                    </span>
                                </>
                            );
                            return (
                                <Reveal key={r.id} delay={i * 80} className="h-full">
                                    {href ? (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="group flex h-full items-center gap-4 rounded-3xl border border-ink-900/[0.06] bg-white p-5 transition duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift">
                                            {body}
                                        </a>
                                    ) : (
                                        <Link href="/contact" className="group flex h-full items-center gap-4 rounded-3xl border border-ink-900/[0.06] bg-white p-5 transition duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift">
                                            {body}
                                        </Link>
                                    )}
                                </Reveal>
                            );
                        })}
                    </div>
                </section>
            )}

            <SafetyNotice id="product-safety" productName={product.name} />

            {/* Mobile sticky buy bar (the support bubble docks above it through --dock-offset) */}
            <div
                className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/[0.06] bg-canvas/95 py-3 pl-5 pr-5 backdrop-blur-xl transition-transform duration-500 ease-premium md:hidden ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
                aria-hidden={!showStickyBar}
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-900">{product.name}</p>
                        <p className="text-sm text-ink-500">{formatPrice(effectivePrice)}</p>
                    </div>
                    <button type="button" onClick={() => handleAddToCart(true)} disabled={addingToCart || !inStock} tabIndex={showStickyBar ? 0 : -1} className="btn-primary shrink-0 !px-5 !py-2.5 text-sm">
                        Buy now
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}
