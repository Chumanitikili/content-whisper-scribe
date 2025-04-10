
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
    includeHeadings = true,
    includeBullets = true,
    includeFaq = false,
    includeConclusion = true,
    includeCta = true
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
  let generatedContent = `# Analysis of Document\n\n`;

  if (includeHeadings) {
    generatedContent += `## Key Topics Identified\n`;
    generatedContent += topics.map(topic => `- ${topic.charAt(0).toUpperCase() + topic.slice(1)}`).join('\n') + '\n\n';
  }

  if (includeBullets) {
    generatedContent += `## Main Points\n`;
    generatedContent += sentences.slice(0, 3).map(sentence => `- ${sentence}`).join('\n\n') + '\n\n';
  }

  generatedContent += `## Content Summary\nThis ${tone} analysis is based on the provided document that contains approximately ${documentContent.length} characters.\nThe document appears to discuss topics related to ${topics.slice(0, 3).join(", ")}.\n\n`;

  if (includeHeadings) {
    generatedContent += `## Detailed Analysis\n`;
    generatedContent += sentences.slice(3, 6).map((sentence, i) => `### Point ${i+1}\n${sentence}`).join('\n\n') + '\n\n';
  }

  generatedContent += `## Recommendations\nBased on the content analysis:\n\n`;
  generatedContent += `1. Focus on the key topics identified above\n`;
  generatedContent += `2. Consider expanding on ${topics[0] || "identified topics"} and ${topics[1] || "related concepts"} in future content\n`;
  generatedContent += `3. Address any gaps in information about ${topics[topics.length-1] || "key areas"}\n\n`;

  if (includeFaq) {
    generatedContent += `## Frequently Asked Questions\n\n`;
    generatedContent += `### Q: What is the main focus of this document?\nA: The document primarily focuses on ${topics[0] || "the provided subject"} and related topics.\n\n`;
    generatedContent += `### Q: How can this content be improved?\nA: The content could be enhanced by expanding on ${topics[1] || "key concepts"} and providing more concrete examples.\n\n`;
    generatedContent += `### Q: What audience is this content targeted at?\nA: Based on the analysis, this content seems to be targeted at readers interested in ${topics.slice(0, 2).join(" and ") || "the subject matter"}.\n\n`;
  }

  if (includeConclusion) {
    generatedContent += `## Conclusion\nThe document provides valuable information on ${topics.join(", ") || "the subject"}. With some refinement focused on the recommendations above, it could be improved significantly.\n\n`;
  }

  if (includeCta) {
    generatedContent += `## Next Steps\nReview the analysis and implement the suggested recommendations to enhance the document's effectiveness.`;
  }

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
