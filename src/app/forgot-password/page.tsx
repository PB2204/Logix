import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/shared/Link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { ChevronLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="w-full max-w-md mx-auto shadow-2xl bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline bg-gradient-primary bg-clip-text text-transparent">Forgot Password?</CardTitle>
          <CardDescription>Enter your email and we'll send you a reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
          <div className="mt-4 text-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
