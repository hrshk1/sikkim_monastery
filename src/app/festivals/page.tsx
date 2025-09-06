"use client";

import React, { useState } from "react";
import { format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Event = {
  title: string;
  description: string;
  type: "Ceremony" | "Festival" | "Public Holiday";
};

// Using a more robust date handling approach
const getEventDate = (month: number, day: number): Date => {
  const date = new Date();
  date.setMonth(month - 1, day);
  return date;
};

const events: { [key: string]: Event[] } = {
  [format(getEventDate(2, 10), "yyyy-MM-dd")]: [
    { title: "Losar", description: "Tibetan New Year festival, a major celebration with prayers and feasts.", type: "Festival" },
  ],
  [format(getEventDate(5, 23), "yyyy-MM-dd")]: [
    { title: "Saga Dawa", description: "Commemorating Buddha's birth, enlightenment, and nirvana.", type: "Ceremony" },
  ],
  [format(getEventDate(7, 10), "yyyy-MM-dd")]: [
    { title: "Guru Rinpoche's Tsechu", description: "Birthday of Guru Padmasambhava, marked by colorful masked dances.", type: "Festival" },
  ],
   [format(getEventDate(9, 1), "yyyy-MM-dd")]: [
    { title: "Pang Lhabsol", description: "A festival unique to Sikkim, celebrating the consecration of Mount Khangchendzonga as a guardian deity.", type: "Festival" },
  ],
  [format(getEventDate(11, 15), "yyyy-MM-dd")]: [
    { title: "Lhabab Duchen", description: "Observing Buddha's descent from the Trayastrimsa heaven.", type: "Ceremony" },
  ],
};

export default function FestivalsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const selectedDayKey = date ? format(date, "yyyy-MM-dd") : "";
  const selectedEvents = events[selectedDayKey] || [];

  const eventDays = Object.keys(events).map(dateStr => new Date(dateStr + "T00:00:00"));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-2 md:p-6 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              modifiers={{
                event: eventDays,
              }}
              modifiersStyles={{
                event: {
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))',
                  textDecoration: 'underline',
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="font-headline">
              Events on {date ? format(date, "PPP") : "..."}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <div key={event.title} className="p-4 rounded-lg border bg-card">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg font-headline">{event.title}</h3>
                    <Badge variant={event.type === 'Festival' ? 'default' : 'secondary'} className={event.type === 'Festival' ? 'bg-accent text-accent-foreground' : ''}>{event.type}</Badge>
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
  );
}
