'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Initialize GoogleAI client with your API key from environment variable
const googleAIClient = new googleAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

const SummarizeContributionInputSchema = z.object({
  contributionText: z.string().describe('The text of the community contribution.'),
  sourceQuality: z
    .number()
    .min(0)
    .max(10)
    .describe('A score indicating the quality of the contribution source (0-10).'),
  artifactName: z.string().describe('The name of the artifact the contribution is about.'),
});
export type SummarizeContributionInput = z.infer<typeof SummarizeContributionInputSchema>;

const SummarizeContributionOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the community contribution.'),
});
export type SummarizeContributionOutput = z.infer<typeof SummarizeContributionOutputSchema>;

export async function summarizeContribution(input: SummarizeContributionInput): Promise<SummarizeContributionOutput> {
  return summarizeContributionFlow(input);
}

// Tool to check quality threshold
const contributionQualityCheckTool = ai.defineTool(
  {
    name: 'contributionQualityCheck',
    description: 'Check the quality of the contribution and determine if it is good enough to be used for summarization.',
    inputSchema: z.object({
      sourceQuality: z.number().min(0).max(10).describe('A score indicating the quality of the contribution source (0-10).'),
    }),
    outputSchema: z.boolean().describe('Returns true if the quality is high enough, false otherwise.'),
  },
  async (input) => {
    return input.sourceQuality >= 5; // threshold 5
  }
);

// Function to call Vertex AI text generation using GoogleAI client
async function generateSummary(prompt: string): Promise<string> {
  const response = await googleAIClient.textGeneration({
    model: 'text-bison@001',  // Use appropriate Vertex AI model
    prompt,
    temperature: 0.7,
    maxTokens: 300,
  });

  return response.completions[0].output;
}

// Flow that uses quality check and generates summary via Vertex AI
const summarizeContributionFlow = ai.defineFlow(
  {
    name: 'summarizeContributionFlow',
    inputSchema: SummarizeContributionInputSchema,
    outputSchema: SummarizeContributionOutputSchema,
  },
  async (input) => {
    const qualityCheck = await contributionQualityCheckTool({
      sourceQuality: input.sourceQuality,
    });

    if (!qualityCheck) {
      return { summary: 'Contribution is of insufficient quality.' };
    }

    // Create a prompt with artifact name and contribution text
    const prompt = `You are a content manager for a digital archive of a Sikkim monastery. 
    Summarize the following contribution about the artifact named "${input.artifactName}" in a concise way: 
    "${input.contributionText}"`;

    const summary = await generateSummary(prompt);

    return { summary };
  }
);

