
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Play, Loader, Copy, Check, BarChart3, Clock, Scale } from "lucide-react";
import { analyzeCode } from "@/ai/flows/code-analysis";
import { analyzeCodeComplexity, type CodeComplexityAnalysisOutput } from "@/ai/flows/code-complexity-analysis";
import { executeCode, CodeExecutionOutput } from "@/ai/flows/code-execution";
import { CodeEditor } from "./CodeEditor";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Textarea } from "@/components/ui/textarea";


const languages = [
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "typescript", label: "TypeScript" },
];

const placeholders: Record<string, string> = {
    javascript: `// Welcome to Logix! Click Run to see the output.
console.log(\`
/$$                           /$$          
| $$                          |__/          
| $$        /$$$$$$   /$$$$$$  /$$ /$$   /$$
| $$       /$$__  $$ /$$__  $$| $$|  $$ /$$/
| $$      | $$  \\ $$| $$  \\ $$| $$ \\  $$$$/ 
| $$      | $$  | $$| $$  | $$| $$  >$$  $$ 
| $$$$$$$$|  $$$$$$/|  $$$$$$$| $$ /$$/\\  $$
|________/ \\______/  \\____  $$|__/|__/  \\__/
                     /$$  \\ $$              
                    |  $$$$$$/              
                     \\______/               
\`);`,
    python: `# Welcome to Logix! Click Run to see the output.
print("""
/$$                           /$$          
| $$                          |__/          
| $$        /$$$$$$   /$$$$$$  /$$ /$$   /$$
| $$       /$$__  $$ /$$__  $$| $$|  $$ /$$/
| $$      | $$  \\ $$| $$  \\ $$| $$ \\  $$$$/ 
| $$      | $$  | $$| $$  | $$| $$  >$$  $$ 
| $$$$$$$$|  $$$$$$/|  $$$$$$$| $$ /$$/\\  $$
|________/ \\______/  \\____  $$|__/|__/  \\__/
                     /$$  \\ $$              
                    |  $$$$$$/              
                     \\______/               
""")`,
    java: `// Welcome to Logix! Click Run to see the output.
public class Main {
    public static void main(String[] args) {
        System.out.println("/$$                           /$$          ");
        System.out.println("| $$                          |__/          ");
        System.out.println("| $$        /$$$$$$   /$$$$$$  /$$ /$$   /$$");
        System.out.println("| $$       /$$__  $$ /$$__  $$| $$|  $$ /$$/");
        System.out.println("| $$      | $$  \\\\ $$| $$  \\\\ $$| $$ \\\\  $$$$/ ");
        System.out.println("| $$      | $$  | $$| $$  | $$| $$  >$$  $$ ");
        System.out.println("| $$$$$$$$|  $$$$$$/|  $$$$$$$| $$ /$$/\\\\  $$");
        System.out.println("|________/ \\\\______/  \\\\____  $$|__/|__/  \\\\__/");
        System.out.println("                     /$$  \\\\ $$              ");
        System.out.println("                    |  $$$$$$/              ");
        System.out.println("                     \\\\______/               ");
    }
}`,
    cpp: `// Welcome to Logix! Click Run to see the output.
#include <iostream>

int main() {
    std::cout << "/$$                           /$$          " << std::endl;
    std::cout << "| $$                          |__/          " << std::endl;
    std::cout << "| $$        /$$$$$$   /$$$$$$  /$$ /$$   /$$" << std::endl;
    std::cout << "| $$       /$$__  $$ /$$__  $$| $$|  $$ /$$/" << std::endl;
    std::cout << "| $$      | $$  \\\\ $$| $$  \\\\ $$| $$ \\\\  $$$$/ " << std::endl;
    std::cout << "| $$      | $$  | $$| $$  | $$| $$  >$$  $$ " << std::endl;
    std::cout << "| $$$$$$$$|  $$$$$$/|  $$$$$$$| $$ /$$/\\\\  $$" << std::endl;
    std::cout << "|________/ \\\\______/  \\\\____  $$|__/|__/  \\\\__/" << std::endl;
    std::cout << "                     /$$  \\\\ $$              " << std::endl;
    std::cout << "                    |  $$$$$$/              " << std::endl;
    std::cout << "                     \\\\______/               " << std::endl;
    return 0;
}`,
    typescript: `// Welcome to Logix! Click Run to see the output.
console.log(\`
/$$                           /$$          
| $$                          |__/          
| $$        /$$$$$$   /$$$$$$  /$$ /$$   /$$
| $$       /$$__  $$ /$$__  $$| $$|  $$ /$$/
| $$      | $$  \\ $$| $$  \\ $$| $$ \\  $$$$/ 
| $$      | $$  | $$| $$  | $$| $$  >$$  $$ 
| $$$$$$$$|  $$$$$$/|  $$$$$$$| $$ /$$/\\  $$
|________/ \\______/  \\____  $$|__/|__/  \\__/
                     /$$  \\ $$              
                    |  $$$$$$/              
                     \\______/               
\`);`,
    c: `// Welcome to Logix! Click Run to see the output.
#include <stdio.h>

int main() {
    printf("/$$                           /$$          \\n");
    printf("| $$                          |__/          \\n");
    printf("| $$        /$$$$$$   /$$$$$$  /$$ /$$   /$$ \\n");
    printf("| $$       /$$__  $$ /$$__  $$| $$|  $$ /$$/\\n");
    printf("| $$      | $$  \\\\ $$| $$  \\\\ $$| $$ \\\\  $$$$/ \\n");
    printf("| $$      | $$  | $$| $$  | $$| $$  >$$  $$ \\n");
    printf("| $$$$$$$$|  $$$$$$/|  $$$$$$$| $$ /$$/\\\\  $$\\n");
    printf("|________/ \\\\______/  \\\\____  $$|__/|__/  \\\\__/\\n");
    printf("                     /$$  \\\\ $$              \\n");
    printf("                    |  $$$$$$/              \\n");
    printf("                     \\\\______/               \\n");
    return 0;
}`,
};

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const [isCopied, setIsCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const code = String(children).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return !inline && match ? (
        <div className="my-2 rounded-md bg-black text-white border border-border">
            <div className="flex items-center justify-between rounded-t-md bg-gray-800 px-4 py-2">
                <span className="text-sm font-code text-gray-400">{match[1]}</span>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="h-7 w-7 text-white hover:bg-gray-700">
                    {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
            <SyntaxHighlighter
                style={coldarkDark}
                language={match[1]}
                PreTag="div"
                {...props}
                className="!p-4 !m-0 !bg-transparent overflow-x-auto"
            >
                {code}
            </SyntaxHighlighter>
        </div>
    ) : (
        <code className={cn("font-code bg-muted text-foreground px-1 py-0.5 rounded-sm", className)} {...props}>
            {children}
        </code>
    );
};

const formatContent = (content: string) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2"
        components={{
            code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

const runCode = (code: string, stdin: string): { logs: any[], error: string | null } => {
    const logs: any[] = [];
    let error: string | null = null;
    let stdinLines = stdin.split('\n');
    let stdinIndex = 0;

    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalPrompt = window.prompt;

    console.log = (...args) => {
        logs.push({type: 'log', data: args});
    };
    console.error = (...args) => {
        logs.push({type: 'error', data: args});
    };
    console.warn = (...args) => {
        logs.push({type: 'warn', data: args});
    };
    // Override prompt to read from our simulated stdin
    (window as any).prompt = (message?: string) => {
        if (message) {
            logs.push({type: 'log', data: [message]});
        }
        if (stdinIndex < stdinLines.length) {
            const input = stdinLines[stdinIndex];
            stdinIndex++;
            logs.push({type: 'input', data: [input]});
            return input;
        }
        return null;
    };


    try {
        const result = new Function(code)();
        if (result !== undefined) {
          logs.push({type: 'return', data: [result]});
        }
    } catch (e: any) {
        error = e.toString();
        logs.push({type: 'error', data: [e.message]});
    } finally {
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
        window.prompt = originalPrompt;
    }

    return { logs, error };
}

const formatLog = (log: {type: string, data: any[]}) => {
    const formattedData = log.data.map(item => {
        if (typeof item === 'object' && item !== null) {
            try {
                return JSON.stringify(item, null, 2);
            } catch {
                return '[unserializable object]';
            }
        }
        return String(item);
    }).join(' ');
    
    let prefix = log.type.charAt(0).toUpperCase() + log.type.slice(1);
    let color = 'text-white';
    let showPrefix = true;

    switch(log.type) {
        case 'log':
            color = 'text-white';
            showPrefix = false;
            break;
        case 'error':
            color = 'text-red-500';
            break;
        case 'warn':
            color = 'text-yellow-500';
            break;
        case 'return':
            color = 'text-blue-400';
            prefix = 'Return';
            break;
        case 'input':
            color = 'text-green-400';
            prefix = 'Input';
            break;
    }
    
    return <div className={cn('flex items-start', color)}>
        {showPrefix && <span className="w-20 font-bold opacity-70">[{prefix}]</span>}
        <pre className={cn("whitespace-pre flex-1", !showPrefix && "pl-20")}>{formattedData}</pre>
    </div>;
}


export function Playground() {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(placeholders['cpp']);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState<CodeExecutionOutput | null>(null);
  const [clientOutput, setClientOutput] = useState<{logs: any[], error: string | null} | null>(null);
  const [analysis, setAnalysis] = useState("");
  const [complexity, setComplexity] = useState<CodeComplexityAnalysisOutput | null>(null);
  const [activeTab, setActiveTab] = useState("input");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExecuting, setIsExecuting] =useState(false);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(placeholders[value] || "");
    setOutput(null);
    setClientOutput(null);
    setAnalysis("");
    setComplexity(null);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis("");
    setComplexity(null);
    setActiveTab("analysis");

    try {
      const [analysisResult, complexityResult] = await Promise.all([
        analyzeCode({ code, language }),
        analyzeCodeComplexity({ code, language }),
      ]);
      setAnalysis(analysisResult.suggestions);
      setComplexity(complexityResult);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis("Failed to analyze code. Please try again.");
      setComplexity(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

    const handleExecute = async () => {
        setIsExecuting(true);
        setActiveTab("output");
        setOutput(null);
        setClientOutput(null);

        if (language === 'javascript' || language === 'typescript') {
            const result = runCode(language === 'typescript' ? (window as any).ts.transpile(code) : code, stdin);
            setClientOutput(result);
        } else {
            try {
                const result = await executeCode({ code, language, stdin });
                setOutput(result);
            } catch (error) {
                console.error("Execution failed:", error);
                setOutput({ output: '', error: 'An unexpected error occurred during execution.' });
            }
        }

        setIsExecuting(false);
    };
  
  const displayLanguage = languages.find(l => l.value === language)?.value || 'javascript';

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      <div className="flex flex-col gap-4 w-full md:w-1/2 h-full">
        <div className="flex items-center justify-between">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[140px] sm:w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-4">
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !code.trim()}>
              {isAnalyzing ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Analyze
            </Button>
            <Button onClick={handleExecute} disabled={isExecuting} variant="accent">
              {isExecuting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              Run
            </Button>
          </div>
        </div>
        <Card className="flex-1 bg-transparent overflow-hidden border-0 shadow-none">
            <CodeEditor
              value={code}
              onValueChange={setCode}
              language={displayLanguage}
              placeholder="Enter your code here"
            />
        </Card>
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-4 sm:flex sm:overflow-x-auto sm:w-auto">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="complexity">Complexity</TabsTrigger>
          </TabsList>
           <TabsContent value="input" className="flex-1 min-h-0 mt-4">
                <Card className="h-full bg-gradient-card">
                    <CardContent className="p-0 h-full">
                        <Textarea
                            value={stdin}
                            onChange={(e) => setStdin(e.target.value)}
                            placeholder="Provide input for your code, with each prompt on a new line."
                            className="h-full bg-transparent border-0 resize-none font-code text-sm p-4"
                        />
                    </CardContent>
                </Card>
           </TabsContent>
          <TabsContent value="output" className="flex-1 min-h-0 mt-4">
            <Card className="h-full bg-gradient-card">
                <CardContent className="p-0 h-full">
                    <div className="p-4 bg-transparent h-full w-full overflow-auto rounded-md font-code text-sm">
                        {isExecuting && <div className="flex items-center gap-2"><Loader className="h-4 w-4 animate-spin" /><span>Executing...</span></div>}
                        {!isExecuting && !output && !clientOutput && "Code output will appear here."}
                        {!isExecuting && clientOutput && (
                            <div className="space-y-1">
                                {clientOutput.logs.map((log, i) => <div key={i}>{formatLog(log)}</div>)}
                                {clientOutput.error && <div className="text-red-500 mt-2"><strong>Error:</strong> {clientOutput.error}</div>}
                            </div>
                        )}
                        {!isExecuting && output && (
                            <>
                                {output.output && <pre className="whitespace-pre">{output.output}</pre>}
                                {output.error && <pre className="text-red-500 mt-2 whitespace-pre">{output.error}</pre>}
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analysis" className="flex-1 min-h-0 mt-4">
            <Card className="h-full bg-gradient-card">
                <CardContent className="p-4 h-full w-full overflow-auto">
                    {isAnalyzing && <div className="flex items-center gap-2 text-sm"><Loader className="h-4 w-4 animate-spin" /><span>Analyzing your code...</span></div>}
                    {!isAnalyzing && (analysis ? formatContent(analysis) : "AI code analysis and suggestions will appear here.")}
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="complexity" className="flex-1 min-h-0 mt-4">
            <Card className="h-full bg-gradient-card">
                <CardContent className="p-4 h-full w-full overflow-auto">
                {isAnalyzing && <div className="flex items-center gap-2 text-sm"><Loader className="h-4 w-4 animate-spin" /><span>Analyzing complexity...</span></div>}
                {!isAnalyzing && complexity && (
                    <div className="space-y-6">
                        <div>
                            <CardTitle className="flex items-center gap-2 mb-2"><Clock className="w-6 h-6 text-primary"/> Time Complexity</CardTitle>
                            <p className="text-sm text-muted-foreground mb-1"><strong>Best:</strong> {complexity.time.bestNotation}</p>
                            <p className="text-sm text-muted-foreground mb-1"><strong>Average:</strong> {complexity.time.averageNotation}</p>
                            <p className="text-sm text-muted-foreground mb-4"><strong>Worst:</strong> {complexity.time.worstNotation}</p>
                            <p className="prose prose-sm dark:prose-invert max-w-none">{complexity.time.explanation}</p>
                        </div>
                        <div>
                            <CardTitle className="flex items-center gap-2 mb-2"><Scale className="w-6 h-6 text-primary"/> Space Complexity</CardTitle>
                            <p className="text-sm text-muted-foreground mb-1"><strong>Best:</strong> {complexity.space.bestNotation}</p>
                            <p className="text-sm text-muted-foreground mb-1"><strong>Average:</strong> {complexity.space.averageNotation}</p>
                            <p className="text-sm text-muted-foreground mb-4"><strong>Worst:</strong> {complexity.space.worstNotation}</p>
                            <p className="prose prose-sm dark:prose-invert max-w-none">{complexity.space.explanation}</p>
                        </div>
                        <div>
                            <CardTitle className="flex items-center gap-2 mb-4"><BarChart3 className="w-6 h-6 text-primary"/> Performance Growth</CardTitle>
                            <div className="h-60 w-full text-xs">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={complexity.graphData} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
                                        <XAxis dataKey="n" label={{ value: "Input Size (n)", position: 'insideBottom', offset: -15 }}/>
                                        <YAxis yAxisId="left" label={{ value: 'Operations', angle: -90, position: 'insideLeft' }}/>
                                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Memory', angle: 90, position: 'insideRight' }}/>
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                borderColor: 'hsl(var(--border))'
                                            }}
                                        />
                                        <Legend verticalAlign="bottom" wrapperStyle={{paddingTop: 20}}/>
                                        <Bar yAxisId="left" dataKey="time" fill="url(#colorTime)" name="Time Complexity" />
                                        <Bar yAxisId="right" dataKey="space" fill="url(#colorSpace)" name="Space Complexity" />
                                         <defs>
                                            <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--gradient-primary-from))" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="hsl(var(--gradient-primary-to))" stopOpacity={0.8}/>
                                            </linearGradient>
                                            <linearGradient id="colorSpace" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--gradient-accent-from))" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="hsl(var(--gradient-accent-to))" stopOpacity={0.8}/>
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
                {!isAnalyzing && !complexity && "Code complexity analysis will appear here."}
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

    
    
