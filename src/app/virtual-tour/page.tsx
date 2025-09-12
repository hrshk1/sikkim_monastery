"use client";
import Image from "next/image";
import { Info } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
          <TransformWrapper
            defaultScale={1}
            wheel={{ step: 0.1 }}
            doubleClick={{ disabled: true }}
            pinch={{ step: 5 }}
            minScale={1}
            maxScale={3}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Zoom controls */}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => zoomIn()}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded"
                  >
                    Zoom In
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded"
                  >
                    Zoom Out
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded"
                  >
                    Reset
                  </button>
                </div>

                <TransformComponent>
                  {/* Changed aspect-video to fixed height */}
                  <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mon2.jpg"
                      alt="Monastery Prayer Hall"
                      fill
                      className="object-cover"
                      data-ai-hint="sikkim monastery"
                    />
                    {/* Hotspot 1 */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          title="Main Deity Statue"
                          className="absolute rounded-full bg-background/70 backdrop-blur-sm animate-pulse hotspot-1 z-10"
                          style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
                        >
                          <Info className="h-5 w-5 text-primary" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="animate-fadeIn bg-white rounded-md shadow-md p-4" sideOffset={5}>
                        <h4 className="font-bold font-headline">Main Deity Statue</h4>
                        <p className="text-sm">This is the central statue of Guru Rinpoche, the patron saint of Sikkim.</p>
                      </PopoverContent>
                    </Popover>

                    {/* Hotspot 2 */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          title="Wall Murals"
                          className="absolute rounded-full bg-background/70 backdrop-blur-sm animate-pulse hotspot-2 z-10"
                          style={{ top: "50%", left: "15%", transform: "translate(-50%, -50%)" }}
                        >
                          <Info className="h-5 w-5 text-primary" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="animate-fadeIn bg-white rounded-md shadow-md p-4" sideOffset={5}>
                        <h4 className="font-bold font-headline">Wall Murals</h4>
                        <p className="text-sm">These intricate paintings depict the life of the Buddha and various bodhisattvas.</p>
                      </PopoverContent>
                    </Popover>

                    {/* Hotspot 3 */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          title="Butter Lamps"
                          className="absolute rounded-full bg-background/70 backdrop-blur-sm animate-pulse hotspot-3 z-10"
                          style={{ top: "75%", left: "70%", transform: "translate(-50%, -50%)" }}
                        >
                          <Info className="h-5 w-5 text-primary" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="animate-fadeIn bg-white rounded-md shadow-md p-4" sideOffset={5}>
                        <h4 className="font-bold font-headline">Butter Lamps</h4>
                        <p className="text-sm">These lamps are offered as a symbol of dispelling darkness and ignorance.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      </CardContent>
    </Card>
  );
}




