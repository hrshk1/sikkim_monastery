"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition, useEffect } from "react";
import { summarizeContribution } from "@/ai/flows/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, Sparkles, Info, BookOpen, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Import monasteries data
import { monasteries } from "@/data/monasteries";

const formSchema = z.object({
  artifactName: z.string().min(2, {
    message: "Artifact name must be at least 2 characters.",
  }),
  contributionText: z.string().min(10, {
    message: "Contribution must be at least 10 characters long.",
  }),
  sourceQuality: z.array(z.number()).min(1).max(1).transform(arr => arr[0]),
});

type FormValues = z.infer<typeof formSchema>;

export default function CommunityPage() {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const [knownDetails, setKnownDetails] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artifactName: "",
      contributionText: "",
      sourceQuality: [5],
    },
  });

  const artifactName = form.watch("artifactName");

  useEffect(() => {
    if (artifactName) {
      const monastery = monasteries.find(m => m.name.toLowerCase() === artifactName.toLowerCase());
      if (monastery) {
        setKnownDetails(`Location: ${monastery.location}\n\nDescription: ${monastery.description}\n\nHistory: ${monastery.history}`);
      } else {
        setKnownDetails(null);
      }
    } else {
      setKnownDetails(null);
    }
  }, [artifactName]);

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      setSummary(null);
      setKnownDetails(null);
      try {
        const result = await summarizeContribution(values);
        setSummary(result.summary);
      } catch (error) {
        console.error("Summarization failed:", error);
        toast({
          title: "Error",
          description: "Failed to generate summary. Please try again.",
          variant: "destructive",
        })
      }
    });
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="text-center mb-10">
        <h1 className="font-headline text-4xl font-bold mb-3">Community Contributions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Share your knowledge about cultural artifacts and help expand our collective understanding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">Share Your Knowledge</CardTitle>
                <CardDescription>
                  Contribute information about an artifact. High-quality submissions will be summarized by AI and added to the archive.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="artifactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Artifact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Singing Bowl" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contributionText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Your Contribution</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share details, history, or stories about the artifact..."
                          className="min-h-[180px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sourceQuality"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base">Source Quality</FormLabel>
                        <Badge variant="outline" className="text-sm font-medium">
                          {field.value}/10
                        </Badge>
                      </div>
                      <FormControl>
                        <div className="space-y-4">
                          <Slider
                            min={0}
                            max={10}
                            step={1}
                            defaultValue={[5]}
                            onValueChange={field.onChange}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground px-1">
                            <span>Hearsay</span>
                            <span>Scholarly</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="flex items-start gap-2 mt-3">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Rate the quality of your source from 0 (hearsay) to 10 (scholarly text).</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isPending} 
                  className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-5 w-5" />
                  )}
                  Generate Summary
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 sticky top-24">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Sparkles className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">AI-Generated Summary</CardTitle>
                <CardDescription>
                  The AI will analyze your contribution and create a concise summary.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 min-h-[300px] flex items-center justify-center">
            {isPending ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground py-8">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                <p className="text-lg font-medium">Analyzing your contribution...</p>
                <p className="text-sm text-center max-w-xs">This may take a few moments</p>
              </div>
            ) : summary ? (
              <div className="py-4">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                  <h3 className="font-semibold">Summary</h3>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="leading-relaxed text-foreground">{summary}</p>
                </div>
              </div>
            ) : knownDetails ? (
              <div className="py-4">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Known Details</h3>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="leading-relaxed text-foreground whitespace-pre-wrap">{knownDetails}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 px-4">
                <div className="bg-muted rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg mb-2">Awaiting Contribution</h3>
                <p className="text-muted-foreground">Submit information about an artifact to generate a summary.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-amber-50 rounded-b-lg">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>This summary is generated by AI. Please review it for accuracy before submitting.</p>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 font-headline">Known Monasteries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {monasteries.map((monastery, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle>{monastery.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{monastery.location}</p>
                <p className="mt-2">{monastery.description}</p>
                <p className="mt-2 text-sm">{monastery.history}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6 border">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Info className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">How It Works</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Provide accurate information about cultural artifacts</li>
              <li>Our AI analyzes your contribution and creates a concise summary</li>
              <li>High-quality contributions may be added to the permanent archive</li>
              <li>Rate your source quality to help us evaluate the information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}