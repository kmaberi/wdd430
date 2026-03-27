import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { lusitana } from '@/app/ui/fonts';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[400px] space-y-4">
        {/* Logo header */}
        <div className="flex h-20 items-end justify-start rounded-lg bg-blue-600 p-4 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>

        {/* Email / password form */}
        <LoginForm />
      </div>
    </main>
  );
}
