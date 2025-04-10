
// Simple AI content generation service
// In a production app, this would connect to a real AI API

interface ContentGenerationParams {
  documentContent: string;
  tone?: string;
  length?: string;
  creativity?: number;
  includeHeadings?: boolean;
  includeBullets?: boolean;
  includeFaq?: boolean;
  includeConclusion?: boolean;
  includeCta?: boolean;
}

export const generateContentFromDocument = async (params: ContentGenerationParams): Promise<string> => {
  const {
    documentContent,
    tone = "professional",
    length = "1000",
    creativity = 0.7,
  } = params;

  // For demo purposes, we'll extract key information from the document
  // and create a simple structured response based on it
  
  // Extract potential topics (words that appear multiple times)
  const words = documentContent.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  const wordFrequency: Record<string, number> = {};
  
  words.forEach(word => {
    if (word.length > 4) { // Only count words longer than 4 characters
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });
  
  // Get the top 5 most frequent words as potential topics
  const topics = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  // Extract sentences for potential key points
  const sentences = documentContent.split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 200)
    .slice(0, 10);
  
  // Create a simulated AI-generated response based on content analysis
  const generatedContent = `# Analysis of Document

## Key Topics Identified
${topics.map(topic => `- ${topic.charAt(0).toUpperCase() + topic.slice(1)}`).join('\n')}

## Main Points
${sentences.slice(0, 3).map(sentence => `- ${sentence}`).join('\n\n')}

## Content Summary
This ${tone} analysis is based on the provided document that contains approximately ${documentContent.length} characters. 
The document appears to discuss topics related to ${topics.slice(0, 3).join(", ")}.

## Detailed Analysis
${sentences.slice(3, 6).map((sentence, i) => `### Point ${i+1}\n${sentence}`).join('\n\n')}

## Recommendations
Based on the content analysis:

1. Focus on the key topics identified above
2. Consider expanding on ${topics[0]} and ${topics[1]} in future content
3. Address any gaps in information about ${topics[topics.length-1]}

${params.includeConclusion ? `## Conclusion\nThe document provides valuable information on ${topics.join(", ")}. With some refinement focused on the recommendations above, it could be improved significantly.` : ''}

${params.includeCta ? `## Next Steps\nReview the analysis and implement the suggested recommendations to enhance the document's effectiveness.` : ''}`;

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return generatedContent;
};

export const checkAIDetection = async (content: string): Promise<number> => {
  // In a real implementation, this would call an AI detection API
  // For demo purposes, we'll return a random score between 5-18%
  await new Promise(resolve => setTimeout(resolve, 1500));
  return Math.floor(Math.random() * 14) + 5;
};
