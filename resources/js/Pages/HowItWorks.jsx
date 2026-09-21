import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import SectionHeader from '@/Components/SectionHeader';
import { Search, MousePointer, Smartphone, Headphones, ArrowRight } from 'lucide-react';

const steps = [
    { icon: Search, number: '01', title: 'Choose Your Device', description: 'Start by exploring our product range. Whether you need continuous glucose monitoring, insulin delivery, or dose tracking — we have a device designed for your lifestyle. Use our comparison tool to see features side by side, or speak with our team for personalized guidance.', color: 'from-teal-500 to-teal-700' },
    { icon: MousePointer, number: '02', title: 'Easy Application & Setup', description: 'Getting started is simple. Our sensors and pods apply in seconds with a one-touch applicator. Download the biogenixCGM app, follow the guided setup, and your device will be paired and ready within minutes. No complicated installations — just apply and go.', color: 'from-blue-500 to-blue-700' },
    { icon: Smartphone, number: '03', title: 'Real-Time Monitoring', description: 'See your glucose data on your smartphone in real time. Customize alerts for highs, lows, and urgent events. Track trends, generate reports, and share your data with up to 10 followers — family, caregivers, or your healthcare team. All from one intuitive app.', color: 'from-cyan-500 to-cyan-700' },
    { icon: Headphones, number: '04', title: 'Ongoing Support & Care', description: 'You are never alone on your diabetes journey. Our 24/7 support team is available by phone, email, and in-app chat. Access educational resources, video tutorials, and community forums. Schedule regular check-ins with your care team using shareable reports from the biogenixCGM app.', color: 'from-emerald-500 to-emerald-700' },
];

export default function HowItWorks() {
    return (
        <MainLayout>
            <Head title="How It Works — biogenixCGM" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-teal-800 to-teal-900 py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
                        How It Works
                    </h1>
                    <p className="text-lg text-teal-100 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
                        From choosing your device to ongoing support — getting started with biogenixCGM is simple, seamless, and supported every step of the way.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="max-w-5xl mx-auto px-4 py-20">
                <div className="space-y-16">
                    {steps.map((step, i) => (
                        <div key={i} className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Visual */}
                            <div className="w-full md:w-1/2 flex justify-center">
                                <div className={`w-48 h-48 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center shadow-2xl`}>
                                    <step.icon size={64} className="text-white" />
                                </div>
                            </div>
                            {/* Content */}
                            <div className="w-full md:w-1/2">
                                <span className="text-5xl font-extrabold text-slate-200">{step.number}</span>
                                <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-4">{step.title}</h2>
                                <p className="text-slate-500 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-teal-700 to-teal-900 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                    <p className="text-teal-100 mb-8 max-w-xl mx-auto">
                        Explore our products or connect with our team to find the right solution for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition-all shadow-xl">
                            Explore Products <ArrowRight size={16} className="ml-2" />
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-teal-300 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                            Request Information
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
