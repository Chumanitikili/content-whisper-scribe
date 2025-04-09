
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  CircleSlash,
  FileText,
  Download,
  Settings,
  MenuIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  toggleSidebar: () => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  content: string;
  documentName: string;
  documentContent: string; // Add documentContent prop
}

export function Navbar({
  toggleSidebar,
  isGenerating,
  setIsGenerating,
  content,
  documentName,
  documentContent, // Add documentContent prop
}: NavbarProps) {
  const { toast } = useToast();
  const [detectionScore, setDetectionScore] = useState<number | null>(null);

  useEffect(() => {
    // Reset detection score when content changes
    if (content) {
      setDetectionScore(null);
    }
  }, [content]);

  const generateContent = () => {
    if (!documentContent || !documentContent.trim()) {
      toast({
        title: "No source document",
        description: "Please upload a document or add text reference first to generate content",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // In a real implementation, this would call the AI API
    setTimeout(() => {
      setIsGenerating(false);
      // Simulate a random AI detection score between 5-18%
      setDetectionScore(Math.floor(Math.random() * 14) + 5);
      toast({
        title: "Content generated",
        description: "Your content has been successfully created",
      });
    }, 3000);
  };

  const checkAIDetection = () => {
    if (!content || content.length < 100) {
      toast({
        title: "Insufficient content",
        description: "Please generate more content first to analyze",
        variant: "destructive",
      });
      return;
    }

    // Simulate AI detection check
    toast({
      title: "Checking AI detection...",
      description: "Analyzing content against detection tools",
    });

    setTimeout(() => {
      // Simulate a random AI detection score between 5-18%
      const score = Math.floor(Math.random() * 14) + 5;
      setDetectionScore(score);
      
      if (score < 20) {
        toast({
          title: "AI Detection Score: " + score + "%",
          description: "Your content has a low probability of being flagged as AI-generated",
        });
      } else {
        toast({
          title: "AI Detection Score: " + score + "%",
          description: "Your content may be detected as AI-generated. Consider regenerating.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const exportDocument = () => {
    if (!content || content.length < 100) {
      toast({
        title: "No content to export",
        description: "Please generate content first",
        variant: "destructive",
      });
      return;
    }

    const fileName = documentName ? 
      `${documentName.split('.')[0]}_content.txt` : 
      "generated_content.txt";
    
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Content exported",
      description: `Your content has been exported as "${fileName}"`,
    });
  };

  return (
    <nav className="h-16 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={toggleSidebar}
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-bold">ContentWhisper</h1>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {detectionScore !== null && (
          <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-secondary text-sm font-medium">
            <CircleSlash className={`h-4 w-4 mr-1 ${detectionScore < 20 ? 'text-green-500' : 'text-red-500'}`} />
            <span>{detectionScore}% AI detectable</span>
          </div>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex"
          onClick={checkAIDetection}
        >
          <CircleSlash className="h-4 w-4 mr-2" />
          Check detection
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex"
          onClick={exportDocument}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        <Button 
          variant="default"
          size="sm"
          onClick={generateContent}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate content"}
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}
