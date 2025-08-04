
"use client";

import { Link } from '@/components/shared/Link';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Menu, User, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const navLinks = [
    { href: '/study-materials', label: 'Study Materials' },
    { href: '/playground', label: 'Playground' },
    { href: '/chatbot', label: 'AI Chatbot' },
    { href: '/code-analysis', label: 'Code Analysis' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/login');
    } catch (error) {
      console.error("Logout failed", error);
      toast({ title: 'Logout Failed', description: 'Could not log you out. Please try again.', variant: 'destructive' });
    }
  };

  const closeSheet = () => setOpen(false);
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  }

  const AuthNav = () => {
    if (loading) {
      return <div className="flex gap-2 items-center"><div className="h-8 w-16 bg-muted rounded-md animate-pulse"></div><div className="h-8 w-24 bg-muted rounded-md animate-pulse"></div></div>
    }

    if (user && userData) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`} alt={userData.name}/>
                    <AvatarFallback>{getInitials(userData.name)}</AvatarFallback>
                </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <User className="mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <>
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="accent" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </>
    )
  }

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
          <AuthNav />
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
                  {user ? (
                    <>
                      <Button variant="ghost" asChild onClick={() => {closeSheet(); router.push('/profile');}}><Link href="/profile">Profile</Link></Button>
                      <Button variant="accent" onClick={() => {closeSheet(); handleLogout();}}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" asChild onClick={closeSheet}><Link href="/login">Login</Link></Button>
                      <Button variant="accent" asChild onClick={closeSheet}><Link href="/signup">Sign Up</Link></Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
