'use server';
/**
 * @fileOverview AI chatbot providing deeply explained answers to Computer Science queries.
 *
 * - queryComputerScienceQuestion - A function that handles the question answering process.
 * - QueryComputerScienceQuestionInput - The input type for the queryComputerScienceQuestion function.
 * - QueryComputerScienceQuestionOutput - The return type for the queryComputerScienceQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QueryComputerScienceQuestionInputSchema = z.object({
  query: z.string().describe('The computer science question to be answered.'),
});
export type QueryComputerScienceQuestionInput = z.infer<typeof QueryComputerScienceQuestionInputSchema>;

const QueryComputerScienceQuestionOutputSchema = z.object({
  answer: z.string().describe('The detailed answer to the computer science question, including code examples where applicable.'),
});
export type QueryComputerScienceQuestionOutput = z.infer<typeof QueryComputerScienceQuestionOutputSchema>;

export async function queryComputerScienceQuestion(input: QueryComputerScienceQuestionInput): Promise<QueryComputerScienceQuestionOutput> {
  return queryComputerScienceQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'queryComputerScienceQuestionPrompt',
  input: {schema: QueryComputerScienceQuestionInputSchema},
  output: {schema: QueryComputerScienceQuestionOutputSchema},
  prompt: `You are a highly knowledgeable AI chatbot specialized in computer science. Provide deeply explained answers with code examples to the following question:\n\nQuestion: {{{query}}}\n\nAnswer: `,
});

const queryComputerScienceQuestionFlow = ai.defineFlow(
  {
    name: 'queryComputerScienceQuestionFlow',
    inputSchema: QueryComputerScienceQuestionInputSchema,
    outputSchema: QueryComputerScienceQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
