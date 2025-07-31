import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const navLinks = [
    { href: '/study-materials', label: 'Study Materials' },
    { href: '/playground', label: 'Playground' },
    { href: '/chatbot', label: 'AI Chatbot' },
  ];

  return (
    <header className="py-3 px-4 md:px-8 bg-card/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <BrainCircuit className="h-7 w-7" />
          <span className="text-2xl font-bold font-headline">Logix</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex gap-2 items-center">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-6 flex flex-col gap-4">
                  <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
                  <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} asChild><Link href="/signup">Sign Up</Link></Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
