import { NextRequest, NextResponse } from 'next/server';
import { parseResumePDF } from '@/lib/resume-parser';
import { storeCandidateProfile } from '@/lib/vector-db';
import { summarizeResume } from '@/lib/gemini-ai';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;
    const skills = formData.get('skills') as string;
    const experience = formData.get('experience') as string;
    const education = formData.get('education') as string;
    const resumeFile = formData.get('resume') as File;
    
    if (!name || !email || !skills || !experience || !education) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate a unique ID for the candidate
    const candidateId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Parse resume if provided
    let resumeText = '';
    if (resumeFile) {
      const parsedResume = await parseResumePDF(resumeFile);
      resumeText = parsedResume.fullText;
    }
    
    // Create candidate profile
    const candidateProfile = {
      id: candidateId,
      name,
      email,
      linkedinUrl: linkedinUrl || undefined,
      resumeText,
      skills: skills.split(',').map(skill => skill.trim()),
      experience,
      education,
    };
    
    // Store candidate profile in vector database
    await storeCandidateProfile(candidateProfile);
    
    // Generate resume summary using Gemini AI
    const summary = await summarizeResume(resumeText || `
      Name: ${name}
      Skills: ${skills}
      Experience: ${experience}
      Education: ${education}
    `);
    
    return NextResponse.json({
      success: true,
      candidateId,
      summary,
    });
  } catch (error) {
    console.error('Error processing candidate application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}