"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Wand2, Play, Loader } from "lucide-react";
import { analyzeCode } from "@/ai/flows/code-analysis";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c++", label: "C++" },
  { value: "typescript", label: "TypeScript" },
  { value: "c", label: "C" },
];

const placeholders: Record<string, string> = {
    javascript: "console.log('Hello, Logix!');",
    python: "print('Hello, Logix!')",
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Logix!");\n    }\n}`,
    'c++': `#include <iostream>\n\nint main() {\n    std::cout << "Hello, Logix!" << std::endl;\n    return 0;\n}`,
    typescript: "console.log('Hello, Logix!');",
    c: `#include <stdio.h>\n\nint main() {\n   printf("Hello, Logix!");\n   return 0;\n}`,
};

export function Playground() {
  const [language, setLanguage] = useState(languages[0].value);
  const [code, setCode] = useState(placeholders[languages[0].value]);
  const [output, setOutput] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [activeTab, setActiveTab] = useState("output");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExecuting, setIsExecuting] =useState(false);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(placeholders[value] || "");
    setOutput("");
    setAnalysis("");
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis("");
    setActiveTab("analysis");
    try {
      const result = await analyzeCode({ code, language });
      setAnalysis(result.suggestions);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis("Failed to analyze code. Please try again.");
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
            <Button onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Analyze
            </Button>
            <Button onClick={handleExecute} disabled={isExecuting} style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              {isExecuting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              Run
            </Button>
          </div>
        </div>
        <Card className="flex-1">
          <CardContent className="p-0 h-full">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code here"
              className="w-full h-full font-code text-sm resize-none border-0 focus-visible:ring-1"
            />
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-1/2 h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="output">Output</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
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
                    {!isAnalyzing && (analysis || "AI code analysis and suggestions will appear here.")}
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
