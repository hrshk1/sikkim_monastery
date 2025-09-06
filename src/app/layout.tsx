import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from '@/components/layout/site-header';
import { SiteSidebar } from '@/components/layout/site-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Sikkim Archive',
  description: 'Digitise Monastery of Sikkim – A cultural preservation and archiving platform.',
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
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background")}>
        <SidebarProvider>
          <SiteSidebar />
          <SidebarInset>
            <SiteHeader />
            <main className="p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
