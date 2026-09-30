import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHero from '@/Components/PageHero';
import { SUPPORT_EMAIL } from '@/lib/brand';
import { ArrowRight, Mail } from 'lucide-react';

/*
 * Holding page for the privacy policy and terms of service. It states plainly that the full
 * document is being finalised and gives a direct route to the team in the meantime; it makes
 * no legal commitments of its own. Replace the body with the approved text once supplied.
 */
const DOCS = {
    privacy: {
        title: 'Privacy policy',
        subtitle: 'Our full privacy policy is being finalised and will be published on this page.',
        body: 'If you have a question about how we handle the personal or health information you share with us, or you would like to access, correct or delete it, contact our team and we will respond to you directly.',
        subject: 'Privacy question',
    },
    terms: {
        title: 'Terms of service',
        subtitle: 'Our full terms of service are being finalised and will be published on this page.',
        body: 'If you have a question about ordering, delivery, returns or using this website, contact our team and we will help you directly.',
        subject: 'Question about terms of service',
    },
};

export default function Legal({ doc = 'privacy' }) {
    const page = DOCS[doc] || DOCS.privacy;
    const other = doc === 'terms' ? { href: '/privacy', label: 'Privacy policy' } : { href: '/terms', label: 'Terms of service' };

    return (
        <MainLayout>
            <Head title={page.title} />

            <PageHero title={page.title} subtitle={page.subtitle} breadcrumbs={[{ label: page.title }]} />

            <section className="container-page section-pad">
                <div className="max-w-2xl rounded-4xl border border-ink-900/[0.07] bg-white p-6 shadow-soft sm:p-8 md:p-12">
                    <h2 className="font-display text-display-xs font-normal text-ink-950">While this page is being prepared</h2>
                    <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-relaxed text-ink-600">{page.body}</p>
                    <p className="mt-3 text-sm text-ink-500">
                        Email <a href={SUPPORT_EMAIL.href} className="font-medium text-brand-700 [overflow-wrap:anywhere] hover:text-brand-900">{SUPPORT_EMAIL.display}</a>
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a href={`${SUPPORT_EMAIL.href}?subject=${encodeURIComponent(page.subject)}`} className="btn-primary gap-2">
                            <Mail size={16} aria-hidden="true" /> Email our team
                        </a>
                        <Link href="/contact" className="btn-secondary">Contact form</Link>
                    </div>

                    <p className="mt-10 border-t border-ink-900/[0.07] pt-6 text-sm text-ink-500">
                        Looking for something else?{' '}
                        <Link href={other.href} className="link-arrow">
                            {other.label} <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                    </p>
                </div>
            </section>
        </MainLayout>
    );
}
