import { Link, usePage, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Activity,
    Menu,
    X,
    Phone,
    Mail,
    Shield,
    ShoppingCart,
    User,
    LogOut,
    Package,
    ChevronDown,
    Plus,
    Minus,
    Trash2,
    Loader2,
    Truck,
    CreditCard,
    CheckCircle,
    AlertCircle,
    ShieldCheck,
    ArrowRight,
    MessageSquare,
    Send,
    Paperclip
} from 'lucide-react';
import axios from 'axios';

const navLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Compare', href: '/compare' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Resources', href: '/resources' },
    { label: 'Support', href: '/support' },
    { label: 'HCP', href: '/hcp' },
    { label: 'Blog', href: '/blog' },
];

export default function MainLayout({ children }) {
    const { url, props } = usePage();
    const { auth, cartCount, flash } = props;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

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

    return (
        <div className="min-h-screen flex flex-col">
            {/* Flash Message Toast */}
            {showFlash && (flash?.success || flash?.error) && (
                <div className={`fixed top-20 right-4 z-[100] px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-fade-in-up ${flash?.success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                    {flash?.success || flash?.error}
                </div>
            )}

            {/* Utility Bar */}
            <div className="bg-teal-900 text-teal-100 text-xs py-1.5">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <a href="tel:1-800-BIOGENIXCGM" className="flex items-center gap-1 hover:text-white transition-colors">
                            <Phone size={12} /> 1-800-BIOGENIXCGM
                        </a>
                        <a href="mailto:support@biogenixcgm.com" className="hidden sm:flex items-center gap-1 hover:text-white transition-colors">
                            <Mail size={12} /> support@biogenixcgm.com
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/support" className="hover:text-white transition-colors">Safety Info</Link>
                        {auth?.user?.role === 'admin' && (
                            <Link href="/admin" className="text-amber-300 hover:text-amber-200 transition-colors font-semibold">Admin Panel</Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="glass-header sticky top-0 z-40 shadow-sm bg-white/90 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                            <Activity size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight">
                            Biogenix<span className="text-teal-700">CGM</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${url.startsWith(link.href) ? 'text-teal-700 bg-teal-50' : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50'}`}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Right Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Cart Link */}
                        <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* User Profile dropdown */}
                        {auth?.user ? (
                            <div className="relative">
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors animate-fade-in">
                                    <User size={18} />
                                    <span className="max-w-[100px] truncate">{auth.user.name}</span>
                                    <ChevronDown size={14} />
                                </button>
                                {userMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 animate-fade-in z-50">
                                            <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50" onClick={() => setUserMenuOpen(false)}>
                                                <User size={16} /> My Profile
                                            </Link>
                                            <hr className="my-1 border-slate-100" />
                                            <Link href="/logout" method="post" as="button" className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-605 hover:bg-red-50 w-full text-left">
                                                <LogOut size={16} /> Logout
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">Login</Link>
                                <Link href="/register" className="btn-primary text-sm px-5 py-2.5">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu & Cart */}
                    <div className="flex lg:hidden items-center gap-2">
                        <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
                            )}
                        </button>
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Toggle menu">
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer menu */}
                {mobileOpen && (
                    <div className="lg:hidden border-t border-slate-200 bg-white animate-slide-down">
                        <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${url.startsWith(link.href) ? 'text-teal-700 bg-teal-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="my-2 border-slate-100" />
                            {auth?.user ? (
                                <>
                                    <Link href="/profile" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">My Profile</Link>
                                    <Link href="/logout" method="post" as="button" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-red-650 hover:bg-red-50 text-left w-full">Logout</Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">Login</Link>
                                    <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-sm mt-2 text-center">Sign Up</Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center">
                                    <Activity size={18} className="text-white" />
                                </div>
                                <span className="text-lg font-bold text-white">BiogenixCGM</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">Advanced diabetes management technology designed to simplify your life and improve outcomes.</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Products</h3>
                            <ul className="space-y-2.5">
                                <li><Link href="/products" className="text-sm hover:text-teal-400 transition-colors">All Products</Link></li>
                                <li><Link href="/compare" className="text-sm hover:text-teal-400 transition-colors">Compare</Link></li>
                                <li><Link href="/resources" className="text-sm hover:text-teal-400 transition-colors">Resources</Link></li>
                                <li><Link href="/support" className="text-sm hover:text-teal-400 transition-colors">Support</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                            <ul className="space-y-2.5">
                                <li><Link href="/blog" className="text-sm hover:text-teal-400 transition-colors">Blog</Link></li>
                                <li><Link href="/hcp" className="text-sm hover:text-teal-400 transition-colors">Healthcare Providers</Link></li>
                                <li><Link href="/contact" className="text-sm hover:text-teal-400 transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                            <ul className="space-y-2.5">
                                <li><a href="#" className="text-sm hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-sm hover:text-teal-400 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500">© {new Date().getFullYear()} BiogenixCGM. All rights reserved.</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Shield size={14} className="text-amber-500" />
                            <span>Medical devices. Read all warnings before use. Consult your healthcare provider.</span>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Sliding Cart Drawer */}
            <div className={`fixed inset-0 z-50 transition-opacity ${cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop overlay */}
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseCart} />

                {/* Right Drawer box */}
                <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-10 transform transition-transform duration-300 ease-out flex flex-col ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    {/* Header */}
                    <div className="h-16 border-b px-6 flex items-center justify-between bg-slate-50">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <ShoppingCart size={18} className="text-teal-700" /> Shopping Cart
                        </h2>
                        <button onClick={handleCloseCart} className="p-1.5 hover:bg-slate-200 text-slate-500 rounded-lg transition">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Loader */}
                    {loadingCart ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
                            <Loader2 className="animate-spin text-teal-700" size={32} />
                            <span className="text-sm font-semibold">Loading your cart...</span>
                        </div>
                    ) : cartItems.length === 0 ? (
                        /* Empty State */
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <ShoppingCart size={28} />
                            </div>
                            <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                            <p className="text-slate-500 text-sm mt-1 mb-6 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
                            <button onClick={handleCloseCart} className="btn-primary py-2.5 px-6 font-semibold text-sm">
                                Shop Our Products
                            </button>
                        </div>
                    ) : (
                        /* Items List */
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-3 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition">
                                        {/* Product Image */}
                                        <div className="w-16 h-16 bg-white border rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                                            <img src={item.product.image_url} alt={item.product.name} className="max-h-full max-w-full object-contain" />
                                        </div>
                                        
                                        {/* Item Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-slate-800 truncate">{item.product.name}</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">₹{Number(item.price).toLocaleString('en-IN')}</p>
                                            
                                            {/* Stepper & Trash */}
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-1 border border-slate-200 rounded-lg bg-white">
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-slate-50 rounded-l-lg transition"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={12} className="text-slate-500" />
                                                    </button>
                                                    <span className="w-6 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-slate-50 rounded-r-lg transition"
                                                        disabled={item.quantity >= 10}
                                                    >
                                                        <Plus size={12} className="text-slate-500" />
                                                    </button>
                                                </div>
                                                
                                                <button 
                                                    type="button"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t bg-slate-50 space-y-4">
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="font-bold text-slate-850 text-sm">Subtotal</span>
                                    <span className="text-lg font-extrabold text-teal-700">₹{Number(cartSubtotal).toLocaleString('en-IN')}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCartOpen(false);
                                        router.visit('/checkout');
                                    }}
                                    className="btn-primary w-full py-3.5 text-center justify-center font-bold flex items-center gap-1.5"
                                >
                                    Proceed to Checkout <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Support Button & Widget */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
                {/* Support Widget Card */}
                <div className={`w-[320px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden mb-4 transition-all duration-300 transform origin-bottom-right ${
                    supportOpen 
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
                }`}>
                    {/* Header */}
                    <div className="bg-teal-900 text-white p-5 flex items-center justify-between">
                        <div>
                            <h3 className="font-extrabold text-sm tracking-wide uppercase flex items-center gap-1.5">
                                <MessageSquare size={16} className="text-teal-400" /> Biogenix Support
                            </h3>
                            <p className="text-[11px] text-teal-200 mt-0.5">Need help? Open a support ticket below.</p>
                        </div>
                        <button onClick={() => setSupportOpen(false)} className="text-teal-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition">
                            <X size={16} />
                        </button>
                    </div>

                    {/* Content */}
                    {auth?.user ? (
                        /* Logged In: Ticket Form */
                        <form onSubmit={handleSupportSubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="support_subject" className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Concern Subject</label>
                                <input
                                    type="text"
                                    id="support_subject"
                                    value={supportForm.data.subject}
                                    onChange={(e) => supportForm.setData('subject', e.target.value)}
                                    placeholder="e.g. Order Delivery, Device Setup, Billing"
                                    className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-xs py-2.5 placeholder:text-slate-400"
                                    required
                                />
                                {supportForm.errors.subject && (
                                    <p className="text-xs font-semibold text-red-600 mt-1">{supportForm.errors.subject}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="support_description" className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Detailed Message</label>
                                <textarea
                                    id="support_description"
                                    rows="4"
                                    value={supportForm.data.description}
                                    onChange={(e) => supportForm.setData('description', e.target.value)}
                                    placeholder="Describe your issue or question in detail..."
                                    className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-xs py-2.5 placeholder:text-slate-400"
                                    required
                                />
                                {supportForm.errors.description && (
                                    <p className="text-xs font-semibold text-red-600 mt-1">{supportForm.errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Attachment (Optional, Max 4MB)</label>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition">
                                        <Paperclip size={14} /> {supportForm.data.image ? 'Change Image' : 'Choose Image'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleSupportFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {supportForm.data.image && (
                                        <div className="flex items-center gap-1.5 text-xs text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-150 max-w-[200px] truncate">
                                            <span className="truncate">{supportForm.data.image.name}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => supportForm.setData('image', null)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Remove file"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {supportForm.errors.image && (
                                    <p className="text-xs font-semibold text-red-600 mt-1">{supportForm.errors.image}</p>
                                )}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={supportForm.processing}
                                    className="w-full btn-primary text-xs py-3 justify-center font-bold flex items-center gap-1.5 disabled:opacity-50"
                                >
                                    {supportForm.processing ? 'Submitting Ticket...' : 'Submit Support Ticket'} <Send size={12} />
                                </button>
                            </div>
                        </form>
                    ) : (
                        /* Guest Prompt */
                        <div className="p-8 text-center space-y-5">
                            <div className="w-16 h-16 bg-amber-50 rounded-full border border-amber-100 flex items-center justify-center mx-auto text-amber-600">
                                <Shield size={28} />
                            </div>
                            <div className="space-y-1.5">
                                <h4 className="font-extrabold text-sm text-slate-800">Authentication Required</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">Please sign in to raise a support ticket. This enables us to maintain a secure communication log and track your inquiries over time.</p>
                            </div>
                            <div className="flex flex-col gap-2 pt-2">
                                <Link 
                                    href="/login" 
                                    onClick={() => setSupportOpen(false)}
                                    className="btn-primary text-xs py-3 text-center justify-center font-bold"
                                >
                                    Log In
                                </Link>
                                <Link 
                                    href="/register" 
                                    onClick={() => setSupportOpen(false)}
                                    className="text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline text-center py-2"
                                >
                                    Create a New Account
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bubble Toggle Button */}
                <button
                    onClick={() => setSupportOpen(!supportOpen)}
                    className="w-14 h-14 bg-teal-700 hover:bg-teal-800 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce pointer-events-auto"
                    title="Toggle Support Center"
                >
                    {supportOpen ? <X size={24} /> : <MessageSquare size={24} />}
                </button>
            </div>
        </div>
    );
}
