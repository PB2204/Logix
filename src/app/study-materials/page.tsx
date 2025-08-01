
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/shared/Link";
import { studyTopics } from "@/content/study-materials";
import { ArrowRight } from "lucide-react";

export default function StudyMaterialsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Study Materials</h1>
        <p className="text-muted-foreground mt-2">Choose a topic to start your deep dive into computer science.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyTopics.map(topic => (
          <Link key={topic.slug} href={`/study-materials/${topic.slug}`} className="group block">
            <Card className="h-full bg-gradient-card transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:shadow-primary/20 border-border/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors">{topic.title}</CardTitle>
                    <CardDescription className="mt-2">{topic.description}</CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
