import { Playground } from "@/components/playground/Playground";

export default function PlaygroundPage() {
    return (
        <div className="container mx-auto py-10 flex flex-col h-[calc(100vh-80px)]">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-headline">Code Playground</h1>
                <p className="text-muted-foreground mt-2">Write, analyze, and execute your code with AI assistance.</p>
            </div>
            <div className="flex-1 min-h-0">
                <Playground />
            </div>
        </div>
    );
}
