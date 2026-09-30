import { Link } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';

/** A compact safety callout for use inside a page; links to the full notice on Support. */
export default function SafetyDisclaimer() {
    return (
        <div className="rounded-3xl border border-ink-900/[0.07] bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <ShieldCheck size={20} aria-hidden="true" />
                </span>
                <div>
                    <h4 className="mb-1 text-sm font-semibold text-ink-900">Important safety information</h4>
                    <p className="text-sm leading-relaxed text-ink-600">
                        biogenixCGM products are medical devices intended for the management of diabetes. They are not a
                        substitute for professional medical advice. Please consult your healthcare provider before making
                        any changes to your diabetes management plan.
                    </p>
                    <Link
                        href="/support#safety"
                        className="mt-3 inline-flex items-center text-sm font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 transition hover:decoration-brand-700"
                    >
                        View full safety information
                    </Link>
                </div>
            </div>
        </div>
    );
}
