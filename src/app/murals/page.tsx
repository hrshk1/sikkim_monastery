import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const murals = [
  {
    title: "Wheel of Life (Bhavacakra)",
    description: "A symbolic representation of samsara, the endless cycle of birth, death, and rebirth. It is held by Yama, the lord of death.",
    image: "https://images.unsplash.com/photo-1579211938-1647f359c5d1?q=80&w=800&auto=format&fit=crop",
    hint: "bhavacakra mural",
  },
  {
    title: "Mandala of Avalokiteshvara",
    description: "A geometric configuration of symbols representing the celestial palace of Avalokiteshvara, the bodhisattva of compassion.",
    image: "https://images.unsplash.com/photo-1598224538806-0d94a1103f6f?q=80&w=800&auto=format&fit=crop",
    hint: "mandala mural",
  },
  {
    title: "Life of the Buddha",
    description: "A series of narrative panels depicting key events from the life of Siddhartha Gautama, from his birth to his parinirvana.",
    image: "https://images.unsplash.com/photo-1599471391062-864fe3a4f655?q=80&w=800&auto=format&fit=crop",
    hint: "buddha mural",
  },
  {
    title: "Guru Padmasambhava",
    description: "A mural dedicated to the 'Second Buddha,' who is credited with bringing Buddhism to Tibet and Sikkim.",
    image: "https://images.unsplash.com/photo-1601007797747-9bad95d54044?q=80&w=800&auto=format&fit=crop",
    hint: "padmasambhava mural",
  },
];

export default function MuralsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {murals.map((mural) => (
        <Dialog key={mural.title}>
          <DialogTrigger asChild>
            <Card className="overflow-hidden cursor-pointer transition-shadow hover:shadow-xl">
              <CardHeader className="p-0">
                <Image
                  src={mural.image}
                  alt={mural.title}
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover"
                  data-ai-hint={mural.hint}
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-xl mb-2">{mural.title}</CardTitle>
                <CardDescription>{mural.description}</CardDescription>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="font-headline text-2xl">{mural.title}</DialogTitle>
              <DialogDescription>{mural.description}</DialogDescription>
            </DialogHeader>
            <div className="p-6 pt-2">
              <Image
                src={mural.image}
                alt={mural.title}
                width={1200}
                height={900}
                className="w-full h-auto rounded-md object-contain"
                data-ai-hint={mural.hint}
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
