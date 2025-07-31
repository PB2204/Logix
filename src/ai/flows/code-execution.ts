
'use server';

/**
 * @fileOverview Code execution flow.
 *
 * This file uses an AI model to simulate the execution of code for various
 * languages, providing a realistic playground experience without a dedicated
 * sandbox environment.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CodeExecutionInputSchema = z.object({
  code: z.string().describe('The code to be executed.'),
  language: z.string().describe('The programming language of the code.'),
  stdin: z.string().optional().describe('The standard input to provide to the code.'),
});
export type CodeExecutionInput = z.infer<typeof CodeExecutionInputSchema>;

const CodeExecutionOutputSchema = z.object({
  output: z.string().describe('The stdout of the executed code.'),
  error: z.string().optional().describe('The stderr of the executed code, if any.'),
});
export type CodeExecutionOutput = z.infer<typeof CodeExecutionOutputSchema>;


export async function executeCode(input: CodeExecutionInput): Promise<CodeExecutionOutput> {
  return executeCodeFlow(input);
}

const executionPrompt = ai.definePrompt({
    name: 'codeExecutionPrompt',
    input: { schema: CodeExecutionInputSchema },
    output: { schema: CodeExecutionOutputSchema },
    prompt: `You are a code execution engine. Simulate the execution of the following code and return the output.
If the code produces an error, return the error message in the 'error' field.
{{#if stdin}}
The code will receive the following as its standard input:
---
{{{stdin}}}
---
{{/if}}

Language: {{{language}}}
Code:
\`\`\`{{{language}}}
{{{code}}}
\`\`\`
`,
});


const executeCodeFlow = ai.defineFlow(
  {
    name: 'executeCodeFlow',
    inputSchema: CodeExecutionInputSchema,
    outputSchema: CodeExecutionOutputSchema,
  },
  async (input) => {
    const { output } = await executionPrompt(input);
    return output!;
  }
);
