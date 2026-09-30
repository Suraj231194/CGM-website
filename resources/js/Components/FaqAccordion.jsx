import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export default function FaqAccordion({ faqs }) {
    const [openIndex, setOpenIndex] = useState(null);
    const baseId = useId();

    return (
        <div className="divide-y divide-ink-900/[0.08] border-y border-ink-900/[0.08]">
            {faqs.map((faq, index) => {
                const open = openIndex === index;
                const panelId = `${baseId}-panel-${index}`;
                const buttonId = `${baseId}-button-${index}`;

                return (
                    <div key={faq.id || index}>
                        <h3>
                            <button
                                id={buttonId}
                                type="button"
                                onClick={() => setOpenIndex(open ? null : index)}
                                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                                aria-expanded={open}
                                aria-controls={panelId}
                            >
                                <span className={`text-[1.0625rem] font-medium transition-colors ${open ? 'text-brand-700' : 'text-ink-900 group-hover:text-brand-700'}`}>
                                    {faq.question}
                                </span>
                                <span
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition duration-500 ease-premium ${
                                        open ? 'rotate-45 border-brand-700 bg-brand-700 text-white' : 'border-ink-900/15 text-ink-700 group-hover:border-brand-700'
                                    }`}
                                    aria-hidden="true"
                                >
                                    <Plus size={16} />
                                </span>
                            </button>
                        </h3>
                        {/*
                          * Animating grid rows from 0fr to 1fr gives a true height transition without
                          * measuring. `invisible` flips only once the close finishes, and keeps collapsed
                          * answers out of the tab order and the accessibility tree.
                          */}
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className={`grid transition-[grid-template-rows,visibility] duration-500 ease-premium ${open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}
                        >
                            <div className="overflow-hidden">
                                <div className="pb-6 pr-12">
                                    <p className="max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-600">{faq.answer}</p>
                                    {faq.category && <span className="chip-brand mt-4">{faq.category}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
