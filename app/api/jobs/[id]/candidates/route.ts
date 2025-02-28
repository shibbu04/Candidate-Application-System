import { NextRequest, NextResponse } from 'next/server';
import { findCandidatesForJob } from '@/lib/vector-db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id;
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    
    // Find matching candidates for the job
    const matchingCandidates = await findCandidatesForJob(jobId, limit);
    
    return NextResponse.json({ matchingCandidates });
  } catch (error) {
    console.error('Error finding matching candidates:', error);
    return NextResponse.json(
      { error: 'Failed to find matching candidates' },
      { status: 500 }
    );
  }
}