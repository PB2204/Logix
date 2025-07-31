"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { queryComputerScienceQuestion } from "@/ai/flows/query-computer-science-questions";

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  isLoading?: boolean;
}

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

    try {
      const result = await queryComputerScienceQuestion({ query: input });
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
    const codeBlockRegex = /```([\s\S]*?)```/g;
    return content.split(codeBlockRegex).map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        return (
          <pre key={index} className="bg-muted p-4 rounded-md my-2 overflow-x-auto">
            <code className="font-code text-sm">{part.trim()}</code>
          </pre>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground pt-10">
              <Bot className="mx-auto h-12 w-12 mb-4" />
              <p>Start the conversation by asking a question below.</p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-4",
                message.role === "user" ? "justify-end" : ""
              )}
            >
              {message.role === "bot" && (
                <Avatar className="h-9 w-9">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                    </div>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs md:max-w-md lg:max-w-2xl rounded-lg p-3 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader className="h-4 w-4 animate-spin"/>
                        <span>Thinking...</span>
                    </div>
                ) : formatContent(message.content)}
              </div>
              {message.role === "user" && (
                <Avatar className="h-9 w-9">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <User className="h-5 w-5" />
                    </div>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about data structures, algorithms, etc."
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
