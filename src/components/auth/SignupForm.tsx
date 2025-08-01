
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, Loader } from "lucide-react";
import React from "react";
import { studyTopics } from "@/content/study-materials";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const strongPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const nameRegex = /^[a-zA-Z\s'-]+$/;
const orgRegex = /^[a-zA-Z0-9\s.,'-]+$/;
const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;


const formSchema = z.object({
  name: z.string().regex(nameRegex, "Please enter a valid name."),
  email: z.string().email("Invalid email address."),
  password: z.string().regex(strongPasswordRegex, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
  confirmPassword: z.string(),
  profession: z.string({ required_error: "Please select a profession." }),
  phone: z.string().regex(phoneRegex, "Please enter a valid 10-digit Indian phone number."),
  organization: z.string().regex(orgRegex, "Please enter a valid organization/college name."),
  department: z.string().regex(orgRegex, "Please enter a valid department name."),
  semester: z.string().optional(),
  areaOfInterest: z.string().optional(),
  gender: z.string({ required_error: "Please select a gender." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


export function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      organization: "",
      department: "",
      phone: "",
    },
  });

  const profession = form.watch("profession");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { email, password, name, phone, profession, organization, department, semester, areaOfInterest, gender } = values;
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Now save the extra details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        profession,
        organization,
        department,
        semester: semester || null,
        areaOfInterest: areaOfInterest || null,
        gender
      });

      toast({
        title: "Account Created!",
        description: "You have successfully signed up. Please login.",
        variant: "default",
      });

      router.push('/login');

    } catch (error: any) {
      console.error("Signup failed:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email address is already in use.";
      }
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., Aarav Sharma" {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="aarav.sharma@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                            <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                    <FormLabel>Retype Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                            <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select your profession" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="professional">Working Professional</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
            )} />
             <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone/WhatsApp Number</FormLabel>
                        <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
             />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="organization" render={({ field }) => ( <FormItem><FormLabel>Organization/College</FormLabel><FormControl><Input placeholder="e.g., IIT Bombay" {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="department" render={({ field }) => ( <FormItem><FormLabel>Department</FormLabel><FormControl><Input placeholder="e.g., Computer Science & Engineering" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        
        {profession === "student" && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Semester</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select Semester" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>{[...Array(8)].map((_, i) => (<SelectItem key={i + 1} value={`${i + 1}`}>Semester {i + 1}</SelectItem>))}</SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <div />
             </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="areaOfInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area of Interest / Specialization</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {studyTopics.map(topic => (
                           <SelectItem key={topic.slug} value={topic.slug}>{topic.title}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
            )} />
            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select your gender" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )} />
        </div>
        
        <Button type="submit" className="w-full !mt-8" variant="accent" disabled={isLoading}>
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </Form>
  );
}
