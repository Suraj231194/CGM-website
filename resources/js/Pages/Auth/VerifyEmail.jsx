import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email verification" />

            <h1 className="text-center font-display text-3xl font-normal text-ink-950">Verify your email</h1>

            <p className="mb-6 mt-2 text-center text-sm text-ink-500">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </p>

            {status === 'verification-link-sent' && (
                <div role="status" className="mb-6 rounded-2xl bg-brand-50 p-4 text-sm font-medium text-brand-800">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <PrimaryButton className="w-full whitespace-normal text-center sm:w-auto" disabled={processing}>
                        Resend verification email
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="self-center text-sm font-medium text-ink-600 underline underline-offset-4 hover:text-brand-700 sm:self-auto"
                    >
                        Log out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
