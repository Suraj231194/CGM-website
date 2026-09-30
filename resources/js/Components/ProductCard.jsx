import { Link, useForm } from '@inertiajs/react';
import { ArrowRight, Plus } from 'lucide-react';

const formatPrice = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

export default function ProductCard({ product }) {
    const { post, processing } = useForm({ product_id: product.id, quantity: 1 });
    const onSale = product.sale_price && product.sale_price > 0;
    const effectivePrice = onSale ? product.sale_price : product.price;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        post('/cart/add', { preserveScroll: true });
    };

    return (
        <article className="card card-interactive group relative flex h-full flex-col">
            <div className="product-stage aspect-[4/3]">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="1024"
                        height="1024"
                        className="h-[82%] w-auto object-contain transition-transform duration-700 ease-premium group-hover:scale-[1.06]"
                    />
                ) : (
                    <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-100 font-display text-4xl text-brand-700">
                        {product.name[0]}
                    </span>
                )}
                {onSale && (
                    <span className="absolute left-4 top-4 rounded-full bg-ink-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                        Offer
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-normal leading-tight text-ink-950">
                        <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 focus:outline-none">
                            {product.name}
                        </Link>
                    </h3>
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={processing}
                        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-800 transition duration-300 ease-premium hover:border-brand-700 hover:bg-brand-700 hover:text-white disabled:opacity-50"
                        aria-label={`Add ${product.name} to cart`}
                        title="Add to cart"
                    >
                        <Plus size={18} aria-hidden="true" />
                    </button>
                </div>

                <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-500">{product.short_description}</p>

                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <p className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-ink-950">{formatPrice(effectivePrice)}</span>
                        {onSale && <span className="text-sm text-ink-300 line-through">{formatPrice(product.price)}</span>}
                    </p>
                    <span className="link-arrow" aria-hidden="true">
                        Discover <ArrowRight size={16} />
                    </span>
                </div>
            </div>
        </article>
    );
}
