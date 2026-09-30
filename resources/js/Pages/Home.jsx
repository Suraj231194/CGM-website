import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import FaqAccordion from '@/Components/FaqAccordion';
import SectionHeader from '@/Components/SectionHeader';
import TestimonialCard from '@/Components/TestimonialCard';
import PhoneMockup from '@/Components/PhoneMockup';
import GlucoseTrace from '@/Components/GlucoseTrace';
import Reveal from '@/Components/Reveal';
import CtaBand from '@/Components/CtaBand';
import SafetyNotice from '@/Components/SafetyNotice';
import BlogCover from '@/Components/BlogCover';
import {
    Activity,
    ArrowRight,
    BellRing,
    Clock,
    Compass,
    HandHeart,
    Headphones,
    Layers,
    Shield,
    ShieldCheck,
    Smartphone,
    Stethoscope,
    Users,
} from 'lucide-react';

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

const steps = [
    { step: '01', title: 'Choose Your Device', desc: 'Explore our product range and find the device that fits your lifestyle and therapy needs.', art: '/images/art/step-choose.svg' },
    { step: '02', title: 'Easy Setup', desc: 'Apply your sensor or pod in minutes. Our app guides you through every step of the process.', art: '/images/art/step-apply.svg' },
    { step: '03', title: 'Monitor & Thrive', desc: 'See real-time data on your phone, share with your care team, and make informed decisions.', art: '/images/art/step-monitor.svg' },
];

const pathways = [
    { icon: Compass, title: 'New to CGM', desc: 'Understand how continuous monitoring works, from setup to daily life.', href: '/how-it-works', cta: 'See how it works' },
    { icon: Layers, title: 'Choosing a device', desc: 'Compare sensors, pumps and pens side by side to find your fit.', href: '/compare', cta: 'Compare products' },
    { icon: HandHeart, title: 'Caring for someone', desc: 'Talk to our team about support for family members and caregivers.', href: '/contact', cta: 'Talk to our team' },
    { icon: Stethoscope, title: 'Healthcare professional', desc: 'Clinical resources, prescribing information and dedicated support.', href: '/hcp', cta: 'Visit the HCP center' },
];

// Used only if the flagship product arrives without features, so the section never renders empty.
const fallbackFeatures = [
    { id: 'f1', title: 'Real-Time Glucose Readings', description: 'See your glucose level updated every 5 minutes with trend arrows showing where your levels are heading.' },
    { id: 'f2', title: 'Predictive Urgent-Low Alert', description: 'Receive a warning up to 20 minutes before a severe low, giving you time to take action and stay safe.' },
    { id: 'f3', title: 'Share With 10 Followers', description: 'Invite family, caregivers, or your care team to follow your glucose data in real time for added peace of mind.' },
];

const featureIcons = [Activity, BellRing, Smartphone, Users];

