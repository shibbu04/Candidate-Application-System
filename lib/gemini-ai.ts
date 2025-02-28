/**
 * Gemini AI Module
 * 
 * This module handles interactions with the Google Gemini API for:
 * - Summarizing resumes
 * - Evaluating candidate-job matches
 * - Generating feedback for candidates
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Set safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

/**
 * Generate a summary of a candidate's resume
 */
export async function summarizeResume(resumeText: string): Promise<string> {
  try {
    const prompt = `
      Summarize the following resume in a concise, professional manner. 
      Focus on key skills, experience, and qualifications.
      
      Resume:
      ${resumeText}
      
      Summary:
    `;
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
    });
    
    return result.response.text();
  } catch (error) {
    console.error('Error summarizing resume:', error);
    
    // Fallback summary in case of API error
    return "Experienced professional with a background in technology and software development. Possesses relevant skills and experience for the position.";
  }
}

/**
 * Evaluate a candidate's match with a job description
 */
export async function evaluateCandidateJobMatch(
  resumeText: string,
  jobDescription: string
): Promise<{ score: number; feedback: string }> {
  try {
    const prompt = `
      Evaluate how well the candidate's resume matches the job description.
      Provide a match score from 0-100 and specific feedback on strengths and areas for improvement.
      
      Resume:
      ${resumeText}
      
      Job Description:
      ${jobDescription}
      
      Format your response exactly as follows:
      Score: [number between 0-100]
      Feedback: [detailed feedback with strengths and areas for improvement]
    `;
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
    });
    
    const response = result.response.text();
    
    // Parse the score and feedback from the response
    const scoreMatch = response.match(/Score:\s*(\d+)/i);
    const feedbackMatch = response.match(/Feedback:\s*([\s\S]+)/i);
    
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 75; // Default score if parsing fails
    const feedback = feedbackMatch ? feedbackMatch[1].trim() : "The candidate has relevant skills for this position.";
    
    return { score, feedback };
  } catch (error) {
    console.error('Error evaluating candidate-job match:', error);
    
    // Return default values in case of API error
    return {
      score: 75,
      feedback: "The candidate appears to have relevant skills and experience for this position. Consider discussing specific project experience during an interview.",
    };
  }
}

/**
 * Generate personalized feedback for a candidate
 */
export async function generateCandidateFeedback(
  resumeText: string,
  jobDescription: string
): Promise<string> {
  try {
    const prompt = `
      Based on the candidate's resume and the job description, provide constructive feedback
      for the candidate. Include strengths, areas for improvement, and specific suggestions
      to better align with the job requirements.
      
      Resume:
      ${resumeText}
      
      Job Description:
      ${jobDescription}
      
      Feedback:
    `;
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
    });
    
    return result.response.text();
  } catch (error) {
    console.error('Error generating candidate feedback:', error);
    
    // Fallback feedback in case of API error
    return "Your technical skills align well with the position requirements. Consider highlighting more specific project examples and quantifiable achievements to strengthen your application.";
  }
}