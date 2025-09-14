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
import { artifacts } from "@/lib/data";

export default function ArtifactsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {artifacts.map((artifact) => (
        <a key={artifact.title} href={artifact.wikiUrl} target="_blank" rel="noopener noreferrer">
          <Card className="flex flex-col h-full">
            <CardHeader className="p-0">
              <Image
                src={artifact.image}
                alt={artifact.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
                data-ai-hint={artifact.hint}
              />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{artifact.title}</CardTitle>
              <CardDescription>{artifact.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto">
              <div className="flex flex-wrap gap-2">
                {artifact.tags.map((tag) => (
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
