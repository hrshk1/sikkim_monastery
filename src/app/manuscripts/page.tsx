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

const manuscripts = [
  {
    title: "Prajnaparamita Sutra",
    description: "A collection of Mahayana scriptures on the 'Perfection of Wisdom,' written in ancient Tibetan script.",
    image: "https://picsum.photos/400/300?random=7",
    tags: ["Mahayana", "Sutra", "Wisdom"],
    hint: "ancient script",
  },
  {
    title: "The Life of Milarepa",
    description: "Biography of the famous Tibetan yogi and poet, Milarepa, detailing his journey from a dark past to enlightenment.",
    image: "https://picsum.photos/400/300?random=8",
    tags: ["Biography", "Yogi", "Poetry"],
    hint: "tibetan text",
  },
  {
    title: "Bardo Thödol",
    description: "Known as 'The Tibetan Book of the Dead,' this text is a guide for the consciousness after death.",
    image: "https://picsum.photos/400/300?random=9",
    tags: ["Vajrayana", "Afterlife", "Guide"],
    hint: "sacred text",
  },
  {
    title: "Kangyur Collection",
    description: "Part of the Tibetan Buddhist canon, containing the 'translated words' of the Buddha.",
    image: "https://picsum.photos/400/300?random=10",
    tags: ["Canon", "Buddha's Teachings", "Collection"],
    hint: "stacked manuscript",
  },
];

export default function ManuscriptsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {manuscripts.map((manuscript) => (
        <Card key={manuscript.title} className="flex flex-col">
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
          <CardFooter className="p-6 pt-0">
            <div className="flex flex-wrap gap-2">
              {manuscript.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
