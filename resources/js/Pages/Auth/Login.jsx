import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LogIn } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-8 text-center">
                <h1 className="font-display text-display-xs font-normal text-ink-950 sm:text-display-sm">Welcome back</h1>
                <p className="mt-2 text-sm text-ink-500">Log in to manage your orders and device dashboard.</p>
            </div>

            {status && (
                <div role="status" className="mb-6 rounded-2xl bg-brand-50 p-4 text-sm font-medium text-brand-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="email" className="field-label">Email address</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={`field${errors.email ? ' border-red-400 focus:border-red-500 focus:ring-red-500/15' : ''}`}
                        aria-invalid={errors.email ? 'true' : undefined}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        autoComplete="username"
                        required
                        placeholder="yourname@example.com"
                    />
                    <InputError id="email-error" message={errors.email} />
                </div>

                <div>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                        <label htmlFor="password" className="field-label mb-0">Password</label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="-my-2 inline-block py-2 text-sm font-medium text-brand-700 transition hover:text-brand-800 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={`field${errors.password ? ' border-red-400 focus:border-red-500 focus:ring-red-500/15' : ''}`}
                        aria-invalid={errors.password ? 'true' : undefined}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                        autoComplete="current-password"
                        required
                    />
                    <InputError id="password-error" message={errors.password} />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer select-none items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-ink-500">
                            Remember me
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary mt-2 w-full gap-2"
                >
                    Log in <LogIn size={16} aria-hidden="true" />
                </button>

                <div className="border-t border-ink-900/[0.06] pt-5 text-center text-sm text-ink-500">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="font-semibold text-brand-700 transition hover:text-brand-800">
                        Sign up now
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
