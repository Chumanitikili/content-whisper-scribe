
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { 
  Upload, 
  FileText, 
  Trash2, 
  Settings, 
  ChevronRight, 
  BookOpen,
  Wand2,
  Lightbulb,
  ListTodo,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SidebarProps {
  isOpen: boolean;
  setDocumentContent: (content: string) => void;
  setDocumentName: (name: string) => void;
}

export function Sidebar({ isOpen, setDocumentContent, setDocumentName }: SidebarProps) {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Array<{ name: string; content: string }>>([]);
  const [activeDocument, setActiveDocument] = useState<number | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    const allowedTypes = ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a PDF, DOCX, or TXT file",
        variant: "destructive",
      });
      return;
    }

    // Create a loading toast
    toast({
      title: "Processing document",
      description: `Parsing "${file.name}"...`,
    });

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const newDocument = { name: file.name, content };
        setDocuments([...documents, newDocument]);
        setActiveDocument(documents.length);
        setDocumentContent(content);
        setDocumentName(file.name);
        
        toast({
          title: "Document ready",
          description: `"${file.name}" has been successfully uploaded and is ready for editing`,
        });
      } catch (error) {
        toast({
          title: "Error processing document",
          description: "We couldn't read this file. Please try a different file format.",
          variant: "destructive",
        });
      }
    };
    
    reader.onerror = () => {
      toast({
        title: "Error reading file",
        description: "There was an error reading your file. Please try again.",
        variant: "destructive",
      });
    };
    
    reader.readAsText(file);
  };

  const selectDocument = (index: number) => {
    setActiveDocument(index);
    setDocumentContent(documents[index].content);
    setDocumentName(documents[index].name);
  };

  const deleteDocument = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
    
    if (activeDocument === index) {
      setActiveDocument(null);
      setDocumentContent("");
      setDocumentName("");
    } else if (activeDocument && activeDocument > index) {
      setActiveDocument(activeDocument - 1);
    }

    toast({
      title: "Document deleted",
      description: "The document has been removed",
    });
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h2 className="text-xl font-bold text-sidebar-foreground mb-6">Documents</h2>
          
          <div className="mb-6">
            <Button
              variant="secondary"
              className="w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload reference document
            </Button>
            <p className="text-xs text-sidebar-foreground/70 mt-2">
              Upload PDF, DOCX, or TXT files (max 5MB) as reference material for generating content
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
            />
          </div>
          
          <Separator className="my-4 bg-sidebar-border" />
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2">
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <Card
                  key={index}
                  className={`p-2 cursor-pointer transition-colors ${
                    activeDocument === index
                      ? "bg-sidebar-accent border-primary"
                      : "bg-sidebar hover:bg-sidebar-accent/50"
                  }`}
                  onClick={() => selectDocument(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <FileText className="h-4 w-4 mt-1 text-sidebar-foreground/70" />
                      <div>
                        <p className="text-sm font-medium text-sidebar-foreground line-clamp-1">
                          {doc.name}
                        </p>
                        <p className="text-xs text-sidebar-foreground/70 line-clamp-1">
                          {doc.content.length} characters
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/80"
                      onClick={(e) => deleteDocument(index, e)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-10 w-10 text-sidebar-foreground/30 mb-2" />
                <p className="text-sm text-sidebar-foreground/70">No reference documents yet</p>
                <p className="text-xs text-sidebar-foreground/50 mt-1">
                  Upload documents to use as references for your content
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 space-y-2">
          <Separator className="bg-sidebar-border" />
          
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground">
              <Wand2 className="mr-2 h-4 w-4" />
              AI Settings
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground">
              <Lightbulb className="mr-2 h-4 w-4" />
              Content tips
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground">
              <ListTodo className="mr-2 h-4 w-4" />
              Templates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
