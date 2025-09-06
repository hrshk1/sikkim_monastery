"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

const pageTitles: { [key: string]: string } = {
  "/": "Dashboard",
  "/manuscripts": "Manuscripts",
  "/murals": "Murals",
  "/artifacts": "Artifacts",
  "/virtual-tour": "Virtual Tour",
  "/festivals": "Festivals & Events",
  "/booking": "Visitor Booking",
  "/community": "Community Contributions",
};

export function SiteHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Sikkim Archive";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-xl font-semibold tracking-tight font-headline">{title}</h1>
    </header>
  );
}
