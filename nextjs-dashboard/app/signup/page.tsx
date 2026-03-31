import AcmeLogo from '@/app/ui/acme-logo';
import SignUpForm from '../ui/signup-form';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';

export default function SignUpPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-[460px] space-y-4">
                <div className="flex h-20 items-end justify-start rounded-lg bg-blue-600 p-4 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <p className={`${lusitana.className} text-2xl font-semibold text-slate-900`}>
                            Create your account
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            Choose an option below to sign up with Google, GitHub, or email.
                        </p>
                    </div>

                    <SignUpForm />

                    <p className="mt-5 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Log in instead.
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
