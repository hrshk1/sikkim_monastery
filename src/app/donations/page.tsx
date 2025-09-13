"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, BookOpen, Handshake } from "lucide-react";

export default function DonationsPage() {
  const donationOptions = [
    { 
      
      label: "Monastery Maintenance", 
      description: "Contribute to the upkeep of the monastery's buildings and grounds.", 
      icon: DollarSign,
      image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mon2.jpg" // Image for maintenance
    },
    { 
     
      label: "Preserving Manuscripts", 
      description: "Help digitize and preserve ancient texts and manuscripts for future generations.", 
      icon: BookOpen,
      image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s8.jpeg" // Image for manuscripts
    },
    { 
     
      label: "Community Outreach", 
      description: "Support local community programs and educational initiatives.", 
      icon: Handshake,
      image: "https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/s7.jpeg" // Image for community
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Support Our Heritage</CardTitle>
          <CardDescription>
            Your generous contribution helps us preserve the rich cultural and spiritual heritage of Sikkim's monasteries.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {donationOptions.map((option) => (
            <Card 
             key={option.label}
              className="relative flex flex-col items-center justify-between text-center p-6 transition-transform duration-200 hover:scale-105 overflow-hidden min-h-[250px]"
              style={{ 
                backgroundImage: `url(${option.image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
              }}
            >
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-background/70 group-hover:bg-background/80 transition-colors duration-200" />
              
              {/* Content needs to be relative to be on top of the overlay */}
              <div className="relative z-10 flex flex-col items-center text-center w-full">
                <div className="flex items-center justify-center p-4 rounded-full bg-accent text-accent-foreground mb-4">
                  <option.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2"></CardTitle>
                <CardDescription className="mb-4 font-black">{option.label}</CardDescription>
                <Button className="mt-auto w-full">Donate Now</Button>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Impact</CardTitle>
          <CardDescription>
            Learn how your donations make a difference.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-card border">
            <h3 className="font-bold text-lg mb-1">Preservation</h3>
            <p className="text-sm text-muted-foreground">
              Funds are used to maintain our digital archives, restore ancient manuscripts, and conserve murals.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <h3 className="font-bold text-lg mb-1">Education</h3>
            <p className="text-sm text-muted-foreground">
              Your support helps us fund educational programs for young monks and local community members.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <h3 className="font-bold text-lg mb-1">Community</h3>
            <p className="text-sm text-muted-foreground">
              We provide essential services and support to our local community, strengthening the bonds of our heritage.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Thank you for being a part of our journey.</p>
        </CardFooter>
      </Card>
    </div>
  );
}