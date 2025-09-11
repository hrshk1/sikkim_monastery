import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const artifacts = [
  {
    title: "Phurba Dagger",
    description: "A ritual dagger used in Vajrayana Buddhist ceremonies to subdue demonic forces and clear spiritual obstacles.",
    image: "https://picsum.photos/seed/phurba/800/600",
    hint: "phurba dagger",
  },
  {
    title: "Singing Bowl",
    description: "A metal bowl that produces a rich, resonant sound when played, used for meditation and healing.",
    image: "https://picsum.photos/seed/bowl/800/600",
    hint: "singing bowl",
  },
  {
    title: "Thangka Painting",
    description: "A Tibetan Buddhist painting on cotton or silk, typically depicting a deity, scene, or mandala.",
    image: "https://picsum.photos/seed/thangka/800/600",
    hint: "thangka painting",
  },
  {
    title: "Vajra Dorje",
    description: "A symbolic thunderbolt and diamond, representing firmness of spirit and spiritual power.",
    image: "https://picsum.photos/seed/vajra/800/600",
    hint: "vajra dorje",
  },
  {
    title: "Prayer Wheel",
    description: "A cylindrical wheel on a spindle, containing mantras. Spinning it is believed to have the same merit as reciting the mantra.",
    image: "https://picsum.photos/seed/prayerwheel/800/600",
    hint: "prayer wheel",
  },
  {
    title: "Ghanta (Bell)",
    description: "A ritual bell representing wisdom, often used in conjunction with the vajra (thunderbolt).",
    image: "https://picsum.photos/seed/ghanta/800/600",
    hint: "ghanta bell",
  },
];

export default function ArtifactsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {artifacts.map((artifact) => (
        <Card key={artifact.title} className="overflow-hidden">
          <CardHeader className="p-0">
            <Image
              src={artifact.image}
              alt={artifact.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
              data-ai-hint={artifact.hint}
            />
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="font-headline text-xl mb-2">{artifact.title}</CardTitle>
            <CardDescription>{artifact.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
