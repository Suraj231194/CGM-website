import { Link } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';

export default function SafetyDisclaimer() {
    return (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-amber-800 mb-1">Important Safety Information</h4>
                    <p className="text-sm text-amber-700 leading-relaxed">
                        biogenixCGM products are prescription medical devices intended for the management of diabetes.
                        They are not a substitute for professional medical advice. Please consult your healthcare provider
                        before making any changes to your diabetes management plan.
                    </p>
                    <Link
                        href="/safety"
                        className="inline-flex items-center mt-3 text-sm font-medium text-amber-800 hover:text-amber-900 underline underline-offset-2 transition-colors duration-300"
                    >
                        View Full Safety Information
                    </Link>
                </div>
            </div>
        </div>
    );
}
