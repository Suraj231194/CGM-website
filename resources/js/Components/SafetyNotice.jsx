import { Link } from '@inertiajs/react';
import { ChevronDown, ShieldCheck } from 'lucide-react';

/*
 * Important Safety Information, designed as a component rather than a block of fine print:
 * a plain-language summary that is always visible, with the full text one click away.
 *
 * The wording is the site's existing safety copy, gathered in one place. Final safety
 * language needs medical and regulatory review before launch.
 */
export default function SafetyNotice({ productName, id, compact = false }) {
    const subject = productName ? `The ${productName} is a medical device.` : 'biogenixCGM products are medical devices.';

    return (
        <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={compact ? '' : 'border-t border-ink-900/[0.06] bg-sand-50 py-10'}>
            <div className={compact ? '' : 'container-page'}>
                <div className="rounded-3xl border border-ink-900/[0.07] bg-white p-6 shadow-soft md:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
                        <div className="flex items-center gap-3 md:w-64 md:shrink-0 md:flex-col md:items-start">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                                <ShieldCheck size={22} aria-hidden="true" />
                            </span>
                            <h2 id={id ? `${id}-title` : undefined} className="text-base font-semibold text-ink-900">
                                Important safety information
                            </h2>
                        </div>

                        <div className="flex-1">
                            <p className="text-sm leading-relaxed text-ink-600">
                                <strong className="font-semibold text-ink-900">{subject}</strong>{' '}
                                Read all warnings, precautions and instructions for use before use, and talk to your
                                healthcare provider about whether a product is right for you.
                            </p>

                            <details className="group mt-4">
                                <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 [&::-webkit-details-marker]:hidden">
                                    Read the full safety information
                                    <ChevronDown size={16} className="transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                                </summary>
                                <div className="mt-4 grid gap-5 border-t border-ink-900/[0.06] pt-5 text-sm leading-relaxed text-ink-600 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-1 font-semibold text-ink-900">Intended use</h3>
                                        <p>
                                            biogenixCGM products are medical devices intended to support the management of
                                            diabetes. Some products require a prescription. They are not a substitute for
                                            professional medical advice.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-ink-900">Before you use</h3>
                                        <p>
                                            Read all warnings, precautions and instructions for use supplied with your device.
                                            Consult your healthcare provider before making any change to your diabetes
                                            management plan.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-ink-900">Availability</h3>
                                        <p>Products may not be available in all regions.</p>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-ink-900">About the examples on this site</h3>
                                        <p>
                                            App screens and glucose traces shown on this website are illustrative examples,
                                            not real patient data.
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-5 text-sm text-ink-500">
                                    Questions about safe use? <Link href="/contact" className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-700">Contact our support team</Link>.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
