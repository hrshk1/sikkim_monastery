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
    description: "A foundational Mahayana scripture on the 'Perfection of Wisdom,' a key text found in Sikkim's monastic libraries.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s1.jpeg",
    tags: ["Mahayana", "Sutra", "Wisdom"],
    hint: "ancient buddhist text",
    wikiUrl: "https://en.wikipedia.org/wiki/Prajnaparamita",
  },
  {
    title: "The Life of Milarepa",
    description: "The biography of the famous Tibetan yogi Milarepa, detailing his path to enlightenment. Highly revered in the Kagyu lineage of Sikkim.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s2.jpeg",
    tags: ["Biography", "Yogi", "Poetry"],
    hint: "tibetan buddhist manuscript",
    wikiUrl: "https://en.wikipedia.org/wiki/Milarepa",
  },
  {
    title: "Bardo Thödol",
    description: "Known as 'The Tibetan Book of the Dead,' this sacred text is a guide for the consciousness after death, a central practice in Nyingma Buddhism in Sikkim.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s3.jpeg",
    tags: ["Vajrayana", "Afterlife", "Guide"],
    hint: "sacred scroll",
    wikiUrl: "https://en.wikipedia.org/wiki/Bardo_Thodol",
  },
  {
    title: "Sikkim Chronicles",
    description: "A collection of royal histories and chronicles detailing the lineage of the Namgyal dynasty and the kingdom's founding.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s4.jpeg",
    tags: ["History", "Chronicle", "Kingdom"],
    hint: "historical document",
    wikiUrl: "https://en.wikipedia.org/wiki/History_of_Sikkim",
  },
  {
    title: "Kangyur Collection",
    description: "Part of the Tibetan Buddhist canon, containing the translated words of the Buddha. The volumes are kept in the monasteries of Sikkim.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s5.jpeg",
    tags: ["Canon", "Buddha's Teachings", "Collection"],
    hint: "buddhist canon",
    wikiUrl: "https://en.wikipedia.org/wiki/Kangyur",
  },
  {
    title: "Lhatsun Chenpo's Biography",
    description: "The biography of Lhatsun Chenpo, one of the three lamas who consecrated the first king of Sikkim, a key figure in the region's spiritual history.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s6.jpeg",
    tags: ["Founders", "Biography", "Lamas"],
    hint: "spiritual history",
    wikiUrl: "https://en.wikipedia.org/wiki/Lhats%C3%BCn_Namkha_Jikm%C3%A9",
  },
  {
    title: "Dzogchen Teachings",
    description: "Texts related to the 'Great Perfection' tradition, a core practice of the Nyingma school prevalent in Sikkim's monasteries.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s7.jpeg",
    tags: ["Dzogchen", "Nyingma", "Tantra"],
    hint: "great perfection text",
    wikiUrl: "https://en.wikipedia.org/wiki/Dzogchen",
  },
  {
    title: "Lepcha Manuscripts",
    description: "A collection of ancient texts in the unique Lepcha script, detailing their history, traditions, and shamanistic practices.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s8.jpeg",
    tags: ["Lepcha", "Indigenous", "Culture"],
    hint: "lepcha script",
    wikiUrl: "https://en.wikipedia.org/wiki/Lepcha_language",
  },
];

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