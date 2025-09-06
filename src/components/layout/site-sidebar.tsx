"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookCopy,
  Landmark,
  Sprout,
  CalendarDays,
  Camera,
  Ticket,
  Users,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";

const menuItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/manuscripts", label: "Manuscripts", icon: BookCopy },
  { href: "/murals", label: "Murals", icon: Landmark },
  { href: "/artifacts", label: "Artifacts", icon: Sprout },
  { href: "/virtual-tour", label: "Virtual Tour", icon: Camera },
  { href: "/festivals", label: "Festivals", icon: CalendarDays },
  { href: "/booking", label: "Book a Visit", icon: Ticket },
  { href: "/community", label: "Community", icon: Users },
];

export function SiteSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Icons.DharmaWheel className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold tracking-tight font-headline">Sikkim Archive</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
