
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { PwaInstallBanner } from '@/components/pwa-install-banner';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sikkim Archive',
  description: 'Digitise Monastery of Sikkim - A cultural preservation and archiving platform.',
};

const NewSiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Sikkim Monastery Archive</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Contact
            </Link>
            <Link href="/festivals" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Festivals
            </Link>
            <Link href="/artifacts" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Artifacts
            </Link>
            <Link href="/manuscripts" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Manuscripts
            </Link>
            <Link href="/murals" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Murals
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn("font-body antialiased", "bg-gray-50 text-gray-800")}>
        <div className="flex min-h-screen flex-col">
          <NewSiteHeader />
          <PwaInstallBanner />
          <main className="flex-grow">{children}</main>
        </div>
        <Toaster />
        <script src="/register-sw.js" defer></script>
      </body>
    </html>
  );
}
