import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Mail, MailOpen, Calendar, User, Phone, Tag, Trash } from 'lucide-react';

export default function Index({ leads }) {
    const handleMarkRead = (id) => {
        router.patch(`/admin/leads/${id}/read`, {}, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Contact Leads — BiogenixCGM" />

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800">Inbound Leads</h1>
                <p className="text-slate-500 text-sm mt-1">Review healthcare inquiry requests and customer feedback comments.</p>
            </div>

            <div className="card overflow-hidden border border-slate-200">
                {leads.data.length === 0 ? (
                    <div className="p-16 text-center text-slate-400 italic">
                        No contact leads received.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="py-3.5 px-6">Sender Details</th>
                                    <th className="py-3.5 px-6">Interest Area</th>
                                    <th className="py-3.5 px-6">Inquiry Message</th>
                                    <th className="py-3.5 px-6">Submitted Date</th>
                                    <th className="py-3.5 px-6 text-center">Status</th>
                                    <th className="py-3.5 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {leads.data.map((lead) => {
                                    const date = new Date(lead.created_at).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    });

                                    return (
                                        <tr key={lead.id} className={`hover:bg-slate-50/50 ${!lead.is_read ? 'bg-teal-50/10' : ''}`}>
                                            <td className="py-4.5 px-6">
                                                <div className="font-bold text-slate-850">{lead.name}</div>
                                                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Mail size={12} className="text-slate-400" /> {lead.email}</div>
                                                {lead.phone && (
                                                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Phone size={12} className="text-slate-400" /> {lead.phone}</div>
                                                )}
                                            </td>
                                            <td className="py-4.5 px-6">
                                                <div className="font-semibold text-slate-800 text-xs bg-slate-100 px-2 py-0.5 rounded-md inline-block uppercase tracking-wide">
                                                    {lead.role}
                                                </div>
                                                <div className="text-xs font-medium text-teal-700 mt-1 flex items-center gap-1">
                                                    <Tag size={12} /> {lead.product_interest || 'General Info'}
                                                </div>
                                            </td>
                                            <td className="py-4.5 px-6 max-w-sm">
                                                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 italic">
                                                    "{lead.message}"
                                                </p>
                                            </td>
                                            <td className="py-4.5 px-6 text-slate-500 text-xs font-semibold">
                                                <span className="flex items-center gap-1"><Calendar size={13} /> {date}</span>
                                            </td>
                                            <td className="py-4.5 px-6 text-center">
                                                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${lead.is_read ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-teal-50 text-teal-700 border-teal-100'}`}>
                                                    {lead.is_read ? (
                                                        <>
                                                            <MailOpen size={10} /> Read
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Mail size={10} className="fill-teal-700 text-teal-700" /> Unread
                                                        </>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="py-4.5 px-6 text-center">
                                                {!lead.is_read && (
                                                    <button
                                                        onClick={() => handleMarkRead(lead.id)}
                                                        className="text-xs font-bold text-teal-700 hover:text-teal-850 hover:underline"
                                                    >
                                                        Mark as Read
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {leads.links && leads.links.length > 3 && (
                <div className="flex items-center justify-between mt-6 px-4">
                    <div className="text-slate-500 text-xs font-medium">
                        Showing {leads.from} to {leads.to} of {leads.total} leads
                    </div>
                    <div className="flex gap-1.5">
                        {leads.links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.url || '#'}
                                className={`px-3 py-1.5 text-xs rounded-lg border font-semibold ${link.active ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'} ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
