import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ContactForm from '@/Components/ContactForm';
import SectionHeader from '@/Components/SectionHeader';
import SafetyNotice from '@/Components/SafetyNotice';
import Reveal from '@/Components/Reveal';
import { Breadcrumbs } from '@/Components/PageHero';
import { ArrowRight, BookOpen, CalendarClock, Check, FileText, Stethoscope, Users } from 'lucide-react';

const benefits = [
    { icon: Stethoscope, title: 'Clinical evidence', desc: 'Supported by peer-reviewed studies demonstrating improved TIR, reduced hypoglycemia, and better patient outcomes.' },
    { icon: FileText, title: 'Prescribing resources', desc: 'Access prior authorization forms, formulary guides, and step-therapy documentation for all products.' },
    { icon: Users, title: 'Patient data portal', desc: 'View patient glucose reports, trends, and device status through the secure biogenixCGM Clinic Portal.' },
    { icon: BookOpen, title: 'Training and education', desc: 'Free online certification courses, in-office training sessions, and patient discussion guides.' },
];

export default function Hcp({ products = [] }) {
    return (
        <MainLayout>
            <Head title="Healthcare professionals" />

            {/* Hero */}
            <section className="bg-radiance grain relative overflow-hidden text-white">
                <div className="container-page relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.05fr]">
                    <div>
                        <Breadcrumbs items={[{ label: 'Healthcare professionals' }]} tone="dark" />
                        <p className="eyebrow eyebrow-light mb-5 animate-fade-in-up">For clinicians</p>
                        <h1 className="animate-fade-in-up text-balance font-display text-display-sm font-normal sm:text-display-md xl:text-display-lg">
                            Built around the way you care for patients.
                        </h1>
                        <p className="mt-6 max-w-xl animate-fade-in-up animate-delay-100 text-pretty text-lg leading-relaxed text-white/70">
                            Partner with biogenixCGM to provide your patients with the latest diabetes management technology. Access clinical resources, prescribing information, and dedicated HCP support.
                        </p>
                        <div className="mt-9 flex animate-fade-in-up animate-delay-200 flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a href="#hcp-inquiry" className="btn-light gap-2">
                                Request HCP information <ArrowRight size={18} aria-hidden="true" />
                            </a>
                            <a href="#product-overview" className="btn-ghost-light">Product overview</a>
                        </div>
                    </div>
                    <div className="animate-fade-in-up animate-delay-200">
                        <div className="overflow-hidden rounded-5xl ring-1 ring-white/10">
                            <img src="/images/art/clinic-portal.svg" alt="Illustration of the Clinic Portal showing an illustrative glucose profile report" width="720" height="480" className="w-full" />
                        </div>
                        <p className="mt-3 text-xs text-white/60">Illustrative Clinic Portal display</p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="container-page section-pad">
                <SectionHeader eyebrow="Benefits" title="Why clinicians choose biogenixCGM" centered />
                <div className="grid gap-x-16 border-b border-ink-900/10 md:grid-cols-2">
                    {benefits.map((item, i) => (
                        <Reveal key={item.title} delay={i * 90} className="flex gap-5 border-t border-ink-900/10 py-7">
                            <item.icon size={22} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                            <div>
                                <h3 className="text-lg font-semibold tracking-tight text-ink-950">{item.title}</h3>
                                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Products for HCP */}
            <section id="product-overview" className="bg-white">
                <div className="container-page section-pad">
                    <SectionHeader eyebrow="Devices" title="Product overview" subtitle="Technical summary for clinical decision-making." />
                    <div className="grid gap-6 lg:grid-cols-3">
                        {products.map((p, i) => (
                            <Reveal key={p.id} delay={i * 100} className="h-full">
                                <article className="flex h-full flex-col rounded-4xl border border-ink-900/[0.06] bg-canvas p-7">
                                    <div className="product-stage mb-6 aspect-[16/9] rounded-3xl">
                                        <img src={p.image_url} alt="" width="1024" height="1024" loading="lazy" className="h-[86%] w-auto object-contain scale-[1.4]" />
                                    </div>
                                    <h3 className="font-display text-2xl leading-tight text-ink-950">{p.name}</h3>
                                    <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-500">{p.short_description}</p>
                                    {p.specifications && p.specifications.length > 0 && (
                                        <dl className="mt-6 divide-y divide-ink-900/[0.06] border-t border-ink-900/[0.06]">
                                            {p.specifications.slice(0, 4).map((s) => (
                                                <div key={s.id} className="py-2.5 text-sm">
                                                    <dt className="text-ink-500">{s.label}</dt>
                                                    <dd className="mt-0.5 font-medium text-ink-800">{s.value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    )}
                                    <Link href={`/products/${p.slug}`} className="link-arrow mt-auto pt-6">
                                        Full specifications <ArrowRight size={16} aria-hidden="true" />
                                    </Link>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* HCP Inquiry Form */}
            <section id="hcp-inquiry" className="container-page section-pad">
                <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    <Reveal>
                        <p className="eyebrow mb-4">Medical affairs</p>
                        <h2 className="section-heading-split">Request HCP information</h2>
                        <p className="mt-5 text-lg leading-relaxed text-ink-500">
                            Have questions or want clinical resources? Fill out the form below and our medical affairs team will respond within one business day.
                        </p>
                        <ul className="mt-8 space-y-4">
                            {['Clinical and prescribing resources', 'In-office and online training', 'Clinic Portal access for your practice', 'Patient discussion guides'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-ink-700">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-700 text-white">
                                        <Check size={13} strokeWidth={3} aria-hidden="true" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-10 flex items-center gap-3 rounded-3xl bg-white p-5 text-sm text-ink-500 shadow-soft ring-1 ring-ink-900/[0.05]">
                            <CalendarClock size={20} className="shrink-0 text-brand-600" aria-hidden="true" />
                            Response within one business day.
                        </div>
                    </Reveal>
                    <Reveal delay={120} className="rounded-5xl bg-white p-6 shadow-soft ring-1 ring-ink-900/[0.05] sm:p-10">
                        <ContactForm products={products} sourcePage="/hcp" defaultRole="hcp" />
                    </Reveal>
                </div>
            </section>

            <SafetyNotice />
        </MainLayout>
    );
}
