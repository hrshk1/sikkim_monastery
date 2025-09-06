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
    image: "https://images.unsplash.com/photo-1620589124412-43d9943c24d4?q=80&w=800&auto=format&fit=crop",
    hint: "phurba dagger",
  },
  {
    title: "Singing Bowl",
    description: "A metal bowl that produces a rich, resonant sound when played, used for meditation and healing.",
    image: "https://images.unsplash.com/photo-1542822035-36399b502476?q=80&w=800&auto=format&fit=crop",
    hint: "singing bowl",
  },
  {
    title: "Thangka Painting",
    description: "A Tibetan Buddhist painting on cotton or silk, typically depicting a deity, scene, or mandala.",
    image: "https://images.unsplash.com/photo-1572115272920-2d8883664f3d?q=80&w=800&auto=format&fit=crop",
    hint: "thangka painting",
  },
  {
    title: "Vajra Dorje",
    description: "A symbolic thunderbolt and diamond, representing firmness of spirit and spiritual power.",
    image: "https://images.unsplash.com/photo-1597743477029-921980a4c4e7?q=80&w=800&auto=format&fit=crop",
    hint: "vajra dorje",
  },
  {
    title: "Prayer Wheel",
    description: "A cylindrical wheel on a spindle, containing mantras. Spinning it is believed to have the same merit as reciting the mantra.",
    image: "https://images.unsplash.com/photo-1556816450-41584cdd3840?q=80&w=800&auto=format&fit=crop",
    hint: "prayer wheel",
  },
  {
    title: "Ghanta (Bell)",
    description: "A ritual bell representing wisdom, often used in conjunction with the vajra (thunderbolt).",
    image: "https://images.unsplash.com/photo-1617458402513-24ad0c7f23e6?q=80&w=800&auto=format&fit=crop",
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
