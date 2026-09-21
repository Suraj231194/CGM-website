import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ContactForm from '@/Components/ContactForm';
import SectionHeader from '@/Components/SectionHeader';
import { Stethoscope, FileText, Users, BookOpen } from 'lucide-react';

export default function Hcp({ products }) {
    return (
        <MainLayout>
            <Head title="Healthcare Providers — biogenixCGM" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block text-teal-400 text-sm font-semibold tracking-wider uppercase mb-4">For Healthcare Professionals</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">Healthcare Providers</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
                        Partner with biogenixCGM to provide your patients with the latest diabetes management technology. Access clinical resources, prescribing information, and dedicated HCP support.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <SectionHeader title="Why Clinicians Choose biogenixCGM" centered />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: Stethoscope, title: 'Clinical Evidence', desc: 'Supported by peer-reviewed studies demonstrating improved TIR, reduced hypoglycemia, and better patient outcomes.' },
                        { icon: FileText, title: 'Prescribing Resources', desc: 'Access prior authorization forms, formulary guides, and step-therapy documentation for all products.' },
                        { icon: Users, title: 'Patient Data Portal', desc: 'View patient glucose reports, trends, and device status through the secure biogenixCGM Clinic Portal.' },
                        { icon: BookOpen, title: 'Training & Education', desc: 'Free online certification courses, in-office training sessions, and patient discussion guides.' },
                    ].map((item, i) => (
                        <div key={i} className="card p-6 text-center group">
                            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-100 transition-colors">
                                <item.icon size={28} className="text-teal-700" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products for HCP */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHeader title="Product Overview" subtitle="Technical summary for clinical decision-making." centered />
                    <div className="grid md:grid-cols-3 gap-6">
                        {products.map((p) => (
                            <div key={p.id} className="card p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={p.image_url} alt={p.name} className="h-12 w-auto object-contain" />
                                    <h3 className="text-lg font-bold text-slate-800">{p.name}</h3>
                                </div>
                                <p className="text-sm text-slate-500 mb-4 leading-relaxed">{p.short_description}</p>
                                {p.specifications && p.specifications.length > 0 && (
                                    <div className="space-y-2">
                                        {p.specifications.slice(0, 4).map((s) => (
                                            <div key={s.id} className="flex justify-between text-xs">
                                                <span className="text-slate-500">{s.label}</span>
                                                <span className="font-medium text-slate-700">{s.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HCP Inquiry Form */}
            <section className="max-w-2xl mx-auto px-4 py-16">
                <SectionHeader title="Request HCP Information" subtitle="Have questions or want clinical resources? Fill out the form below and our medical affairs team will respond within one business day." centered />
                <div className="card p-8">
                    <ContactForm products={products} sourcePage="/hcp" defaultRole="hcp" />
                </div>
            </section>
        </MainLayout>
    );
}
