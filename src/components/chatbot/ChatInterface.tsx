
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User, Loader, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { queryComputerScienceQuestion } from "@/ai/flows/query-computer-science-questions";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  type: 'text' | 'code';
  language?: string;
  isLoading?: boolean;
}

const CodeBlock = ({ language, content }: { language: string | undefined, content: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="my-2 rounded-md bg-black text-white border border-border">
            <div className="flex items-center justify-between rounded-t-md bg-gray-800 px-3 py-1.5 md:px-4 md:py-2">
                <span className="text-xs font-code text-gray-400">{language || 'code'}</span>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="h-7 w-7 text-white hover:bg-gray-700 shrink-0">
                    {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    style={coldarkDark}
                    language={language}
                    PreTag="div"
                    className="!p-3 !m-0 !bg-transparent text-xs"
                >
                    {content}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

const parseBotResponse = (response: string): Omit<Message, 'id' | 'role' | 'isLoading'>[] => {
    const chunks = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(response)) !== null) {
        if (match.index > lastIndex) {
            const textContent = response.substring(lastIndex, match.index).trim();
            if (textContent) {
                chunks.push({ type: 'text' as const, content: textContent });
            }
        }

        const language = match[1] || 'bash';
        const codeContent = match[2].trim();
        chunks.push({ type: 'code' as const, content: codeContent, language });

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < response.length) {
        const textContent = response.substring(lastIndex).trim();
        if (textContent) {
            chunks.push({ type: 'text' as const, content: textContent });
        }
    }
    
    if (chunks.length === 0 && response.trim()) {
        chunks.push({ type: 'text' as const, content: response });
    }

    return chunks;
};


export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      type: 'text',
      content: input,
    };
    
    const botLoadingMessage: Message = {
        id: `bot-loading-${Date.now()}`,
        role: "bot",
        type: 'text',
        content: "...",
        isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, botLoadingMessage]);
    setInput("");
    
    const history = messages
        .filter(m => !m.isLoading)
        .map(({role, content}) => ({role: role === 'user' ? 'user' : 'bot', content}));

    try {
      const result = await queryComputerScienceQuestion({ query: input, history });
      const botResponseChunks = parseBotResponse(result.answer);

      const botMessages: Message[] = botResponseChunks.map((chunk, index) => ({
        id: `bot-${Date.now()}-${index}`,
        role: 'bot',
        ...chunk
      }));

      setMessages((prev) => [...prev.slice(0, -1), ...botMessages]);
    } catch (error) {
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        role: "bot",
        type: 'text',
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
      console.error("AI query failed:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-2 md:p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground pt-10 px-4">
              <Bot className="mx-auto h-12 w-12 mb-4" />
              <p>Start the conversation by asking a question below.</p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.role === "user" ? "justify-end" : ""
              )}
            >
              {message.role === "bot" && (
                <Avatar className="h-8 w-8 shrink-0">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                    </div>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg text-sm max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl min-w-0",
                  message.type === 'code' && "w-full max-w-[330px]",
                  message.type === 'text' && "p-3",
                  message.role === "user"
                    ? "bg-gradient-accent text-white"
                    : message.type === 'text' && "bg-gradient-card border"
                )}
              >
                {message.isLoading ? (
                    <div className="flex items-center gap-2 p-3">
                        <Loader className="h-4 w-4 animate-spin"/>
                        <span>Thinking...</span>
                    </div>
                ) : message.type === 'code' ? (
                    <CodeBlock language={message.language} content={message.content} />
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2"
                    >
                        {message.content}
                    </ReactMarkdown>
                )}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 shrink-0">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-accent text-accent-foreground">
                        <User className="h-4 w-4" />
                    </div>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-2 md:p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about data structures, etc."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
