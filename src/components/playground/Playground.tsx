

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Play, Loader, Copy, Check, BarChart3, Clock, Scale } from "lucide-react";
import { analyzeCode } from "@/ai/flows/code-analysis";
import { analyzeCodeComplexity, type CodeComplexityAnalysisOutput } from "@/ai/flows/code-complexity-analysis";
import { CodeEditor } from "./CodeEditor";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "typescript", label: "TypeScript" },
  { value: "c", label: "C" },
];

const placeholders: Record<string, string> = {
    javascript: "console.log('Hello, Logix!');",
    python: "print('Hello, Logix!')",
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Logix!");\n    }\n}`,
    cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, Logix!" << std::endl;\n    return 0;\n}`,
    typescript: "console.log('Hello, Logix!');",
    c: `#include <stdio.h>\n\nint main() {\n   printf("Hello, Logix!");\n   return 0;\n}`,
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

export function Playground() {
  const [language, setLanguage] = useState(languages[0].value);
  const [code, setCode] = useState(placeholders[languages[0].value]);
  const [output, setOutput] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [complexity, setComplexity] = useState<CodeComplexityAnalysisOutput | null>(null);
  const [activeTab, setActiveTab] = useState("output");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExecuting, setIsExecuting] =useState(false);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(placeholders[value] || "");
    setOutput("");
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

  const handleExecute = () => {
    setIsExecuting(true);
    setActiveTab("output");
    // Mock execution
    setTimeout(() => {
        setOutput(`Executing ${language} code...\n> Hello, Logix!`);
        setIsExecuting(false);
    }, 1000)
  };
  
  const displayLanguage = languages.find(l => l.value === language)?.value || 'javascript';

  const complexityData = [
    { name: "Best Case", time: complexity?.time.best, space: complexity?.space.best },
    { name: "Average Case", time: complexity?.time.average, space: complexity?.space.average },
    { name: "Worst Case", time: complexity?.time.worst, space: complexity?.space.worst },
  ].filter(d => d.time !== undefined && d.space !== undefined);


  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      <div className="flex flex-col gap-4 w-full md:w-1/2 h-full">
        <div className="flex items-center justify-between">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !code.trim()}>
              {isAnalyzing ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Analyze
            </Button>
            <Button onClick={handleExecute} disabled={isExecuting} style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              {isExecuting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              Run
            </Button>
          </div>
        </div>
        <Card className="flex-1 bg-transparent overflow-hidden border-0 shadow-none">
          <CardContent className="p-0 h-full">
            <CodeEditor
              value={code}
              onValueChange={setCode}
              language={displayLanguage}
              placeholder="Enter your code here"
            />
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-1/2 h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="output">Output</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="complexity">Complexity</TabsTrigger>
          </TabsList>
          <TabsContent value="output" className="flex-1 min-h-0">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <pre className="p-4 bg-muted h-full w-full overflow-auto rounded-md font-code text-sm">
                    {isExecuting && <div className="flex items-center gap-2"><Loader className="h-4 w-4 animate-spin" /><span>Executing...</span></div>}
                    {!isExecuting && (output || "Code output will appear here.")}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analysis" className="flex-1 min-h-0">
            <Card className="h-full">
                <CardContent className="p-4 h-full w-full overflow-auto">
                    {isAnalyzing && <div className="flex items-center gap-2 text-sm"><Loader className="h-4 w-4 animate-spin" /><span>Analyzing your code...</span></div>}
                    {!isAnalyzing && (analysis ? formatContent(analysis) : "AI code analysis and suggestions will appear here.")}
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="complexity" className="flex-1 min-h-0">
            <Card className="h-full">
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
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="n" label={{ value: "Input Size (n)", position: 'insideBottom', offset: -15 }}/>
                                        <YAxis yAxisId="left" label={{ value: 'Operations', angle: -90, position: 'insideLeft' }}/>
                                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Memory', angle: 90, position: 'insideRight' }}/>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" wrapperStyle={{paddingTop: 20}}/>
                                        <Bar yAxisId="left" dataKey="time" fill="hsl(var(--primary))" name="Time Complexity" key="time" />
                                        <Bar yAxisId="right" dataKey="space" fill="hsl(var(--accent))" name="Space Complexity" key="space" />
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
