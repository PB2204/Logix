import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, CodeXml, BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <CodeXml className="w-10 h-10 text-primary" />,
      title: 'Code Playground',
      description: 'Analyse and execute code in multiple languages with AI-powered suggestions.',
      href: '/playground',
      cta: 'Open Playground',
    },
    {
      icon: <Bot className="w-10 h-10 text-primary" />,
      title: 'AI Chatbot',
      description: 'Get instant, in-depth answers to your computer science questions.',
      href: '/chatbot',
      cta: 'Ask AI',
    },
    {
      icon: <BookOpenCheck className="w-10 h-10 text-primary" />,
      title: 'Study Materials',
      description: 'Access a curated library of notes, and resources for your coursework.',
      href: '/study-materials',
      cta: 'Browse Materials',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background"></div>
        <div className="container mx-auto text-center px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-primary animate-glow">
              Logix
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80">
              Your AI-Powered Learning Companion for Computer Science
            </p>
            <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
              Master complex topics, debug code with ease, and access all your study materials in one place.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/playground">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/study-materials">Explore Materials</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <Card 
                key={feature.title} 
                className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:shadow-primary/20 border-border/50 bg-gradient-card"
                style={{animationDelay: `${i * 150}ms`}}
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  {feature.icon}
                  <CardTitle className="text-2xl font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground flex-1">{feature.description}</p>
                  <Button className="mt-6 w-full" variant="secondary" asChild>
                    <Link href={feature.href}>{feature.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full py-6 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Logix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
