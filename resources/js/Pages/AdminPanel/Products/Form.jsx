import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Upload, Loader2 } from 'lucide-react';

export default function Form({ product }) {
    const isEdit = !!product;

    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        short_description: product?.short_description || '',
        long_description: product?.long_description || '',
        price: product?.price || '',
        sale_price: product?.sale_price || '',
        stock: product?.stock || 0,
        status: product?.status || 'active',
        display_order: product?.display_order || 0,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Standard Laravel file uploads with PUT/Inertia:
        // When sending a file with multipart/form-data, browsers don't support PUT natively.
        // We submit a POST request with the '_method' parameter set to 'PUT'.
        if (isEdit) {
            post(route('admin.products.update', product.id), {
                forceFormData: true,
                preserveScroll: true,
                // We spoof PUT method for Laravel
                queryParams: { _method: 'PUT' },
                // Inertia hook to manually append _method
                data: {
                    ...data,
                    _method: 'PUT'
                }
            });
        } else {
            post(route('admin.products.store'));
        }
    };

    return (
        <AdminLayout>
            <Head title={`${isEdit ? 'Edit' : 'Add'} Product — BiogenixCGM`} />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">{isEdit ? 'Modify Product' : 'Add New Product'}</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {isEdit ? 'Make revisions to product configurations.' : 'Register a new healthcare medical device.'}
                    </p>
                </div>
                <Link href="/admin/products" className="inline-flex items-center text-slate-500 hover:text-teal-700 transition">
                    <ArrowLeft size={16} className="mr-1.5" /> Back to Catalog
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8" encType="multipart/form-data">
                {/* Left side: Main fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6 space-y-5">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 border-slate-100">Core Details</h2>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Product Name *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition ${errors.name ? 'border-red-300 focus:ring-red-500' : ''}`}
                                placeholder="e.g. Zenith CGM"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Short Description *</label>
                            <input
                                type="text"
                                value={data.short_description}
                                onChange={(e) => setData('short_description', e.target.value)}
                                className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition ${errors.short_description ? 'border-red-300 focus:ring-red-500' : ''}`}
                                placeholder="Brief summary of device for catalogs and cards"
                                required
                            />
                            {errors.short_description && <p className="text-red-500 text-xs mt-1">{errors.short_description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Detailed Long Description</label>
                            <textarea
                                value={data.long_description}
                                onChange={(e) => setData('long_description', e.target.value)}
                                rows={6}
                                className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition"
                                placeholder="Explain key specifications, usage, device battery life, app sync configurations, safety protocols, and health data tracking..."
                            />
                            {errors.long_description && <p className="text-red-500 text-xs mt-1">{errors.long_description}</p>}
                        </div>
                    </div>

                    <div className="card p-6 space-y-5">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 border-slate-100">Pricing & Inventory</h2>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Base Price (INR) *</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    min={0}
                                    className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition ${errors.price ? 'border-red-300 focus:ring-red-500' : ''}`}
                                    placeholder="0"
                                    required
                                />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Sale Price (Optional)</label>
                                <input
                                    type="number"
                                    value={data.sale_price}
                                    onChange={(e) => setData('sale_price', e.target.value)}
                                    min={0}
                                    className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition ${errors.sale_price ? 'border-red-300 focus:ring-red-500' : ''}`}
                                    placeholder="Discounted price"
                                />
                                {errors.sale_price && <p className="text-red-500 text-xs mt-1">{errors.sale_price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Stock Level *</label>
                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) => setData('stock', parseInt(e.target.value) || 0)}
                                    min={0}
                                    className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition ${errors.stock ? 'border-red-300 focus:ring-red-500' : ''}`}
                                    placeholder="0"
                                    required
                                />
                                {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Image, Status, and Controls */}
                <div className="space-y-6">
                    {/* Status & Display Settings */}
                    <div className="card p-6 space-y-5">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 border-slate-100">Status & Priority</h2>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Product Status *</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition"
                            >
                                <option value="active">Active (Visible to users)</option>
                                <option value="inactive">Inactive (Hidden from users)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Display Priority Order *</label>
                            <input
                                type="number"
                                value={data.display_order}
                                onChange={(e) => setData('display_order', parseInt(e.target.value) || 0)}
                                min={0}
                                className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition"
                                placeholder="0"
                                required
                            />
                            <p className="text-[10px] text-slate-400 mt-1">Lower values rank higher in display precedence.</p>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="card p-6 space-y-5">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 border-slate-100">Device Image</h2>

                        {isEdit && product.image_url && !data.image && (
                            <div className="mb-4">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Current Image</span>
                                <div className="w-full h-40 bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-center">
                                    <img src={product.image_url} alt={product.name} className="max-h-full max-w-full object-contain" />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Upload New Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-teal-500 transition cursor-pointer relative group">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-teal-500 transition" />
                                    <div className="flex text-sm text-slate-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-semibold text-teal-700 hover:text-teal-800">
                                            <span>Upload a file</span>
                                            <input
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={(e) => setData('image', e.target.files[0])}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-slate-500">PNG, JPG, JPEG up to 2MB</p>
                                </div>
                            </div>
                            {data.image && (
                                <p className="text-xs text-teal-600 mt-2 font-medium">✓ Selected file: {data.image.name}</p>
                            )}
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>
                    </div>

                    {/* Action button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="btn-primary w-full text-center flex items-center justify-center gap-2"
                    >
                        {processing ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Saving...
                            </>
                        ) : (
                            <>
                                Save Product <Save size={16} />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
