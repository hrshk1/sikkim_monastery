"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link"; // Import Link for navigation

// A plain JavaScript function to create the tooltip for Pannellum hotspots
// This function is not used in this version but is left for context
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

  hotSpotDiv.addEventListener("click", () => {
    alert(args.text);
  });
}

// Your tour locations data with all six entries and proper syntax
const tourLocations = [
  {
    id: 1,
    title: "Rumtek Monastery",
    description: "Known for its Golden Stupa, it is the largest monastery in Sikkim",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mona1.jpg",
    hotspots: [], // No longer needed for this approach
  },
  {
    id: 2,
    title: "Pemayangtse Monastery",
    description: "One of the oldest and most important monasteries, it offers stunning views of Mount Kanchenjunga.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mona2.jpg",
    hotspots: [], // No longer needed for this approach
  },
  {
    id: 3,
    title: "Tashiding Monastery",
    description: "This monastery is considered the most sacred, with legends of a 'Holy Water Vase' that purifies sins.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mona%203.jpg",
    hotspots: [],
  },
  {
    id: 4,
    title: "Enchey Monastery",
    description: "An important center of the Nyingma order, its name means 'solitary temple.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mona%204.jpg",
    hotspots: [],
  },
  {
    id: 5,
    title: "Phodong Monastery",
    description: "One of the six major monasteries, it houses beautiful murals and ancient artifacts.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mona%205.jpg",
    hotspots: [],
  },
  {
    id: 6,
    title: "Rinchenpong Monastery",
    description: "Known for its unique Buddhist mural, 'The Drukpa Kagyu', it is set against a backdrop of breathtaking scenery.",
    image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mona%206.jpg",
    hotspots: [],
  },
];

export default function VirtualTourPage() {
  // The useState and the if(selectedTour) block are removed entirely
  // as the page now handles full navigation instead of state changes.

  return (
    <div className="flex min-h-screen w-full flex-col bg-stone-100">
      <div className="p-4 md:p-8 text-center">
        <h1 className="font-headline text-3xl font-bold">Monastery Virtual Tour</h1>
        <p className="text-muted-foreground mt-2 text-base">
          Select an area below to start your 360-degree virtual tour.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8">
        {tourLocations.map((location) => (
          // The href now correctly links to each specific HTML file
          <a
            key={location.id}
            href={`/viewer${location.id}.html`}
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.03]"
          >
            <div className="relative w-full aspect-square min-h-[250px]">
              <Image
                src={location.image}
                alt={location.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-white text-xl font-bold">{location.title}</span>
                <p className="mt-1 text-sm text-gray-300 text-center">{location.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}