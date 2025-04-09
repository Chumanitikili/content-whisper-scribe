
import { useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { Navbar } from "../components/layout/Navbar";
import { ContentEditor } from "../components/ContentEditor";
import { toast } from "@/components/ui/use-toast";

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [documentContent, setDocumentContent] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample content generation (this would be replaced with actual AI integration)
  const sampleGeneratedContent = `# The Art of Effective Content Marketing in 2025

In today's digital landscape, content isn't just king—it's the entire kingdom. As we navigate through 2025, the strategies that worked even a couple of years ago are rapidly becoming obsolete. This evolution demands that marketers not only keep pace but stay ahead of trends to maintain visibility and relevance.

## Understanding the Shifting Paradigm

The approach to content creation has fundamentally changed. Gone are the days when keyword stuffing and quantity over quality drove results. Today's audience is sophisticated, discerning, and overwhelmed with options. They don't just consume content; they evaluate it against increasingly high standards.

I remember when I first started in this field about fifteen years ago—we were primarily focused on word count and basic SEO principles. Now, the game has completely changed. One client of mine, a mid-sized SaaS company, recently pivoted their entire content strategy away from high-volume publishing to creating fewer, more comprehensive resources. The result? Their engagement metrics nearly doubled within a quarter.

### The Human Touch in an AI World

While AI tools have revolutionized how we create and optimize content, the most successful marketers understand that technology should enhance human creativity, not replace it. The content that resonates most deeply still carries that undefinable human quality—authenticity.

This doesn't mean avoiding AI altogether. Rather, it's about striking the right balance. Use technology to handle data analysis, identify content gaps, and streamline processes, but keep the storytelling genuinely human. People can tell the difference, even if they can't always articulate why certain content feels more authentic than others.

## Strategic Considerations for Modern Content

When developing your content strategy for today's market, consider these principles:

* **Value density matters more than length**. Every paragraph should offer genuine insight.
* **Voice consistency creates brand recognition**. Develop and maintain a distinctive tone across all channels.
* **Format for actual reading patterns**. Most readers scan first, so use meaningful subheadings and visual breaks.
* **Build content ecosystems, not isolated pieces**. Everything you publish should connect to other elements of your content universe.

I've found that clients often struggle most with that last point. They create excellent individual pieces but miss opportunities to cross-reference and build a cohesive body of work that guides the audience through a complete journey.

## Case Study: Reimagining Content Distribution

A retail client I worked with last year was investing heavily in content creation but seeing diminishing returns. Upon closer examination, we discovered their distribution strategy hadn't evolved with changing platform algorithms and user behavior.

We implemented a multi-phased approach:
1. Restructured content for format-specific optimization
2. Created platform-specific variations rather than cross-posting identical content
3. Established a testing protocol to measure engagement by platform, format, and time
4. Developed a "content atomization" workflow to get more mileage from high-performing pieces

Within six months, their content reached 43% more people despite publishing 30% fewer pieces. This perfectly illustrates how strategic distribution often matters more than increased production.

## Measuring What Matters

The metrics that truly indicate content success have evolved significantly. While page views and time-on-page remain relevant baseline measurements, sophisticated content marketers are looking deeper:

* Conversion pathway analysis
* Content influence scoring
* Return visitor content consumption patterns
* Cross-channel attribution modeling

I always advise focusing on metrics that directly connect to business outcomes. Vanity metrics might make reports look good, but they don't necessarily translate to revenue or customer retention.

## Looking Forward: Emerging Trends

As we move through 2025, several emerging trends deserve attention:

### Hyper-Personalization at Scale

Content personalization isn't new, but the sophistication and scale now possible represents a quantum leap forward. Leading brands are creating dynamic content experiences that adapt not just to basic demographic information but to behavioral patterns, content consumption history, and even emotional context.

### Voice-Optimized Content

With voice search and audio content consumption continuing to rise, optimizing for natural language patterns and conversational queries has become essential. This requires a fundamental shift in how we structure information and prioritize long-tail conversational keywords.

### Multimedia Integration

The lines between text, video, audio, and interactive content continue to blur. The most effective content strategies incorporate multiple formats that work together, allowing audiences to consume information in their preferred way.

## FAQ: Common Content Marketing Questions

**Q: How frequently should we publish new content?**
A: Quality and relevance trump frequency every time. Establish a sustainable cadence that allows you to maintain high standards rather than an arbitrary publishing schedule.

**Q: How do we balance SEO requirements with engaging writing?**
A: Start with audience needs and craft genuinely useful content. Then optimize for search without compromising readability or flow. If forced to choose, prioritize the human reader over the algorithm.

**Q: What's the ideal content length for ranking well?**
A: There's no universal answer. Different topics require different treatment. Focus on comprehensive coverage of your subject rather than hitting arbitrary word counts.

## Conclusion

The content marketing landscape of 2025 rewards marketers who prioritize audience value, strategic distribution, and authentic communication. By focusing on these principles rather than chasing algorithms or trends, you'll build a sustainable content ecosystem that drives meaningful business results.

Remember that ultimately, behind every click, view, and conversion is a human being looking for solutions, insights, or inspiration. When your content consistently delivers these elements, success naturally follows.`;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        setDocumentContent={setDocumentContent}
        setDocumentName={setDocumentName}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          toggleSidebar={toggleSidebar}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          content={generatedContent}
          documentName={documentName}
        />

        <main className="flex-1 overflow-hidden p-0">
          <ContentEditor
            documentContent={documentContent}
            generatedContent={generatedContent || (isGenerating ? "" : "")}
            setGeneratedContent={setGeneratedContent}
            isGenerating={isGenerating}
          />
        </main>
      </div>
    </div>
  );
}
