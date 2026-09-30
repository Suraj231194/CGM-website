import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ArrowRight } from 'lucide-react';

const MESSAGES = {
    403: { title: 'This page is private', text: 'You do not have access to this page. If you think that is a mistake, our support team can help.' },
    404: { title: 'We could not find that page', text: 'The link may be out of date, or the page may have moved. Try one of the places below.' },
    500: { title: 'Something went wrong on our side', text: 'Please try again in a moment. If it keeps happening, our support team can help.' },
    503: { title: 'We will be right back', text: 'The site is briefly down for maintenance. Please try again in a few minutes.' },
};

export default function Error({ status = 404 }) {
    const message = MESSAGES[status] || MESSAGES[404];

    return (
        <MainLayout>
            <Head title={message.title} />

            <section className="bg-aurora">
                <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
                    <p className="eyebrow eyebrow-center">Error {status}</p>
                    <h1 className="mt-5 max-w-2xl text-balance font-display text-display-sm font-normal text-ink-950 md:text-display-md">
                        {message.title}
                    </h1>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">{message.text}</p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <Link href="/" className="btn-primary">Back to home</Link>
                        <Link href="/support" className="btn-secondary">Visit support</Link>
                    </div>
                    <Link href="/products" className="link-arrow mt-6">
                        Browse products <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
