import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Layout } from '@/components/Layout';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>
            <QueryProvider>{children}</QueryProvider>
          </Layout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
