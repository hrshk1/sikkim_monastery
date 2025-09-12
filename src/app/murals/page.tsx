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
    description: "Ralang Monastery- One of the premium monastery in Sikkim belongs to the Kagyu order of Tibetan Buddhism.Though the one we visited is a new one which is in no doubt one of the most beautiful monastery in terms of architecture, wall Paintings etc.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mon2.jpg"
      ,
    hint: "bhavacakra mural",
  },
  {
    title: "Mandala of Avalokiteshvara",
    description: "Sikkim as a land deserves extra attention for the harmonious existence of different cultures and how it all coexists in peace. Amongst other things in Sikkim that deserves special mentions are the numbers of Buddhist Monasteries present there",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mon3.jpg",
    hint: "mandala mural",
  },
  {
    title: "Life of the Buddha",
    description: "Pemayangtse Monastery is one of the most famous and beautiful structures in the state of Sikkim, situated near a small town of Pelling,",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mon4.jpg",
    hint: "buddha mural",
  },
  {
    title: "Guru Padmasambhava",
    description: "A mural dedicated to the 'Second Buddha,' who is credited with bringing Buddhism to Tibet and Sikkim.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/monasteryjpgfinal.jpg",
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
