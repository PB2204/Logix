
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, CodeXml, Bot, BookOpenCheck, ArrowRight, BrainCircuit, Lightbulb, GraduationCap, Bug } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => (
  <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
    <div className="absolute inset-y-0 -left-1/2 -right-1/2 md:-left-1/4 md:-right-1/4 top-0 h-[150%] skew-y-[-12deg] bg-gradient-to-br from-primary/10 to-transparent transform-gpu"></div>
    <div className="container mx-auto text-center px-4 md:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-headline font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-primary animate-glow">
          Write this multicolor gradient
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/80">
          Your AI-Powered Learning Companion for Computer Science. Master complex topics, debug code with ease, and access all your study materials in one place.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <Link href="/playground">Get Started <ArrowRight className="ml-2" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
            <Link href="/study-materials">Explore Materials</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
    const features = [
        {
            icon: <CodeXml className="w-12 h-12 text-primary" />,
            title: 'Code Playground',
            description: 'Analyse and execute code in multiple languages with AI-powered suggestions.',
            href: '/playground',
            cta: 'Open Playground',
        },
        {
            icon: <Bot className="w-12 h-12 text-primary" />,
            title: 'AI Chatbot',
            description: 'Get instant, in-depth answers to your computer science questions.',
            href: '/chatbot',
            cta: 'Ask AI',
        },
        {
            icon: <BookOpenCheck className="w-12 h-12 text-primary" />,
            title: 'Study Materials',
            description: 'Access a curated library of notes, and resources for your coursework.',
            href: '/study-materials',
            cta: 'Browse Materials',
        },
    ];

    return (
        <section className="w-full py-16 md:py-24 bg-background/70 backdrop-blur-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold">Everything You Need to Succeed</h2>
                    <p className="text-muted-foreground mt-2">Logix combines powerful tools into one seamless platform.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <Card
                            key={feature.title}
                            className="flex flex-col text-center items-center transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:shadow-primary/20 border-border/50 bg-gradient-card"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <CardHeader className="flex flex-col items-center gap-4 pb-4">
                                {feature.icon}
                                <CardTitle className="text-2xl font-headline">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col items-center">
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
    );
};

const HowItWorksSection = () => {
    const steps = [
        { title: 'Sign Up', description: 'Create your account to personalize your learning journey.' },
        { title: 'Choose Your Tool', description: 'Dive into the Playground, chat with the AI, or find study materials.' },
        { title: 'Start Learning', description: 'Execute code, get expert answers, and master new concepts instantly.' }
    ];
    return (
        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold">Get Started in Seconds</h2>
                    <p className="text-muted-foreground mt-2">Learning with Logix is simple and intuitive.</p>
                </div>
                <div className="relative grid gap-10 md:grid-cols-3">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block"></div>
                    {steps.map((step, i) => (
                        <div key={i} className="relative flex flex-col items-center text-center">
                            <div className="mb-4 h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold border-4 border-background shadow-lg">
                                {i + 1}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const UseCasesSection = () => {
    const useCases = [
        {
            icon: <GraduationCap className="w-10 h-10 text-accent" />,
            title: 'Ace Your Exams',
            description: 'Use the AI chatbot to get detailed explanations of complex topics and practice with relevant questions. Organize your notes with our study materials.',
        },
        {
            icon: <BrainCircuit className="w-10 h-10 text-accent" />,
            title: 'Prepare for Interviews',
            description: 'Sharpen your coding skills in the playground. Analyze time and space complexity to write optimal solutions for technical interviews.',
        },
        {
            icon: <Bug className="w-10 h-10 text-accent" />,
            title: 'Debug Projects Faster',
            description: "Don't get stuck on a bug for hours. Get AI-powered suggestions to find and fix errors in your code quickly and efficiently.",
        }
    ];
    return (
        <section className="w-full py-16 md:py-24 bg-background/70 backdrop-blur-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold">Supercharge Your Workflow</h2>
                    <p className="text-muted-foreground mt-2">Logix is your secret weapon for any CS challenge.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {useCases.map((uc) => (
                        <Card key={uc.title} className="bg-gradient-card border-border/50 p-6 text-left">
                            <div className="mb-4">{uc.icon}</div>
                            <h3 className="text-2xl font-bold font-headline mb-2">{uc.title}</h3>
                            <p className="text-muted-foreground">{uc.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};


const BenefitsSection = () => {
    const benefits = [
        'AI-Powered Explanations', 'Instant Code Analysis', 'Multi-Language Support',
        'Organized Study Materials', '24/7 Learning Assistance', 'Complexity Analysis'
    ];
    return (
        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-4xl font-headline font-bold mb-10">Unlock Your Full Potential</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {benefits.map(benefit => (
                        <div key={benefit} className="flex items-center gap-2 bg-gradient-card border border-border/50 rounded-full px-5 py-3 text-lg">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <span>{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

const CtaSection = () => (
    <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-accent to-primary rounded-2xl p-10 md:p-16 text-center shadow-2xl">
                <h2 className="text-4xl font-headline font-bold text-white">Ready to Supercharge Your Learning?</h2>
                <p className="text-lg text-white/80 mt-4 max-w-2xl mx-auto">Join Logix today and gain an unfair advantage in your computer science journey. It's free to get started!</p>
                <div className="mt-8">
                    <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 transform hover:scale-105 transition-transform">
                        <Link href="/signup">Sign Up Now <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
            </div>
        </div>
    </section>
)

const Footer = () => (
    <footer className="w-full py-6 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Logix. All rights reserved.</p>
        </div>
    </footer>
);


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-background">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <BenefitsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
