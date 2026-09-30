import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit3, Trash2, ShieldAlert, BadgeCheck } from 'lucide-react';

export default function Index({ products }) {
    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Products" />

            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">Products Catalog</h1>
                    <p className="text-slate-500 text-sm mt-1">Add, update, or remove medical health devices from database records.</p>
                </div>
                <Link href="/admin/products/create" className="btn-primary inline-flex items-center gap-1.5 self-start sm:self-auto">
                    <Plus size={16} /> Add Product
                </Link>
            </div>

            <div className="card overflow-hidden border border-slate-200">
                {products.length === 0 ? (
                    <div className="p-16 text-center text-slate-400">
                        No products configured. Click "Add Product" to populate items.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="py-3.5 px-6">Image</th>
                                    <th className="py-3.5 px-6">Device Name</th>
                                    <th className="py-3.5 px-6">Base Price</th>
                                    <th className="py-3.5 px-6">Sale Price</th>
                                    <th className="py-3.5 px-6 text-center">Stock</th>
                                    <th className="py-3.5 px-6 text-center">Status</th>
                                    <th className="py-3.5 px-6 text-center">Display Order</th>
                                    <th className="py-3.5 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/50">
                                        <td className="py-4 px-6">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center border p-1">
                                                {product.image_url ? (
                                                    <img src={product.image_url} alt={product.name} className="max-h-full max-w-full object-contain" />
                                                ) : (
                                                    <span className="font-bold text-teal-600 text-sm">{product.name[0]}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-800">{product.name}</div>
                                            <div className="text-xs text-slate-400 font-mono mt-0.5">{product.slug}</div>
                                        </td>
                                        <td className="py-4 px-6 font-semibold text-slate-800">
                                            ₹{Number(product.price).toLocaleString('en-IN')}
                                        </td>
                                        <td className="py-4 px-6 font-semibold text-teal-700">
                                            {product.sale_price && product.sale_price > 0 ? (
                                                `₹${Number(product.sale_price).toLocaleString('en-IN')}`
                                            ) : (
                                                <span className="text-slate-300 font-normal">-</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className={`font-semibold px-2 py-0.5 rounded-md text-xs ${product.stock > 5 ? 'text-green-700 bg-green-50' : product.stock > 0 ? 'text-orange-700 bg-orange-50' : 'text-red-700 bg-red-50'}`}>
                                                {product.stock} units
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${product.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                                {product.status === 'active' ? (
                                                    <>
                                                        <BadgeCheck size={12} /> Active
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldAlert size={12} /> Inactive
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center font-medium font-mono text-slate-500">
                                            {product.display_order}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition"
                                                    title="Edit Product"
                                                >
                                                    <Edit3 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
