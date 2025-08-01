
import { studyTopics, getTopicBySlug } from "@/content/study-materials";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from "@/components/shared/Link";
import { ExternalLink, BookOpen, BrainCircuit, Lightbulb, ClipboardCheck, MessageSquareQuote, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Generate static paths for all topics
export async function generateStaticParams() {
  return studyTopics.map((topic) => ({
    slug: topic.slug,
  }));
}

const MarkdownComponents = {
  h2: ({node, ...props}: any) => <h2 className="text-3xl font-headline font-bold mt-10 mb-4 pb-2 border-b border-border" {...props} />,
  h3: ({node, ...props}: any) => <h3 className="text-2xl font-headline font-semibold mt-8 mb-4" {...props} />,
  p: ({node, ...props}: any) => <p className="text-base leading-relaxed text-foreground/80 my-4" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-disc pl-6 space-y-2 my-4 text-foreground/80" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-decimal pl-6 space-y-2 my-4 text-foreground/80" {...props} />,
  li: ({node, ...props}: any) => <li className="pl-2" {...props} />,
  a: ({node, ...props}: any) => <a className="text-accent-light hover:underline" {...props} />,
  code({node, inline, className, children, ...props}: any) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={coldarkDark}
        language={match[1]}
        PreTag="div"
        className="my-4 rounded-md border border-border"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-muted px-1.5 py-1 rounded-md font-code text-sm" {...props}>
        {children}
      </code>
    )
  }
};

export default function StudyTopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);

  if (!topic) {
    notFound();
  }

  const sections = [
    { title: "Core Concepts", icon: BrainCircuit, content: topic.content.coreConcepts },
    { title: "Examples & Use Cases", icon: Lightbulb, content: topic.content.examples },
    { title: "Practice Questions", icon: ClipboardCheck, content: topic.content.practiceQuestions },
    { title: "Quick Summary", icon: MessageSquareQuote, content: topic.content.summary },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
            <Link href="/study-materials" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
                <ChevronLeft className="w-4 h-4 mr-1"/>
                Back to all topics
            </Link>
          <h1 className="text-5xl md:text-6xl font-headline font-bold bg-gradient-primary bg-clip-text text-transparent">{topic.title}</h1>
          <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>{topic.content.introduction}</ReactMarkdown>
        </div>

        {sections.map(section => (
          section.content && (
            <section key={section.title} className="mb-12">
              <h2 className="flex items-center text-3xl font-headline font-bold mt-10 mb-6 pb-2 border-b border-primary/30">
                <section.icon className="w-7 h-7 mr-3 text-primary" />
                {section.title}
              </h2>
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {section.content}
              </ReactMarkdown>
            </section>
          )
        ))}

        {topic.content.furtherReading && (
            <section>
                <h2 className="flex items-center text-3xl font-headline font-bold mt-10 mb-6 pb-2 border-b border-primary/30">
                    <BookOpen className="w-7 h-7 mr-3 text-primary" />
                    Further Reading
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topic.content.furtherReading.map((resource, index) => (
                        <Card key={index} className="bg-gradient-card">
                            <CardContent className="p-4">
                                <h3 className="font-semibold">{resource.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">({resource.type})</p>
                                <Button asChild variant="ghost" size="sm">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                        View Resource <ExternalLink className="w-3 h-3 ml-2"/>
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        )}
      </div>
    </div>
  );
}
