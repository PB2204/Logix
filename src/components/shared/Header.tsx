
"use client";

import { Link } from '@/components/shared/Link';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    { href: '/study-materials', label: 'Study Materials' },
    { href: '/playground', label: 'Playground' },
    { href: '/chatbot', label: 'AI Chatbot' },
  ];

  const closeSheet = () => setOpen(false);

  return (
    <header className="py-3 px-4 md:px-8 bg-background/50 backdrop-blur-sm sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:brightness-125 transition-all">
          <BrainCircuit className="h-7 w-7" />
          <span className="text-2xl font-bold font-headline bg-gradient-primary bg-clip-text text-transparent">Logix</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex gap-2 items-center">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="accent" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-card">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeSheet} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-6 flex flex-col gap-4">
                  <Button variant="ghost" asChild onClick={closeSheet}><Link href="/login">Login</Link></Button>
                  <Button variant="accent" asChild onClick={closeSheet}><Link href="/signup">Sign Up</Link></Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
