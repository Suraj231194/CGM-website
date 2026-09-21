import { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import FeatureCard from '@/Components/FeatureCard';
import FaqAccordion from '@/Components/FaqAccordion';
import SectionHeader from '@/Components/SectionHeader';
import {
    ArrowRight,
    Download,
    Play,
    Shield,
    ShoppingCart,
    Truck,
    CreditCard,
    X,
    Loader2,
    CheckCircle,
    CheckCircle2,
    Minus,
    Plus,
    AlertCircle,
    ShieldCheck
} from 'lucide-react';
import axios from 'axios';

export default function Show({ product }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);

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

    const effectivePrice = product.sale_price && product.sale_price > 0 ? product.sale_price : product.price;

    return (
        <MainLayout>
            <Head title={`${product.name} — BiogenixCGM`} />

            {/* Product Hero */}
            <section className="bg-slate-50 py-16 border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-4">
                    <Link href="/products" className="text-slate-500 text-sm font-medium hover:text-teal-700 transition-colors mb-6 inline-block">
                        ← Back to Catalog
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image Showcase */}
                        <div className="flex justify-center bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative h-96 items-center">
                            {product.sale_price && product.sale_price > 0 && (
                                <span className="absolute top-4 left-4 bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full">
                                    SALE
                                </span>
                            )}
                            <img src={product.image_url} alt={product.name} className="h-72 w-auto object-contain drop-shadow-md hover:scale-105 transition duration-500" />
                        </div>

                        {/* Order Specifications Panel */}
                        <div className="space-y-6">
                            <span className="text-xs uppercase tracking-wider font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-md">
                                In Stock
                            </span>
                            <h1 className="text-4xl font-extrabold text-slate-800">{product.name}</h1>

                            {/* Price display */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black text-teal-700">₹{Number(effectivePrice).toLocaleString('en-IN')}</span>
                                {product.sale_price && product.sale_price > 0 && (
                                    <span className="text-lg text-slate-400 line-through">₹{Number(product.price).toLocaleString('en-IN')}</span>
                                )}
                            </div>

                            <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                                {product.short_description}
                            </p>

                            {/* Quantity selection stepper */}
                            <div className="flex items-center gap-4 py-2">
                                <span className="text-sm font-semibold text-slate-700">Quantity:</span>
                                <div className="flex items-center gap-1 border border-slate-200 rounded-xl bg-white">
                                    <button
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                        className="p-2.5 hover:bg-slate-50 rounded-l-xl transition"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={14} className="text-slate-500" />
                                    </button>
                                    <span className="w-10 text-center font-bold text-sm text-slate-800">{quantity}</span>
                                    <button
                                        onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                                        className="p-2.5 hover:bg-slate-50 rounded-r-xl transition"
                                        disabled={quantity >= 10}
                                    >
                                        <Plus size={14} className="text-slate-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Buying Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <button
                                    onClick={() => handleAddToCart(true)}
                                    disabled={addingToCart}
                                    className="btn-primary flex-1 py-4 text-center justify-center font-bold flex items-center gap-2"
                                >
                                    {addingToCart ? <Loader2 className="animate-spin" size={18} /> : 'Buy Now'}
                                </button>
                                <button
                                    onClick={() => handleAddToCart(false)}
                                    disabled={addingToCart}
                                    className="btn-secondary flex-1 py-4 text-center justify-center font-semibold flex items-center gap-2"
                                >
                                    <ShoppingCart size={18} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description details */}
            <section className="max-w-4xl mx-auto px-4 py-16">
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.long_description }} />
            </section>

            {/* Features */}
            {product.features && product.features.length > 0 && (
                <section className="bg-slate-50 py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <SectionHeader title="Key Features" subtitle={`What makes the ${product.name} stand out.`} centered />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.features.map((f, i) => (
                                <div key={f.id} className="animate-fade-in-up">
                                    <FeatureCard icon={f.icon} title={f.title} description={f.description} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Technical Specifications */}
            {Object.keys(specGroups).length > 0 && (
                <section className="max-w-4xl mx-auto px-4 py-16">
                    <SectionHeader title="Technical Specifications" centered />
                    <div className="space-y-8">
                        {Object.entries(specGroups).map(([group, items]) => (
                            <div key={group} className="card overflow-hidden">
                                <div className="bg-gradient-to-r from-teal-700 to-teal-800 px-6 py-3">
                                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{group}</h3>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {items.map((spec, i) => (
                                        <div key={spec.id} className={`flex justify-between px-6 py-3.5 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                            <span className="text-sm font-medium text-slate-600">{spec.label}</span>
                                            <span className="text-sm text-slate-800 font-semibold">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQs */}
            {product.faqs && product.faqs.length > 0 && (
                <section className="bg-slate-50 py-16">
                    <div className="max-w-3xl mx-auto px-4">
                        <SectionHeader title={`${product.name} FAQs`} centered />
                        <FaqAccordion faqs={product.faqs} />
                    </div>
                </section>
            )}

            {/* Resources */}
            {product.resources && product.resources.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <SectionHeader title="Resources & Downloads" centered />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {product.resources.map((r) => (
                            <div key={r.id} className="card p-6 flex items-start gap-4">
                                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                    {r.type === 'video' ? <Play size={20} className="text-teal-700" /> : <Download size={20} className="text-teal-700" />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 mb-1">{r.title}</h4>
                                    <span className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full capitalize">{r.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Safety Banner */}
            <section className="bg-amber-50 border-t border-amber-200 py-4">
                <div className="max-w-7xl mx-auto px-4 flex items-start gap-3">
                    <Shield size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                        <strong>Important Safety Information:</strong> The {product.name} is a medical device. Please read all warnings, precautions, and instructions for use. Consult your healthcare provider before use.
                    </p>
                </div>
            </section>

            {/* Guest Authentication Prompt Modal */}
            {authModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setAuthModalOpen(false)} />
                    <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl z-10 border border-slate-100 animate-fade-in-up relative">
                        <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <X size={18} />
                        </button>
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-700">
                                <ShoppingCart size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Checkout Required Account</h3>
                            <p className="text-slate-500 text-sm mt-2">To complete your purchase secure checkout, please log in to your account or register a new account.</p>
                        </div>
                        <div className="space-y-3">
                            <Link href="/login" className="btn-primary w-full text-center block">Log In</Link>
                            <Link href="/register" className="btn-secondary w-full text-center block">Create Account</Link>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
