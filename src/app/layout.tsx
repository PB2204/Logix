
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/shared/Header';
import Script from 'next/script';
import { LoaderProvider } from '@/context/LoaderContext';
import PageLoader from '@/components/shared/PageLoader';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Logix - AI-Powered Learning Companion',
  description: 'Your AI-Powered Learning Companion for Computer Science.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <LoaderProvider>
            <PageLoader />
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster />
          </LoaderProvider>
        </AuthProvider>
        <Script src="https://cdn.jsdelivr.net/npm/typescript@5.3.3/lib/typescript.min.js" />
      </body>
    </html>
  );
}
