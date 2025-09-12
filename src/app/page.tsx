import Link from "next/link";
import {
  BookCopy,
  Landmark,
  Sprout,
  CalendarDays,
  Camera,
  Ticket,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

const features = [
  {
    title: "Manuscripts",
    description: "Explore digitized ancient manuscripts.",
    href: "/manuscripts",
    icon: <BookCopy className="h-6 w-6" />,
  },
  {
    title: "Murals",
    description: "Discover high-resolution monastery murals.",
    href: "/murals",
    icon: <Landmark className="h-6 w-6" />,
  },
  {
    title: "Artifacts",
    description: "View a catalog of sacred artifacts.",
    href: "/artifacts",
    icon: <Sprout className="h-6 w-6" />,
  },
  {
    title: "Virtual Tour",
    description: "Take an interactive 360° tour.",
    href: "/virtual-tour",
    icon: <Camera className="h-6 w-6" />,
  },
  {
    title: "Festivals",
    description: "See upcoming events and ceremonies.",
    href: "/festivals",
    icon: <CalendarDays className="h-6 w-6" />,
  },
  {
    title: "Book a Visit",
    description: "Plan your visit to the monastery.",
    href: "/booking",
    icon: <Ticket className="h-6 w-6" />,
  },
  {
    title: "Community",
    description: "Contribute your knowledge.",
    href: "/community",
    icon: <Users className="h-6 w-6" />,
  },
  
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome to the Sikkim Archive
        </h1>
        <p className="text-muted-foreground">
          A digital gateway to the rich cultural heritage of Sikkim's monasteries.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.href}>
            <Card className="flex h-full flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">
                  {feature.title}
                </CardTitle>
                {feature.icon}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
