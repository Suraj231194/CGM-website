import * as LucideIcons from 'lucide-react';

export default function FeatureCard({ icon, title, description }) {
    const IconComponent = LucideIcons[icon] || LucideIcons.Star;

    return (
        <div className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-teal-100 group-hover:to-teal-200 transition-all duration-300">
                <IconComponent size={24} className="text-teal-700" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>
    );
}
