import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';
import Discord from 'next-auth/providers/discord';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    MicrosoftEntraID({
      // Tenant ID is optional in this app; default to 'common'.
      tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID ?? 'common',
    } as any),
    Discord,
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'kennethmaberi@gmail.com' &&
          credentials?.password === '20maberi22'
        ) {
          return {
            id: '1',
            email: 'kennethmaberi@gmail.com',
            name: 'Kenneth Maberi',
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
