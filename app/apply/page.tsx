"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  linkedinUrl: z.string().url({ message: "Please enter a valid LinkedIn URL." }).optional().or(z.literal("")),
  skills: z.string().min(5, { message: "Please list at least some of your skills." }),
  experience: z.string().min(10, { message: "Please provide some details about your experience." }),
  education: z.string().min(5, { message: "Please provide some details about your education." }),
});

export default function ApplyPage() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parsedText, setParsedText] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      linkedinUrl: "",
      skills: "",
      experience: "",
      education: "",
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setIsUploading(true);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadProgress(100);
          
          // Parse the PDF
          parseResume(selectedFile);
        }
      }, 100);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file",
        description: "Please upload a PDF file.",
      });
    }
  };

  const parseResume = async (file: File) => {
    setIsParsing(true);
    
    try {
      // In a real implementation, this would call an API endpoint to parse the PDF
      // For demo purposes, we'll simulate the parsing
      const formData = new FormData();
      formData.append("file", file);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate parsed text
      const simulatedParsedText = `
        SKILLS: JavaScript, React, TypeScript, Node.js, Next.js, HTML, CSS, Tailwind CSS
        
        EXPERIENCE:
        Senior Frontend Developer | ABC Tech | 2020-Present
        - Developed responsive web applications using React and TypeScript
        - Implemented state management with Redux and Context API
        - Collaborated with UX/UI designers to implement pixel-perfect designs
        
        Frontend Developer | XYZ Solutions | 2018-2020
        - Built interactive user interfaces with JavaScript and React
        - Worked with REST APIs and GraphQL
        - Participated in code reviews and mentored junior developers
        
        EDUCATION:
        Bachelor of Science in Computer Science | University of Technology | 2014-2018
      `;
      
      setParsedText(simulatedParsedText);
      
      // Auto-fill form fields based on parsed text
      const skills = simulatedParsedText.match(/SKILLS:(.*?)(?=EXPERIENCE)/s)?.[1].trim() || "";
      const experience = simulatedParsedText.match(/EXPERIENCE:(.*?)(?=EDUCATION)/s)?.[1].trim() || "";
      const education = simulatedParsedText.match(/EDUCATION:(.*)/s)?.[1].trim() || "";
      
      form.setValue("skills", skills);
      form.setValue("experience", experience);
      form.setValue("education", education);
      
      toast({
        title: "Resume parsed successfully",
        description: "We've extracted information from your resume.",
      });
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast({
        variant: "destructive",
        title: "Error parsing resume",
        description: "There was an error parsing your resume. Please try again or enter your information manually.",
      });
    } finally {
      setIsParsing(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would call an API endpoint to submit the application
      console.log("Form values:", values);
      console.log("Resume file:", file);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application submitted!",
        description: "Your application has been successfully submitted.",
      });
      
      // Redirect to success page
      window.location.href = "/apply/success";
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        variant: "destructive",
        title: "Error submitting application",
        description: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Candidate Application</h1>
          <p className="text-muted-foreground text-center mb-8">
            Submit your information and resume to be matched with job opportunities
          </p>
          
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please provide your contact details and upload your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormLabel>Resume (PDF)</FormLabel>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      {!file ? (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">
                            Drag and drop your resume here, or click to browse
                          </p>
                          <Input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                            id="resume-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("resume-upload")?.click()}
                          >
                            Select PDF File
                          </Button>
                        </>
                      ) : (
                        <div className="space-y-4">
                          {isUploading ? (
                            <>
                              <p className="text-muted-foreground mb-2">Uploading {file.name}</p>
                              <Progress value={uploadProgress} className="h-2 w-full" />
                            </>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <p>{file.name} uploaded successfully</p>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setFile(null);
                                  setUploadProgress(0);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                          
                          {isParsing && (
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <p>Parsing resume...</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Skills & Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      {parsedText ? "We've extracted this information from your resume. Please review and edit if needed." : "Please provide details about your skills and experience."}
                    </p>
                    
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="JavaScript, React, Node.js, etc."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            List your technical and soft skills, separated by commas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Experience</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your work experience, including job titles, companies, and responsibilities."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your educational background, including degrees, institutions, and graduation years."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}