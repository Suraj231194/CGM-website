import { Link, useForm } from '@inertiajs/react';
import { ArrowRight, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
    const { post, processing } = useForm({ product_id: product.id, quantity: 1 });
    const effectivePrice = product.sale_price && product.sale_price > 0 ? product.sale_price : product.price;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        post('/cart/add', { preserveScroll: true });
    };

    return (
        <div className="card group">
            <div className="relative h-56 bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center overflow-hidden">
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-3xl text-teal-600 font-bold">{product.name[0]}</span>
                    </div>
                )}
                {/* Add to Cart Icon */}
                <button
                    onClick={handleAddToCart}
                    disabled={processing}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-teal-700 hover:bg-teal-800 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    title="Add to Cart"
                >
                    <ShoppingCart size={18} />
                </button>
                {product.sale_price && product.sale_price > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        SALE
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-teal-700 transition-colors">{product.name}</h3>
                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-teal-700">₹{Number(effectivePrice).toLocaleString('en-IN')}</span>
                    {product.sale_price && product.sale_price > 0 && (
                        <span className="text-sm text-slate-400 line-through">₹{Number(product.price).toLocaleString('en-IN')}</span>
                    )}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">{product.short_description}</p>
                <div className="flex items-center gap-3">
                    <Link href={`/products/${product.slug}`} className="btn-primary text-sm px-5 py-2.5 flex-1 text-center">
                        Learn More <ArrowRight size={16} className="ml-1.5" />
                    </Link>
                    <Link href="/compare" className="btn-secondary text-sm px-4 py-2.5">Compare</Link>
                </div>
            </div>
        </div>
    );
}
