import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="w-full max-w-md mx-auto shadow-2xl bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline bg-gradient-primary bg-clip-text text-transparent">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access your Logix dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline text-accent-light hover:text-accent-dark transition">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
