import { NextRequest, NextResponse } from 'next/server';
import { findJobsForCandidate } from '@/lib/vector-db';
import { evaluateCandidateJobMatch, generateCandidateFeedback } from '@/lib/gemini-ai';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const candidateId = searchParams.get('candidateId');
    
    if (!candidateId) {
      return NextResponse.json(
        { error: 'Missing candidateId parameter' },
        { status: 400 }
      );
    }
    
    // Find matching jobs for the candidate
    const matchingJobs = await findJobsForCandidate(candidateId);
    
    return NextResponse.json({ matchingJobs });
  } catch (error) {
    console.error('Error finding matching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to find matching jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { candidateId, jobId, resumeText, jobDescription } = data;
    
    if (!candidateId || !jobId || !resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Evaluate the match between candidate and job
    const evaluation = await evaluateCandidateJobMatch(resumeText, jobDescription);
    
    // Generate personalized feedback
    const feedback = await generateCandidateFeedback(resumeText, jobDescription);
    
    return NextResponse.json({
      candidateId,
      jobId,
      matchScore: evaluation.score,
      evaluation: evaluation.feedback,
      feedback,
    });
  } catch (error) {
    console.error('Error evaluating candidate-job match:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate match' },
      { status: 500 }
    );
  }
}