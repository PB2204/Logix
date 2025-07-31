import { ChatInterface } from "@/components/chatbot/ChatInterface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatbotPage() {
  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">AI Chatbot</h1>
            <p className="text-muted-foreground mt-2">Your personal AI tutor for computer science. Ask anything!</p>
        </div>
        <Card className="w-full max-w-3xl h-[70vh] shadow-2xl">
            <CardContent className="p-0 h-full">
                <ChatInterface />
            </CardContent>
        </Card>
    </div>
  );
}
