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
            <Head title="Create account" />

            <div className="mb-8 text-center">
                <h1 className="font-display text-display-xs font-normal text-ink-950 sm:text-display-sm">Create account</h1>
                <p className="mt-2 text-sm text-ink-500">Join biogenixCGM to purchase medical health devices.</p>
            </div>

            {otpFeedback && (
                <div role="status" className="mb-6 flex animate-fade-in items-center gap-2 rounded-2xl bg-brand-50 p-4 text-sm font-medium text-brand-800">
                    <CheckCircle2 size={16} className="shrink-0 text-brand-600" aria-hidden="true" />
                    <span>{otpFeedback}</span>
                </div>
            )}

            {otpError && (
                <div role="alert" className="mb-6 flex animate-fade-in items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                    <AlertCircle size={16} className="shrink-0 text-red-600" aria-hidden="true" />
                    <span>{otpError}</span>
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Registration Core Fields */}
                <div className="space-y-5">
                    <div>
                        <label htmlFor="name" className="field-label">Full name</label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            disabled={otpSent || sendingOtp}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`field disabled:bg-sand-50 disabled:text-ink-400${errors.name ? ' border-red-400 focus:border-red-500 focus:ring-red-500/15' : ''}`}
                            aria-invalid={errors.name ? 'true' : undefined}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            autoComplete="name"
                            required
                            placeholder="John Doe"
                        />
                        <InputError id="name-error" message={errors.name} />
                    </div>

                    <div>
                        <label htmlFor="email" className="field-label">Email address</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            disabled={otpSent || sendingOtp}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`field disabled:bg-sand-50 disabled:text-ink-400${errors.email ? ' border-red-400 focus:border-red-500 focus:ring-red-500/15' : ''}`}
                            aria-invalid={errors.email ? 'true' : undefined}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            autoComplete="username"
                            required
                            placeholder="yourname@example.com"
                        />
                        <InputError id="email-error" message={errors.email} />
                    </div>

                    <div>
                        <label htmlFor="password" className="field-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            disabled={otpSent || sendingOtp}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`field disabled:bg-sand-50 disabled:text-ink-400${errors.password ? ' border-red-400 focus:border-red-500 focus:ring-red-500/15' : ''}`}
                            aria-invalid={errors.password ? 'true' : undefined}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                            autoComplete="new-password"
                            required
                            placeholder="Min 8 characters"
                        />
                        <InputError id="password-error" message={errors.password} />
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="field-label">Confirm password</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            disabled={otpSent || sendingOtp}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className={`field disabled:bg-sand-50 disabled:text-ink-400${errors.password_confirmation ? ' border-red-400 focus:border-red-500 focus:ring-red-500/15' : ''}`}
                            aria-invalid={errors.password_confirmation ? 'true' : undefined}
                            aria-describedby={errors.password_confirmation ? 'password_confirmation-error' : undefined}
                            autoComplete="new-password"
                            required
                            placeholder="Confirm password"
                        />
                        <InputError id="password_confirmation-error" message={errors.password_confirmation} />
                    </div>
                </div>

                {/* Send OTP Trigger */}
                {!otpSent && (
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={sendingOtp || !data.name || !data.email || !data.password || !data.password_confirmation}
                        className="btn-primary mt-4 w-full gap-2 whitespace-normal text-center"
                    >
                        {sendingOtp ? (
                            <>
                                <Loader2 size={16} className="shrink-0 animate-spin" aria-hidden="true" /> Sending verification code…
                            </>
                        ) : (
                            <>
                                Send verification code <Send size={16} className="shrink-0" aria-hidden="true" />
                            </>
                        )}
                    </button>
                )}

                {/* OTP Verification Box */}
                {otpSent && (
                    <div className="animate-fade-in space-y-5 border-t border-ink-900/[0.06] pt-5">
                        <div>
                            <div className="mb-1.5 flex items-baseline justify-between gap-3">
                                <label htmlFor="otp" className="field-label mb-0">
                                    Enter OTP<span className="text-ink-400" aria-hidden="true"> *</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={sendingOtp}
                                    className="-my-2 py-2 text-sm font-semibold text-brand-700 transition hover:text-brand-800 disabled:opacity-60"
                                >
                                    Resend code
                                </button>
                            </div>
                            <input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                value={data.otp}
                                onChange={(e) => setData('otp', e.target.value)}
                                className={`field text-center indent-[0.5em] font-display text-2xl tracking-[0.5em] tabular-nums${errors.otp ? ' border-red-400 focus:border-red-500 focus:ring-red-500/15' : ''}`}
                                aria-invalid={errors.otp ? 'true' : undefined}
                                aria-describedby={errors.otp ? 'otp-error' : undefined}
                                placeholder="000000"
                                required
                            />
                            <InputError id="otp-error" message={errors.otp} />
                        </div>

                        <button
                            type="submit"
                            disabled={processing || data.otp.length !== 6}
                            className="btn-primary w-full gap-2 whitespace-normal text-center"
                        >
                            {processing ? (
                                <>
                                    <Loader2 size={16} className="shrink-0 animate-spin" aria-hidden="true" /> Registering…
                                </>
                            ) : (
                                <>
                                    Verify &amp; register <UserPlus size={16} className="shrink-0" aria-hidden="true" />
                                </>
                            )}
                        </button>
                    </div>
                )}

                <div className="border-t border-ink-900/[0.06] pt-5 text-center text-sm text-ink-500">
                    Already registered?{' '}
                    <Link href={route('login')} className="font-semibold text-brand-700 transition hover:text-brand-800">
                        Log in
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
