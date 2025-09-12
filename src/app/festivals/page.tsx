"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react"; // Import the X icon for the close button

type Event = {
  title: string;
  description: string;
  type: "Ceremony" | "Festival" | "Public Holiday";
  youtubeUrl?: string;
};

// Helper function to extract video ID from YouTube URLs
const getYouTubeVideoId = (url: string) => {
  const videoMatch = url.match(/[?&]v=([^&]+)/);
  if (videoMatch) {
    return videoMatch[1];
  }
  const shortMatch = url.match(/shorts\/(.+)/);
  if (shortMatch) {
    return shortMatch[1];
  }
  return null;
};

const events: { [key: string]: Event[] } = {
  "02-10": [
    { title: "Losar", description: "Tibetan New Year festival, a major celebration with prayers and feasts. Celebrated by the Tibetan community.", type: "Festival", youtubeUrl: "https://www.youtube.com/watch?v=RJiJ8U53P-4" },
  ],
  "05-23": [
    { title: "Saga Dawa", description: "A sacred Buddhist festival commemorating Buddha's birth, enlightenment, and nirvana. Observed with prayers and butter lamps.", type: "Ceremony", youtubeUrl: "https://www.youtube.com/watch?v=WmyZrF8SHGY" },
  ],
  "07-10": [
    { title: "Guru Rinpoche's Tsechu", description: "Birthday of Guru Padmasambhava, the patron saint of Sikkim. Celebrated with colorful masked dances.", type: "Festival", youtubeUrl: "https://www.youtube.com/watch?v=ozXypEmlH48" },
  ],
  "09-01": [
    { title: "Pang Lhabsol", description: "A festival unique to Sikkim, celebrating Mount Khangchendzonga as a guardian deity. Features the 'Pangtoed' warrior dance.", type: "Festival", youtubeUrl: "https://www.youtube.com/watch?v=vhqdjt40Us4" },
  ],
  "11-15": [
    { title: "Lhabab Duchen", description: "Observing Buddha's descent from the Trayastrimsa heaven. One of the four great anniversaries in Buddhism.", type: "Ceremony", youtubeUrl: "https://www.youtube.com/shorts/p_1u2KhoxW4" },
  ],
  "12-18": [
    { title: "Losoong (Namsoong)", description: "The Sikkimese New Year. A harvest festival celebrated by the Bhutia and Lepcha communities to mark the end of the harvest season.", type: "Festival", youtubeUrl: "https://www.youtube.com/watch?v=esGu5wCkJrI" },
  ],
  "01-14": [
    { title: "Maghe Sankranti", description: "A Nepalese festival celebrated on the first day of the month of Magh. People take holy dips in rivers and attend fairs.", type: "Festival", youtubeUrl: "https://www.youtube.com/watch?v=9ErCh_w91tU" },
  ],
  "10-20": [
    { title: "Kagyed Dance", description: "A ceremonial masked dance performed by monks to destroy evil forces and usher in a peaceful new year. Performed at monasteries.", type: "Ceremony", youtubeUrl: "https://www.youtube.com/watch?v=YrpRIXkdFyE" },
  ],
  "08-08": [
    { title: "Tendong Lho Rum Faat", description: "A Lepcha festival of thanksgiving to Mount Tendong for saving their ancestors from a great flood.", type: "Festival", youtubeUrl: "https://www.youtube.com/shorts/N5J6ae3oBCE" },
  ],
  "01-30": [
    { title: "Sonam Lochar", description: "The Tamang community's New Year celebration. Marked by traditional music and dances with the 'Damphu' drum.", type: "Festival", youtubeUrl: "https://www.youtube.com/watch?v=8yQF9NsQ0fs" },
  ],
  "10-10": [
    { title: "Tihar", description: "A five-day Nepalese festival of lights, also known as Diwali. Each day is dedicated to a different animal or deity.", type: "Festival", youtubeUrl: "https://www.youtube.com/watch?v=yQtDA6awO2U" },
  ],
  "04-15": [
    { title: "Sakewa", description: "A religious festival of the Kirat Khambu Rai community. It is a 'Bhoomi Puja' (worship of Mother Earth) to pray for a good harvest.", type: "Festival", youtubeUrl: "https://www.youtube.com/playlist?list=PLmQ-E2auUQxvxt4Z5irEDCtuFmfZ6OeXY" },
  ],
  "07-28": [
    { title: "Teej", description: "A festival for married women of the Nepali community who fast and pray for the well-being of their husbands.", type: "Festival", youtubeUrl: "https://www.youtube.com/playlist?list=PLwUmS78P9jN0F42YW6Tns8FUYXCLom7Ud" },
  ],
};

export default function FestivalsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);
  
  const selectedDayKey = date ? format(date, "MM-dd") : "";
  const selectedEvents = events[selectedDayKey] || [];
  const currentYear = visibleMonth.getFullYear();

  const eventDays = Object.keys(events).map(mmdd => {
    const [month, day] = mmdd.split('-').map(Number);
    return new Date(currentYear, month - 1, day);
  });

  return (
    // The main container is now conditional
    <div className="flex justify-center items-center p-4 min-h-screen text-card-foreground"
      style={{
        backgroundImage: playingVideoUrl ? 'none' : 'url(https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mon3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
      {playingVideoUrl ? (
        // --- Video Player View ---
        <div className="relative flex justify-center items-center w-full h-screen bg-black">
          <button 
            onClick={() => setPlayingVideoUrl(null)} 
            className="absolute top-4 right-4 z-20 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full max-w-5xl pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(playingVideoUrl)}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        // --- Calendar View (The original layout) ---
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl p-6 rounded-lg bg-background/90 backdrop-blur-sm shadow-2xl">
          <div className="flex justify-center">
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-0 flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md bg-transparent"
                  month={visibleMonth}
                  onMonthChange={setVisibleMonth}
                  showOutsideDays={false}
                  modifiers={{
                    event: eventDays,
                  }}
                  modifiersStyles={{
                    event: {
                      backgroundColor: 'hsl(var(--accent))',
                      color: 'hsl(var(--accent-foreground))',
                      borderRadius: '50%',
                      fontWeight: 'bold',
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col">
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Events on {date ? format(date, "PPP") : "..."}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedEvents.length > 0 ? (
                  selectedEvents.map((event) => (
                    <div key={event.title} className="p-4 rounded-lg border bg-card/70 backdrop-blur-sm">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg font-headline">{event.title}</h3>
                        <Badge
                          variant={event.type === 'Festival' ? 'default' : 'secondary'}
                          className="bg-accent text-accent-foreground cursor-pointer"
                          onClick={() => {
                            if (event.youtubeUrl) {
                              setPlayingVideoUrl(event.youtubeUrl);
                            }
                          }}
                        >
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No events scheduled for this day. Select a highlighted day to see events.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
