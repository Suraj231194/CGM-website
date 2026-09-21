import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Truck, Plus, Trash2, Edit3, Save, X, Loader2 } from 'lucide-react';

export default function Shipping({ zones }) {
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        zone: '',
        min_pincode: '',
        max_pincode: '',
        charge: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editMode) {
            put(`/admin/shipping/${editId}`, {
                onSuccess: () => {
                    reset();
                    setEditMode(false);
                    setEditId(null);
                },
            });
        } else {
            post('/admin/shipping', {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    const handleEdit = (zoneItem) => {
        setEditMode(true);
        setEditId(zoneItem.id);
        setData({
            zone: zoneItem.zone,
            min_pincode: zoneItem.min_pincode,
            max_pincode: zoneItem.max_pincode,
            charge: zoneItem.charge,
            is_active: !!zoneItem.is_active,
        });
    };

    const handleCancelEdit = () => {
        reset();
        setEditMode(false);
        setEditId(null);
    };

    const handleDelete = (id, zoneName) => {
        if (confirm(`Are you sure you want to delete zone "${zoneName}"?`)) {
            router.delete(`/admin/shipping/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Shipping Settings — BiogenixCGM" />

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800">Shipping Configurations</h1>
                <p className="text-slate-500 text-sm mt-1">Manage pincode zones and set corresponding shipping delivery charges.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Configuration form */}
                <div className="card p-6 h-fit">
                    <h2 className="text-lg font-bold text-slate-800 border-b pb-3 mb-5 border-slate-100 flex items-center gap-2">
                        <Truck size={18} className="text-teal-700" />
                        {editMode ? 'Edit Shipping Zone' : 'Add Shipping Zone'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Zone Name *</label>
                            <input
                                type="text"
                                value={data.zone}
                                onChange={(e) => setData('zone', e.target.value)}
                                className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-850 text-sm py-2.5 px-4 transition ${errors.zone ? 'border-red-300' : ''}`}
                                placeholder="e.g. Uttar Pradesh (UP)"
                                required
                            />
                            {errors.zone && <p className="text-red-500 text-xs mt-1">{errors.zone}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Min Pincode *</label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={data.min_pincode}
                                    onChange={(e) => setData('min_pincode', e.target.value)}
                                    className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-850 text-sm py-2.5 px-4 transition ${errors.min_pincode ? 'border-red-300' : ''}`}
                                    placeholder="200000"
                                    required
                                />
                                {errors.min_pincode && <p className="text-red-500 text-xs mt-1">{errors.min_pincode}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Max Pincode *</label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={data.max_pincode}
                                    onChange={(e) => setData('max_pincode', e.target.value)}
                                    className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-850 text-sm py-2.5 px-4 transition ${errors.max_pincode ? 'border-red-300' : ''}`}
                                    placeholder="285999"
                                    required
                                />
                                {errors.max_pincode && <p className="text-red-500 text-xs mt-1">{errors.max_pincode}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Shipping Charge (INR) *</label>
                            <input
                                type="number"
                                value={data.charge}
                                onChange={(e) => setData('charge', e.target.value)}
                                min={0}
                                className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-850 text-sm py-2.5 px-4 transition ${errors.charge ? 'border-red-300' : ''}`}
                                placeholder="49"
                                required
                            />
                            {errors.charge && <p className="text-red-500 text-xs mt-1">{errors.charge}</p>}
                        </div>

                        {editMode && (
                            <div className="flex items-center gap-2 py-1">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                />
                                <label htmlFor="is_active" className="text-sm font-semibold text-slate-700 cursor-pointer select-none">
                                    Zone Status Active
                                </label>
                            </div>
                        )}

                        <div className="flex gap-2.5 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary flex-1 text-center flex items-center justify-center gap-1.5"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} /> {editMode ? 'Save Changes' : 'Create Zone'}
                                    </>
                                )}
                            </button>
                            {editMode && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition"
                                    title="Cancel Edit"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Zones listing */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-bold text-slate-800">Seeded & Configured Zones</h2>
                    <div className="card overflow-hidden border border-slate-200">
                        {zones.length === 0 ? (
                            <div className="p-12 text-center text-slate-400 italic">No zones configured. Default fallback charge ₹99 applies.</div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        <th className="py-3 px-5">Zone Name</th>
                                        <th className="py-3 px-5 text-center">Pincode Range</th>
                                        <th className="py-3 px-5 text-right">Charge</th>
                                        <th className="py-3 px-5 text-center">Status</th>
                                        <th className="py-3 px-5 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {zones.map((zoneItem) => (
                                        <tr key={zoneItem.id} className={`hover:bg-slate-50/50 ${editId === zoneItem.id ? 'bg-teal-50/10' : ''}`}>
                                            <td className="py-4 px-5 font-bold text-slate-850">{zoneItem.zone}</td>
                                            <td className="py-4 px-5 text-center font-mono text-xs text-slate-500">
                                                {zoneItem.min_pincode} – {zoneItem.max_pincode}
                                            </td>
                                            <td className="py-4 px-5 text-right font-bold text-slate-800">
                                                ₹{Number(zoneItem.charge).toLocaleString('en-IN')}
                                            </td>
                                            <td className="py-4 px-5 text-center">
                                                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${zoneItem.is_active ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                                    {zoneItem.is_active ? 'Active' : 'Disabled'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(zoneItem)}
                                                        className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition"
                                                        title="Edit Zone"
                                                    >
                                                        <Edit3 size={15} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(zoneItem.id, zoneItem.zone)}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete Zone"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
