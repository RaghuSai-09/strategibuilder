import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Sign Up - Strategi Builder',
  description: 'Sign in to your account or create a new one to start building your strategic success',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
