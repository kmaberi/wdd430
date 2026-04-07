'use client';

import { lusitana } from '@/app/ui/fonts';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { signUpWithEmail } from '@/app/lib/auth-actions';

export default function SignUpForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        signUpWithEmail,
        undefined,
    );

    return (
        <form action={formAction} className="space-y-5">
            <div className="rounded-lg bg-gray-50 p-6 text-center">
                <p className={`${lusitana.className} mb-3 text-lg font-semibold text-slate-900`}>
                    Sign up for an account
                </p>
                <p className="text-sm text-gray-500">
                    Use email and password or continue with GitHub.
                </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div>
                    <label className="mb-3 block text-xs font-medium text-gray-900" htmlFor="name">
                        Full name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="block w-full rounded-md border border-gray-200 px-3 py-3 text-sm outline-2 outline-blue-500 focus:border-blue-500"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mt-4">
                    <label className="mb-3 block text-xs font-medium text-gray-900" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded-md border border-gray-200 px-3 py-3 text-sm outline-2 outline-blue-500 focus:border-blue-500"
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="mt-4">
                    <label className="mb-3 block text-xs font-medium text-gray-900" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        className="block w-full rounded-md border border-gray-200 px-3 py-3 text-sm outline-2 outline-blue-500 focus:border-blue-500"
                        placeholder="Enter a password"
                    />
                </div>

                <Button type="submit" className="mt-6 w-full" aria-disabled={isPending}>
                    Create account
                </Button>

                {errorMessage && (
                    <div className="mt-4 flex items-start gap-2 text-sm text-red-600">
                        <ExclamationCircleIcon className="mt-0.5 h-5 w-5" />
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="h-px flex-1 bg-slate-200" />
                <span>or</span>
                <span className="h-px flex-1 bg-slate-200" />
            </div>

            <a
                href="/api/auth/signin/github"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
                Continue with GitHub
            </a>
        </form>
    );
}
