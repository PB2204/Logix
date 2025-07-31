
'use server';

/**
 * @fileOverview Code execution flow.
 *
 * This file is a placeholder for a secure, sandboxed execution environment
 * like Judge0. In a real-world application, this would involve a secure
 * backend service. For this demo, we will simulate execution for all languages.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CodeExecutionInputSchema = z.object({
  code: z.string().describe('The code to be executed.'),
  language: z.string().describe('The programming language of the code.'),
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

const executeCodeFlow = ai.defineFlow(
  {
    name: 'executeCodeFlow',
    inputSchema: CodeExecutionInputSchema,
    outputSchema: CodeExecutionOutputSchema,
  },
  async ({ code, language }) => {
    // In a real application, you would use a secure sandbox like Judge0.
    // This is a mock implementation for demonstration purposes.

    const helloLogixPatterns: Record<string, string[]> = {
        python: ['print("Hello, Logix!")', "print('Hello, Logix!')"],
        java: ['System.out.println("Hello, Logix!");'],
        cpp: ['std::cout << "Hello, Logix!"'],
        c: ['printf("Hello, Logix!");'],
        javascript: ['console.log("Hello, Logix!")', "console.log('Hello, Logix!')"],
        typescript: ['console.log("Hello, Logix!")', "console.log('Hello, Logix!')"],
    };

    const patterns = helloLogixPatterns[language];
    if (patterns) {
        for (const pattern of patterns) {
            if (code.includes(pattern)) {
                return {
                    output: 'Hello, Logix!',
                };
            }
        }
    }

    // Generic success message if no specific pattern is matched
    return {
        output: 'Code executed successfully.',
        error: '',
    };
  }
);
