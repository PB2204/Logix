import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/shared/Link";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="w-full max-w-lg mx-auto shadow-xl bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline bg-gradient-primary bg-clip-text text-transparent">Create an Account</CardTitle>
          <CardDescription>Join Logix and supercharge your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-accent-light hover:text-accent-dark transition">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
