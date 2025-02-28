"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeftIcon, UserIcon, FileTextIcon, BriefcaseIcon, CheckCircleIcon } from "lucide-react";

export default function CandidateDetailsPage() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState<any>(null);
  const [matchingJobs, setMatchingJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch the candidate details from an API
    // For demo purposes, we'll use mock data
    const fetchCandidateDetails = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock candidate data
        const mockCandidate = {
          id,
          name: "John Doe",
          email: "john.doe@example.com",
          linkedinUrl: "https://linkedin.com/in/johndoe",
          skills: ["JavaScript", "React", "TypeScript", "Node.js", "Next.js", "HTML", "CSS", "Tailwind CSS"],
          experience: "Senior Frontend Developer | ABC Tech | 2020-Present\n- Developed responsive web applications using React and TypeScript\n- Implemented state management with Redux and Context API\n- Collaborated with UX/UI designers to implement pixel-perfect designs\n\nFrontend Developer | XYZ Solutions | 2018-2020\n- Built interactive user interfaces with JavaScript and React\n- Worked with REST APIs and GraphQL\n- Participated in code reviews and mentored junior developers",
          education: "Bachelor of Science in Computer Science | University of Technology | 2014-2018",
          summary: "Experienced Frontend Developer with over 5 years of professional experience specializing in React, TypeScript, and modern JavaScript frameworks. Strong focus on creating responsive, user-friendly web applications with clean, maintainable code. Skilled in collaborating with cross-functional teams and mentoring junior developers.",
        };
        
        setCandidate(mockCandidate);
        
        // Mock matching jobs
        const mockJobs = [
          {
            id: "1",
            title: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            matchScore: 92,
            skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
            feedback: "Excellent match for this position. Strong React and TypeScript experience aligns perfectly with job requirements.",
          },
          {
            id: "2",
            title: "React Developer",
            company: "WebSolutions",
            location: "Remote",
            matchScore: 85,
            skills: ["React", "JavaScript", "Redux", "CSS"],
            feedback: "Good match with strong React skills. Could benefit from more experience with their testing frameworks.",
          },
          {
            id: "3",
            title: "Frontend Engineer",
            company: "InnovateTech",
            location: "New York, NY",
            matchScore: 78,
            skills: ["JavaScript", "React", "HTML", "CSS", "Vue.js"],
            feedback: "Decent match but may require some training on their Vue.js requirements.",
          },
        ];
        
        setMatchingJobs(mockJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
        setLoading(false);
      }
    };
    
    fetchCandidateDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-xl">Loading candidate details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Candidate not found</div>
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
            <Link href="/dashboard">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{candidate.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <span className="font-medium text-foreground">{candidate.email}</span>
                {candidate.linkedinUrl && (
                  <Link href={candidate.linkedinUrl} target="_blank" className="text-blue-500 hover:underline">
                    LinkedIn Profile
                  </Link>
                )}
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Contact Candidate
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{candidate.summary}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{candidate.experience}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{candidate.education}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Candidate Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-muted h-16 w-16 rounded-full flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">Frontend Developer</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Application Status</span>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Applied Jobs</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Matches</span>
                    <span>2</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  View Resume
                </Button>
                <Button size="sm">
                  <BriefcaseIcon className="mr-2 h-4 w-4" />
                  Find Jobs
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="matches">
            <TabsList>
              <TabsTrigger value="matches">Job Matches</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>
            <TabsContent value="matches" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Job Matches</CardTitle>
                  <CardDescription>
                    Jobs that best match this candidate's skills and experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {matchingJobs.map((job) => (
                      <div key={job.id} className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                          <div>
                            <h3 className="font-medium text-lg">{job.title}</h3>
                            <p className="text-muted-foreground">{job.company} • {job.location}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {job.skills.map((skill: string) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="md:text-right">
                            <Badge className="bg-green-500 text-white mb-2">
                              <CheckCircleIcon className="mr-1 h-3 w-3" />
                              {job.matchScore}% Match
                            </Badge>
                            <div className="w-full md:w-32">
                              <Progress value={job.matchScore} className="h-2" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 p-4 rounded-md">
                          <p className="text-sm text-muted-foreground">{job.feedback}</p>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button asChild variant="outline" className="mr-2">
                            <Link href={`/jobs/${job.id}`}>View Job</Link>
                          </Button>
                          <Button>Recommend</Button>
                        </div>
                        
                        <Separator />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="applications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application History</CardTitle>
                  <CardDescription>
                    Jobs this candidate has applied for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Senior Frontend Developer</h3>
                        <p className="text-sm text-muted-foreground">TechCorp Inc. • Applied on May 15, 2023</p>
                      </div>
                      <Badge className="bg-green-500 text-white">Matched</Badge>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">React Developer</h3>
                        <p className="text-sm text-muted-foreground">WebSolutions • Applied on May 10, 2023</p>
                      </div>
                      <Badge className="bg-yellow-500 text-white">Under Review</Badge>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Frontend Engineer</h3>
                        <p className="text-sm text-muted-foreground">InnovateTech • Applied on May 5, 2023</p>
                      </div>
                      <Badge className="bg-red-500 text-white">Rejected</Badge>
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