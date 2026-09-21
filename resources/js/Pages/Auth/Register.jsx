import { useState } from 'react';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Register() {
    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [otpFeedback, setOtpFeedback] = useState('');
    const [otpError, setOtpError] = useState('');

    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        otp: '',
    });

    const handleSendOtp = (e) => {
        e.preventDefault();
        setSendingOtp(true);
        setOtpError('');
        setOtpFeedback('');
        clearErrors();

        axios.post('/register/send-otp', {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation
        })
        .then(response => {
            setOtpSent(true);
            setSendingOtp(false);
            setOtpFeedback('Verification OTP code has been sent to your email.');
        })
        .catch(error => {
            setSendingOtp(false);
            if (error.response?.data?.errors) {
                const backendErrors = error.response.data.errors;
                Object.keys(backendErrors).forEach(key => {
                    setError(key, backendErrors[key][0]);
                });
            } else {
                setOtpError(error.response?.data?.message || 'Failed to send OTP verification email. Please try again.');
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account — BiogenixCGM" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
                <p className="text-slate-500 text-sm mt-1">Join BiogenixCGM to purchase medical health devices.</p>
            </div>

            {otpFeedback && (
                <div className="mb-4 p-3 bg-teal-50 border border-teal-100 rounded-xl text-xs font-semibold text-teal-800 flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 size={16} className="text-teal-600 flex-shrink-0" />
                    <span>{otpFeedback}</span>
                </div>
            )}

            {otpError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-150 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2 animate-fade-in">
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                    <span>{otpError}</span>
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Registration Core Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            disabled={otpSent || sendingOtp}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-805 text-sm py-3 px-4 transition disabled:bg-slate-50 disabled:text-slate-400 ${errors.name ? 'border-red-300 focus:ring-red-500' : ''}`}
                            autoComplete="name"
                            required
                            placeholder="John Doe"
                        />
                        <InputError message={errors.name} className="mt-1.5" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            disabled={otpSent || sendingOtp}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-805 text-sm py-3 px-4 transition disabled:bg-slate-50 disabled:text-slate-400 ${errors.email ? 'border-red-300 focus:ring-red-500' : ''}`}
                            autoComplete="username"
                            required
                            placeholder="yourname@example.com"
                        />
                        <InputError message={errors.email} className="mt-1.5" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            disabled={otpSent || sendingOtp}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-805 text-sm py-3 px-4 transition disabled:bg-slate-50 disabled:text-slate-400 ${errors.password ? 'border-red-300 focus:ring-red-500' : ''}`}
                            autoComplete="new-password"
                            required
                            placeholder="Min 8 characters"
                        />
                        <InputError message={errors.password} className="mt-1.5" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            disabled={otpSent || sendingOtp}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-805 text-sm py-3 px-4 transition disabled:bg-slate-50 disabled:text-slate-400 ${errors.password_confirmation ? 'border-red-300 focus:ring-red-500' : ''}`}
                            autoComplete="new-password"
                            required
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} className="mt-1.5" />
                    </div>
                </div>

                {/* Send OTP Trigger */}
                {!otpSent && (
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={sendingOtp || !data.name || !data.email || !data.password || !data.password_confirmation}
                        className="btn-primary w-full text-center flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                    >
                        {sendingOtp ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Sending Verification Code...
                            </>
                        ) : (
                            <>
                                Send Verification Code <Send size={16} />
                            </>
                        )}
                    </button>
                )}

                {/* OTP Verification Box */}
                {otpSent && (
                    <div className="pt-4 border-t border-slate-100 space-y-4 animate-fade-in">
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <label className="block text-sm font-semibold text-slate-700">Enter OTP *</label>
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={sendingOtp}
                                    className="text-xs text-teal-700 hover:text-teal-800 font-bold"
                                >
                                    Resend Code
                                </button>
                            </div>
                            <input
                                id="otp"
                                type="text"
                                maxLength={6}
                                value={data.otp}
                                onChange={(e) => setData('otp', e.target.value)}
                                className={`w-full text-center tracking-widest text-lg font-bold rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-850 py-3 px-4 transition ${errors.otp ? 'border-red-300 focus:ring-red-500' : ''}`}
                                placeholder="000000"
                                required
                            />
                            <InputError message={errors.otp} className="mt-1.5" />
                        </div>

                        <button
                            type="submit"
                            disabled={processing || data.otp.length !== 6}
                            className="btn-primary w-full text-center flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" /> Registering...
                                </>
                            ) : (
                                <>
                                    Verify & Register <UserPlus size={16} />
                                </>
                            )}
                        </button>
                    </div>
                )}

                <div className="pt-4 text-center border-t border-slate-100 text-sm text-slate-500">
                    Already registered?{' '}
                    <Link href={route('login')} className="text-teal-700 font-bold hover:text-teal-800 transition">
                        Log in
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
