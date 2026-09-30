import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ContactForm from '@/Components/ContactForm';
import PageHero from '@/Components/PageHero';
import Reveal from '@/Components/Reveal';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const contactMethods = [
    { icon: Phone, label: 'Phone', value: '1-800-BIOGENIXCGM-1', href: 'tel:1-800-BIOGENIXCGM-1' },
    { icon: Mail, label: 'Email', value: 'support@biogenixcgm.com', href: 'mailto:support@biogenixcgm.com' },
    { icon: Clock, label: 'Support Hours', value: '24/7 — Phone, Email & In-App Chat' },
];

export default function Contact({ products = [] }) {
    return (
        <MainLayout>
            <Head title="Contact Us" />

            <PageHero
                eyebrow="Contact"
                title="Get In Touch"
                subtitle="Have questions about our products or need support? Fill out the form below and our team will respond within 24 hours."
                breadcrumbs={[{ label: 'Contact' }]}
            />

            {/* Contact Content */}
            <section className="container-page section-pad">
                <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
                    {/* Form */}
                    <Reveal className="lg:col-span-3">
                        <div className="rounded-5xl bg-white p-6 shadow-soft ring-1 ring-ink-900/[0.05] sm:p-10">
                            <h2 className="font-display text-3xl text-ink-950">Send Us a Message</h2>
                            <p className="mb-8 mt-2 text-ink-500">Tell us a little about yourself and we&rsquo;ll route you to the right specialist.</p>
                            <ContactForm products={products} sourcePage="/contact" />
                        </div>
                    </Reveal>

                    {/* Contact Info */}
                    <div className="space-y-6 lg:col-span-2">
                        <Reveal delay={100} className="rounded-5xl bg-ink-950 p-8 text-white sm:p-10">
                            <h2 className="font-display text-2xl">Contact Information</h2>
                            <ul className="mt-8 space-y-6">
                                {contactMethods.map((m) => (
                                    <li key={m.label} className="flex items-start gap-4">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-glow ring-1 ring-white/10">
                                            <m.icon size={19} aria-hidden="true" />
                                        </span>
                                        <span>
                                            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{m.label}</span>
                                            {m.href ? (
                                                <a href={m.href} className="mt-1 block text-[0.9375rem] text-white transition-colors hover:text-glow">{m.value}</a>
                                            ) : (
                                                <span className="mt-1 block text-[0.9375rem] text-white">{m.value}</span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>

                        {/* Location */}
                        <Reveal delay={200} className="overflow-hidden rounded-5xl bg-white shadow-soft ring-1 ring-ink-900/[0.05]">
                            <img src="/images/art/map-studio.svg" alt="Stylised map marking our San Diego office" width="720" height="400" loading="lazy" className="aspect-[9/5] w-full object-cover" />
                            <div className="flex items-start gap-4 p-6">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                                    <MapPin size={19} aria-hidden="true" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-ink-900">Address</p>
                                    <p className="mt-1 text-sm leading-relaxed text-ink-500">200 Innovation Drive, Suite 400<br />San Diego, CA 92121</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
