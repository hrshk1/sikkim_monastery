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
import { murals } from "@/lib/data";

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
