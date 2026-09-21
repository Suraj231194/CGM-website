import { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    MessageSquare, 
    Calendar, 
    User, 
    ArrowLeft, 
    Send,
    Eye,
    CheckCircle2,
    ShieldAlert,
    AlertCircle,
    Clock
} from 'lucide-react';

export default function Show({ ticket }) {
    const { auth } = usePage().props;

    // Form for reply + status change
    const replyForm = useForm({
        message: '',
        status: ticket.status,
    });

    // Form for quick status update (without reply)
    const statusForm = useForm({
        status: ticket.status,
    });

    const submitReply = (e) => {
        e.preventDefault();
        replyForm.post(`/admin/tickets/${ticket.id}/reply`, {
            preserveScroll: true,
            onSuccess: () => {
                replyForm.reset('message');
            }
        });
    };

    const handleStatusChange = (newStatus) => {
        statusForm.setData('status', newStatus);
        statusForm.patch(`/admin/tickets/${ticket.id}/status`, {
            preserveScroll: true,
        });
    };

    const getStatusStyle = (status) => {
        const styles = {
            open: 'bg-amber-50 text-amber-707 border-amber-200',
            in_progress: 'bg-blue-50 text-blue-707 border-blue-200',
            resolved: 'bg-emerald-50 text-emerald-707 border-emerald-200',
            closed: 'bg-slate-55 text-slate-500 border-slate-200',
        };
        return styles[status] || 'bg-slate-50 text-slate-705 border-slate-200';
    };

    return (
        <AdminLayout>
            <Head title={`Support Ticket #TKT-${ticket.id} — AdminPanel`} />

            <div className="p-6 space-y-6 max-w-5xl mx-auto">
                {/* Back button */}
                <div>
                    <Link
                        href="/admin/tickets"
                        className="inline-flex items-center text-xs font-extrabold text-slate-500 hover:text-teal-700 transition"
                    >
                        <ArrowLeft size={16} className="mr-1.5" /> Back to Support Desk
                    </Link>
                </div>

                {/* Main Content Layout */}
                <div className="grid md:grid-cols-12 gap-6 items-start">
                    
                    {/* Left/Main Column: Ticket & Chat Thread */}
                    <div className="md:col-span-8 space-y-6">
                        {/* Ticket Header & Issue Detail */}
                        <div className="card p-6 bg-white border border-slate-200/60 shadow-sm rounded-3xl space-y-6">
                            <div className="flex justify-between items-start gap-4 flex-wrap">
                                <div className="space-y-1">
                                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200/30 px-2 py-0.5 rounded-lg">#TKT-{ticket.id}</span>
                                    <h2 className="text-lg font-black text-slate-800 leading-tight">{ticket.subject}</h2>
                                    <p className="text-[10px] text-slate-400 font-semibold">Opened {new Date(ticket.created_at).toLocaleString('en-IN')}</p>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    {/* Direct Status Selector */}
                                    <select
                                        value={statusForm.data.status}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        disabled={statusForm.processing}
                                        className={`rounded-xl border-slate-200 text-xs font-bold uppercase tracking-wider py-1.5 focus:border-teal-500 focus:ring-teal-500 ${
                                            statusForm.data.status === 'open' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            statusForm.data.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            statusForm.data.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            'bg-slate-50 text-slate-500 border-slate-150'
                                        }`}
                                    >
                                        <option value="open">Open</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            {/* Attached Image preview if any */}
                            {ticket.image_path && (
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Issue Attachment</span>
                                    <a 
                                        href={ticket.image_path} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-block group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-1 hover:shadow-md transition"
                                    >
                                        <img src={ticket.image_path} alt="Ticket issue attachment" className="max-h-60 rounded-lg object-contain" />
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-1.5">
                                            <Eye size={16} /> Open Full Attachment
                                        </div>
                                    </a>
                                </div>
                            )}

                            {/* Chat bubble messages */}
                            <div className="space-y-4 pt-6 border-t border-slate-100 max-h-[480px] overflow-y-auto pr-2">
                                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Conversation logs</h4>
                                
                                {ticket.messages?.map((msg) => {
                                    const isMe = msg.user_id === auth.user.id;
                                    const senderName = isMe ? 'You (Support)' : (msg.user?.name || 'Patient');
                                    
                                    return (
                                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                            <div className="flex items-center gap-1.5 mb-1 px-1">
                                                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">{senderName}</span>
                                                <span className="text-[9px] text-slate-400">• {new Date(msg.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                                                isMe 
                                                    ? 'bg-teal-700 text-white rounded-tr-none shadow-sm' 
                                                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50'
                                            }`}>
                                                <p className="whitespace-pre-line">{msg.message}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Reply Form */}
                            <form onSubmit={submitReply} className="space-y-4 pt-6 border-t border-slate-100">
                                <div className="space-y-1.5">
                                    <label htmlFor="reply_message" className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Type Your Response</label>
                                    <textarea
                                        id="reply_message"
                                        rows="4"
                                        value={replyForm.data.message}
                                        onChange={(e) => replyForm.setData('message', e.target.value)}
                                        placeholder="Address the patient's concern here..."
                                        className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-xs py-2.5 placeholder:text-slate-400"
                                        required
                                    />
                                    {replyForm.errors.message && (
                                        <p className="text-xs font-semibold text-red-655 mt-1">{replyForm.errors.message}</p>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                                    {/* Select status on response */}
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <span className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider whitespace-nowrap">Next Status:</span>
                                        <select
                                            value={replyForm.data.status}
                                            onChange={(e) => replyForm.setData('status', e.target.value)}
                                            className="rounded-xl border-slate-200 text-xs font-bold py-1.5 focus:border-teal-500 focus:ring-teal-500 text-slate-700 bg-slate-50"
                                        >
                                            <option value="open">Open</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={replyForm.processing || !replyForm.data.message.trim()}
                                        className="w-full sm:w-auto btn-primary py-2 px-5 font-semibold text-xs inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
                                    >
                                        {replyForm.processing ? 'Sending...' : 'Send Reply & Update'} <Send size={12} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: User Info Sidebar */}
                    <div className="md:col-span-4 space-y-6">
                        <div className="card p-6 bg-white border border-slate-200/60 shadow-sm rounded-3xl space-y-4">
                            <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b pb-3 border-slate-100">
                                <User size={15} className="text-teal-700" /> Patient Profile
                            </h3>
                            
                            <div className="space-y-3.5 text-xs">
                                <div>
                                    <span className="text-slate-400 font-bold block">Full Name</span>
                                    <span className="text-slate-800 font-extrabold text-sm">{ticket.user?.name || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 font-bold block">Secure Email</span>
                                    <span className="text-slate-700 font-semibold select-all">{ticket.user?.email || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 font-bold block">Account Status</span>
                                    <span className="text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                                        <CheckCircle2 size={13} /> Active Account
                                    </span>
                                </div>
                                <div className="pt-2 border-t border-slate-100">
                                    <span className="text-slate-400 font-bold block mb-1">Customer Verification</span>
                                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150 flex items-center gap-2">
                                        <Clock size={14} className="text-slate-500" />
                                        <div className="text-[10px] leading-tight text-slate-600">
                                            User ID: <span className="font-mono font-bold">#{ticket.user_id}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
