import { useState } from "react";
import { Lightbulb, Send, Sparkles, BookOpen, TrendingUp, Users, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const Prompts = () => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const promptTemplates = [
    {
      id: 1,
      title: "Competitor Analysis",
      description: "Analyze how your brand compares to competitors in AI conversations",
      category: "Analysis",
      icon: <TrendingUp className="h-5 w-5" />,
      prompt: "Compare brand mentions of [BRAND] vs [COMPETITOR] in terms of sentiment, frequency, and context. What are the key differentiators mentioned?"
    },
    {
      id: 2,
      title: "Sentiment Deep Dive",
      description: "Get detailed sentiment analysis across different AI platforms",
      category: "Sentiment",
      icon: <Users className="h-5 w-5" />,
      prompt: "Analyze the sentiment of [BRAND] mentions across AI platforms. What specific aspects are driving positive/negative sentiment?"
    },
    {
      id: 3,
      title: "Brand Positioning",
      description: "Understand how your brand is positioned in AI conversations",
      category: "Strategy",
      icon: <BookOpen className="h-5 w-5" />,
      prompt: "How is [BRAND] positioned in AI conversations? What key attributes, benefits, and use cases are most commonly associated with the brand?"
    },
    {
      id: 4,
      title: "Market Trends",
      description: "Identify trending topics and conversations around your brand",
      category: "Trends",
      icon: <Sparkles className="h-5 w-5" />,
      prompt: "What are the emerging trends and topics in conversations mentioning [BRAND]? What new opportunities or challenges are being discussed?"
    }
  ];

  const handleAnalyze = async (prompt: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        summary: "Your brand shows strong positive sentiment across AI platforms with 78% positive mentions.",
        insights: [
          "Most positive mentions come from ChatGPT (45%) and Claude (32%)",
          "Key strengths: User-friendly interface, accurate analytics, reliable monitoring",
          "Areas for improvement: Mobile app performance, customer support response time",
          "Competitor analysis shows you lead in 'ease of use' but trail in 'advanced features'"
        ],
        recommendations: [
          "Focus marketing on your UI/UX strengths",
          "Address mobile app performance issues",
          "Enhance customer support capabilities",
          "Consider adding advanced analytics features"
        ],
        score: 78
      };
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Prompt Analysis</h1>
          <p className="text-muted-foreground">Generate custom insights about your brand using AI-powered prompts</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Custom Prompt Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>Custom Prompt</span>
                </CardTitle>
                <CardDescription>
                  Enter a custom prompt to analyze your brand data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="e.g., How does Brand Sentinel compare to competitors in terms of user satisfaction and feature completeness?"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="min-h-[120px] bg-background"
                />
                <Button 
                  onClick={() => handleAnalyze(customPrompt)}
                  disabled={!customPrompt.trim() || isAnalyzing}
                  className="w-full sm:w-auto"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Analyze Brand Data
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            {results && (
              <Card className="card-elevated animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Analysis Results
                    <Badge variant="outline" className="bg-primary-light text-primary">
                      Score: {results.score}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Summary</h4>
                    <p className="text-muted-foreground">{results.summary}</p>
                  </div>

                  <Tabs defaultValue="insights" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="insights">Key Insights</TabsTrigger>
                      <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    </TabsList>
                    <TabsContent value="insights" className="space-y-3 mt-4">
                      {results.insights.map((insight: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-foreground">{insight}</p>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="recommendations" className="space-y-3 mt-4">
                      {results.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-foreground">{rec}</p>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Prompt Templates Sidebar */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Prompt Templates</CardTitle>
                <CardDescription>Quick-start prompts for common analyses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search templates..." 
                    className="pl-10 bg-background"
                  />
                </div>
                
                <div className="space-y-3">
                  {promptTemplates.map((template) => (
                    <div 
                      key={template.id}
                      className="p-4 rounded-lg border border-border hover:bg-card-hover transition-colors cursor-pointer group"
                      onClick={() => setCustomPrompt(template.prompt)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary-light rounded-lg text-primary group-hover:scale-110 transition-transform">
                          {template.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground text-sm">{template.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {template.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </CardContent>
            </Card>

            {/* Recent Analyses */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "Competitor Analysis", time: "2 hours ago", score: 85 },
                  { title: "Sentiment Deep Dive", time: "1 day ago", score: 72 },
                  { title: "Market Trends", time: "3 days ago", score: 91 }
                ].map((analysis, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-card-hover transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-foreground">{analysis.title}</p>
                      <p className="text-xs text-muted-foreground">{analysis.time}</p>
                    </div>
                    <Badge variant="outline" className="bg-primary-light text-primary">
                      {analysis.score}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
};

export default Prompts;