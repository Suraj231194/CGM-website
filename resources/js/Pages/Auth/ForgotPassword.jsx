import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot password" />

            <h1 className="text-center font-display text-3xl font-normal text-ink-950">Reset your password</h1>

            <p className="mb-6 mt-2 text-center text-sm text-ink-500">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </p>

            {status && (
                <div role="status" className="mb-6 rounded-2xl bg-brand-50 p-4 text-sm font-medium text-brand-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <InputLabel htmlFor="email" value="Email address" />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1.5 block w-full"
                    autoComplete="username"
                    isFocused={true}
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError id="email-error" message={errors.email} className="mt-2" />

                <div className="mt-6">
                    <PrimaryButton className="w-full whitespace-normal text-center" disabled={processing}>
                        Email password reset link
                    </PrimaryButton>
                </div>
            </form>

            <p className="mt-6 text-center">
                <Link href={route('login')} className="link-arrow">Back to log in</Link>
            </p>
        </GuestLayout>
    );
}