export default function Home({ products = [], faqs = [], blogPosts = [] }) {
    const flagship = products[0];
    const insightFeatures = (flagship?.features?.length ? flagship.features : fallbackFeatures).slice(0, 3);

    return (
        <MainLayout>
            <Head title="Advanced Diabetes Management" />

            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-aurora">
                <div className="pointer-events-none absolute inset-0 bg-grid-faint [mask-image:radial-gradient(60%_70%_at_30%_30%,#000,transparent)]" aria-hidden="true" />
                <div className="container-page relative grid items-center gap-14 pb-20 pt-12 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
                    <div className="max-w-2xl">
                        <p className="chip animate-fade-in-up">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-500" />
                                <span className="relative h-2 w-2 rounded-full bg-brand-600" />
                            </span>
                            Next-generation diabetes technology
                        </p>
                        <h1 className="mt-7 animate-fade-in-up animate-delay-100 text-balance font-display text-[2.75rem] font-normal leading-[1.02] tracking-[-0.03em] text-ink-950 sm:text-display-lg xl:text-display-xl">
                            Advanced diabetes management, <em className="font-light italic text-brand-700">beautifully</em> simplified.
                        </h1>
                        <p className="mt-7 max-w-xl animate-fade-in-up animate-delay-200 text-pretty text-lg leading-relaxed text-ink-500 md:text-xl">
                            Discover our connected ecosystem of CGM, insulin pump, and smart pen technology — designed to work together for better glucose control and a simpler life.
                        </p>
                        <div className="mt-10 flex animate-fade-in-up animate-delay-300 flex-col gap-3 sm:flex-row">
                            <Link href="/products" className="btn-primary gap-2 !px-7 !py-4">
                                Explore products <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                            <Link href="/contact" className="btn-secondary !px-7 !py-4">
                                Request information
                            </Link>
                        </div>
                        <ul className="mt-10 flex animate-fade-in-up animate-delay-400 flex-wrap gap-x-6 gap-y-3 text-sm text-ink-500" aria-label="Highlights">
                            <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand-600" aria-hidden="true" /> FDA cleared</li>
                            <li className="flex items-center gap-2"><Clock size={16} className="text-brand-600" aria-hidden="true" /> 14-day sensor wear</li>
                            <li className="flex items-center gap-2"><Smartphone size={16} className="text-brand-600" aria-hidden="true" /> iOS &amp; Android</li>
                        </ul>
                    </div>

                    {/* Composition: the sensor on its stage, the app in front, live facts floating beside. */}
                    <div className="relative mx-auto aspect-square w-full max-w-[560px] animate-fade-in-up animate-delay-200">
                        <div className="absolute inset-[4%] rounded-full bg-gradient-to-b from-white to-sand-200 shadow-[inset_0_2px_0_rgba(255,255,255,0.9),0_40px_80px_-40px_rgba(7,22,25,0.35)]" aria-hidden="true" />
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 560" aria-hidden="true">
                            <circle cx="280" cy="280" r="268" fill="none" stroke="#1d5859" strokeOpacity="0.08" />
                            <circle cx="280" cy="280" r="222" fill="none" stroke="#1d5859" strokeOpacity="0.06" strokeDasharray="2 8" />
                        </svg>
                        <img
                            src="/images/biogenix-cgm.png"
                            alt="The biogenixCGM sensor"
                            width="1024"
                            height="1024"
                            fetchpriority="high"
                            className="device-blend absolute right-[2%] top-[8%] w-[62%] animate-float-slow"
                        />
                        <div className="absolute bottom-[-6%] left-[-2%] origin-bottom-left scale-[0.7] sm:left-[2%] sm:scale-[0.74]">
                            <PhoneMockup />
                        </div>
                        <div className="absolute right-0 top-[58%] hidden animate-float rounded-2xl bg-white/90 p-3.5 pr-5 shadow-lift ring-1 ring-ink-900/5 backdrop-blur sm:flex sm:items-center sm:gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><BellRing size={18} aria-hidden="true" /></span>
                            <span>
                                <span className="block text-sm font-semibold text-ink-900">Predictive low alert</span>
                                <span className="block text-xs text-ink-500">Up to 20 minutes ahead</span>
                            </span>
                        </div>
                        <div className="absolute left-[34%] top-[2%] hidden rounded-full bg-ink-950 px-4 py-2 text-xs font-semibold text-white shadow-lift md:block">
                            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-glow align-middle" />
                            Updated every 5 minutes
                        </div>
                        <p className="absolute -bottom-10 right-0 text-[11px] text-ink-400">Illustrative app display</p>
                    </div>
                </div>
            </section>

            {/* ── Proof strip ──────────────────────────────────── */}
            <section aria-label="At a glance" className="border-y border-ink-900/[0.06] bg-white">
                <div className="container-page grid grid-cols-2 divide-ink-900/[0.06] md:grid-cols-4 md:divide-x">
                    {stats.map((stat, i) => (
                        <Reveal key={stat.label} delay={i * 80} className="flex items-center gap-4 py-7 md:justify-center md:px-6">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                                <stat.icon size={20} aria-hidden="true" />
                            </span>
                            <span>
                                <span className="block whitespace-nowrap font-display text-xl leading-none text-ink-950 sm:text-2xl">{stat.value}</span>
                                <span className="mt-1 block text-sm text-ink-500">{stat.label}</span>
                            </span>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── Products ─────────────────────────────────────── */}
            <section className="container-page section-pad">
                <SectionHeader
                    eyebrow="The ecosystem"
                    title="Our Product Ecosystem"
                    subtitle="Three connected devices designed to work together for comprehensive diabetes management."
                    action={
                        <Link href="/compare" className="link-arrow">
                            Compare all products <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                    }
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {products.map((product, i) => (
                        <Reveal key={product.id} delay={i * 120} className="h-full">
                            <ProductCard product={product} />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── A day, in clarity ────────────────────────────── */}
            <section className="bg-radiance grain relative overflow-hidden text-white">
                <div className="container-page section-pad relative">
                    <SectionHeader
                        tone="dark"
                        eyebrow="Real-time insight"
                        title="A clearer picture of every day."
                        subtitle="Your glucose, updated every five minutes and shown in context — so meals, movement and sleep all make sense at a glance."
                        centered
                    />
                    <Reveal className="rounded-4xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-8 md:p-10">
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-white">Today</p>
                                <p className="text-xs text-white/50">Illustrative data</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
                                <span className="flex items-center gap-2">
                                    <span className="h-3 w-5 rounded-sm border border-dashed border-white/40 bg-glow/10" /> Target range 70–180 mg/dL
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="h-0.5 w-5 rounded-full bg-glow" /> Glucose
                                </span>
                            </div>
                        </div>
                        <GlucoseTrace tone="dark" annotated className="h-56 sm:h-72" id="home-trace" />
                    </Reveal>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {insightFeatures.map((feature, i) => {
                            const Icon = featureIcons[i % featureIcons.length];
                            return (
                                <Reveal key={feature.id} delay={i * 120} className="flex gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-glow ring-1 ring-white/10">
                                        <Icon size={20} aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block text-base font-semibold text-white">{feature.title}</span>
                                        <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-white/60">{feature.description}</span>
                                    </span>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── How it works ─────────────────────────────────── */}
            <section className="container-page section-pad">
                <SectionHeader
                    eyebrow="How it works"
                    title="Three steps to better glucose management."
                    subtitle="Getting started with biogenixCGM is simple — from choosing your device to your first reading."
                    action={
                        <Link href="/how-it-works" className="link-arrow">
                            Learn more about the process <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                    }
                />
                <ol className="grid gap-6 md:grid-cols-3 lg:gap-8">
                    {steps.map((item, i) => (
                        <Reveal as="li" key={item.step} delay={i * 120} className="group">
                            <div className="overflow-hidden rounded-4xl border border-ink-900/[0.06] bg-white">
                                <img
                                    src={item.art}
                                    alt=""
                                    width="640"
                                    height="480"
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                                />
                            </div>
                            <div className="mt-6 flex items-baseline gap-4">
                                <span className="font-display text-lg text-brand-600">{item.step}</span>
                                <div>
                                    <h3 className="text-xl font-semibold tracking-tight text-ink-950">{item.title}</h3>
                                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{item.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </ol>
            </section>

            {/* ── Pathways ─────────────────────────────────────── */}
            <section className="bg-white">
                <div className="container-page section-pad">
                    <SectionHeader
                        eyebrow="Find your path"
                        title="Wherever you are starting from."
                        subtitle="Choose the route that fits you, and we will take it from there."
                        centered
                    />
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {pathways.map((path, i) => (
                            <Reveal key={path.title} delay={i * 90} className="h-full">
                                <Link
                                    href={path.href}
                                    className="group flex h-full flex-col rounded-3xl border border-ink-900/[0.07] bg-canvas p-7 transition duration-500 ease-premium hover:-translate-y-1 hover:border-brand-600/25 hover:bg-white hover:shadow-lift"
                                >
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-soft transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                                        <path.icon size={22} aria-hidden="true" />
                                    </span>
                                    <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink-950">{path.title}</h3>
                                    <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-500">{path.desc}</p>
                                    <span className="link-arrow mt-6">
                                        {path.cta} <ArrowRight size={16} aria-hidden="true" />
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ─────────────────────────────────── */}
            <section className="container-page section-pad">
                <SectionHeader
                    eyebrow="Real stories"
                    title="Trusted by Patients & Clinicians"
                    subtitle="Hear from real people who have transformed their diabetes management with biogenixCGM."
                    centered
                />
                <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
                    <Reveal className="h-full">
                        <TestimonialCard {...testimonials[0]} featured />
                    </Reveal>
                    <div className="grid gap-6">
                        {testimonials.slice(1).map((t, i) => (
                            <Reveal key={t.author} delay={(i + 1) * 120}>
                                <TestimonialCard {...t} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── For clinicians ───────────────────────────────── */}
            <section className="container-page pb-20 md:pb-28">
                <Reveal className="grid overflow-hidden rounded-5xl border border-ink-900/[0.06] bg-white lg:grid-cols-2">
                    <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                        <p className="eyebrow mb-5">For healthcare professionals</p>
                        <h2 className="section-heading">Clinical resources, all in one place.</h2>
                        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-500">
                            Access clinical resources, prescribing information, and dedicated HCP support — and review patient reports through the secure Clinic Portal.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href="/hcp" className="btn-primary gap-2">
                                Visit the HCP center <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                    <div className="relative min-h-[280px] bg-ink-950">
                        <img
                            src="/images/art/clinic-portal.svg"
                            alt="Illustration of the clinician portal showing a glucose profile report"
                            width="720"
                            height="480"
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </Reveal>
            </section>

            {/* ── Learning center ──────────────────────────────── */}
            {blogPosts.length > 0 && (
                <section className="bg-white">
                    <div className="container-page section-pad">
                        <SectionHeader
                            eyebrow="Learning center"
                            title="Expert guidance, medically reviewed."
                            subtitle="Practical articles on diabetes technology and everyday life, written by specialists."
                            action={
                                <Link href="/blog" className="link-arrow">
                                    View all articles <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            }
                        />
                        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
                            {blogPosts.map((post, i) => (
                                <Reveal key={post.id} delay={i * 120}>
                                    <Link href={`/blog/${post.slug}`} className="group block">
                                        <div className="aspect-[16/10] overflow-hidden rounded-3xl">
                                            <BlogCover category={post.category} className="transition-transform duration-700 ease-premium group-hover:scale-105" />
                                        </div>
                                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{post.category}</p>
                                        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-ink-950 transition-colors group-hover:text-brand-700">{post.title}</h3>
                                        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-500">{post.excerpt}</p>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── FAQ ──────────────────────────────────────────── */}
            {faqs && faqs.length > 0 && (
                <section className="container-page section-pad">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <Reveal>
                            <p className="eyebrow mb-4">Questions</p>
                            <h2 className="section-heading">Frequently Asked Questions</h2>
                            <p className="mt-4 text-lg leading-relaxed text-ink-500">
                                Find answers to the most common questions about our products and services.
                            </p>
                            <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/[0.05]">
                                <p className="text-sm font-semibold text-ink-900">Still have a question?</p>
                                <p className="mt-1 text-sm text-ink-500">Our support team is available 24/7.</p>
                                <Link href="/support" className="link-arrow mt-4">
                                    View All FAQs <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </div>
                        </Reveal>
                        <Reveal delay={120}>
                            <FaqAccordion faqs={faqs} />
                        </Reveal>
                    </div>
                </section>
            )}

            <CtaBand
                title="Ready to take control of your diabetes?"
                text="Connect with our team to learn which biogenixCGM product is right for you. We're here to help every step of the way."
            />

            <SafetyNotice />
        </MainLayout>
    );
}
