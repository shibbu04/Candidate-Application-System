import { NextRequest, NextResponse } from 'next/server';
import { findJobsForCandidate } from '@/lib/vector-db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const candidateId = params.id;
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    
    // Find matching jobs for the candidate
    const matchingJobs = await findJobsForCandidate(candidateId, limit);
    
    return NextResponse.json({ matchingJobs });
  } catch (error) {
    console.error('Error finding matching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to find matching jobs' },
      { status: 500 }
    );
  }
}