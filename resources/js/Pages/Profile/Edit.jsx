import { useState } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import MainLayout from '@/Layouts/MainLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { 
    User, 
    ClipboardList, 
    Calendar, 
    Eye, 
    CreditCard, 
    Truck, 
    FileText, 
    ArrowLeft, 
    ShieldAlert, 
    Settings, 
    ShoppingBag, 
    DollarSign, 
    ShieldCheck, 
    Clock,
    UserCheck,
    CheckCircle2,
    MessageSquare,
    Send,
    Paperclip
} from 'lucide-react';

export default function Edit({ mustVerifyEmail, status, orders = [], tickets = [] }) {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('settings'); // settings | orders | tickets
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Sync selected ticket with latest data from props when props.tickets changes
    const activeTicket = selectedTicket 
        ? tickets.find(t => t.id === selectedTicket.id) || selectedTicket 
        : null;

    const [replyMessage, setReplyMessage] = useState('');
    const [replying, setReplying] = useState(false);
    const [replyError, setReplyError] = useState(null);

    const submitReply = (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        if (replying || !replyMessage.trim()) return;

        setReplying(true);
        setReplyError(null);

        axios.post(`/support-tickets/${activeTicket.id}/reply`, {
            message: replyMessage,
        })
        .then(() => {
            setReplyMessage('');
            router.reload({ only: ['tickets'] });
        })
        .catch((err) => {
            console.error('Error replying to ticket:', err);
            setReplyError(err.response?.data?.message || 'Failed to send reply. Please try again.');
        })
        .finally(() => {
            setReplying(false);
        });
    };

    // Calculate user statistics
    const totalSpent = orders.reduce((sum, order) => sum + Number(order.total), 0);
    const completedOrders = orders.filter(o => o.status === 'delivered').length;

    const getStatusStyle = (status) => {
        const styles = {
            placed: 'bg-blue-50 text-blue-700 border-blue-100',
            confirmed: 'bg-amber-50 text-amber-700 border-amber-100',
            shipped: 'bg-indigo-50 text-indigo-700 border-indigo-100',
            delivered: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            cancelled: 'bg-rose-50 text-rose-700 border-rose-100',
        };
        return styles[status] || 'bg-slate-50 text-slate-700 border-slate-100';
    };

    const getPaymentStatusStyle = (status) => {
        const styles = {
            pending: 'bg-amber-55/10 text-amber-800 border-amber-100',
            pending_verification: 'bg-orange-50 text-orange-700 border-orange-100',
            paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            failed: 'bg-rose-50 text-rose-700 border-rose-100',
        };
        return styles[status] || 'bg-slate-50 text-slate-700 border-slate-150';
    };

    const paymentStatusLabels = {
        pending: 'Pending',
        pending_verification: 'Verifying',
        paid: 'Paid',
        failed: 'Failed',
    };

    const paymentMethodLabel = {
        cod: 'Cash on Delivery',
        online: 'UPI / Online Scan',
    };

    // Helper for visual order tracker steps
    const orderSteps = ['placed', 'confirmed', 'shipped', 'delivered'];
    const getStepIndex = (status) => orderSteps.indexOf(status);

    return (
        <MainLayout>
            <Head title="Account Dashboard — BiogenixCGM" />

            <div className="bg-slate-50/50 min-h-screen py-10">
                <div className="max-w-7xl mx-auto px-4 space-y-8">
                    
                    {/* Premium Profile Header Card */}
                    <div className="card border-0 bg-gradient-to-r from-teal-850 to-teal-700 shadow-xl overflow-hidden relative rounded-3xl">
                        {/* Decorative background shapes */}
                        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-teal-600/10 rounded-full -ml-16 -mb-16 blur-xl" />

                        <div className="p-8 md:p-10 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-white">
                            {/* Profile details */}
                            <div className="flex items-center gap-5 sm:gap-6">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-lg relative">
                                    {orders[0]?.shipping_address?.name?.[0] || 'U'}
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-teal-800" title="Active Health Account" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                                        {orders[0]?.shipping_address?.name || 'Biogenix User'}
                                        <span className="text-[10px] tracking-widest font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                                            <UserCheck size={10} /> Verified Patient
                                        </span>
                                    </h2>
                                    <p className="text-teal-100 text-xs sm:text-sm font-medium">{orders[0]?.shipping_address?.email || 'Secure Profile Dashboard'}</p>
                                    <p className="text-[10px] text-teal-200/80 font-bold flex items-center gap-1 mt-1">
                                        <Calendar size={11} /> Registered Member
                                    </p>
                                </div>
                            </div>

                            {/* Dashboard Metrics */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5">
                                <div className="space-y-1 pr-4 sm:border-r border-white/10">
                                    <span className="text-[10px] text-teal-200/80 font-extrabold uppercase tracking-wider block">Total Spent</span>
                                    <span className="text-lg sm:text-xl font-black text-white">₹{totalSpent.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="space-y-1 pr-0 sm:pr-4 sm:border-r border-white/10">
                                    <span className="text-[10px] text-teal-200/80 font-extrabold uppercase tracking-wider block">Device Orders</span>
                                    <span className="text-lg sm:text-xl font-black text-white">{orders.length}</span>
                                </div>
                                <div className="col-span-2 sm:col-span-1 space-y-1 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                                    <span className="text-[10px] text-teal-200/80 font-extrabold uppercase tracking-wider block">Delivered</span>
                                    <span className="text-lg sm:text-xl font-black text-emerald-300 flex items-center gap-1">
                                        {completedOrders} <CheckCircle2 size={16} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column Navigation Sidebar */}
                        <div className="lg:col-span-3 space-y-3">
                            <button
                                onClick={() => { setActiveTab('settings'); setSelectedOrder(null); setSelectedTicket(null); }}
                                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'settings' ? 'bg-teal-700 text-white shadow-lg shadow-teal-700/10 scale-[1.02]' : 'bg-white hover:bg-slate-50 border text-slate-600 hover:text-teal-700 border-slate-200/60 shadow-sm'}`}
                            >
                                <Settings size={18} /> Account Settings
                            </button>
                            <button
                                onClick={() => { setActiveTab('orders'); setSelectedTicket(null); }}
                                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'orders' ? 'bg-teal-700 text-white shadow-lg shadow-teal-700/10 scale-[1.02]' : 'bg-white hover:bg-slate-50 border text-slate-600 hover:text-teal-700 border-slate-200/60 shadow-sm'}`}
                            >
                                <ShoppingBag size={18} /> Order History
                                {orders.length > 0 && (
                                    <span className={`ml-auto text-xs px-2.5 py-0.5 rounded-full font-bold ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200/30'}`}>
                                        {orders.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => { setActiveTab('tickets'); setSelectedOrder(null); }}
                                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'tickets' ? 'bg-teal-700 text-white shadow-lg shadow-teal-700/10 scale-[1.02]' : 'bg-white hover:bg-slate-50 border text-slate-600 hover:text-teal-700 border-slate-200/60 shadow-sm'}`}
                            >
                                <MessageSquare size={18} /> Support Tickets
                                {tickets.length > 0 && (
                                    <span className={`ml-auto text-xs px-2.5 py-0.5 rounded-full font-bold ${activeTab === 'tickets' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200/30'}`}>
                                        {tickets.length}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Right Column Content View */}
                        <div className="lg:col-span-9 space-y-6">
                            
                            {/* Settings View */}
                            {activeTab === 'settings' && (
                                <div className="space-y-6">
                                    <div className="card p-6 md:p-8 bg-white border border-slate-200/60 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md">
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                        />
                                    </div>

                                    <div className="card p-6 md:p-8 bg-white border border-slate-200/60 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md">
                                        <UpdatePasswordForm />
                                    </div>

                                    <div className="card p-6 md:p-8 bg-white border border-red-200 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md">
                                        <DeleteUserForm />
                                    </div>
                                </div>
                            )}

                            {/* Orders View */}
                            {activeTab === 'orders' && (
                                <div className="space-y-6">
                                    
                                    {/* Order Details Panel */}
                                    {selectedOrder ? (
                                        <div className="card p-6 md:p-8 bg-white border border-slate-200/60 shadow-lg rounded-3xl space-y-8 animate-fade-in">
                                            {/* Header details */}
                                            <div className="flex items-center justify-between border-b pb-4 border-slate-100">
                                                <button
                                                    onClick={() => setSelectedOrder(null)}
                                                    className="inline-flex items-center text-xs font-extrabold text-slate-500 hover:text-teal-700 transition"
                                                >
                                                    <ArrowLeft size={16} className="mr-1.5" /> Back to History
                                                </button>
                                                <span className="font-bold text-slate-800 text-sm font-mono">Order: #{selectedOrder.order_number}</span>
                                            </div>

                                            {/* Visual Progress Tracker */}
                                            {selectedOrder.status !== 'cancelled' ? (
                                                <div className="py-4">
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Delivery Telemetry</h4>
                                                    <div className="relative">
                                                        {/* Connector line */}
                                                        <div className="absolute top-4 left-4 right-4 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full">
                                                            <div 
                                                                className="h-full bg-gradient-to-r from-teal-500 to-teal-700 transition-all duration-500 rounded-full"
                                                                style={{ width: `${(getStepIndex(selectedOrder.status) / (orderSteps.length - 1)) * 100}%` }}
                                                            />
                                                        </div>

                                                        {/* Progress Steps */}
                                                        <div className="relative z-10 flex justify-between">
                                                            {orderSteps.map((step, idx) => {
                                                                const isCompleted = idx <= getStepIndex(selectedOrder.status);
                                                                const isActive = step === selectedOrder.status;
                                                                return (
                                                                    <div key={step} className="flex flex-col items-center text-center">
                                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs transition duration-300 ${isCompleted ? 'bg-teal-700 border-teal-700 text-white shadow-md shadow-teal-700/20' : 'bg-white border-slate-200 text-slate-400'}`}>
                                                                            {isCompleted ? '✓' : idx + 1}
                                                                        </div>
                                                                        <span className={`text-[10px] font-extrabold uppercase mt-2.5 tracking-wider ${isActive ? 'text-teal-700' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                                                                            {step}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-800">
                                                    <ShieldAlert size={20} className="flex-shrink-0" />
                                                    <p className="text-xs font-semibold">This order has been cancelled.</p>
                                                </div>
                                            )}

                                            {/* Details Breakdown */}
                                            <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                                                {/* Invoice */}
                                                <div className="space-y-4">
                                                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5"><FileText size={18} className="text-teal-700" /> Invoice Summary</h3>
                                                    <div className="divide-y divide-slate-100 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                                        {selectedOrder.items.map((item) => (
                                                            <div key={item.id} className="py-3 flex justify-between text-xs font-semibold first:pt-0 last:pb-0">
                                                                <span className="text-slate-655 truncate max-w-[220px]">
                                                                    {item.product_name} <span className="text-slate-400 font-extrabold ml-1">× {item.quantity}</span>
                                                                </span>
                                                                <span className="font-bold text-slate-800">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                                            </div>
                                                        ))}
                                                        <hr className="border-slate-200/60 my-3" />
                                                        <div className="flex justify-between text-xs text-slate-500 pt-1">
                                                            <span>Subtotal</span>
                                                            <span>₹{Number(selectedOrder.subtotal).toLocaleString('en-IN')}</span>
                                                        </div>
                                                        <div className="flex justify-between text-xs text-slate-500 pt-1">
                                                            <span>Shipping Charge</span>
                                                            <span>₹{Number(selectedOrder.shipping_charge).toLocaleString('en-IN')}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm pt-3.5 font-black text-slate-850">
                                                            <span>Grand Total</span>
                                                            <span className="text-teal-700 text-base">₹{Number(selectedOrder.total).toLocaleString('en-IN')}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Ship/Pay Details */}
                                                <div className="space-y-6">
                                                    {/* Shipping Address details */}
                                                    <div className="space-y-3">
                                                        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5"><Truck size={18} className="text-teal-700" /> Shipping Destination</h3>
                                                        <div className="text-xs text-slate-600 leading-relaxed pl-6">
                                                            <p className="font-extrabold text-slate-800 text-sm">{selectedOrder.shipping_address.name}</p>
                                                            <p className="mt-1">{selectedOrder.shipping_address.address_line_1}</p>
                                                            {selectedOrder.shipping_address.address_line_2 && <p>{selectedOrder.shipping_address.address_line_2}</p>}
                                                            <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} - {selectedOrder.shipping_address.pincode}</p>
                                                        </div>
                                                    </div>

                                                    {/* Payment details */}
                                                    <div className="space-y-3 border-t pt-4 border-slate-100">
                                                        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5"><CreditCard size={18} className="text-teal-700" /> Payment Transaction</h3>
                                                        <div className="text-xs text-slate-600 pl-6 space-y-2.5">
                                                            <p><span className="text-slate-400 font-bold">Method:</span> {paymentMethodLabel[selectedOrder.payment_method]}</p>
                                                            <p className="flex items-center gap-2">
                                                                <span className="text-slate-400 font-bold">Status:</span>
                                                                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getPaymentStatusStyle(selectedOrder.payment_status)}`}>
                                                                    {paymentStatusLabels[selectedOrder.payment_status]}
                                                                </span>
                                                            </p>
                                                            {selectedOrder.transaction_id && (
                                                                <p className="flex items-center gap-1">
                                                                    <span className="text-slate-400 font-bold">Ref ID:</span> 
                                                                    <code className="bg-slate-50 px-2 py-0.5 border border-slate-200 rounded font-mono text-[10px] font-bold text-slate-700 select-all">{selectedOrder.transaction_id}</code>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Orders List View */
                                        <div className="space-y-4">
                                            {orders.length === 0 ? (
                                                <div className="card p-16 text-center bg-white border border-slate-200/60 shadow-sm rounded-3xl">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                                        <ClipboardList size={32} />
                                                    </div>
                                                    <h3 className="text-base font-bold text-slate-700 mb-1">No orders found</h3>
                                                    <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">You haven't ordered any Continuous Glucose Monitors or Smart Pens yet.</p>
                                                    <Link href="/products" className="btn-primary text-xs px-5 py-2.5">Explore Our Devices</Link>
                                                </div>
                                            ) : (
                                                orders.map((order) => {
                                                    const dateStr = new Date(order.created_at).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    });

                                                    return (
                                                        <div key={order.id} className="card p-5 md:p-6 bg-white border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-teal-300 hover:shadow-md transition-all duration-300 rounded-2xl">
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-3 flex-wrap">
                                                                    <span className="font-bold text-slate-800 text-sm font-mono bg-slate-50 border border-slate-200/30 px-2.5 py-0.5 rounded-lg">#{order.order_number}</span>
                                                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-full uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                                                                        {order.status}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                                                                    <span className="flex items-center gap-1"><Calendar size={13} /> {dateStr}</span>
                                                                    <span>•</span>
                                                                    <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                                                                    <span>•</span>
                                                                    <span className="uppercase font-extrabold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border text-[9px]">{order.payment_method}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                                                                <div className="text-left sm:text-right">
                                                                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Grand Total</div>
                                                                    <div className="text-xl font-black text-teal-700">₹{Number(order.total).toLocaleString('en-IN')}</div>
                                                                </div>
                                                                <button
                                                                    onClick={() => setSelectedOrder(order)}
                                                                    className="inline-flex items-center gap-1 text-xs font-extrabold text-teal-750 hover:text-teal-850 hover:underline transition"
                                                                >
                                                                    View Details <Eye size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Support Tickets View */}
                            {activeTab === 'tickets' && (
                                <div className="space-y-6 animate-fade-in">
                                    {activeTicket ? (
                                        /* Ticket Details & Chat Conversation */
                                        <div className="card p-6 md:p-8 bg-white border border-slate-200/60 shadow-lg rounded-3xl space-y-6">
                                            {/* Header */}
                                            <div className="flex items-center justify-between border-b pb-4 border-slate-100 flex-wrap gap-3">
                                                <button
                                                    onClick={() => setSelectedTicket(null)}
                                                    className="inline-flex items-center text-xs font-extrabold text-slate-500 hover:text-teal-700 transition"
                                                >
                                                    <ArrowLeft size={16} className="mr-1.5" /> Back to Tickets
                                                </button>
                                                <span className="font-bold text-slate-800 text-sm font-mono">Ticket: #TKT-{activeTicket.id}</span>
                                            </div>

                                            {/* Ticket Info Card */}
                                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-slate-800 text-base">{activeTicket.subject}</h3>
                                                    <p className="text-xs text-slate-400">Opened on {new Date(activeTicket.created_at).toLocaleString('en-IN')}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${
                                                        activeTicket.status === 'open' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                        activeTicket.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                        activeTicket.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                        'bg-slate-50 text-slate-500 border-slate-150'
                                                    }`}>
                                                        {activeTicket.status.replace('_', ' ')}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Attached Document/Image preview */}
                                            {activeTicket.image_path && (
                                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Attached Issue Image</span>
                                                    <a href={activeTicket.image_path} target="_blank" rel="noopener noreferrer" className="inline-block group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-1 hover:shadow-md transition">
                                                        <img src={activeTicket.image_path} alt="Support attachment" className="max-h-48 rounded-lg object-contain" />
                                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-1.5">
                                                            <Eye size={16} /> View Full Image
                                                        </div>
                                                    </a>
                                                </div>
                                            )}

                                            {/* Message bubbles thread */}
                                            <div className="space-y-4 pt-4 border-t border-slate-100 max-h-[450px] overflow-y-auto pr-2">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Conversation History</h4>
                                                
                                                {activeTicket.messages?.map((msg) => {
                                                    const isAdminMsg = msg.user?.role === 'admin';
                                                    const isMe = !isAdminMsg && (msg.user_id === auth.user.id);
                                                    const senderName = isAdminMsg ? 'Support Team' : (isMe ? 'You' : msg.user?.name || 'User');
                                                    
                                                    return (
                                                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                                            <div className="flex items-center gap-1.5 mb-1 px-1">
                                                                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">{senderName}</span>
                                                                <span className="text-[9px] text-slate-400">• {new Date(msg.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                                                            </div>
                                                            <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                                                                isMe 
                                                                    ? 'bg-teal-700 text-white rounded-tr-none shadow-md shadow-teal-700/5' 
                                                                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50'
                                                            }`}>
                                                                <p className="whitespace-pre-line">{msg.message}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Reply form */}
                                            <form onSubmit={(e) => e.preventDefault()} className="space-y-3 pt-6 border-t border-slate-100">
                                                {activeTicket.status === 'closed' && (
                                                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-xs font-medium">
                                                        ⚠️ Note: This ticket is currently closed. Sending a reply will automatically reopen it.
                                                    </div>
                                                )}
                                                <div className="space-y-1">
                                                    <label htmlFor="reply_message" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Send a Response</label>
                                                    <textarea
                                                        id="reply_message"
                                                        rows="3"
                                                        value={replyMessage}
                                                        onChange={(e) => setReplyMessage(e.target.value)}
                                                        placeholder="Type your follow-up concern here..."
                                                        className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-sm placeholder:text-slate-400"
                                                        required
                                                    />
                                                    {replyError && (
                                                        <p className="text-xs font-medium text-red-655 mt-1">{replyError}</p>
                                                    )}
                                                </div>
                                                <div className="flex justify-start">
                                                    <button
                                                        type="button"
                                                        onClick={submitReply}
                                                        className={`btn-primary py-2 px-5 font-semibold text-xs inline-flex items-center gap-1.5 relative z-30 transition ${
                                                            (!replyMessage.trim() || replying) 
                                                                ? 'opacity-50 cursor-not-allowed' 
                                                                : 'cursor-pointer hover:shadow-xl'
                                                        }`}
                                                    >
                                                        {replying ? 'Sending...' : 'Send Message'} <Send size={12} />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        /* Ticket List View */
                                        <div className="space-y-4">
                                            {tickets.length === 0 ? (
                                                <div className="card p-16 text-center bg-white border border-slate-200/60 shadow-sm rounded-3xl">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                                        <MessageSquare size={32} />
                                                    </div>
                                                    <h3 className="text-base font-bold text-slate-700 mb-1">No support tickets</h3>
                                                    <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">Have questions or issues? Open a support ticket using the widget at the bottom right of the page.</p>
                                                </div>
                                            ) : (
                                                tickets.map((ticket) => {
                                                    const dateStr = new Date(ticket.created_at).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    });

                                                    return (
                                                        <div 
                                                            key={ticket.id} 
                                                            onClick={() => setSelectedTicket(ticket)}
                                                            className="card p-5 md:p-6 bg-white border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-teal-300 hover:shadow-md transition-all duration-300 rounded-2xl cursor-pointer group"
                                                        >
                                                            <div className="space-y-2 flex-1 min-w-0">
                                                                <div className="flex items-center gap-3 flex-wrap">
                                                                    <span className="font-bold text-slate-800 text-sm font-mono bg-slate-50 border border-slate-200/30 px-2.5 py-0.5 rounded-lg">#TKT-{ticket.id}</span>
                                                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-full uppercase tracking-wider ${
                                                                        ticket.status === 'open' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                                        ticket.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                                        ticket.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                                        'bg-slate-50 text-slate-500 border-slate-150'
                                                                    }`}>
                                                                        {ticket.status.replace('_', ' ')}
                                                                    </span>
                                                                </div>
                                                                <h4 className="font-bold text-slate-800 text-sm truncate">{ticket.subject}</h4>
                                                                <p className="text-xs text-slate-500 line-clamp-1">{ticket.description}</p>
                                                                <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                                                                    <span className="flex items-center gap-1"><Calendar size={13} /> Created: {dateStr}</span>
                                                                    <span>•</span>
                                                                    <span>{ticket.messages?.length || 0} messages</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100 flex-shrink-0">
                                                                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-teal-700 group-hover:text-teal-900 group-hover:underline transition">
                                                                    Open Chat <Eye size={14} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
