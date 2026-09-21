import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { CreditCard, Save, Upload, Loader2, AlertCircle } from 'lucide-react';

export default function PaymentSettings({ settings }) {
    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        upi_id: settings?.upi_id || '',
        payment_instructions: settings?.payment_instructions || '',
        qr_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/payment-settings', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Payment Settings — BiogenixCGM" />

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800">Payment Gateways</h1>
                <p className="text-slate-500 text-sm mt-1">Configure UPI IDs, QR codes, and customer transaction payment instructions.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8" encType="multipart/form-data">
                {/* Form fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6 space-y-5">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 border-slate-100 flex items-center gap-2">
                            <CreditCard size={18} className="text-teal-700" /> UPI Settings
                        </h2>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Merchant UPI ID *</label>
                            <input
                                type="text"
                                value={data.upi_id}
                                onChange={(e) => setData('upi_id', e.target.value)}
                                className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-850 text-sm py-2.5 px-4 transition ${errors.upi_id ? 'border-red-300' : ''}`}
                                placeholder="merchant@upi"
                                required
                            />
                            {errors.upi_id && <p className="text-red-500 text-xs mt-1">{errors.upi_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Checkout Payment Instructions</label>
                            <textarea
                                value={data.payment_instructions}
                                onChange={(e) => setData('payment_instructions', e.target.value)}
                                rows={5}
                                className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-850 text-sm py-2.5 px-4 transition"
                                placeholder="Explain UPI verification steps, e.g., 'Please pay the exact grand total. Scan the QR code or transfer to UPI. Complete payment, take a note of the 12-digit transaction ID / reference number, and paste it on checkout.'"
                            />
                            {errors.payment_instructions && <p className="text-red-500 text-xs mt-1">{errors.payment_instructions}</p>}
                        </div>
                    </div>
                </div>

                {/* QR Code upload card & submit */}
                <div className="space-y-6">
                    <div className="card p-6 space-y-5">
                        <h2 className="text-lg font-bold text-slate-800 border-b pb-3 border-slate-100">UPI QR Code Image</h2>

                        {settings?.qr_code_image && !data.qr_image && (
                            <div className="mb-4">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Active QR Code</span>
                                <div className="w-full h-48 bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-center">
                                    <img src={settings.qr_code_image} alt="UPI QR Code" className="max-h-full max-w-full object-contain" />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Upload QR Scanner Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-teal-500 transition cursor-pointer relative group">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-teal-500 transition" />
                                    <div className="flex text-sm text-slate-600 justify-center">
                                        <label className="relative cursor-pointer bg-white rounded-md font-semibold text-teal-700 hover:text-teal-800">
                                            <span>Upload a file</span>
                                            <input
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={(e) => setData('qr_image', e.target.files[0])}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-slate-500">PNG, JPG, JPEG up to 2MB</p>
                                </div>
                            </div>
                            {data.qr_image && (
                                <p className="text-xs text-teal-600 mt-2 font-medium">✓ Selected file: {data.qr_image.name}</p>
                            )}
                            {errors.qr_image && <p className="text-red-500 text-xs mt-1">{errors.qr_image}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="btn-primary w-full text-center flex items-center justify-center gap-1.5"
                    >
                        {processing ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Saving...
                            </>
                        ) : (
                            <>
                                Save Settings <Save size={16} />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
