import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseIcon, MapPinIcon, ClockIcon, PlusCircleIcon } from "lucide-react";

// Mock job data
const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    postedAt: "2 days ago",
    description: "We're looking for an experienced Frontend Developer to join our team...",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Remote",
    type: "Full-time",
    postedAt: "1 week ago",
    description: "Join our backend team to build scalable APIs and services...",
    skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "New York, NY",
    type: "Contract",
    postedAt: "3 days ago",
    description: "Design beautiful and intuitive user interfaces for our products...",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Full-time",
    postedAt: "Just now",
    description: "Help us build and maintain our cloud infrastructure...",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform"],
  },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Available Jobs</h1>
            <p className="text-muted-foreground">
              Browse and find the perfect job opportunity
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Link href="/jobs/create">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Post a Job
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="text-base mt-1">{job.company}</CardDescription>
                  </div>
                  <Badge variant={job.type === "Full-time" ? "default" : "outline"}>
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPinIcon className="mr-1 h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="mr-1 h-4 w-4" />
                    {job.postedAt}
                  </div>
                </div>
                
                <p className="text-sm line-clamp-2">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/jobs/${job.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}