import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import SectionHeader from '@/Components/SectionHeader';
import { ArrowRight } from 'lucide-react';

export default function Index({ products }) {
    return (
        <MainLayout>
            <Head title="Our Products — biogenixCGM" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-slate-50 to-teal-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 animate-fade-in-up">
                        Our Products
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
                        Explore our connected ecosystem of diabetes management devices — each designed to help you live life with greater confidence and control.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, i) => (
                        <div key={product.id} className={`animate-fade-in-up animate-delay-${(i + 1) * 100}`}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Compare CTA */}
            <section className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Not Sure Which Product Is Right for You?</h2>
                    <p className="text-slate-500 mb-6 max-w-lg mx-auto">
                        Use our side-by-side comparison tool to see how each device fits your needs.
                    </p>
                    <Link href="/compare" className="btn-primary">
                        Compare Products <ArrowRight size={16} className="ml-2" />
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
