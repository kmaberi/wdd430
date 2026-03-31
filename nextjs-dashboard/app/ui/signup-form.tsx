'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  ArrowRightIcon,
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { signUpWithEmail } from '@/app/lib/auth-actions';

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(signUpWithEmail, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-2">
        <a
          href="/api/auth/signin/google"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <span className="mr-2">Google</span>
        </a>
        <a
          href="/api/auth/signin/github"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <span className="mr-2">GitHub</span>
        </a>
      </div>

      <div className="rounded-full bg-slate-100 px-4 py-2 text-center text-sm text-slate-500">
        Or continue with email
      </div>

      <form action={dispatch} className="space-y-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-medium text-gray-900">
              Full name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                className="peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="mb-2 block text-xs font-medium text-gray-900">
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="mb-2 block text-xs font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="Create a password"
                className="peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full" aria-disabled={pending}>
            Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
          </Button>
          <p className="text-center text-sm text-gray-500">
            Sign up with email and password or choose another provider above.
          </p>
        </div>

        {errorMessage ? (
          <div className="flex items-start gap-2 text-sm text-red-500">
            <ExclamationCircleIcon className="h-5 w-5" />
            <p>{errorMessage}</p>
          </div>
        ) : null}
      </form>

      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        More providers can be added in the auth configuration, such as Microsoft, Apple, or Discord.
      </div>
    </div>
  );
}
