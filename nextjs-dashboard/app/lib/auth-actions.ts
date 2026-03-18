'use server';

import { signIn } from '@/auth';

export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/dashboard' });
}

export async function signInWithGitHub() {
  await signIn('github', { redirectTo: '/dashboard' });
}

export async function signInWithMicrosoft() {
  await signIn('microsoft-entra-id', { redirectTo: '/dashboard' });
}

export async function signInWithDiscord() {
  await signIn('discord', { redirectTo: '/dashboard' });
}

export async function signInWithCredentials(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    // Handle authentication errors
    throw error;
  }
}
