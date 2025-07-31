
'use server';

/**
 * @fileOverview AI-powered code complexity analysis flow.
 *
 * - analyzeCodeComplexity - A function that analyzes code and determines its time and space complexity.
 * - CodeComplexityAnalysisInput - The input type for the analyzeCodeComplexity function.
 * - CodeComplexityAnalysisOutput - The return type for the analyzeCodeComplexity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComplexitySchema = z.object({
    bestNotation: z.string().describe('Big O notation for the best-case scenario (e.g., O(1), O(n log n)).'),
    averageNotation: z.string().describe('Big O notation for the average-case scenario (e.g., O(n), O(n^2)).'),
    worstNotation: z.string().describe('Big O notation for the worst-case scenario (e.g., O(log n), O(n!)).'),
    explanation: z.string().describe('A detailed explanation of why the code has this complexity, referencing specific lines or loops.'),
});

const GraphDataPointSchema = z.object({
    n: z.number().describe("Input size 'n'."),
    time: z.number().describe('Number of operations for time complexity at size n.'),
    space: z.number().describe('Memory units for space complexity at size n.'),
});

const CodeComplexityAnalysisInputSchema = z.object({
  code: z.string().describe('The code to be analyzed.'),
  language: z.string().describe('The programming language of the code.'),
});
export type CodeComplexityAnalysisInput = z.infer<typeof CodeComplexityAnalysisInputSchema>;


export const CodeComplexityAnalysisOutputSchema = z.object({
  time: ComplexitySchema.describe('The time complexity analysis of the provided code.'),
  space: ComplexitySchema.describe('The space complexity analysis of the provided code.'),
  graphData: z.array(GraphDataPointSchema).describe('An array of data points to plot for visualizing the growth of time and space complexity. Provide points for n = 10, 50, 100, 500, 1000.'),
});
export type CodeComplexityAnalysisOutput = z.infer<typeof CodeComplexityAnalysisOutputSchema>;

export async function analyzeCodeComplexity(input: CodeComplexityAnalysisInput): Promise<CodeComplexityAnalysisOutput> {
  return codeComplexityAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeComplexityAnalysisPrompt',
  input: {schema: CodeComplexityAnalysisInputSchema},
  output: {schema: CodeComplexityAnalysisOutputSchema},
  prompt: `You are an expert computer science professor specializing in algorithm analysis. Analyze the provided code to determine its time and space complexity.

Provide a detailed breakdown for best, average, and worst-case scenarios. Your explanation should be clear and justify your answer by referencing the code's structure (loops, recursion, data structures, etc.).

For the graph data, calculate the approximate number of operations (for time) and memory units (for space) for the worst-case scenario at different input sizes 'n'.

Language: {{{language}}}
Code:
\`\`\`{{{language}}}
{{{code}}}
\`\`\``,
});

const codeComplexityAnalysisFlow = ai.defineFlow(
  {
    name: 'codeComplexityAnalysisFlow',
    inputSchema: CodeComplexityAnalysisInputSchema,
    outputSchema: CodeComplexityAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
