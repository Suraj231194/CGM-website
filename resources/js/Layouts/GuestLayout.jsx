import { Link } from '@inertiajs/react';
import { Activity } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-teal-900 via-teal-850 to-slate-900 px-4 py-8 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="mb-6 flex flex-col items-center z-10 animate-fade-in">
                <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                        <Activity className="text-teal-400" size={24} />
                    </div>
                    <div>
                        <span className="text-xl font-extrabold tracking-tight block">BiogenixCGM</span>
                        <span className="text-[10px] uppercase tracking-widest text-teal-400 block font-bold mt-[-2px]">Advanced Health</span>
                    </div>
                </Link>
            </div>

            <div className="w-full sm:max-w-md bg-white/95 backdrop-blur-lg px-8 py-10 shadow-2xl rounded-2xl border border-slate-100 z-10 animate-fade-in-up">
                {children}
            </div>
        </div>
    );
}
