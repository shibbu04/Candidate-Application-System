import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { BriefcaseIcon, FileTextIcon, UserIcon, SearchIcon, BarChartIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
            Candidate Application System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            An AI-powered platform for candidate applications, resume parsing, and intelligent matching with job descriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <UserIcon className="h-6 w-6 text-blue-500" />
                For Candidates
              </CardTitle>
              <CardDescription>
                Submit your application and get AI-powered feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Submit your resume, skills, and experience to be matched with the perfect job opportunities.
              </p>
              <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Link href="/apply">Apply Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <BriefcaseIcon className="h-6 w-6 text-purple-500" />
                For Recruiters
              </CardTitle>
              <CardDescription>
                Post jobs and find the best candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Create job descriptions and let our AI match you with the most qualified candidates.
              </p>
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link href="/jobs/create">Post a Job</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="features" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5 text-blue-500" />
                    Resume Parsing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically extract key information from resumes to streamline the application process.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SearchIcon className="h-5 w-5 text-purple-500" />
                    AI Matching
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use advanced AI to match candidates with job descriptions based on skills and experience.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-pink-500" />
                    Candidate Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get AI-generated scores and feedback to help identify the best candidates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="how-it-works" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>The Application Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li>Candidates submit their information and resume</li>
                  <li>Our system parses the resume to extract key information</li>
                  <li>The data is processed and stored in a vector database</li>
                  <li>AI matches candidates with relevant job descriptions</li>
                  <li>Recruiters receive ranked candidates with AI-generated feedback</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="technology" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Powered by Modern Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                  <li>Next.js for a fast, responsive frontend</li>
                  <li>PDF parsing for resume text extraction</li>
                  <li>Vector database (Pinecone) for semantic search</li>
                  <li>Google Gemini API for AI-powered analysis and feedback</li>
                  <li>Beautiful UI with Tailwind CSS and shadcn/ui components</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}