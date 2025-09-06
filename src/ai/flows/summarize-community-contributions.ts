'use server';

/**
 * @fileOverview Summarizes community contributions about artifacts, filtering out poor-quality sources.
 *
 * - summarizeContribution - A function that summarizes visitor and monk contributions about artifacts.
 * - SummarizeContributionInput - The input type for the summarizeContribution function.
 * - SummarizeContributionOutput - The return type for the summarizeContribution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

const contributionQualityCheckTool = ai.defineTool({
  name: 'contributionQualityCheck',
  description: 'Check the quality of the contribution and determine if it is good enough to be used for summarization.',
  inputSchema: z.object({
    sourceQuality: z
      .number()
      .min(0)
      .max(10)
      .describe('A score indicating the quality of the contribution source (0-10).'),
  }),
  outputSchema: z.boolean().describe('Returns true if the quality is high enough, false otherwise.'),
},
async (input) => {
  return input.sourceQuality >= 5; // Setting an arbitrary threshold here.
});


const summarizeContributionPrompt = ai.definePrompt({
  name: 'summarizeContributionPrompt',
  input: {schema: SummarizeContributionInputSchema},
  output: {schema: SummarizeContributionOutputSchema},
  tools: [contributionQualityCheckTool],
  system: `You are a content manager for a digital archive of a Sikkim monastery. A user has submitted a contribution about an artifact. Your job is to summarize the contribution so that it can be added as a metadata entry to the artifact record. Only summarize the artifact if the contributionQualityCheck tool indicates it is of sufficient quality. If the quality is not sufficient, return an error message.  The artifact name is {{{artifactName}}}.`,
  prompt: `The contribution text is: {{{contributionText}}}`,
});

const summarizeContributionFlow = ai.defineFlow(
  {
    name: 'summarizeContributionFlow',
    inputSchema: SummarizeContributionInputSchema,
    outputSchema: SummarizeContributionOutputSchema,
  },
  async input => {
    const qualityCheck = await contributionQualityCheckTool({
      sourceQuality: input.sourceQuality,
    });

    if (!qualityCheck) {
      return {summary: 'Contribution is of insufficient quality.'};
    }

    const {output} = await summarizeContributionPrompt(input);
    return output!;
  }
);
