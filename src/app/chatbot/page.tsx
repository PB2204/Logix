import { ChatInterface } from "@/components/chatbot/ChatInterface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatbotPage() {
  return (
    <div className="container mx-auto py-4 md:py-10 flex flex-col items-center h-[calc(100vh-80px)] md:h-auto">
        <div className="text-center mb-4 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">AI Chatbot</h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">Your personal AI tutor for computer science.</p>
        </div>
        <Card className="w-full max-w-3xl flex-1 md:flex-initial md:h-[70vh] shadow-2xl">
            <CardContent className="p-0 h-full">
                <ChatInterface />
            </CardContent>
        </Card>
    </div>
  );
}
