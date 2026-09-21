import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ContactForm from '@/Components/ContactForm';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function Contact({ products }) {
    return (
        <MainLayout>
            <Head title="Contact Us — biogenixCGM" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-teal-800 to-teal-900 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">Get In Touch</h1>
                    <p className="text-lg text-teal-100 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
                        Have questions about our products or need support? Fill out the form below and our team will respond within 24 hours.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        <div className="card p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
                            <ContactForm products={products} sourcePage="/contact" />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-5">Contact Information</h3>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone size={18} className="text-teal-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Phone</p>
                                        <p className="text-sm text-slate-500">1-800-BIOGENIXCGM-1</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail size={18} className="text-teal-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Email</p>
                                        <p className="text-sm text-slate-500">support@biogenixcgm.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin size={18} className="text-teal-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Address</p>
                                        <p className="text-sm text-slate-500">200 Innovation Drive, Suite 400<br />San Diego, CA 92121</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Clock size={18} className="text-teal-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Support Hours</p>
                                        <p className="text-sm text-slate-500">24/7 — Phone, Email & In-App Chat</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="card overflow-hidden">
                            <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin size={32} className="text-slate-400 mx-auto mb-2" />
                                    <p className="text-sm text-slate-500">San Diego, California</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
