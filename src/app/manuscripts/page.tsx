import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { manuscripts } from "@/lib/data";

export default function ManuscriptsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {manuscripts.map((manuscript) => (
        <a
          key={manuscript.title}
          href={manuscript.wikiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col"
        >
          <Card key={manuscript.title} className="flex flex-col h-full">
            <CardHeader className="p-0">
              <Image
                src={manuscript.image}
                alt={manuscript.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
                data-ai-hint={manuscript.hint}
              />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{manuscript.title}</CardTitle>
              <CardDescription>{manuscript.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto">
              <div className="flex flex-wrap gap-2">
                {manuscript.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  );
}
