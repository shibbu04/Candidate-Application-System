import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id;
    
    // In a real implementation, this would fetch the job from a database
    // For demo purposes, we'll return mock data
    
    const job = {
      id: jobId,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      postedAt: "2023-05-15",
      description: "We're looking for an experienced Frontend Developer to join our team to build innovative web applications. You'll work closely with designers, backend developers, and product managers to deliver high-quality user experiences.",
      requirements: "- 5+ years of experience with React and modern JavaScript\n- Strong understanding of TypeScript\n- Experience with Next.js and server-side rendering\n- Proficiency with CSS, Tailwind, and responsive design\n- Knowledge of state management solutions (Redux, Context API)\n- Experience with testing frameworks (Jest, React Testing Library)",
      responsibilities: "- Develop responsive web applications using React and TypeScript\n- Implement pixel-perfect UI designs\n- Optimize application performance\n- Write clean, maintainable code\n- Collaborate with cross-functional teams\n- Mentor junior developers",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Jest"],
      salary: "$120,000 - $150,000",
      benefits: ["Health Insurance", "401(k) Matching", "Remote Work Options", "Professional Development Budget"],
    };
    
    return NextResponse.json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id;
    const data = await request.json();
    
    // In a real implementation, this would update the job in a database
    // For demo purposes, we'll just return the updated job
    
    return NextResponse.json({
      success: true,
      job: {
        id: jobId,
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id;
    
    // In a real implementation, this would delete the job from a database
    // For demo purposes, we'll just return success
    
    return NextResponse.json({
      success: true,
      message: `Job with ID ${jobId} has been deleted`,
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}