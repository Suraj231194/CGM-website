import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    MessageSquare, 
    Calendar, 
    User, 
    Eye, 
    Search,
    Filter,
    Clock
} from 'lucide-react';

export default function Index({ tickets = [] }) {
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Unique statuses and their counts
    const counts = {
        all: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        in_progress: tickets.filter(t => t.status === 'in_progress').length,
        resolved: tickets.filter(t => t.status === 'resolved').length,
        closed: tickets.filter(t => t.status === 'closed').length,
    };

    // Filter tickets
    const filteredTickets = tickets.filter(ticket => {
        const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
        
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            ticket.subject.toLowerCase().includes(searchLower) ||
            (ticket.user?.name || '').toLowerCase().includes(searchLower) ||
            (ticket.user?.email || '').toLowerCase().includes(searchLower) ||
            `#tkt-${ticket.id}`.includes(searchLower);

        return matchesStatus && matchesSearch;
    });

    const getStatusStyle = (status) => {
        const styles = {
            open: 'bg-amber-50 text-amber-700 border-amber-200',
            in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
            resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            closed: 'bg-slate-50/60 text-slate-600 border-slate-200',
        };
        return styles[status] || 'bg-slate-50 text-slate-700 border-slate-200';
    };

    return (
        <AdminLayout>
            <Head title="Support Tickets Console" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-800">Support Inquiries</h1>
                        <p className="text-slate-500 text-xs font-semibold mt-0.5">Manage and respond to patient concerns and technical issues.</p>
                    </div>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1 border-b border-slate-200 flex-wrap">
                    {Object.keys(counts).map((status) => {
                        const label = status.replace('_', ' ');
                        const isActive = statusFilter === status;
                        return (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                                    isActive 
                                        ? 'border-teal-700 text-teal-800' 
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                <span>{label}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                    isActive ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {counts[status]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Filters Grid */}
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                    <div className="relative w-full sm:max-w-xs flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by ID, subject, patient..."
                            className="w-full pl-10 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-xs placeholder:text-slate-400 py-2.5"
                        />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold ml-auto flex-shrink-0">
                        <Filter size={14} /> Showing {filteredTickets.length} of {tickets.length} tickets
                    </div>
                </div>

                {/* Tickets Listing */}
                {filteredTickets.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200/60 p-16 text-center shadow-sm">
                        <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <MessageSquare size={26} />
                        </div>
                        <h3 className="text-base font-bold text-slate-700 mb-1">No support tickets found</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">No tickets match the search query or selected status filter.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                                        <th className="px-6 py-4">Ticket ID</th>
                                        <th className="px-6 py-4">Patient Details</th>
                                        <th className="px-6 py-4">Subject</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Last Activity</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                    {filteredTickets.map((ticket) => {
                                        const createdDate = new Date(ticket.created_at).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        });
                                        const updatedDate = new Date(ticket.updated_at).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        });

                                        return (
                                            <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="px-6 py-4 font-mono font-bold text-slate-800">
                                                    #TKT-{ticket.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-0.5">
                                                        <p className="font-bold text-slate-800">{ticket.user?.name || 'Unknown User'}</p>
                                                        <p className="text-slate-400 text-[10px] font-semibold">{ticket.user?.email || 'N/A'}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 max-w-xs">
                                                    <div className="space-y-0.5">
                                                        <p className="font-bold text-slate-800 truncate">{ticket.subject}</p>
                                                        <p className="text-slate-400 text-[10px] truncate max-w-[250px]">{ticket.description}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(ticket.status)}`}>
                                                        {ticket.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 text-[11px] font-semibold">
                                                    <span className="flex items-center gap-1"><Clock size={12} className="text-slate-400" /> {updatedDate}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={`/admin/tickets/${ticket.id}`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 text-teal-700 hover:bg-teal-50 hover:border-teal-200 rounded-lg transition font-extrabold text-[10px] uppercase tracking-wider"
                                                    >
                                                        View Details <Eye size={12} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
