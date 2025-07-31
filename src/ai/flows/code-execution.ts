
'use server';

/**
 * @fileOverview Code execution flow for JavaScript and TypeScript.
 *
 * This file is a placeholder for a secure, sandboxed execution environment.
 * In a real-world application, this would involve a secure backend service.
 * For this demo, we will simulate execution and return a hardcoded result
 * for JavaScript and TypeScript, and an unsupported message for others.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const CodeExecutionInputSchema = z.object({
  code: z.string().describe('The code to be executed.'),
  language: z.string().describe('The programming language of the code.'),
});
export type CodeExecutionInput = z.infer<typeof CodeExecutionInputSchema>;

export const CodeExecutionOutputSchema = z.object({
  output: z.string().describe('The stdout of the executed code.'),
  error: z.string().optional().describe('The stderr of the executed code, if any.'),
});
export type CodeExecutionOutput = z.infer<typeof CodeExecutionOutputSchema>;


export async function executeCode(input: CodeExecutionInput): Promise<CodeExecutionOutput> {
  return executeCodeFlow(input);
}


const executeCodeFlow = ai.defineFlow(
  {
    name: 'executeCodeFlow',
    inputSchema: CodeExecutionInputSchema,
    outputSchema: CodeExecutionOutputSchema,
  },
  async ({ code, language }) => {
    // In a real application, you would have a secure sandbox to execute code.
    // This is a mock implementation.
    if (language === 'javascript' || language === 'typescript') {
        if (code.includes('console.log("Hello, Logix!")')) {
            return {
                output: 'Hello, Logix!',
            };
        }
        return {
            output: 'Code executed successfully.',
        }
    }

    return {
      output: '',
      error: `Execution of ${language} is not supported in this playground.`,
    };
  }
);
