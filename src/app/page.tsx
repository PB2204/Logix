
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, ArrowRight, BrainCircuit, Bug, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { AnimatedShapes } from '@/components/shared/AnimatedShapes';

const HeroSection = () => (
  <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
    <div className="container mx-auto text-center px-4 md:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-headline font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-primary">
          Logix : Learn Logically
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
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>,
            title: 'Code Playground',
            description: 'Analyse and execute code in multiple languages with AI-powered suggestions.',
            href: '/playground',
            cta: 'Open Playground',
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2"/><path d="M12 2v2"/><path d="M9 16.5v-1.5a1.5 1.5 0 0 1 3 0V17a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1Z"/></svg>,
            title: 'AI Chatbot',
            description: 'Get instant, in-depth answers to your computer science questions.',
            href: '/chatbot',
            cta: 'Ask AI',
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
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
                    <h2 className="text-4xl font-headline font-bold">All-in-One Tools to Learn Smarter</h2>
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

const PopularTopicsSection = () => {
    const topics = [
        { name: "Data Structures", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg> },
        { name: "Algorithms", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg> },
        { name: "Operating Systems", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line><line x1="6" y1="14" x2="6" y2="14"></line><line x1="10" y1="14" x2="10" y2="14"></line></svg> },
        { name: "Databases", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg> },
        { name: "Networking", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 17h-4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4Z"/><path d="M4 17h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H4Z"/><path d="M12 19V5"/></svg> },
        { name: "Machine Learning", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2"/></svg> },
    ];
    return (
        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold">Explore Popular Topics</h2>
                    <p className="text-muted-foreground mt-2">Dive into key computer science concepts with our curated resources.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {topics.map((topic) => (
                        <Card key={topic.name} className="flex flex-col items-center justify-center p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="text-primary mb-3">{topic.icon}</div>
                            <h3 className="text-sm font-semibold text-center">{topic.name}</h3>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HowItWorksSection = () => {
    const steps = [
        { title: 'Sign Up for Free', description: 'Create your account to personalize your learning journey.' },
        { title: 'Choose Your Tool', description: 'Dive into the Playground, chat with the AI, or find study materials.' },
        { title: 'Start Mastering', description: 'Execute code, get expert answers, and conquer new concepts instantly.' }
    ];
    return (
        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold">Get Started in Seconds</h2>
                    <p className="text-muted-foreground mt-2">Learning with Logix is simple and intuitive.</p>
                </div>
                <div className="relative grid gap-10 md:grid-cols-3">
                    <div className="absolute top-8 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block"></div>
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

const TestimonialsSection = () => {
    const testimonials = [
        { name: 'Anjali Singh', role: 'B.Tech Student, Sarala Birla University', text: 'This AI has been a game-changer for my assignments. The code analysis feature helps me find bugs I would have missed otherwise. Invaluable for any computer science student.' },
        { name: 'Vikram Reddy', role: 'M.Tech Student, Vellore Institute of Technology', text: 'The AI chatbot is fantastic. It explains complex concepts like recursion and dynamic programming in a way that is easy to understand. The playground is also great for practice.' },
        { name: 'Sneha Patel', role: 'B.E Student, Birla Institute of Technology', text: 'I love how everything is in one place. The study materials are well-organized, and the AI tools make learning interactive and fun. Highly recommend to all my peers.' },
    ];
    return (
        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold">Loved by Students Everywhere</h2>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name} className="bg-gradient-card border-border/50 p-6 flex flex-col">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-4 flex-grow">&ldquo;{testimonial.text}&rdquo;</p>
                            <div>
                                <h3 className="font-bold">{testimonial.name}</h3>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
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
                            <Check className="w-6 h-6 text-green-500" />
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
                <h2 className="text-4xl font-headline font-bold text-white">Stop Searching. Start Mastering.</h2>
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
        <div className="container mx-auto text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} Logix. All Rights Reserved.</p>
            <p className="flex items-center justify-center gap-1 mt-1">
                Developed & Maintained by
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <span>Pabitra Banerjee</span>
            </p>
        </div>
    </footer>
);


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-background">
      <HeroSection />
      <FeaturesSection />
      <PopularTopicsSection />
      <HowItWorksSection />
      <UseCasesSection />
      <TestimonialsSection />
      <BenefitsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
