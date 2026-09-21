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
            <Head title="Log In — BiogenixCGM" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                <p className="text-slate-500 text-sm mt-1">Log in to manage your orders and device dashboard.</p>
            </div>

            {status && (
                <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-sm font-semibold text-green-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        autoComplete="username"
                        required
                        placeholder="yourname@example.com"
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-semibold text-slate-700">Password</label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-teal-700 hover:text-teal-800 hover:underline transition"
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
                        className={`w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 text-slate-800 text-sm py-3 px-4 transition ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        autoComplete="current-password"
                        required
                        placeholder="••••••••"
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer select-none">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-slate-500">
                            Remember me
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary w-full text-center flex items-center justify-center gap-2 mt-2"
                >
                    Log In <LogIn size={16} />
                </button>

                <div className="pt-4 text-center border-t border-slate-100 text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="text-teal-700 font-bold hover:text-teal-800 transition">
                        Sign up now
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
