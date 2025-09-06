"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { summarizeContribution } from "@/ai/flows/summarize-community-contributions";

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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artifactName: "",
      contributionText: "",
      sourceQuality: [5],
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      setSummary(null);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Share Your Knowledge</CardTitle>
          <CardDescription>
            Contribute information about an artifact. High-quality submissions will be summarized by AI and added to the archive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="artifactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artifact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Singing Bowl" {...field} />
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
                    <FormLabel>Your Contribution</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share details, history, or stories about the artifact..."
                        className="min-h-[150px]"
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
                    <FormLabel>Source Quality ({field.value})</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={10}
                        step={1}
                        defaultValue={[5]}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Rate the quality of your source from 0 (hearsay) to 10 (scholarly text).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Summary
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Generated Summary</CardTitle>
          <CardDescription>
            The AI-generated summary of your contribution will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
            {isPending ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Generating...</p>
                </div>
            ) : summary ? (
                <p className="text-foreground">{summary}</p>
            ) : (
                <p className="text-muted-foreground">Submit a contribution to see the summary.</p>
            )}
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">
                This summary is generated by AI. Please review it for accuracy.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
