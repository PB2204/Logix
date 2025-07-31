'use server';

/**
 * @fileOverview AI-powered code analysis flow.
 *
 * - analyzeCode - A function that analyzes code and provides suggestions for improvement.
 * - CodeAnalysisInput - The input type for the analyzeCode function.
 * - CodeAnalysisOutput - The return type for the analyzeCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeAnalysisInputSchema = z.object({
  code: z.string().describe('The code to be analyzed.'),
  language: z.string().describe('The programming language of the code.'),
});
export type CodeAnalysisInput = z.infer<typeof CodeAnalysisInputSchema>;

const CodeAnalysisOutputSchema = z.object({
  suggestions: z.string().describe('AI-powered suggestions for improving the code.'),
});
export type CodeAnalysisOutput = z.infer<typeof CodeAnalysisOutputSchema>;

export async function analyzeCode(input: CodeAnalysisInput): Promise<CodeAnalysisOutput> {
  return analyzeCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeAnalysisPrompt',
  input: {schema: CodeAnalysisInputSchema},
  output: {schema: CodeAnalysisOutputSchema},
  prompt: `You are an AI code analysis tool. Analyze the following code and provide suggestions for improvement, including efficiency, bug fixes, and best practices.

Language: {{{language}}}
Code:
\`\`\`{{{code}}}\`\`\``,
});

const analyzeCodeFlow = ai.defineFlow(
  {
    name: 'analyzeCodeFlow',
    inputSchema: CodeAnalysisInputSchema,
    outputSchema: CodeAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
