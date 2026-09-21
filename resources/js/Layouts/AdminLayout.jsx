import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    ShoppingBag,
    ClipboardList,
    Mail,
    Truck,
    CreditCard,
    LogOut,
    Menu,
    X,
    Globe,
    User,
    ChevronDown,
    Activity,
    Headphones
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const adminUser = props.auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const menuItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, pattern: /^\/admin$/ },
        { label: 'Products', href: '/admin/products', icon: ShoppingBag, pattern: /^\/admin\/products/ },
        { label: 'Orders', href: '/admin/orders', icon: ClipboardList, pattern: /^\/admin\/orders/ },
        { label: 'Support Tickets', href: '/admin/tickets', icon: Headphones, pattern: /^\/admin\/tickets/ },
        { label: 'Leads', href: '/admin/leads', icon: Mail, pattern: /^\/admin\/leads/ },
        { label: 'Shipping Zones', href: '/admin/shipping', icon: Truck, pattern: /^\/admin\/shipping/ },
        { label: 'Payment Settings', href: '/admin/payment-settings', icon: CreditCard, pattern: /^\/admin\/payment-settings/ },
    ];

    const isActive = (item) => {
        return item.pattern.test(url);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-900 text-slate-300 flex-shrink-0 border-r border-slate-800">
                {/* Brand Logo */}
                <div className="h-16 flex items-center gap-3 px-6 bg-slate-950 border-b border-slate-800">
                    <Activity className="text-teal-400" size={24} />
                    <div>
                        <span className="font-extrabold text-white text-sm tracking-wide">BiogenixCGM</span>
                        <span className="text-[9px] uppercase tracking-wider text-teal-400 font-bold block mt-[-2px]">Admin Console</span>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {menuItems.map((item) => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${active ? 'bg-teal-700 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-slate-200'}`}
                            >
                                <item.icon size={18} className={active ? 'text-white' : 'text-slate-400'} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Return Home & Logout Footer */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition mb-2"
                    >
                        <Globe size={14} /> View Main Website
                    </Link>
                    <Link
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-red-950/30 text-red-400 hover:text-red-300 transition"
                    >
                        <LogOut size={14} /> Log Out
                    </Link>
                </div>
            </aside>

            {/* Mobile Sidebar overlay Drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col z-50 transform transition-transform duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <Activity className="text-teal-400" size={22} />
                        <span className="font-extrabold text-white text-sm">BiogenixCGM</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${active ? 'bg-teal-700 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-slate-200'}`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-400 transition mb-2"
                    >
                        <Globe size={14} /> View Main Website
                    </Link>
                    <Link
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-red-950/30 text-red-400 transition"
                    >
                        <LogOut size={14} /> Log Out
                    </Link>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header bar */}
                <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="text-slate-400 text-sm hidden sm:block font-medium">
                        Welcome to Admin Panel
                    </div>

                    {/* Admin User info dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            className="flex items-center gap-2 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition"
                        >
                            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 font-bold text-sm">
                                {adminUser?.name[0].toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-slate-700 hidden md:inline">{adminUser?.name}</span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </button>

                        {userDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-xl py-1.5 z-20 animate-fade-in text-sm">
                                    <div className="px-4 py-2 border-b text-xs text-slate-400 font-medium">
                                        Signed in as <span className="font-bold text-slate-600 block truncate">{adminUser?.email}</span>
                                    </div>
                                    <Link href="/" className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:bg-slate-50">
                                        <Globe size={14} /> Visit Website
                                    </Link>
                                    <Link
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut size={14} /> Log Out
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </header>

                {/* Dashboard / Subpage Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {/* Render global success/error toasts */}
                    {props.flash?.success && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl font-medium text-sm flex items-center justify-between shadow-sm animate-fade-in">
                            <span>{props.flash.success}</span>
                        </div>
                    )}
                    {props.flash?.error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl font-medium text-sm flex items-center justify-between shadow-sm animate-fade-in">
                            <span>{props.flash.error}</span>
                        </div>
                    )}

                    {children}
                </main>
            </div>
        </div>
    );
}
