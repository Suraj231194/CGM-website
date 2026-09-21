import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import FaqAccordion from '@/Components/FaqAccordion';
import SectionHeader from '@/Components/SectionHeader';
import { ArrowRight, Activity, Shield, Clock, Headphones, Star, Quote } from 'lucide-react';

const testimonials = [
    { quote: "The biogenixCGM completely changed how I manage my diabetes. The real-time alerts have given me confidence I never had before.", author: "Maria S.", role: "Patient, Type 1 Diabetes", rating: 5 },
    { quote: "As an endocrinologist, I've seen my patients' Time in Range improve by 20% on average after switching to biogenixCGM products.", author: "Dr. James W.", role: "Endocrinologist", rating: 5 },
    { quote: "The Horizon Smart Pen makes it so easy to track my doses. I no longer worry about forgetting whether I took my insulin.", author: "David L.", role: "Patient, Type 2 Diabetes", rating: 5 },
];

const stats = [
    { icon: Clock, value: '14-Day', label: 'Sensor Wear' },
    { icon: Activity, value: 'Real-Time', label: 'Glucose Alerts' },
    { icon: Shield, value: 'FDA', label: 'Cleared' },
    { icon: Headphones, value: '24/7', label: 'Expert Support' },
];

export default function Home({ products, faqs, blogPosts }) {
    return (
        <MainLayout>
            <Head title="Home — Advanced Diabetes Management" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in-up">
                            <span className="inline-block text-teal-200 text-sm font-semibold tracking-wider uppercase mb-4">
                                Next-Generation Diabetes Technology
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                                Advanced Diabetes Management,{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-200">
                                    Simplified
                                </span>
                            </h1>
                            <p className="text-lg text-teal-100 mb-8 max-w-lg leading-relaxed">
                                Discover our connected ecosystem of CGM, insulin pump, and smart pen technology — designed to work together for better glucose control and a simpler life.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-base">
                                    Explore Products <ArrowRight size={18} className="ml-2" />
                                </Link>
                                <Link href="/how-it-works" className="inline-flex items-center justify-center px-8 py-4 border-2 border-teal-300 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-base">
                                    How It Works
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-center animate-fade-in-up animate-delay-200">
                            <div className="relative">
                                <div className="w-80 h-80 bg-gradient-to-br from-teal-600/30 to-cyan-600/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                                    <img src="/images/biogenix-cgm.png" alt="biogenixCGM Device" className="h-52 w-auto object-contain drop-shadow-2xl" />
                                </div>
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                                    <Activity size={36} className="text-teal-200" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                                    <Shield size={28} className="text-teal-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Strip */}
            <section className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-4 justify-center">
                                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                                    <stat.icon size={22} className="text-teal-700" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                                    <p className="text-xs text-slate-500">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <SectionHeader
                    title="Our Product Ecosystem"
                    subtitle="Three connected devices designed to work together for comprehensive diabetes management."
                    centered
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, i) => (
                        <div key={product.id} className={`animate-fade-in-up animate-delay-${(i + 1) * 100}`}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Teaser */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHeader
                        title="How It Works"
                        subtitle="Getting started with biogenixCGM is simple. Three steps to better glucose management."
                        centered
                    />
                    <div className="grid md:grid-cols-3 gap-8 mt-4">
                        {[
                            { step: '01', title: 'Choose Your Device', desc: 'Explore our product range and find the device that fits your lifestyle and therapy needs.' },
                            { step: '02', title: 'Easy Setup', desc: 'Apply your sensor or pod in minutes. Our app guides you through every step of the process.' },
                            { step: '03', title: 'Monitor & Thrive', desc: 'See real-time data on your phone, share with your care team, and make informed decisions.' },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                                    <span className="text-xl font-bold text-white">{item.step}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link href="/how-it-works" className="btn-secondary">
                            Learn More About the Process <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <SectionHeader
                    title="Trusted by Patients & Clinicians"
                    subtitle="Hear from real people who have transformed their diabetes management with biogenixCGM."
                    centered
                />
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="card p-7 relative">
                            <Quote size={32} className="text-teal-100 absolute top-5 right-5" />
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed mb-5 italic">"{t.quote}"</p>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">{t.author}</p>
                                <p className="text-xs text-slate-500">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Teaser */}
            {faqs && faqs.length > 0 && (
                <section className="bg-slate-50 py-20">
                    <div className="max-w-3xl mx-auto px-4">
                        <SectionHeader
                            title="Frequently Asked Questions"
                            subtitle="Find answers to the most common questions about our products and services."
                            centered
                        />
                        <FaqAccordion faqs={faqs} />
                        <div className="text-center mt-8">
                            <Link href="/support" className="btn-secondary text-sm">
                                View All FAQs <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Banner */}
            <section className="bg-gradient-to-r from-teal-700 to-teal-900 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Take Control of Your Diabetes?
                    </h2>
                    <p className="text-teal-100 mb-8 max-w-xl mx-auto">
                        Connect with our team to learn which biogenixCGM product is right for you. We're here to help every step of the way.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition-all duration-300 shadow-xl">
                            Request Information
                        </Link>
                        <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 border-2 border-teal-300 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                            Explore Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Safety Disclaimer */}
            <section className="bg-amber-50 border-t border-amber-200 py-4">
                <div className="max-w-7xl mx-auto px-4 flex items-start gap-3">
                    <Shield size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                        <strong>Important Safety Information:</strong> biogenixCGM products are medical devices. Please read all warnings, precautions, and instructions for use before using any biogenixCGM product. Consult your healthcare provider to determine if a biogenixCGM product is appropriate for you. Products may not be available in all regions.
                    </p>
                </div>
            </section>
        </MainLayout>
    );
}
