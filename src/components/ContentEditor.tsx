import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  AlignLeft,
  Pencil,
  Settings,
  Target,
  Lightbulb,
  Sparkles,
  InfoIcon,
  Edit,
  FileInput,
  Upload,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ContentEditorProps {
  documentContent: string;
  generatedContent: string;
  setGeneratedContent: (content: string) => void;
  isGenerating: boolean;
}

export function ContentEditor({
  documentContent,
  generatedContent,
  setGeneratedContent,
  isGenerating,
}: ContentEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [creativity, setCreativity] = useState(0.7);
  const [tone, setTone] = useState<'professional' | 'conversational' | 'friendly' | 'authoritative' | 'technical'>('professional');

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [generatedContent]);

  const handleContentChange = () => {
    if (editorRef.current) {
      setGeneratedContent(editorRef.current.innerText);
    }
  };

  // Sample extracted keywords from the document content
  const extractedKeywords = documentContent
    ? Array.from(
        new Set(
          documentContent
            .split(/\s+/)
            .filter((word) => word.length > 5)
            .slice(0, 8)
        )
      )
    : ["keywords", "extraction", "document", "content", "analysis"];

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="editor" className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList className="h-14">
            <TabsTrigger value="editor" className="flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">AI Writer</span>
            </TabsTrigger>
            <TabsTrigger value="source" className="flex items-center">
              <FileInput className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Reference Material</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="editor" className="flex-1 flex flex-col p-4 space-y-4 mt-0">
          <Alert variant="default" className="bg-muted/50 mb-2">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>AI Writer</AlertTitle>
            <AlertDescription>
              This is where your AI-generated content appears. You can edit the content directly or generate new content using the reference materials.
            </AlertDescription>
          </Alert>
          
          {documentContent && (
            <div className="flex flex-wrap gap-2 mb-2">
              {extractedKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          <Card className="flex-1">
            <CardContent className="p-0">
              <div className="relative flex flex-col h-full">
                <div className="absolute inset-0">
                  <ScrollArea className="h-full">
                    {isGenerating ? (
                      <div className="p-6">
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Sparkles className="h-8 w-8 mx-auto mb-4 text-primary animate-pulse" />
                            <h3 className="text-lg font-medium mb-2">Generating content...</h3>
                            <p className="text-muted-foreground max-w-md">
                              Our AI is crafting high-quality, human-like content based on your document.
                              This typically takes 15-30 seconds.
                            </p>
                            
                            <div className="mt-6 space-y-2">
                              <div className="h-3 bg-muted rounded animate-pulse-slow"></div>
                              <div className="h-3 bg-muted rounded w-5/6 animate-pulse-slow" style={{animationDelay: '0.2s'}}></div>
                              <div className="h-3 bg-muted rounded w-4/6 animate-pulse-slow" style={{animationDelay: '0.3s'}}></div>
                              <div className="h-3 bg-muted rounded animate-pulse-slow" style={{animationDelay: '0.4s'}}></div>
                              <div className="h-3 bg-muted rounded w-5/6 animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        ref={editorRef}
                        className="content-editor"
                        contentEditable
                        onInput={handleContentChange}
                        dangerouslySetInnerHTML={{
                          __html: generatedContent || `<p class="text-muted-foreground">Your AI-generated content will appear here. Click "Generate content" to begin.</p>`
                        }}
                      />
                    )}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="source" className="flex-1 p-4 mt-0">
          <Alert variant="default" className="bg-muted/50 mb-4">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Reference Material</AlertTitle>
            <AlertDescription>
              This tab displays the original uploaded documents or text references that will be used for AI content generation. Use the sidebar to upload documents or add text references.
            </AlertDescription>
          </Alert>
          
          <Card className="h-full">
            <CardContent className="p-4 h-full">
              <ScrollArea className="h-full">
                {documentContent ? (
                  <div className="whitespace-pre-wrap">{documentContent}</div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground/60" />
                      <h3 className="text-lg font-medium mb-2">No reference material yet</h3>
                      <p className="text-muted-foreground">
                        Upload a document or add text references from the sidebar to use as reference for content generation
                      </p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="p-4 mt-0">
          <Alert variant="default" className="bg-muted/50 mb-4">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Content Settings</AlertTitle>
            <AlertDescription>
              Customize how the AI generates content by adjusting these settings. Changes will apply to your next content generation.
            </AlertDescription>
          </Alert>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="text-lg font-medium">Content Settings</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Adjust how your content is generated by the AI
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Tone</Label>
                      <select
                        id="tone"
                        className="w-full p-2 rounded-md border"
                        value={tone}
                        onChange={(e) => setTone(e.target.value as any)}
                      >
                        <option value="professional">Professional</option>
                        <option value="conversational">Conversational</option>
                        <option value="friendly">Friendly</option>
                        <option value="authoritative">Authoritative</option>
                        <option value="technical">Technical</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="creativity">Creativity</Label>
                      <Slider
                        id="creativity"
                        value={[creativity]}
                        onValueChange={(value) => setCreativity(value[0])}
                        max={1}
                        step={0.1}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Conservative</span>
                        <span>Creative</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <AlignLeft className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="text-lg font-medium">Format Options</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Control how your content is structured
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-headings">Include headings</Label>
                      <Switch id="switch-headings" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-bullets">Include bullet points</Label>
                      <Switch id="switch-bullets" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-faq">Include FAQ section</Label>
                      <Switch id="switch-faq" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-conclusion">
                        Include conclusion
                      </Label>
                      <Switch id="switch-conclusion" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-cta">Include call to action</Label>
                      <Switch id="switch-cta" defaultChecked />
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-4">
                    <div className="flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                      <h4 className="text-base font-medium">SEO Enhancement</h4>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-keywords">Keyword optimization</Label>
                      <Switch id="switch-keywords" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-meta">Generate meta description</Label>
                      <Switch id="switch-meta" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
