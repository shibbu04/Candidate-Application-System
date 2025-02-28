/**
 * Resume Parser Module
 * 
 * This module handles the parsing of resume files (PDF) and extraction of relevant information.
 * In a production environment, this would use more sophisticated NLP techniques.
 */

import pdfParse from 'pdf-parse';

// Define types for parsed resume data
export interface ParsedResume {
  fullText: string;
  skills: string[];
  experience: string;
  education: string;
  contactInfo: {
    name?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
  };
}

/**
 * Parse a PDF resume file and extract relevant information
 */
export async function parseResumePDF(file: File): Promise<ParsedResume> {
  try {
    // In a real implementation, we would use pdf-parse to extract text
    // For demo purposes, we'll simulate the parsing
    
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // This would be the actual PDF parsing in a real implementation
    // const pdfData = await PDFExtract(new Uint8Array(arrayBuffer));
    // const text = pdfData.text;
    
    // Simulate extracted text for demo
    const text = `
      John Doe
      Frontend Developer
      john.doe@example.com | linkedin.com/in/johndoe | (555) 123-4567
      
      SKILLS
      JavaScript, TypeScript, React, Next.js, Node.js, HTML, CSS, Tailwind CSS, Redux, GraphQL, Jest, Cypress
      
      EXPERIENCE
      Senior Frontend Developer | ABC Tech | 2020-Present
      - Developed responsive web applications using React and TypeScript
      - Implemented state management with Redux and Context API
      - Collaborated with UX/UI designers to implement pixel-perfect designs
      - Mentored junior developers and conducted code reviews
      
      Frontend Developer | XYZ Solutions | 2018-2020
      - Built interactive user interfaces with JavaScript and React
      - Worked with REST APIs and GraphQL
      - Participated in code reviews and mentored junior developers
      - Implemented automated testing with Jest and Cypress
      
      EDUCATION
      Bachelor of Science in Computer Science | University of Technology | 2014-2018
    `;
    
    // Extract skills (simple keyword extraction)
    const skillsMatch = text.match(/SKILLS\s*([\s\S]*?)(?=EXPERIENCE|$)/i);
    const skillsText = skillsMatch ? skillsMatch[1].trim() : '';
    const skills = skillsText.split(/,\s*|\s*\|\s*|\s*•\s*/).filter(Boolean);
    
    // Extract experience
    const experienceMatch = text.match(/EXPERIENCE\s*([\s\S]*?)(?=EDUCATION|$)/i);
    const experience = experienceMatch ? experienceMatch[1].trim() : '';
    
    // Extract education
    const educationMatch = text.match(/EDUCATION\s*([\s\S]*?)(?=$)/i);
    const education = educationMatch ? educationMatch[1].trim() : '';
    
    // Extract contact info (simple regex patterns)
    const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
    const phoneMatch = text.match(/(\(\d{3}\)\s*\d{3}[-\s]?\d{4}|\d{3}[-\s]?\d{3}[-\s]?\d{4})/i);
    const linkedinMatch = text.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
    
    // Extract name (first line or two, simplified)
    const nameMatch = text.trim().split('\n')[0];
    
    return {
      fullText: text,
      skills,
      experience,
      education,
      contactInfo: {
        name: nameMatch,
        email: emailMatch ? emailMatch[1] : undefined,
        phone: phoneMatch ? phoneMatch[1] : undefined,
        linkedin: linkedinMatch ? linkedinMatch[1] : undefined,
      },
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw new Error('Failed to parse resume');
  }
}

/**
 * Extract keywords from text (skills, technologies, etc.)
 */
export function extractKeywords(text: string): string[] {
  // In a real implementation, this would use NLP techniques
  // For demo purposes, we'll use a simple approach with common tech keywords
  
  const commonTechKeywords = [
    'javascript', 'typescript', 'react', 'angular', 'vue', 'node', 'express', 'next.js', 'gatsby',
    'html', 'css', 'sass', 'less', 'tailwind', 'bootstrap', 'material-ui', 'styled-components',
    'redux', 'mobx', 'context api', 'graphql', 'rest', 'api', 'aws', 'azure', 'gcp',
    'docker', 'kubernetes', 'ci/cd', 'git', 'github', 'gitlab', 'bitbucket',
    'jest', 'mocha', 'chai', 'cypress', 'testing library', 'enzyme',
    'python', 'java', 'c#', 'c++', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin',
    'sql', 'mongodb', 'postgresql', 'mysql', 'oracle', 'firebase', 'dynamodb',
    'agile', 'scrum', 'kanban', 'jira', 'confluence', 'trello',
  ];
  
  const keywords: string[] = [];
  const lowerText = text.toLowerCase();
  
  commonTechKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      keywords.push(keyword);
    }
  });
  
  return keywords;
}