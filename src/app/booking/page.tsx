"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  date: z.date({
    required_error: "A date for your visit is required.",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot.",
  }),
  visitors: z.coerce.number().min(1, "At least one visitor is required.").max(10, "Maximum of 10 visitors per booking."),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingPage() {
    const { toast } = useToast();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
        visitors: 1,
    }
  });

  function onSubmit(data: BookingFormValues) {
    toast({
      title: "Booking Submitted!",
      description: `Your visit for ${data.visitors} on ${format(data.date, 'PPP')} at ${data.timeSlot} has been requested.`,
      className: "bg-green-100 dark:bg-green-900 border-green-400",
    });
    form.reset();
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Book Your Visit</CardTitle>
        <CardDescription>
          Plan your trip to the monastery. Please select your preferred date and time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Visit</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Slot</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="09:00 - 11:00">09:00 - 11:00</SelectItem>
                      <SelectItem value="11:00 - 13:00">11:00 - 13:00</SelectItem>
                      <SelectItem value="14:00 - 16:00">14:00 - 16:00</SelectItem>
                      <SelectItem value="16:00 - 18:00">16:00 - 18:00</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="visitors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Visitors</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="number" placeholder="e.g., 2" {...field} className="pl-10"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Book Visit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
