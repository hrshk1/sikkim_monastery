'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

// Define the input and output schema for Zod validation
const SummarizeContributionInputSchema = z.object({
  artifactName: z.string().describe('The name of the artifact the contribution is about.'),
  contributionText: z.string().describe('The text of the community contribution.'),
  sourceQuality: z.number().min(0).max(10).describe('A score indicating the quality of the contribution source (0-10).'),
});

const SummarizeContributionOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the community contribution.'),
});

export async function summarizeContribution(input: z.infer<typeof SummarizeContributionInputSchema>): Promise<z.infer<typeof SummarizeContributionOutputSchema>> {
  
  // Explicitly check for the API key
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("Missing GOOGLE_API_KEY environment variable.");
    throw new Error("API key not configured.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Check quality threshold
  if (input.sourceQuality < 5) {
    return { summary: 'Contribution is of insufficient quality.' };
  }

  // Create a prompt with artifact name and contribution text
  const prompt = `
    You are a content manager for a digital archive of a Sikkim monastery. 
    Summarize the following contribution about the artifact named "${input.artifactName}" in a concise way: 
    "${input.contributionText}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return { summary: summary.trim() };
  } catch (error) {
    console.error("AI summarization failed:", error);
    // Return a user-friendly error message
    throw new Error("Failed to generate summary. Please check your API key and try again.");
  }
}
