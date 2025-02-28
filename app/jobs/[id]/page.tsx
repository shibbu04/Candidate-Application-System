"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { BriefcaseIcon, MapPinIcon, ClockIcon, CheckCircleIcon, ArrowLeftIcon } from "lucide-react";

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [matchingCandidates, setMatchingCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch the job details from an API
    // For demo purposes, we'll use mock data
    const fetchJobDetails = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock job data
        const mockJob = {
          id,
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          location: "San Francisco, CA",
          type: "Full-time",
          postedAt: "2 days ago",
          description: "We're looking for an experienced Frontend Developer to join our team to build innovative web applications. You'll work closely with designers, backend developers, and product managers to deliver high-quality user experiences.",
          requirements: "- 5+ years of experience with React and modern JavaScript\n- Strong understanding of TypeScript\n- Experience with Next.js and server-side rendering\n- Proficiency with CSS, Tailwind, and responsive design\n- Knowledge of state management solutions (Redux, Context API)\n- Experience with testing frameworks (Jest, React Testing Library)",
          responsibilities: "- Develop responsive web applications using React and TypeScript\n- Implement pixel-perfect UI designs\n- Optimize application performance\n- Write clean, maintainable code\n- Collaborate with cross-functional teams\n- Mentor junior developers",
          skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Jest"],
          salary: "$120,000 - $150,000",
          benefits: ["Health Insurance", "401(k) Matching", "Remote Work Options", "Professional Development Budget"],
        };
        
        setJob(mockJob);
        
        // Mock matching candidates
        const mockCandidates = [
          {
            id: "1",
            name: "Alex Johnson",
            matchScore: 92,
            skills: ["React", "TypeScript", "Next.js", "Redux", "Node.js"],
            experience: "7 years",
            feedback: "Strong match with excellent React and TypeScript experience. Has worked with Next.js on multiple projects.",
          },
          {
            id: "2",
            name: "Sam Rivera",
            matchScore: 85,
            skills: ["React", "JavaScript", "CSS", "Tailwind", "GraphQL"],
            experience: "5 years",
            feedback: "Good match with solid frontend skills. Could benefit from more TypeScript experience.",
          },
          {
            id: "3",
            name: "Jordan Lee",
            matchScore: 78,
            skills: ["React", "TypeScript", "CSS", "Material UI", "Jest"],
            experience: "4 years",
            feedback: "Decent match with good testing experience. Lacks Next.js experience but has strong React foundations.",
          },
        ];
        
        setMatchingCandidates(mockCandidates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-xl">Loading job details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Job not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/jobs">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <span className="font-medium text-foreground">{job.company}</span>
                <div className="flex items-center">
                  <MapPinIcon className="mr-1 h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="mr-1 h-4 w-4" />
                  {job.postedAt}
                </div>
                <Badge variant={job.type === "Full-time" ? "default" : "outline"}>
                  {job.type}
                </Badge>
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Apply Now
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{job.description}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{job.requirements}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{job.responsibilities}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="bg-primary/10">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Salary Range</h3>
                  <p>{job.salary}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Benefits</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {job.benefits.map((benefit: string) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Now</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Company Info</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <div className="bg-muted h-16 w-16 rounded-md flex items-center justify-center">
                  <BriefcaseIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">{job.company}</h3>
                  <p className="text-sm text-muted-foreground">Technology</p>
                  <Button variant="link" className="p-0 h-auto text-sm">View Company Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="candidates">
            <TabsList>
              <TabsTrigger value="candidates">Matching Candidates</TabsTrigger>
              <TabsTrigger value="similar">Similar Jobs</TabsTrigger>
            </TabsList>
            <TabsContent value="candidates" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Matching Candidates</CardTitle>
                  <CardDescription>
                    Candidates that best match this job based on skills and experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {matchingCandidates.map((candidate) => (
                      <div key={candidate.id} className="flex flex-col md:flex-row gap-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{candidate.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate.experience} experience</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {candidate.skills.map((skill: string) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="md:ml-auto space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-500 text-white">
                              <CheckCircleIcon className="mr-1 h-3 w-3" />
                              {candidate.matchScore}% Match
                            </Badge>
                          </div>
                          <div className="w-full md:w-64">
                            <Progress value={candidate.matchScore} className="h-2" />
                          </div>
                          <p className="text-xs text-muted-foreground">{candidate.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="similar" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Similar Job Postings</CardTitle>
                  <CardDescription>
                    Other jobs that require similar skills and experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Frontend Developer</h3>
                        <p className="text-sm text-muted-foreground">InnovateTech • Remote</p>
                      </div>
                      <Badge variant="outline">85% Similar</Badge>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">React Developer</h3>
                        <p className="text-sm text-muted-foreground">WebSolutions • New York, NY</p>
                      </div>
                      <Badge variant="outline">78% Similar</Badge>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Full Stack Engineer</h3>
                        <p className="text-sm text-muted-foreground">TechStartup • San Francisco, CA</p>
                      </div>
                      <Badge variant="outline">72% Similar</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}