import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/auth/ProfileForm";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="w-full max-w-lg mx-auto shadow-xl">
        <CardHeader className="text-center items-center">
          <UserCircle className="w-16 h-16 text-primary mb-2"/>
          <CardTitle className="text-3xl font-headline">My Profile</CardTitle>
          <CardDescription>Update your personal information below</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
