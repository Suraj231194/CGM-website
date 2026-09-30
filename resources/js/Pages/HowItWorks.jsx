import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHero from '@/Components/PageHero';
import SectionHeader from '@/Components/SectionHeader';
import PhoneMockup from '@/Components/PhoneMockup';
import Reveal from '@/Components/Reveal';
import CtaBand from '@/Components/CtaBand';
import SafetyNotice from '@/Components/SafetyNotice';
import { ArrowRight, BellRing, FileBarChart, Users } from 'lucide-react';

const steps = [
    { number: '01', title: 'Choose your device', description: 'Start by exploring our product range. Whether you need continuous glucose monitoring, insulin delivery, or dose tracking — we have a device designed for your lifestyle. Use our comparison tool to see features side by side, or speak with our team for personalized guidance.', art: '/images/art/step-choose.svg', link: { label: 'Compare products', href: '/compare' } },
    { number: '02', title: 'Easy application and setup', description: 'Getting started is simple. Our sensors and pods apply in seconds with a one-touch applicator. Download the biogenixCGM app, follow the guided setup, and your device will be paired and ready within minutes. No complicated installations — just apply and go.', art: '/images/art/step-apply.svg', link: { label: 'Setup guides', href: '/resources' } },
    { number: '03', title: 'Real-time monitoring', description: 'See your glucose data on your smartphone in real time. Customize alerts for highs, lows, and urgent events. Track trends, generate reports, and share your data with up to 10 followers — family, caregivers, or your healthcare team. All from one intuitive app.', art: '/images/art/step-monitor.svg', link: { label: 'Explore the CGM', href: '/products' } },
    { number: '04', title: 'Ongoing support and care', description: 'You are never alone on your diabetes journey. Our 24/7 support team is available by phone, email, and in-app chat. Access educational resources, video tutorials, and community forums. Schedule regular check-ins with your care team using shareable reports from the biogenixCGM app.', art: '/images/art/step-support.svg', link: { label: 'Visit support', href: '/support' } },
];

const appFeatures = [
    { icon: BellRing, title: 'Alerts that fit your day', text: 'Customize alerts for highs, lows, and urgent events.' },
    { icon: FileBarChart, title: 'Trends and reports', text: 'Track trends and generate reports to review with your care team.' },
    { icon: Users, title: 'Share with the people who matter', text: 'Share your data with up to 10 followers — family, caregivers, or your healthcare team.' },
];

export default function HowItWorks() {
    return (
        <MainLayout>
            <Head title="How it works" />

            <PageHero
                eyebrow="How it works"
                title="From first look to everyday life."
                subtitle="From choosing your device to ongoing support — getting started with biogenixCGM is simple, seamless, and supported every step of the way."
                breadcrumbs={[{ label: 'How it works' }]}
            >
                <div className="flex flex-wrap justify-center gap-2">
                    {steps.map((s) => (
                        <a key={s.number} href={`#step-${s.number}`} className="chip transition hover:border-brand-600 hover:text-brand-700">
                            <span className="font-display text-brand-600">{s.number}</span> {s.title}
                        </a>
                    ))}
                </div>
            </PageHero>

            {/* Steps */}
            <section className="container-page section-pad">
                <ol className="relative space-y-24 md:space-y-32">
                    {steps.map((step, i) => (
                        <li key={step.number} id={`step-${step.number}`}>
                            <div className={`grid items-center gap-10 md:grid-cols-2 lg:gap-20 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                                <Reveal className="overflow-hidden rounded-5xl border border-ink-900/[0.06] bg-white">
                                    <img src={step.art} alt="" width="640" height="480" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" className="aspect-[4/3] w-full object-cover" />
                                </Reveal>
                                <Reveal delay={120}>
                                    <div className="flex items-center gap-4" aria-hidden="true">
                                        <span className="font-display text-display-sm leading-none text-brand-600">{step.number}</span>
                                        <span className="h-px flex-1 bg-ink-900/10" />
                                    </div>
                                    <h2 className="mt-6 font-display text-display-sm font-normal text-ink-950">{step.title}</h2>
                                    <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink-500">{step.description}</p>
                                    <Link href={step.link.href} className="link-arrow mt-7">
                                        {step.link.label} <ArrowRight size={16} aria-hidden="true" />
                                    </Link>
                                </Reveal>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* The app */}
            <section className="bg-radiance grain relative overflow-hidden text-white">
                <div className="container-page section-pad relative grid items-center gap-16 lg:grid-cols-2">
                    <div>
                        <SectionHeader
                            tone="dark"
                            compact
                            eyebrow="The companion app"
                            title="Everything you need, in one intuitive app."
                            subtitle="See your glucose data on your smartphone in real time — on iOS and Android."
                            className="!mb-10"
                        />
                        <ul className="space-y-6">
                            {appFeatures.map((f, i) => (
                                <Reveal as="li" key={f.title} delay={i * 100} className="flex gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-glow ring-1 ring-white/10">
                                        <f.icon size={20} aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block font-semibold text-white">{f.title}</span>
                                        <span className="mt-1 block text-[0.9375rem] leading-relaxed text-white/60">{f.text}</span>
                                    </span>
                                </Reveal>
                            ))}
                        </ul>
                    </div>
                    <Reveal className="relative flex justify-center">
                        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/10 blur-3xl" aria-hidden="true" />
                        <div className="relative">
                            <PhoneMockup />
                            <p className="mt-4 text-center text-xs text-white/60">Illustrative app display</p>
                        </div>
                    </Reveal>
                </div>
            </section>

            <CtaBand
                tone="light"
                eyebrow="Next step"
                title="Ready to get started?"
                text="Explore our products or connect with our team to find the right solution for you."
                primary={{ label: 'Explore products', href: '/products' }}
                secondary={{ label: 'Request information', href: '/contact' }}
            />

            <SafetyNotice />
        </MainLayout>
    );
}
