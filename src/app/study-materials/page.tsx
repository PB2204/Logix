import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download } from "lucide-react";
import Link from "next/link";

const studyData = [
  {
    semester: 1,
    subjects: [
      {
        name: "Introduction to Programming",
        topics: ["Basics of C++", "Variables and Data Types", "Control Structures"],
      },
      {
        name: "Discrete Mathematics",
        topics: ["Set Theory", "Graph Theory", "Logic and Proofs"],
      },
    ],
  },
  {
    semester: 2,
    subjects: [
      {
        name: "Data Structures",
        topics: ["Arrays and Linked Lists", "Stacks and Queues", "Trees and Graphs"],
      },
      {
        name: "Object-Oriented Programming",
        topics: ["Classes and Objects (Java)", "Inheritance and Polymorphism", "Interfaces and Abstract Classes"],
      },
    ],
  },
  {
    semester: 3,
    subjects: [
        {
            name: "Algorithms",
            topics: ["Sorting Algorithms", "Searching Algorithms", "Dynamic Programming"]
        },
        {
            name: "Database Management Systems",
            topics: ["Relational Model", "SQL", "Normalization"]
        }
    ]
  }
];

export default function StudyMaterialsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Study Materials</h1>
        <p className="text-muted-foreground mt-2">Find all your course materials, organized by semester and subject.</p>
      </div>

      <Tabs defaultValue="semester-1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-1/2 mx-auto">
          {studyData.map(data => (
            <TabsTrigger key={data.semester} value={`semester-${data.semester}`}>Semester {data.semester}</TabsTrigger>
          ))}
        </TabsList>
        
        {studyData.map(data => (
          <TabsContent key={data.semester} value={`semester-${data.semester}`}>
            <Card>
              <CardHeader>
                <CardTitle>Semester {data.semester} Subjects</CardTitle>
                <CardDescription>Select a subject to view its topics and materials.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {data.subjects.map(subject => (
                    <AccordionItem key={subject.name} value={subject.name}>
                      <AccordionTrigger className="text-lg font-medium">{subject.name}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-3 pl-4">
                          {subject.topics.map(topic => (
                             <div key={topic} className="flex justify-between items-center p-3 rounded-md border hover:bg-muted/50 transition-colors">
                               <div className="flex items-center gap-3">
                                 <FileText className="w-5 h-5 text-primary"/>
                                 <span>{topic} Notes.pdf</span>
                               </div>
                               <Button variant="ghost" size="icon" asChild>
                                 <Link href="#" aria-label={`Download ${topic} notes`}>
                                   <Download className="w-5 h-5"/>
                                 </Link>
                               </Button>
                             </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
