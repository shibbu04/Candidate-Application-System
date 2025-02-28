import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const candidateId = params.id;
    
    // In a real implementation, this would fetch the candidate from a database
    // For demo purposes, we'll return mock data
    
    const candidate = {
      id: candidateId,
      name: "John Doe",
      email: "john.doe@example.com",
      linkedinUrl: "https://linkedin.com/in/johndoe",
      skills: ["JavaScript", "React", "TypeScript", "Node.js", "Next.js", "HTML", "CSS", "Tailwind CSS"],
      experience: "Senior Frontend Developer | ABC Tech | 2020-Present\n- Developed responsive web applications using React and TypeScript\n- Implemented state management with Redux and Context API\n- Collaborated with UX/UI designers to implement pixel-perfect designs\n\nFrontend Developer | XYZ Solutions | 2018-2020\n- Built interactive user interfaces with JavaScript and React\n- Worked with REST APIs and GraphQL\n- Participated in code reviews and mentored junior developers",
      education: "Bachelor of Science in Computer Science | University of Technology | 2014-2018",
      resumeText: "John Doe\nFrontend Developer\njohn.doe@example.com | linkedin.com/in/johndoe | (555) 123-4567\n\nSKILLS\nJavaScript, TypeScript, React, Next.js, Node.js, HTML, CSS, Tailwind CSS, Redux, GraphQL, Jest, Cypress\n\nEXPERIENCE\nSenior Frontend Developer | ABC Tech | 2020-Present\n- Developed responsive web applications using React and TypeScript\n- Implemented state management with Redux and Context API\n- Collaborated with UX/UI designers to implement pixel-perfect designs\n- Mentored junior developers and conducted code reviews\n\nFrontend Developer | XYZ Solutions | 2018-2020\n- Built interactive user interfaces with JavaScript and React\n- Worked with REST APIs and GraphQL\n- Participated in code reviews and mentored junior developers\n- Implemented automated testing with Jest and Cypress\n\nEDUCATION\nBachelor of Science in Computer Science | University of Technology | 2014-2018",
    };
    
    return NextResponse.json({ candidate });
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candidate' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const candidateId = params.id;
    const data = await request.json();
    
    // In a real implementation, this would update the candidate in a database
    // For demo purposes, we'll just return the updated candidate
    
    return NextResponse.json({
      success: true,
      candidate: {
        id: candidateId,
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating candidate:', error);
    return NextResponse.json(
      { error: 'Failed to update candidate' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const candidateId = params.id;
    
    // In a real implementation, this would delete the candidate from a database
    // For demo purposes, we'll just return success
    
    return NextResponse.json({
      success: true,
      message: `Candidate with ID ${candidateId} has been deleted`,
    });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    return NextResponse.json(
      { error: 'Failed to delete candidate' },
      { status: 500 }
    );
  }
}