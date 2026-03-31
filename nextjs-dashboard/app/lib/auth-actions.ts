'use server';

import { z } from 'zod';
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import type { User } from './definitions';

export async function signInWithCredentials(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signUpWithEmail(
  prevState: string | undefined,
  formData: FormData,
) {
  const parsed = z
    .object({
      name: z.string().min(1, 'Please enter your name.'),
      email: z.string().email('Please enter a valid email address.'),
      password: z.string().min(6, 'Password must be at least 6 characters.'),
    })
    .safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return (
      fieldErrors.name?.[0] ||
      fieldErrors.email?.[0] ||
      fieldErrors.password?.[0] ||
      'Please fix the sign-up details and try again.'
    );
  }

  const { name, email, password } = parsed.data;

  try {
    const existingUser = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    if (existingUser.rows.length > 0) {
      return 'That email is already registered. Please log in instead.';
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.error('Sign-up Error:', error);
    return 'Unable to create account. Please try again later.';
  }

  redirect('/login');
}
