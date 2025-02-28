import { NextRequest, NextResponse } from 'next/server';
import { storeJobDescription, findCandidatesForJob } from '@/lib/vector-db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Extract job data
    const { title, company, location, type, description, requirements, responsibilities } = data;
    
    if (!title || !company || !description || !requirements || !responsibilities) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate a unique ID for the job
    const jobId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Create job description
    const jobDescription = {
      id: jobId,
      title,
      company,
      description,
      requirements,
      responsibilities,
    };
    
    // Store job description in vector database
    await storeJobDescription(jobDescription);
    
    // Find matching candidates
    const matchingCandidates = await findCandidatesForJob(jobId);
    
    return NextResponse.json({
      success: true,
      jobId,
      matchingCandidates,
    });
  } catch (error) {
    console.error('Error processing job posting:', error);
    return NextResponse.json(
      { error: 'Failed to process job posting' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, this would fetch jobs from a database
    // For demo purposes, we'll return mock data
    
    const jobs = [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        postedAt: '2023-05-15',
        description: 'We\'re looking for an experienced Frontend Developer to join our team...',
        requirements: 'React, TypeScript, Next.js, 5+ years experience',
        responsibilities: 'Develop responsive web applications, collaborate with designers',
      },
      {
        id: '2',
        title: 'Backend Engineer',
        company: 'DataSystems',
        location: 'Remote',
        type: 'Full-time',
        postedAt: '2023-05-10',
        description: 'Join our backend team to build scalable APIs and services...',
        requirements: 'Node.js, Python, PostgreSQL, AWS, 3+ years experience',
        responsibilities: 'Design and implement APIs, optimize database performance',
      },
      {
        id: '3',
        title: 'UX/UI Designer',
        company: 'Creative Solutions',
        location: 'New York, NY',
        type: 'Contract',
        postedAt: '2023-05-05',
        description: 'Design beautiful and intuitive user interfaces for our products...',
        requirements: 'Figma, Adobe XD, User Research, 2+ years experience',
        responsibilities: 'Create wireframes and prototypes, conduct user testing',
      },
    ];
    
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}