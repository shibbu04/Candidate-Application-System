/**
 * Vector Database Module
 * 
 * This module handles interactions with Pinecone for vector storage and retrieval.
 * It provides functions for storing candidate profiles and job descriptions,
 * and for searching for matches between them.
 */

import { Pinecone } from '@pinecone-database/pinecone';
import { generateEmbedding } from './embeddings';

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
  host: process.env.PINECONE_HOST || '', // Update this line
});

const indexName = process.env.PINECONE_INDEX_NAME || 'candidate-index';

// Define types
export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  linkedinUrl?: string;
  resumeText: string;
  skills: string[];
  experience: string;
  education: string;
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string;
  responsibilities: string;
}

/**
 * Store a candidate profile in the vector database
 */
export async function storeCandidateProfile(profile: CandidateProfile): Promise<void> {
  try {
    // Get the index
    const index = pinecone.index(indexName);
    
    // Generate embedding for the candidate profile
    const text = `
      Name: ${profile.name}
      Skills: ${profile.skills.join(', ')}
      Experience: ${profile.experience}
      Education: ${profile.education}
      Resume: ${profile.resumeText}
    `;
    
    const embedding = await generateEmbedding(text);
    
    // Upsert the vector
    await index.upsert({
      vectors: [
        {
          id: `candidate-${profile.id}`,
          values: embedding,
          metadata: {
            type: 'candidate',
            id: profile.id,
            name: profile.name,
            email: profile.email,
            linkedinUrl: profile.linkedinUrl,
            skills: profile.skills,
          },
        },
      ],
    });
    
    console.log(`Stored candidate profile for ${profile.name}`);
  } catch (error) {
    console.error('Error storing candidate profile:', error);
    throw new Error('Failed to store candidate profile');
  }
}

/**
 * Store a job description in the vector database
 */
export async function storeJobDescription(job: JobDescription): Promise<void> {
  try {
    // Get the index
    const index = pinecone.index(indexName);
    
    // Generate embedding for the job description
    const text = `
      Title: ${job.title}
      Company: ${job.company}
      Description: ${job.description}
      Requirements: ${job.requirements}
      Responsibilities: ${job.responsibilities}
    `;
    
    const embedding = await generateEmbedding(text);
    
    // Upsert the vector
    await index.upsert({
      vectors: [
        {
          id: `job-${job.id}`,
          values: embedding,
          metadata: {
            type: 'job',
            id: job.id,
            title: job.title,
            company: job.company,
          },
        },
      ],
    });
    
    console.log(`Stored job description for ${job.title} at ${job.company}`);
  } catch (error) {
    console.error('Error storing job description:', error);
    throw new Error('Failed to store job description');
  }
}

/**
 * Find matching candidates for a job
 */
export async function findCandidatesForJob(jobId: string, limit: number = 10): Promise<any[]> {
  try {
    // Get the index
    const index = pinecone.index(indexName);
    
    // Get the job vector
    const jobVector = await index.fetch({ ids: [`job-${jobId}`] });
    
    if (!jobVector.vectors[`job-${jobId}`]) {
      throw new Error(`Job with ID ${jobId} not found`);
    }
    
    // Query for similar candidates
    const results = await index.query({
      vector: jobVector.vectors[`job-${jobId}`].values,
      filter: { type: 'candidate' },
      topK: limit,
      includeMetadata: true,
    });
    
    return results.matches.map(match => ({
      candidateId: match.metadata.id,
      name: match.metadata.name,
      email: match.metadata.email,
      linkedinUrl: match.metadata.linkedinUrl,
      skills: match.metadata.skills,
      score: match.score,
    }));
  } catch (error) {
    console.error('Error finding candidates for job:', error);
    throw new Error('Failed to find matching candidates');
  }
}

/**
 * Find matching jobs for a candidate
 */
export async function findJobsForCandidate(candidateId: string, limit: number = 10): Promise<any[]> {
  try {
    // Get the index
    const index = pinecone.index(indexName);
    
    // Get the candidate vector
    const candidateVector = await index.fetch({ ids: [`candidate-${candidateId}`] });
    
    if (!candidateVector.vectors[`candidate-${candidateId}`]) {
      throw new Error(`Candidate with ID ${candidateId} not found`);
    }
    
    // Query for similar jobs
    const results = await index.query({
      vector: candidateVector.vectors[`candidate-${candidateId}`].values,
      filter: { type: 'job' },
      topK: limit,
      includeMetadata: true,
    });
    
    return results.matches.map(match => ({
      jobId: match.metadata.id,
      title: match.metadata.title,
      company: match.metadata.company,
      score: match.score,
    }));
  } catch (error) {
    console.error('Error finding jobs for candidate:', error);
    throw new Error('Failed to find matching jobs');
  }
}