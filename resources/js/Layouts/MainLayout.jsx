import { Link, usePage, router, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import {
    ArrowRight,
    ChevronDown,
    Loader2,
    LogOut,
    Mail,
    Menu,
    MessageSquare,
    Minus,
    Paperclip,
    Phone,
    Plus,
    Send,
    Shield,
    ShieldCheck,
    ShoppingBag,
    Trash2,
    User,
    X,
} from 'lucide-react';
import axios from 'axios';
import Logo from '@/Components/Logo';

const navLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Compare', href: '/compare' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Resources', href: '/resources' },
    { label: 'Support', href: '/support' },
    { label: 'For Providers', href: '/hcp' },
    { label: 'Blog', href: '/blog' },
];

const footerColumns = [
    {
        title: 'Products',
        links: [
            { label: 'All products', href: '/products' },
            { label: 'Compare products', href: '/compare' },
            { label: 'How it works', href: '/how-it-works' },
            { label: 'Resources & downloads', href: '/resources' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Support & FAQs', href: '/support' },
            { label: 'Manuals & guides', href: '/resources' },
            { label: 'Safety information', href: '/support#safety' },
            { label: 'Contact us', href: '/contact' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'Learning center', href: '/blog' },
            { label: 'Healthcare providers', href: '/hcp' },
            { label: 'Request information', href: '/contact' },
        ],
    },
];

const formatPrice = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

export default function MainLayout({ children }) {
    const { url, props } = usePage();
    const { auth, cartCount, flash } = props;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const cartCloseRef = useRef(null);
    const mobileCloseRef = useRef(null);

    // Support Widget States
    const [supportOpen, setSupportOpen] = useState(false);
    const supportForm = useForm({
        subject: '',
        description: '',
        image: null,
    });

    const handleSupportFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                alert('File size exceeds 4MB limit.');
                return;
            }
            supportForm.setData('image', file);
        }
    };

    const handleSupportSubmit = (e) => {
        e.preventDefault();
        supportForm.post('/support-tickets', {
            preserveScroll: true,
            onSuccess: () => {
                supportForm.reset();
                setSupportOpen(false);
            }
        });
    };

    // Sliding Drawer States (Cart)
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [loadingCart, setLoadingCart] = useState(false);

    // Watch for flash message to open toast
    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success, flash?.error]);

    const fetchCartItems = () => {
        setLoadingCart(true);
        axios.get('/cart?json=1')
            .then((res) => {
                setCartItems(res.data.items || []);
                setCartSubtotal(res.data.subtotal || 0);
            })
            .catch((err) => {
                console.error('Could not fetch cart items:', err);
            })
            .finally(() => {
                setLoadingCart(false);
            });
    };

    const handleUpdateQuantity = (itemId, newQty) => {
        if (newQty < 1 || newQty > 10) return;
        router.patch(`/cart/update/${itemId}`, { quantity: newQty }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleRemoveItem = (itemId) => {
        router.delete(`/cart/remove/${itemId}`, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleCloseCart = () => {
        setCartOpen(false);
        const params = new URLSearchParams(window.location.search);
        if (params.get('cart') === '1') {
            params.delete('cart');
            const newPath = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
            router.replace(newPath, { preserveScroll: true, preserveState: true });
        }
    };

    // Listen for direct URL query params or flash redirect opens
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Cart check
        if (params.get('cart') === '1' || flash?.open_cart) {
            setCartOpen(true);
        } else {
            setCartOpen(false);
        }
    }, [url, flash?.open_cart]);

    // Fetch items when cart is open or count changes
    useEffect(() => {
        if (cartOpen) {
            fetchCartItems();
        }
    }, [cartOpen, cartCount]);

    // The header tightens and gains a hairline once the page starts to scroll.
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Overlays lock the page behind them, take focus, and close on Escape.
    useEffect(() => {
        const overlayOpen = mobileOpen || cartOpen;
        document.documentElement.style.overflow = overlayOpen ? 'hidden' : '';
        if (cartOpen) cartCloseRef.current?.focus();
        else if (mobileOpen) mobileCloseRef.current?.focus();
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [mobileOpen, cartOpen]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key !== 'Escape') return;
            if (cartOpen) handleCloseCart();
            else if (mobileOpen) setMobileOpen(false);
            else if (supportOpen) setSupportOpen(false);
            else if (userMenuOpen) setUserMenuOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    const isActive = (href) => url === href || url.startsWith(`${href}/`) || url.startsWith(`${href}?`);

    const cartButton = (
        <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition hover:bg-ink-900/5"
            aria-label={cartCount > 0 ? `Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}` : 'Open cart'}
        >
            <ShoppingBag size={20} aria-hidden="true" />
            {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-700 px-1 text-[10px] font-bold text-white ring-2 ring-canvas">
                    {cartCount}
                </span>
            )}
        </button>
    );

    return (
        <div className="flex min-h-screen flex-col">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
            >
                Skip to main content
            </a>

            {/* Flash Message Toast */}
            {showFlash && (flash?.success || flash?.error) && (
                <div
                    role="status"
                    className={`fixed right-4 top-24 z-[100] flex max-w-sm items-start gap-3 rounded-2xl px-5 py-4 text-sm font-medium shadow-lift animate-fade-in-up ${flash?.success ? 'bg-ink-950 text-white' : 'bg-red-700 text-white'}`}
                >
                    {flash?.success ? <ShieldCheck size={18} className="mt-px shrink-0 text-glow" aria-hidden="true" /> : <Shield size={18} className="mt-px shrink-0" aria-hidden="true" />}
                    <span>{flash?.success || flash?.error}</span>
                </div>
            )}

            {/* Utility Bar */}
            <div className="bg-ink-950 text-[13px] text-white/70">
                <div className="container-page flex h-10 items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                        <a href="tel:1-800-BIOGENIXCGM" className="flex items-center gap-1.5 transition-colors hover:text-white">
                            <Phone size={13} aria-hidden="true" /> 1-800-BIOGENIXCGM
                        </a>
                        <a href="mailto:support@biogenixcgm.com" className="hidden items-center gap-1.5 transition-colors hover:text-white sm:flex">
                            <Mail size={13} aria-hidden="true" /> support@biogenixcgm.com
                        </a>
                    </div>
                    <div className="flex items-center gap-5">
                        <Link href="/support#safety" className="flex items-center gap-1.5 transition-colors hover:text-white">
                            <ShieldCheck size={13} aria-hidden="true" /> <span className="hidden sm:inline">Safety information</span><span className="sm:hidden">Safety</span>
                        </Link>
                        <Link href="/hcp" className="hidden transition-colors hover:text-white md:inline">Healthcare professionals</Link>
                        {auth?.user?.role === 'admin' && (
                            <Link href="/admin" className="font-semibold text-glow transition-colors hover:text-white">Admin Panel</Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`glass-header sticky top-0 z-40 transition-shadow duration-300 ${scrolled ? 'shadow-soft' : ''}`}>
                <div className={`container-page flex items-center justify-between gap-6 transition-[height] duration-300 ease-premium ${scrolled ? 'h-16' : 'h-[72px]'}`}>
                    <Logo />

                    {/* Desktop Nav */}
                    <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-200 ${active ? 'text-ink-950' : 'text-ink-500 hover:text-ink-950'}`}
                                >
                                    {link.label}
                                    <span className={`absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-brand-600 transition-transform duration-300 ease-premium ${active ? 'scale-x-100' : 'scale-x-0'}`} aria-hidden="true" />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop Right Actions */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Link href="/contact" className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
                            Request info
                        </Link>

                        {cartButton}

                        {/* User Profile dropdown */}
                        <div className="hidden xl:block">
                            {auth?.user ? (
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        aria-expanded={userMenuOpen}
                                        aria-haspopup="menu"
                                        className="flex items-center gap-2 rounded-full py-2 pl-2 pr-3 text-sm font-medium text-ink-700 transition hover:bg-ink-900/5"
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                                            {auth.user.name?.charAt(0)}
                                        </span>
                                        <span className="max-w-[100px] truncate">{auth.user.name}</span>
                                        <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {userMenuOpen && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                            <div role="menu" className="absolute right-0 z-50 mt-2 w-52 animate-fade-in rounded-2xl border border-ink-900/[0.06] bg-white p-1.5 shadow-lift">
                                                <Link href="/profile" role="menuitem" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink-700 hover:bg-sand-100" onClick={() => setUserMenuOpen(false)}>
                                                    <User size={16} aria-hidden="true" /> My Profile
                                                </Link>
                                                <Link href="/logout" method="post" as="button" role="menuitem" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-red-700 hover:bg-red-50">
                                                    <LogOut size={16} aria-hidden="true" /> Logout
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login" className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700">
                                    Log in
                                </Link>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setMobileOpen(true)}
                            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition hover:bg-ink-900/5 xl:hidden"
                            aria-label="Open menu"
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                        >
                            <Menu size={22} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer menu */}
            <div
                className={`fixed inset-0 z-50 xl:hidden ${mobileOpen ? 'visible' : 'invisible'}`}
                aria-hidden={!mobileOpen}
            >
                <div
                    className={`absolute inset-0 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMobileOpen(false)}
                />
                <div
                    id="mobile-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu"
                    className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-canvas shadow-lift transition-transform duration-500 ease-premium ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex h-[72px] items-center justify-between border-b border-ink-900/[0.06] px-5">
                        <Logo />
                        <button
                            ref={mobileCloseRef}
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-800 hover:bg-ink-900/5"
                            aria-label="Close menu"
                        >
                            <X size={22} aria-hidden="true" />
                        </button>
                    </div>
                    <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
                        <ul className="space-y-1">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        aria-current={isActive(link.href) ? 'page' : undefined}
                                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl transition-colors ${isActive(link.href) ? 'bg-white text-brand-700 shadow-soft' : 'text-ink-900 hover:bg-white'}`}
                                    >
                                        {link.label}
                                        <ArrowRight size={18} className="text-ink-300" aria-hidden="true" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 border-t border-ink-900/[0.06] pt-6">
                            {auth?.user ? (
                                <div className="space-y-1">
                                    <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-ink-700 hover:bg-white">
                                        <User size={18} aria-hidden="true" /> My Profile
                                    </Link>
                                    <Link href="/logout" method="post" as="button" onClick={() => setMobileOpen(false)} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-red-700 hover:bg-red-50">
                                        <LogOut size={18} aria-hidden="true" /> Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-secondary">Log in</Link>
                                    <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-secondary">Sign up</Link>
                                </div>
                            )}
                        </div>
                    </nav>
                    <div className="border-t border-ink-900/[0.06] p-5">
                        <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full gap-2">
                            Request information <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                        <a href="tel:1-800-BIOGENIXCGM" className="mt-3 flex items-center justify-center gap-2 text-sm text-ink-500">
                            <Phone size={14} aria-hidden="true" /> 1-800-BIOGENIXCGM · 24/7
                        </a>
                    </div>
                </div>
            </div>

            <main id="main" className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-radiance grain relative overflow-hidden text-white/70">
                <div className="container-page relative pb-10 pt-20">
                    <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
                        <div className="max-w-sm">
                            <Logo tone="dark" />
                            <p className="mt-6 font-display text-2xl leading-snug text-white">
                                Advanced diabetes management, designed to disappear into your day.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 text-sm">
                                <a href="tel:1-800-BIOGENIXCGM" className="flex items-center gap-2.5 transition-colors hover:text-white">
                                    <Phone size={15} className="text-glow" aria-hidden="true" /> 1-800-BIOGENIXCGM
                                </a>
                                <a href="mailto:support@biogenixcgm.com" className="flex items-center gap-2.5 transition-colors hover:text-white">
                                    <Mail size={15} className="text-glow" aria-hidden="true" /> support@biogenixcgm.com
                                </a>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
                            {footerColumns.map((column) => (
                                <div key={column.title}>
                                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">{column.title}</h3>
                                    <ul className="mt-5 space-y-3">
                                        {column.links.map((link) => (
                                            <li key={link.label}>
                                                <Link href={link.href} className="text-sm transition-colors hover:text-glow">{link.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <div>
                                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Legal</h3>
                                <ul className="mt-5 space-y-3">
                                    <li><a href="#" className="text-sm transition-colors hover:text-glow">Privacy Policy</a></li>
                                    <li><a href="#" className="text-sm transition-colors hover:text-glow">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
                        <p>© {new Date().getFullYear()} biogenixCGM. All rights reserved.</p>
                        <p className="flex items-start gap-2 md:items-center">
                            <ShieldCheck size={14} className="mt-px shrink-0 text-glow md:mt-0" aria-hidden="true" />
                            <span>Medical devices. Read all warnings before use. Consult your healthcare provider.</span>
                        </p>
                    </div>
                </div>
            </footer>

            {/* Sliding Cart Drawer */}
            <div className={`fixed inset-0 z-50 ${cartOpen ? 'visible' : 'invisible'}`} aria-hidden={!cartOpen}>
                {/* Backdrop overlay */}
                <div className={`absolute inset-0 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-300 ${cartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={handleCloseCart} />

                {/* Right Drawer box */}
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cart-title"
                    className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-canvas shadow-lift transition-transform duration-500 ease-premium ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Header */}
                    <div className="flex h-[72px] items-center justify-between border-b border-ink-900/[0.06] px-6">
                        <h2 id="cart-title" className="flex items-center gap-2.5 font-display text-2xl text-ink-950">
                            Your cart
                            {cartCount > 0 && <span className="chip-brand font-sans">{cartCount}</span>}
                        </h2>
                        <button ref={cartCloseRef} type="button" onClick={handleCloseCart} className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-900/5" aria-label="Close cart">
                            <X size={20} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Loader */}
                    {loadingCart ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-ink-400">
                            <Loader2 className="animate-spin text-brand-600" size={30} aria-hidden="true" />
                            <span className="text-sm font-medium">Loading your cart…</span>
                        </div>
                    ) : cartItems.length === 0 ? (
                        /* Empty State */
                        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-ink-300 shadow-soft">
                                <ShoppingBag size={26} aria-hidden="true" />
                            </span>
                            <h3 className="mt-5 font-display text-2xl text-ink-950">Your cart is empty</h3>
                            <p className="mb-7 mt-2 max-w-xs text-sm text-ink-500">Looks like you haven&rsquo;t added anything to your cart yet.</p>
                            <Link href="/products" onClick={handleCloseCart} className="btn-primary gap-2">
                                Shop our products <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                        </div>
                    ) : (
                        /* Items List */
                        <div className="flex flex-1 flex-col overflow-hidden">
                            <ul className="flex-1 space-y-3 overflow-y-auto p-6">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="flex gap-4 rounded-3xl border border-ink-900/[0.06] bg-white p-3">
                                        {/* Product Image */}
                                        <div className="product-stage h-20 w-20 shrink-0 rounded-2xl">
                                            <img src={item.product.image_url} alt="" className="h-16 w-16 object-contain" />
                                        </div>

                                        {/* Item Info */}
                                        <div className="min-w-0 flex-1 py-1">
                                            <h4 className="truncate text-sm font-semibold text-ink-900">{item.product.name}</h4>
                                            <p className="mt-0.5 text-sm text-ink-500">{formatPrice(item.price)}</p>

                                            {/* Stepper & Trash */}
                                            <div className="mt-2.5 flex items-center justify-between">
                                                <div className="flex items-center rounded-full border border-ink-900/10 bg-white">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition hover:bg-sand-100 disabled:opacity-40"
                                                        disabled={item.quantity <= 1}
                                                        aria-label={`Decrease quantity of ${item.product.name}`}
                                                    >
                                                        <Minus size={13} aria-hidden="true" />
                                                    </button>
                                                    <span className="w-7 text-center text-sm font-semibold tabular-nums text-ink-900" aria-live="polite">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition hover:bg-sand-100 disabled:opacity-40"
                                                        disabled={item.quantity >= 10}
                                                        aria-label={`Increase quantity of ${item.product.name}`}
                                                    >
                                                        <Plus size={13} aria-hidden="true" />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition hover:bg-red-50 hover:text-red-700"
                                                    title="Remove item"
                                                    aria-label={`Remove ${item.product.name}`}
                                                >
                                                    <Trash2 size={15} aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Footer */}
                            <div className="space-y-4 border-t border-ink-900/[0.06] bg-white p-6">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-sm font-medium text-ink-600">Subtotal</span>
                                    <span className="font-display text-2xl text-ink-950">{formatPrice(cartSubtotal)}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCartOpen(false);
                                        router.visit('/checkout');
                                    }}
                                    className="btn-primary w-full gap-2 !py-4"
                                >
                                    Proceed to checkout <ArrowRight size={16} aria-hidden="true" />
                                </button>
                                <p className="flex items-center justify-center gap-1.5 text-xs text-ink-400">
                                    <ShieldCheck size={13} aria-hidden="true" /> Secure checkout
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Support Button & Widget */}
            <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end sm:bottom-6 sm:right-6">
                {/* Support Widget Card */}
                <div
                    id="support-widget"
                    role="dialog"
                    aria-label="Support"
                    aria-hidden={!supportOpen}
                    className={`mb-4 w-[calc(100vw-2.5rem)] max-w-[380px] origin-bottom-right overflow-hidden rounded-4xl border border-ink-900/[0.06] bg-white shadow-lift transition-all duration-500 ease-premium ${
                        supportOpen
                            ? 'pointer-events-auto visible translate-y-0 scale-100 opacity-100'
                            : 'invisible translate-y-4 scale-95 opacity-0'
                    }`}
                >
                    {/* Header */}
                    <div className="bg-radiance grain relative flex items-start justify-between p-6 text-white">
                        <div>
                            <h3 className="flex items-center gap-2 font-display text-xl">
                                <MessageSquare size={18} className="text-glow" aria-hidden="true" /> biogenix Support
                            </h3>
                            <p className="mt-1 text-xs text-white/65">Need help? Open a support ticket below.</p>
                        </div>
                        <button type="button" onClick={() => setSupportOpen(false)} className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Close support">
                            <X size={16} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Content */}
                    {auth?.user ? (
                        /* Logged In: Ticket Form */
                        <form onSubmit={handleSupportSubmit} className="space-y-4 p-6">
                            <div>
                                <label htmlFor="support_subject" className="field-label">Subject</label>
                                <input
                                    type="text"
                                    id="support_subject"
                                    value={supportForm.data.subject}
                                    onChange={(e) => supportForm.setData('subject', e.target.value)}
                                    placeholder="e.g. Order delivery, device setup, billing"
                                    className="field !py-2.5 text-sm"
                                    required
                                />
                                {supportForm.errors.subject && (
                                    <p className="field-error">{supportForm.errors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="support_description" className="field-label">Message</label>
                                <textarea
                                    id="support_description"
                                    rows="4"
                                    value={supportForm.data.description}
                                    onChange={(e) => supportForm.setData('description', e.target.value)}
                                    placeholder="Describe your issue or question in detail..."
                                    className="field resize-none !py-2.5 text-sm"
                                    required
                                />
                                {supportForm.errors.description && (
                                    <p className="field-error">{supportForm.errors.description}</p>
                                )}
                            </div>

                            <div>
                                <span className="field-label">Attachment <span className="font-normal text-ink-400">(optional, max 4MB)</span></span>
                                <div className="flex items-center gap-3">
                                    <label className="flex cursor-pointer items-center gap-1.5 rounded-full border border-ink-900/10 bg-sand-50 px-4 py-2 text-xs font-semibold text-ink-700 transition hover:bg-sand-100">
                                        <Paperclip size={14} aria-hidden="true" /> {supportForm.data.image ? 'Change image' : 'Choose image'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleSupportFileChange}
                                            className="sr-only"
                                        />
                                    </label>
                                    {supportForm.data.image && (
                                        <div className="flex min-w-0 max-w-[200px] items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs text-brand-700">
                                            <span className="truncate">{supportForm.data.image.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => supportForm.setData('image', null)}
                                                className="shrink-0 text-ink-400 hover:text-red-700"
                                                title="Remove file"
                                                aria-label="Remove attachment"
                                            >
                                                <X size={12} aria-hidden="true" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {supportForm.errors.image && (
                                    <p className="field-error">{supportForm.errors.image}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={supportForm.processing}
                                className="btn-primary w-full gap-2 text-sm"
                            >
                                {supportForm.processing ? 'Submitting ticket…' : 'Submit support ticket'} <Send size={14} aria-hidden="true" />
                            </button>
                        </form>
                    ) : (
                        /* Guest Prompt */
                        <div className="space-y-5 p-7 text-center">
                            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                                <Shield size={24} aria-hidden="true" />
                            </span>
                            <div className="space-y-1.5">
                                <h4 className="font-display text-xl text-ink-950">Sign in for secure support</h4>
                                <p className="text-sm leading-relaxed text-ink-500">Please sign in to raise a support ticket. This enables us to maintain a secure communication log and track your inquiries over time.</p>
                            </div>
                            <div className="flex flex-col gap-2 pt-1">
                                <Link href="/login" onClick={() => setSupportOpen(false)} className="btn-primary text-sm">
                                    Log in
                                </Link>
                                <Link href="/register" onClick={() => setSupportOpen(false)} className="py-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                                    Create a new account
                                </Link>
                                <a href="tel:1-800-BIOGENIXCGM" className="flex items-center justify-center gap-1.5 text-xs text-ink-400">
                                    <Phone size={12} aria-hidden="true" /> Or call 1-800-BIOGENIXCGM, 24/7
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bubble Toggle Button */}
                <button
                    type="button"
                    onClick={() => setSupportOpen(!supportOpen)}
                    className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center rounded-full bg-ink-950 text-white shadow-lift transition duration-300 ease-premium hover:scale-105 hover:bg-brand-800 active:scale-95"
                    aria-label={supportOpen ? 'Close support' : 'Open support'}
                    aria-expanded={supportOpen}
                    aria-controls="support-widget"
                    title="Support"
                >
                    {!supportOpen && <span className="absolute inset-0 rounded-full bg-brand-500/40 animate-pulse-ring [animation-iteration-count:2]" aria-hidden="true" />}
                    {supportOpen ? <X size={22} aria-hidden="true" /> : <MessageSquare size={22} aria-hidden="true" />}
                </button>
            </div>
        </div>
    );
}
