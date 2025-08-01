
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
  id: number;
  role: "user" | "bot";
  content: string;
  isLoading?: boolean;
}

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
                className="!p-4 !m-0 !bg-transparent overflow-x-auto text-xs"
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
      id: Date.now(),
      role: "user",
      content: input,
    };
    
    const botLoadingMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: "...",
        isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, botLoadingMessage]);
    setInput("");
    
    const history = messages.filter(m => !m.isLoading).map(({id, isLoading, ...rest}) => rest);

    try {
      const result = await queryComputerScienceQuestion({ query: input, history });
      const botMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: result.answer,
      };
      setMessages((prev) => [...prev.slice(0, -1), botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
      console.error("AI query failed:", error);
    }
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
                  "rounded-lg p-3 text-sm",
                  "max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl",
                  message.role === "user"
                    ? "bg-gradient-accent text-white"
                    : "bg-gradient-card border"
                )}
              >
                {message.isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader className="h-4 w-4 animate-spin"/>
                        <span>Thinking...</span>
                    </div>
                ) : <div className="min-w-0">{formatContent(message.content)}</div>}
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
