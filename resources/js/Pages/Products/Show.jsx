import { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import FeatureCard from '@/Components/FeatureCard';
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
    Minus,
    Play,
    Plus,
    ShieldCheck,
    ShoppingBag,
    X,
} from 'lucide-react';

const formatPrice = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

export default function Show({ product }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const buyAreaRef = useRef(null);
    const modalCloseRef = useRef(null);

    const specs = product.specifications || [];
    const specGroups = specs.reduce((acc, spec) => {
        if (!acc[spec.group]) acc[spec.group] = [];
        acc[spec.group].push(spec);
        return acc;
    }, {});

    const handleAddToCart = (shouldOpenCheckout = false) => {
        if (!user) {
            setAuthModalOpen(true);
            return;
        }

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

    const onSale = product.sale_price && product.sale_price > 0;
    const effectivePrice = onSale ? product.sale_price : product.price;

    // A slim buy bar follows the reader on small screens once the main buttons scroll away.
    useEffect(() => {
        const el = buyAreaRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return undefined;
        const observer = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // The sign-in prompt behaves like a dialog: focus moves in, and Escape closes it.
    useEffect(() => {
        if (!authModalOpen) return undefined;
        modalCloseRef.current?.focus();
        const onKey = (e) => e.key === 'Escape' && setAuthModalOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [authModalOpen]);

    const sections = [
        { id: 'overview', label: 'Overview', show: !!product.long_description },
        { id: 'features', label: 'Features', show: product.features?.length > 0 },
        { id: 'specifications', label: 'Specifications', show: Object.keys(specGroups).length > 0 },
        { id: 'faqs', label: 'FAQs', show: product.faqs?.length > 0 },
        { id: 'resources', label: 'Resources', show: product.resources?.length > 0 },
    ].filter((s) => s.show);

    const highlights = (product.features || []).slice(0, 3);

    return (
        <MainLayout>
            <Head title={product.name} />

            {/* Product Hero */}
            <section className="bg-aurora relative overflow-hidden">
                <div className="container-page grid gap-10 pb-16 pt-8 md:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
                    <div className="lg:col-span-2">
                        <Breadcrumbs items={[{ label: 'Products', href: '/products' }, { label: product.name }]} />
                    </div>

                    {/* Image Showcase */}
                    <div className="product-stage relative aspect-square rounded-5xl lg:sticky lg:top-24 lg:self-start">
                        {onSale && (
                            <span className="absolute left-6 top-6 z-10 rounded-full bg-ink-950 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                                Offer
                            </span>
                        )}
                        <img
                            src={product.image_url}
                            alt={product.name}
                            width="1024"
                            height="1024"
                            fetchpriority="high"
                            className="h-[86%] w-auto object-contain transition duration-700 ease-premium hover:scale-105"
                        />
                    </div>

                    {/* Order Specifications Panel */}
                    <div className="flex flex-col justify-center">
                        <span className="chip-brand w-fit">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> In Stock
                        </span>
                        <h1 className="mt-5 font-display text-display-sm font-normal text-ink-950 sm:text-display-md">{product.name}</h1>
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
                            <div className="flex items-baseline gap-3">
                                <span className="font-display text-4xl text-ink-950">{formatPrice(effectivePrice)}</span>
                                {onSale && (
                                    <span className="text-lg text-ink-300 line-through">{formatPrice(product.price)}</span>
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
                            <div ref={buyAreaRef} className="mt-6 grid gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(true)}
                                    disabled={addingToCart}
                                    className="btn-primary gap-2 !py-4"
                                >
                                    {addingToCart ? <Loader2 className="animate-spin" size={18} aria-label="Adding to cart" /> : 'Buy Now'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(false)}
                                    disabled={addingToCart}
                                    className="btn-secondary gap-2 !py-4"
                                >
                                    <ShoppingBag size={18} aria-hidden="true" /> Add to Cart
                                </button>
                            </div>

                            <ul className="mt-6 grid gap-3 border-t border-ink-900/[0.06] pt-6 text-sm text-ink-500 sm:grid-cols-2">
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
                            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-white hover:text-ink-950">
                                {s.label}
                            </a>
                        ))}
                        <button type="button" onClick={() => handleAddToCart(true)} className="btn-primary ml-auto !px-5 !py-2 text-sm">
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
                            <h2 className="section-heading">Meet the {product.name}.</h2>
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
                        <SectionHeader eyebrow="Key features" title="Key Features" subtitle={`What makes the ${product.name} stand out.`} centered />
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {product.features.map((f, i) => (
                                <Reveal key={f.id} delay={(i % 3) * 100} className="h-full">
                                    <FeatureCard icon={f.icon} title={f.title} description={f.description} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Technical Specifications */}
            {Object.keys(specGroups).length > 0 && (
                <section id="specifications" className="container-page section-pad">
                    <SectionHeader eyebrow="Specifications" title="Technical Specifications" subtitle="The details, measured and documented." />
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
                                <h2 className="section-heading">{product.name} FAQs</h2>
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
                        eyebrow="Resources"
                        title="Resources & Downloads"
                        action={<Link href="/resources" className="link-arrow">All resources <ArrowRight size={16} aria-hidden="true" /></Link>}
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                        {product.resources.map((r, i) => {
                            const href = r.file_url && r.file_url !== '#' ? r.file_url : r.external_url && r.external_url !== '#' ? r.external_url : null;
                            const Icon = r.type === 'video' ? Play : Download;
                            const body = (
                                <>
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                                        <Icon size={20} aria-hidden="true" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block font-semibold text-ink-900">{r.title}</span>
                                        <span className="mt-1 block text-sm capitalize text-ink-400">{r.type}{!href && ' · available on request'}</span>
                                    </span>
                                </>
                            );
                            return (
                                <Reveal key={r.id} delay={i * 80}>
                                    {href ? (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-3xl border border-ink-900/[0.06] bg-white p-5 transition duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift">
                                            {body}
                                        </a>
                                    ) : (
                                        <Link href="/contact" className="group flex items-center gap-4 rounded-3xl border border-ink-900/[0.06] bg-white p-5 transition duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift">
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

            {/* Mobile sticky buy bar (leaves room on the right for the support button) */}
            <div
                className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/[0.06] bg-canvas/95 py-3 pl-5 pr-24 backdrop-blur-xl transition-transform duration-500 ease-premium md:hidden ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
                aria-hidden={!showStickyBar}
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-900">{product.name}</p>
                        <p className="text-sm text-ink-500">{formatPrice(effectivePrice)}</p>
                    </div>
                    <button type="button" onClick={() => handleAddToCart(true)} disabled={addingToCart} tabIndex={showStickyBar ? 0 : -1} className="btn-primary shrink-0 !px-5 !py-2.5 text-sm">
                        Buy now
                    </button>
                </div>
            </div>

            {/* Guest Authentication Prompt Modal */}
            {authModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={() => setAuthModalOpen(false)} />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="auth-modal-title"
                        className="relative z-10 w-full max-w-md animate-fade-in-up rounded-4xl bg-white p-8 shadow-lift sm:p-10"
                    >
                        <button
                            ref={modalCloseRef}
                            type="button"
                            onClick={() => setAuthModalOpen(false)}
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-ink-400 hover:bg-ink-900/5 hover:text-ink-700"
                            aria-label="Close"
                        >
                            <X size={18} aria-hidden="true" />
                        </button>
                        <div className="mb-7 text-center">
                            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                                <ShoppingBag size={24} aria-hidden="true" />
                            </span>
                            <h3 id="auth-modal-title" className="mt-5 font-display text-3xl text-ink-950">Sign in to continue</h3>
                            <p className="mt-2 text-sm leading-relaxed text-ink-500">To complete your purchase with secure checkout, please log in to your account or register a new account.</p>
                        </div>
                        <div className="grid gap-3">
                            <Link href="/login" className="btn-primary w-full">Log In</Link>
                            <Link href="/register" className="btn-secondary w-full">Create Account</Link>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
