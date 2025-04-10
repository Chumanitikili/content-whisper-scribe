import { v4 as uuidv4 } from 'uuid';

interface TextProcessingOptions {
  tone?: 'professional' | 'conversational' | 'friendly' | 'authoritative' | 'technical';
  creativity?: number;
  length?: number;
}

export class TextProcessor {
  private static readonly HUMAN_LIKE_PATTERNS = [
    // Common human writing patterns
    /(?:I|we|you|they|he|she|it) (?:think|believe|feel|know|understand|realize|notice|find|see|consider|suggest|propose|argue|claim|state|mention|point out|emphasize|highlight|note|observe|recognize|acknowledge|admit|concede|agree|disagree|doubt|question|wonder|suspect|assume|presume|guess|estimate|predict|expect|hope|wish|want|need|desire|prefer|choose|decide|plan|intend|attempt|try|manage|succeed|fail|achieve|accomplish|complete|finish|start|begin|continue|keep|maintain|sustain|support|help|assist|aid|facilitate|enable|allow|permit|prevent|stop|halt|cease|end|terminate|conclude|summarize|review|analyze|examine|investigate|study|research|explore|discover|learn|teach|instruct|guide|direct|lead|follow|pursue|chase|seek|search|look|find|locate|identify|determine|establish|set|fix|repair|correct|adjust|modify|change|alter|transform|convert|turn|make|create|produce|generate|develop|build|construct|form|shape|design|plan|organize|arrange|prepare|ready|set up|put|place|position|locate|situate|install|implement|apply|use|utilize|employ|adopt|adapt|adjust|modify|change|alter|transform|convert|turn|make|create|produce|generate|develop|build|construct|form|shape|design|plan|organize|arrange|prepare|ready|set up|put|place|position|locate|situate|install|implement|apply|use|utilize|employ|adopt|adapt)/gi,
    // Common transition phrases
    /(?:In|On|At|By|For|With|Without|Through|Throughout|During|Before|After|Since|Until|While|As|Because|Since|So|Therefore|Thus|Hence|Consequently|Accordingly|As a result|For this reason|For these reasons|In conclusion|To conclude|To sum up|In summary|In short|In brief|In other words|That is|Namely|Specifically|In particular|For example|For instance|Such as|Like|Unlike|In contrast|On the other hand|However|Nevertheless|Nonetheless|Still|Yet|Even so|Despite|In spite of|Although|Though|Even though|While|Whereas|On the contrary|Conversely|In comparison|Similarly|Likewise|In the same way|Also|Moreover|Furthermore|In addition|Additionally|Besides|What's more|Not only...but also|Both...and|Either...or|Neither...nor|Whether...or|Not...but|Rather than|Instead of|As well as|Along with|Together with|Including|Such as|For example|For instance|Namely|Specifically|In particular|Especially|Particularly|Including|Excluding|Except|Apart from|Other than|Besides|In addition to|As for|Regarding|Concerning|With respect to|With regard to|In terms of|In relation to|In connection with|In the case of|When it comes to|As far as|As long as|As soon as|As much as|As many as|As few as|As little as|As often as|As early as|As late as|As high as|As low as|As big as|As small as|As good as|As bad as|As important as|As necessary as|As possible as|As likely as|As unlikely as|As certain as|As uncertain as|As clear as|As unclear as|As simple as|As complex as|As easy as|As difficult as|As hard as|As soft as|As strong as|As weak as|As fast as|As slow as|As quick as|As slow as|As early as|As late as|As soon as|As long as|As much as|As many as|As few as|As little as|As often as|As early as|As late as|As high as|As low as|As big as|As small as|As good as|As bad as|As important as|As necessary as|As possible as|As likely as|As unlikely as|As certain as|As uncertain as|As clear as|As unclear as|As simple as|As complex as|As easy as|As difficult as|As hard as|As soft as|As strong as|As weak as|As fast as|As slow as|As quick as|As slow as)/gi,
    // Common filler words and phrases
    /(?:actually|basically|essentially|practically|virtually|literally|figuratively|technically|theoretically|practically|realistically|ideally|hopefully|thankfully|fortunately|unfortunately|sadly|regrettably|apparently|evidently|obviously|clearly|plainly|simply|merely|just|only|even|still|yet|already|now|then|soon|later|eventually|finally|ultimately|basically|essentially|fundamentally|primarily|mainly|mostly|largely|partly|partially|somewhat|slightly|marginally|significantly|substantially|considerably|greatly|highly|extremely|very|quite|rather|fairly|pretty|somewhat|slightly|marginally|significantly|substantially|considerably|greatly|highly|extremely|very|quite|rather|fairly|pretty)/gi,
  ];

  private static readonly HUMAN_LIKE_SENTENCE_STRUCTURES = [
    // Varied sentence structures
    "However, [content]",
    "In fact, [content]",
    "Interestingly, [content]",
    "Surprisingly, [content]",
    "Notably, [content]",
    "Specifically, [content]",
    "Particularly, [content]",
    "Especially, [content]",
    "Importantly, [content]",
    "Crucially, [content]",
    "Significantly, [content]",
    "Fundamentally, [content]",
    "Essentially, [content]",
    "Basically, [content]",
    "Primarily, [content]",
    "Mainly, [content]",
    "Mostly, [content]",
    "Largely, [content]",
    "Partly, [content]",
    "Partially, [content]",
  ];

  private static readonly HUMAN_LIKE_PARAGRAPH_STRUCTURES = [
    // Varied paragraph structures
    "First, [content]. Then, [content]. Finally, [content].",
    "Initially, [content]. Subsequently, [content]. Ultimately, [content].",
    "To begin with, [content]. Moreover, [content]. In conclusion, [content].",
    "On one hand, [content]. On the other hand, [content]. Therefore, [content].",
    "While [content], [content]. As a result, [content].",
  ];

  static processText(content: string, options: TextProcessingOptions = {}): string {
    let processedContent = content;

    // Apply human-like patterns based on creativity level
    const creativity = options.creativity || 0.7;
    const shouldApplyPattern = Math.random() < creativity;

    if (shouldApplyPattern) {
      // Add human-like sentence structures
      const sentences = processedContent.split('. ');
      processedContent = sentences
        .map((sentence, index) => {
          if (index % 3 === 0 && Math.random() < creativity) {
            const structure = this.HUMAN_LIKE_SENTENCE_STRUCTURES[
              Math.floor(Math.random() * this.HUMAN_LIKE_SENTENCE_STRUCTURES.length)
            ];
            return structure.replace('[content]', sentence);
          }
          return sentence;
        })
        .join('. ');

      // Add human-like paragraph structures
      const paragraphs = processedContent.split('\n\n');
      processedContent = paragraphs
        .map((paragraph, index) => {
          if (index % 2 === 0 && Math.random() < creativity) {
            const structure = this.HUMAN_LIKE_PARAGRAPH_STRUCTURES[
              Math.floor(Math.random() * this.HUMAN_LIKE_PARAGRAPH_STRUCTURES.length)
            ];
            return structure.replace('[content]', paragraph);
          }
          return paragraph;
        })
        .join('\n\n');
    }

    // Add random human-like patterns
    this.HUMAN_LIKE_PATTERNS.forEach(pattern => {
      if (Math.random() < creativity) {
        const matches = processedContent.match(pattern);
        if (matches) {
          const randomMatch = matches[Math.floor(Math.random() * matches.length)];
          processedContent = processedContent.replace(
            randomMatch,
            this.addHumanLikeVariations(randomMatch)
          );
        }
      }
    });

    // Add some random human-like variations
    processedContent = this.addHumanLikeVariations(processedContent);

    return processedContent;
  }

  private static addHumanLikeVariations(text: string): string {
    const variations = [
      // Add slight variations to make text more human-like
      (t: string) => t.replace(/\b(is|are|was|were)\b/g, match => 
        Math.random() < 0.3 ? match + ' actually' : match
      ),
      (t: string) => t.replace(/\b(very|really|quite)\b/g, match => 
        Math.random() < 0.4 ? match + ' quite' : match
      ),
      (t: string) => t.replace(/\b(and|but|or)\b/g, match => 
        Math.random() < 0.3 ? match + ', ' + ['however', 'moreover', 'furthermore', 'nevertheless'][Math.floor(Math.random() * 4)] : match
      ),
    ];

    return variations.reduce((result, variation) => variation(result), text);
  }

  static estimateAIDetectionScore(content: string): number {
    // This is a simplified version - in a real implementation, you'd want to use
    // more sophisticated analysis and potentially integrate with AI detection APIs
    const patterns = this.HUMAN_LIKE_PATTERNS;
    let score = 0;
    let totalMatches = 0;

    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        totalMatches += matches.length;
      }
    });

    // Calculate score based on pattern matches
    // More matches = lower AI detection score
    const baseScore = 50; // Base score assuming AI-generated
    const reduction = Math.min(totalMatches * 2, 40); // Max 40% reduction
    score = Math.max(baseScore - reduction, 10); // Minimum 10% score

    return Math.round(score);
  }
} 