"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

// -----------------------------
// Zod Schemas
// -----------------------------
const SummarizeContributionInputSchema = z.object({
  artifactName: z.string().describe("The name of the artifact the contribution is about."),
  contributionText: z.string().describe("The text of the community contribution."),
  sourceQuality: z.number().min(0).max(10).describe("A score indicating the quality of the contribution source (0-10)."),
});

const SummarizeContributionOutputSchema = z.object({
  summary: z.string().describe("A concise summary of the community contribution."),
});

// -----------------------------
// Main Function
// -----------------------------
export async function summarizeContribution(
  input: z.infer<typeof SummarizeContributionInputSchema>
): Promise<z.infer<typeof SummarizeContributionOutputSchema>> {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    // If API key is missing → fallback
    if (!apiKey) {
      console.warn("⚠️ GOOGLE_API_KEY is missing. Using fallback summary.");
      return {
        summary: `📜 [FAKE SUMMARY] ${input.artifactName}: ${input.contributionText.slice(0, 100)}...`,
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Quality check
    if (input.sourceQuality < 5) {
      return { summary: "⚠️ Contribution quality too low to summarize." };
    }

    const prompt = `
      You are a content manager for a digital archive of a Sikkim monastery. 
      Summarize the following contribution about the artifact named "${input.artifactName}" in a clear and concise way:
      "${input.contributionText}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return { summary: summary.trim() || "⚠️ AI returned an empty response." };
  } catch (err) {
    console.error("AI summarization failed:", err);
    return { summary: "⚠️ Failed to generate summary. Please try again." };
  }
}
