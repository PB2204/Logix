
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import React from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  profession: z.enum(["student", "professional", "other"], {
    required_error: "You need to select a profession.",
  }),
  collegeName: z.string().optional(),
  studentDepartment: z.string().optional(),
  semester: z.string().optional(),
  companyName: z.string().optional(),
  professionalDepartment: z.string().optional(),
  designation: z.string().optional(),
  whatYouDo: z.string().optional(),
  whereYouWork: z.string().optional(),
  specify: z.string().optional(),
  country: z.string().min(2, "Country is required."),
  state: z.string().min(2, "State is required."),
  district: z.string().min(2, "District/City is required."),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  phone: z.string().min(10, "Please enter a valid phone number."),
  password: z.string().min(6, "Password must be at least 6 characters."),
}).refine(data => {
    if (data.profession === 'student') {
        return !!data.collegeName && !!data.studentDepartment && !!data.semester;
    }
    return true;
}, {
    message: "Student details are required.",
    path: ['collegeName'],
}).refine(data => {
    if (data.profession === 'professional') {
        return !!data.companyName && !!data.professionalDepartment && !!data.designation;
    }
    return true;
}, {
    message: "Professional details are required.",
    path: ['companyName'],
}).refine(data => {
    if (data.profession === 'other') {
        return !!data.whatYouDo && !!data.whereYouWork && !!data.specify;
    }
    return true;
}, {
    message: "Other details are required.",
    path: ['whatYouDo'],
});

export function SignupForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      country: "",
      state: "",
      district: "",
    },
  });

  const profession = form.watch("profession");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Signup Submitted!",
      description: "Check the console for form data. Full auth coming soon!",
    });
  }

  const renderProfessionFields = () => {
    switch (profession) {
      case "student":
        return (
          <>
            <FormField control={form.control} name="collegeName" render={({ field }) => ( <FormItem> <FormLabel>College Name</FormLabel> <FormControl> <Input placeholder="University of Technology" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="studentDepartment" render={({ field }) => ( <FormItem> <FormLabel>Department</FormLabel> <FormControl> <Input placeholder="Computer Science" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(8)].map((_, i) => (
                        <SelectItem key={i + 1} value={`${i + 1}`}>
                          Semester {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "professional":
        return (
          <>
            <FormField control={form.control} name="companyName" render={({ field }) => ( <FormItem> <FormLabel>Company Name</FormLabel> <FormControl> <Input placeholder="Tech Corp" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="professionalDepartment" render={({ field }) => ( <FormItem> <FormLabel>Department</FormLabel> <FormControl> <Input placeholder="Engineering" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="designation" render={({ field }) => ( <FormItem> <FormLabel>Designation</FormLabel> <FormControl> <Input placeholder="Software Engineer" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
          </>
        );
      case "other":
        return (
          <>
            <FormField control={form.control} name="whatYouDo" render={({ field }) => ( <FormItem> <FormLabel>What do you do?</FormLabel> <FormControl> <Input placeholder="e.g., Researcher, Freelancer" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="whereYouWork" render={({ field }) => ( <FormItem> <FormLabel>Where do you work/study?</FormLabel> <FormControl> <Input placeholder="e.g., Research Institute, Self-employed" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="specify" render={({ field }) => ( <FormItem> <FormLabel>Please Specify</FormLabel> <FormControl> <Input placeholder="Briefly describe your work or activities" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl> <Input placeholder="John Doe" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
          <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl> <Input placeholder="you@example.com" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
        </div>

        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="professional">Working Professional</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderProfessionFields()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Your State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District/City</FormLabel>
                   <FormControl>
                    <Input placeholder="Your District/City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="dob" render={({ field }) => ( <FormItem className="flex flex-col pt-2"> <FormLabel>Date of birth</FormLabel> <Popover> <PopoverTrigger asChild> <FormControl> <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}> {field.value ? format(field.value, "PPP") : <span>Pick a date</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button> </FormControl> </PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
          <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone/Whatsapp Number</FormLabel> <FormControl> <Input placeholder="123-456-7890" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
        </div>
        
        <FormField control={form.control} name="password" render={({ field }) => ( <FormItem> <FormLabel>Password</FormLabel> <FormControl> <Input type="password" placeholder="••••••••" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
        
        <Button type="submit" className="w-full" variant="accent"> Create Account </Button>
      </form>
    </Form>
  );
}
