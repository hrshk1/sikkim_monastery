import Image from "next/image";
import { Info } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VirtualTourPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Monastery Virtual Tour</CardTitle>
        <CardDescription>
          Explore the main prayer hall. Click on the info icons to learn more about specific areas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1547496222-0987353925a1?q=80&w=1600&auto=format&fit=crop"
            alt="Monastery Prayer Hall"
            fill
            className="object-cover"
            data-ai-hint="sikkim monastery"
          />

          {/* Hotspot 1: Main Statue */}
          <Popover>
            <PopoverTrigger asChild style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Button variant="outline" size="icon" className="absolute rounded-full bg-background/50 backdrop-blur-sm animate-pulse">
                <Info className="h-5 w-5 text-primary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <h4 className="font-bold font-headline">Main Deity Statue</h4>
              <p className="text-sm">This is the central statue of Guru Rinpoche, the patron saint of Sikkim.</p>
            </PopoverContent>
          </Popover>
          
          {/* Hotspot 2: Murals */}
          <Popover>
            <PopoverTrigger asChild style={{ top: '50%', left: '15%' }}>
              <Button variant="outline" size="icon" className="absolute rounded-full bg-background/50 backdrop-blur-sm animate-pulse">
                <Info className="h-5 w-5 text-primary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <h4 className="font-bold font-headline">Wall Murals</h4>
              <p className="text-sm">These intricate paintings depict the life of the Buddha and various bodhisattvas.</p>
            </PopoverContent>
          </Popover>

          {/* Hotspot 3: Butter Lamps */}
          <Popover>
            <PopoverTrigger asChild style={{ top: '75%', left: '70%' }}>
              <Button variant="outline" size="icon" className="absolute rounded-full bg-background/50 backdrop-blur-sm animate-pulse">
                <Info className="h-5 w-5 text-primary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <h4 className="font-bold font-headline">Butter Lamps</h4>
              <p className="text-sm">These lamps are offered as a symbol of dispelling darkness and ignorance.</p>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
