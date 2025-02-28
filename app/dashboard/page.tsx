"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { UserIcon, BriefcaseIcon, FileTextIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon } from "lucide-react";

// Mock data for the dashboard
const applications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    status: "Matched",
    appliedDate: "2023-05-15",
    matchScore: 92,
    feedback: "Strong match for technical skills. Consider highlighting more leadership experience.",
  },
  {
    id: 2,
    jobTitle: "Full Stack Engineer",
    company: "InnovateTech",
    status: "Under Review",
    appliedDate: "2023-05-10",
    matchScore: 78,
    feedback: "Good technical background. Missing some required backend experience with Node.js.",
  },
  {
    id: 3,
    jobTitle: "React Developer",
    company: "WebSolutions",
    status: "Rejected",
    appliedDate: "2023-05-05",
    matchScore: 65,
    feedback: "Missing key experience with state management libraries and testing frameworks.",
  },
];

const skillMatchData = [
  { name: "JavaScript", score: 95 },
  { name: "React", score: 90 },
  { name: "TypeScript", score: 85 },
  { name: "Node.js", score: 70 },
  { name: "CSS/SCSS", score: 80 },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Matched":
        return "bg-green-500 text-white";
      case "Under Review":
        return "bg-yellow-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Matched":
        return <CheckCircleIcon className="h-4 w-4" />;
      case "Under Review":
        return <AlertCircleIcon className="h-4 w-4" />;
      case "Rejected":
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Candidate Dashboard</h1>
            <p className="text-muted-foreground">
              Track your applications and job matches
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Find More Jobs
          </Button>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold">{applications.length}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">
                      {applications.filter(app => app.status === "Matched").length}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Match Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">
                      {Math.round(applications.reduce((acc, app) => acc + app.matchScore, 0) / applications.length)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Your most recent job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{app.jobTitle}</p>
                          <p className="text-sm text-muted-foreground">{app.company}</p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(app.status)}
                            {app.status}
                          </span>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Skill Match Analysis</CardTitle>
                  <CardDescription>How your skills match with job requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillMatchData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>Track the status of all your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {applications.map((app) => (
                    <div key={app.id} className="space-y-4">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                        <div>
                          <h3 className="font-medium text-lg">{app.jobTitle}</h3>
                          <p className="text-muted-foreground">{app.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                          <Badge className={getStatusColor(app.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(app.status)}
                              {app.status}
                            </span>
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">Match Score</p>
                          <p className="text-sm font-medium">{app.matchScore}%</p>
                        </div>
                        <Progress value={app.matchScore} className="h-2" />
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-md">
                        <p className="text-sm font-medium mb-1">AI Feedback:</p>
                        <p className="text-sm text-muted-foreground">{app.feedback}</p>
                      </div>
                      
                      <Separator />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matches" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Matches</CardTitle>
                <CardDescription>Jobs that match your skills and experience</CardDescription>
              </CardHeader>
              <CardContent>
                {applications.filter(app => app.status === "Matched").length > 0 ? (
                  <div className="space-y-6">
                    {applications
                      .filter(app => app.status === "Matched")
                      .map((app) => (
                        <div key={app.id} className="space-y-4">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                            <div>
                              <h3 className="font-medium text-lg">{app.jobTitle}</h3>
                              <p className="text-muted-foreground">{app.company}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500 text-white">
                                <span className="flex items-center gap-1">
                                  <CheckCircleIcon className="h-4 w-4" />
                                  {app.matchScore}% Match
                                </span>
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="bg-muted/50 p-4 rounded-md">
                            <p className="text-sm font-medium mb-1">AI Feedback:</p>
                            <p className="text-sm text-muted-foreground">{app.feedback}</p>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button variant="outline" className="mr-2">View Details</Button>
                            <Button>Contact Recruiter</Button>
                          </div>
                          
                          <Separator />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <BriefcaseIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No matches yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Apply to more jobs to increase your chances of finding a match.
                    </p>
                    <Button>Browse Jobs</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}