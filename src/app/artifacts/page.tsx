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

const artifacts = [
  {
    title: "Phurba Dagger",
    description: "A ritual dagger used in Vajrayana Buddhist ceremonies to subdue demonic forces and clear spiritual obstacles.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/sp1.jpeg",
    tags: ["Ritual", "Vajrayana", "Ceremony"],
    hint: "buddhist ritual dagger",
    wikiUrl: "https://en.wikipedia.org/wiki/Phurba",
  },
  {
    title: "Singing Bowl",
    description: "A metal bowl that produces a rich, resonant sound when played, used for meditation and healing.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/sp2.jpeg",
    tags: ["Meditation", "Sound", "Healing"],
    hint: "tibetan singing bowl",
    wikiUrl: "https://en.wikipedia.org/wiki/Singing_bowl",
  },
  {
    title: "Thangka Painting",
    description: "A Tibetan Buddhist painting on cotton or silk, typically depicting a deity, scene, or mandala.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/sp3.jpeg",
    tags: ["Art", "Painting", "Mandala"],
    hint: "tibetan thangka",
    wikiUrl: "https://en.wikipedia.org/wiki/Thangka",
  },
  {
    title: "Vajra Dorje",
    description: "A symbolic thunderbolt and diamond, representing firmness of spirit and spiritual power.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/sp4.jpeg",
    tags: ["Symbol", "Power", "Vajrayana"],
    hint: "vajra",
    wikiUrl: "https://en.wikipedia.org/wiki/Vajra",
  },
  {
    title: "Prayer Wheel",
    description: "A cylindrical wheel on a spindle, containing mantras. Spinning it is believed to have the same merit as reciting the mantra.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/sp5.jpeg",
    tags: ["Ritual", "Mantra", "Prayer"],
    hint: "tibetan prayer wheel",
    wikiUrl: "https://en.wikipedia.org/wiki/Prayer_wheel",
  },
  {
    title: "Ghanta (Bell)",
    description: "A ritual bell representing wisdom, often used in conjunction with the vajra (thunderbolt).",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/sp6.jpeg",
    tags: ["Ritual", "Wisdom", "Instrument"],
    hint: "buddhist ritual bell",
    wikiUrl: "https://en.wikipedia.org/wiki/Ghanta",
  },
  {
    title: "Manjushri Statue",
    description: "A statue of the Bodhisattva Manjushri, symbolizing transcendent wisdom. Found in many of Sikkim's monasteries.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/sp7.jpeg",
    tags: ["Deity", "Statue", "Wisdom"],
    hint: "bodhisattva statue",
    wikiUrl: "https://en.wikipedia.org/wiki/Manjushri",
  },
  {
    title: "Butter Lamp",
    description: "A traditional lamp fueled by clarified butter, representing the light of wisdom and the removal of ignorance.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/sp8.jpeg",
    tags: ["Ritual", "Symbol", "Light"],
    hint: "buddhist butter lamp",
    wikiUrl: "https://en.wikipedia.org/wiki/Butter_lamp",
  },
];

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
