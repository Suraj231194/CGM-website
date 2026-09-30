import {
    Activity,
    BarChart3,
    Battery,
    Calculator,
    Clock,
    Droplets,
    Heart,
    PenTool,
    RefreshCw,
    Shield,
    Smartphone,
    Sparkles,
    Star,
    Users,
    Zap,
} from 'lucide-react';

/*
 * Feature icons are stored by name in the database. Importing the whole icon set to look
 * them up put ~600 KB into the product page, so only the names the catalogue uses are
 * mapped here; add a name to this list when a new product feature needs it.
 */
export const ICONS = { Activity, BarChart3, Battery, Calculator, Clock, Droplets, Heart, PenTool, RefreshCw, Shield, Smartphone, Star, Users, Zap };

export default function FeatureCard({ icon, title, description }) {
    const IconComponent = ICONS[icon] || Sparkles;

    return (
        <div className="h-full rounded-3xl border border-ink-900/[0.06] bg-canvas p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <IconComponent size={22} aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink-950">{title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{description}</p>
        </div>
    );
}
