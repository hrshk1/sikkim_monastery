"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Dynamically import Pannellum with SSR disabled
const Pannellum = dynamic(() => import("react-pannellum"), {
  ssr: false,
});

// A plain JavaScript function to create the tooltip for Pannellum hotspots
function createHotspotFunction(hotSpotDiv, args) {
  hotSpotDiv.classList.add("info-hotspot");
  var span = document.createElement("span");
  span.innerHTML = args.text;
  hotSpotDiv.appendChild(span);
  
  hotSpotDiv.style.width = "40px";
  hotSpotDiv.style.height = "40px";
  hotSpotDiv.style.borderRadius = "50%";
  hotSpotDiv.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  hotSpotDiv.style.backdropFilter = "blur(5px)";
  hotSpotDiv.style.display = "flex";
  hotSpotDiv.style.alignItems = "center";
  hotSpotDiv.style.justifyContent = "center";
  hotSpotDiv.style.cursor = "pointer";
  
  // Simple on-click logic (you can replace this with a pop-up)
  hotSpotDiv.addEventListener("click", () => {
    alert(args.text);
  });
}

// Your tour locations data with hotspots
const tourLocations = [
  {
    id: 1,
    title: "Prayer Hall",
    description: "Explore the main prayer hall.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mon360.jpg",
    hotspots: [
      {
        pitch: -1.78,
        yaw: -113.6,
        type: "info",
        text: "Main Deity Statue: This is the central statue of Guru Rinpoche.",
        createTooltipFunc: createHotspotFunction,
      },
      {
        pitch: -3.8,
        yaw: 15.1,
        type: "info",
        text: "Wall Murals: These intricate paintings depict the life of the Buddha.",
        createTooltipFunc: createHotspotFunction,
      },
    ],
  },
  {
    id: 2,
    title: "Library",
    description: "Discover the ancient manuscripts.",
    image: "https://i.imgur.com/W2q2oFm.jpg",
    hotspots: [
      {
        pitch: 10,
        yaw: 120,
        type: "info",
        text: "Ancient Texts: These are centuries-old manuscripts.",
        createTooltipFunc: createHotspotFunction,
      },
    ],
  },
  {
    id: 3,
    title: "Courtyard",
    description: "Tour the beautiful outdoor space.",
    image: "https://i.imgur.com/8Qn7p7C.jpg",
    hotspots: [],
  },
  {
    id: 4,
    title: "Monk's Quarters",
    description: "A glimpse into a monk's life.",
    image: "https://i.imgur.com/3Z5Vw8t.jpg",
    hotspots: [],
  },
  {
    id: 5,
    title: "Temple Entrance",
    description: "The grand entrance of the monastery.",
    image: "https://i.imgur.com/f7jYy3U.jpg",
    hotspots: [],
  },
];

export default function VirtualTourPage() {
  const [selectedTour, setSelectedTour] = useState(null);

  if (selectedTour) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline text-2xl">{selectedTour.title}</CardTitle>
            <CardDescription>{selectedTour.description}</CardDescription>
          </div>
          <Button onClick={() => setSelectedTour(null)} variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Pannellum
              width="100%"
              height="100%"
              image={selectedTour.image}
              pitch={10}
              yaw={180}
              autoLoad
              showControls={false}
              hotspots={selectedTour.hotspots}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Monastery Virtual Tour</CardTitle>
        <CardDescription>
          Select an area below to start your 360-degree virtual tour.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tourLocations.map((location) => (
          <div
            key={location.id}
            onClick={() => setSelectedTour(location)}
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          >
            <div className="w-full h-48 relative">
              <Image
                src={location.image}
                alt={location.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-white text-lg font-bold">{location.title}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}