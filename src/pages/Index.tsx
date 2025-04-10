
import { useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { Navbar } from "../components/layout/Navbar";
import { ContentEditor } from "../components/ContentEditor";
import { toast } from "@/hooks/use-toast";

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [documentContent, setDocumentContent] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
          documentContent={documentContent}
          setGeneratedContent={setGeneratedContent}
        />

        <main className="flex-1 overflow-hidden p-0">
          <ContentEditor
            documentContent={documentContent}
            generatedContent={generatedContent}
            setGeneratedContent={setGeneratedContent}
            isGenerating={isGenerating}
          />
        </main>
      </div>
    </div>
  );
}
