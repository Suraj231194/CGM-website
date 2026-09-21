import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FaqAccordion({ faqs }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="space-y-3">
            {faqs.map((faq, index) => (
                <div
                    key={faq.id || index}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-teal-200"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset rounded-xl"
                        aria-expanded={openIndex === index}
                    >
                        <span className="text-sm font-semibold text-slate-800 pr-4">{faq.question}</span>
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            {openIndex === index ? (
                                <Minus size={16} className="text-teal-700" />
                            ) : (
                                <Plus size={16} className="text-slate-500" />
                            )}
                        </span>
                    </button>
                    {openIndex === index && (
                        <div className="px-5 pb-5 animate-fade-in">
                            <div className="border-t border-slate-100 pt-4">
                                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                                {faq.category && (
                                    <span className="inline-block mt-3 text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                                        {faq.category}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
