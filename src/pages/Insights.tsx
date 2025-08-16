import { useState } from "react";
import { TrendingUp, Filter, Download, Calendar, BarChart3, PieChart, Users, MessageSquare, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from "recharts";


const Insights = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [viewType, setViewType] = useState("overview");

  // Mock data for different visualizations
  const trendData = [
    { date: "Week 1", mentions: 145, sentiment: 78, engagement: 92 },
    { date: "Week 2", mentions: 167, sentiment: 82, engagement: 87 },
    { date: "Week 3", mentions: 134, sentiment: 75, engagement: 95 },
    { date: "Week 4", mentions: 189, sentiment: 85, engagement: 88 }
  ];

  const competitorData = [
    { name: "Your Brand", mentions: 189, sentiment: 85, share: 35 },
    { name: "Competitor A", mentions: 156, sentiment: 72, share: 28 },
    { name: "Competitor B", mentions: 134, sentiment: 68, share: 24 },
    { name: "Competitor C", mentions: 98, sentiment: 79, share: 13 }
  ];

  const platformInsights = [
    { platform: "ChatGPT", mentions: 145, sentiment: 87, growth: "+15%" },
    { platform: "Gemini", mentions: 98, sentiment: 82, growth: "+8%" },
    { platform: "Claude", mentions: 76, sentiment: 85, growth: "+12%" },
    { platform: "Others", mentions: 42, sentiment: 74, growth: "-3%" }
  ];

  const topTopics = [
    { topic: "User Experience", mentions: 89, sentiment: 92, trend: "up" },
    { topic: "Pricing", mentions: 67, sentiment: 68, trend: "down" },
    { topic: "Features", mentions: 78, sentiment: 85, trend: "up" },
    { topic: "Support", mentions: 45, sentiment: 71, trend: "stable" },
    { topic: "Integration", mentions: 56, sentiment: 89, trend: "up" }
  ];

  const alertsData = [
    { id: 1, type: "negative", message: "Spike in negative sentiment detected on ChatGPT", time: "2 hours ago", severity: "high" },
    { id: 2, type: "mention", message: "Unusual mention volume increase (+45%)", time: "5 hours ago", severity: "medium" },
    { id: 3, type: "competitor", message: "Competitor A gained 12% mention share", time: "1 day ago", severity: "low" }
  ];

  const sentimentColors = {
    positive: "#10B981",
    neutral: "#6B7280", 
    negative: "#EF4444"
  };

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Insights & Analytics</h1>
            <p className="text-muted-foreground">Deep dive into your brand performance and trends</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Alerts Section */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Active Alerts</span>
              <Badge variant="destructive">{alertsData.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertsData.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.severity === 'high' ? 'bg-destructive' : 
                      alert.severity === 'medium' ? 'bg-warning' : 'bg-muted-foreground'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Analytics Tabs */}
        <Tabs value={viewType} onValueChange={setViewType} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Mention Trends</CardTitle>
                  <CardDescription>Brand mentions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Line type="monotone" dataKey="mentions" stroke="hsl(var(--primary))" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>Mentions by AI platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformInsights.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="font-medium text-foreground">{platform.platform}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-muted-foreground">{platform.mentions} mentions</span>
                          <Badge variant="outline">{platform.sentiment}% sentiment</Badge>
                          <span className={`flex items-center ${
                            platform.growth.startsWith('+') ? 'text-accent' : 'text-destructive'
                          }`}>
                            {platform.growth.startsWith('+') ? 
                              <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            }
                            {platform.growth}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Sentiment & Engagement Trends</CardTitle>
                <CardDescription>Track sentiment and engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line type="monotone" dataKey="sentiment" stroke="hsl(var(--accent))" strokeWidth={3} name="Sentiment Score" />
                    <Line type="monotone" dataKey="engagement" stroke="hsl(var(--primary))" strokeWidth={3} name="Engagement Score" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitors Tab */}
          <TabsContent value="competitors" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Market Share</CardTitle>
                  <CardDescription>Brand mention share comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={competitorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Bar dataKey="share" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Competitive Analysis</CardTitle>
                  <CardDescription>Detailed competitor breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Brand</TableHead>
                        <TableHead>Mentions</TableHead>
                        <TableHead>Sentiment</TableHead>
                        <TableHead>Share</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {competitorData.map((competitor, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{competitor.name}</TableCell>
                          <TableCell>{competitor.mentions}</TableCell>
                          <TableCell>
                            <Badge variant={competitor.sentiment > 80 ? "default" : competitor.sentiment > 70 ? "secondary" : "destructive"}>
                              {competitor.sentiment}%
                            </Badge>
                          </TableCell>
                          <TableCell>{competitor.share}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Topics Tab */}
          <TabsContent value="topics" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Top Discussion Topics</CardTitle>
                <CardDescription>Most mentioned topics and their sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-card-hover transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{topic.topic}</h4>
                          <p className="text-sm text-muted-foreground">{topic.mentions} mentions</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={topic.sentiment > 85 ? "default" : topic.sentiment > 75 ? "secondary" : "destructive"}>
                          {topic.sentiment}% sentiment
                        </Badge>
                        <div className={`flex items-center text-sm ${
                          topic.trend === 'up' ? 'text-accent' : 
                          topic.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                        }`}>
                          {topic.trend === 'up' && <ArrowUpRight className="h-4 w-4" />}
                          {topic.trend === 'down' && <ArrowDownRight className="h-4 w-4" />}
                          {topic.trend === 'stable' && <div className="w-4 h-0.5 bg-muted-foreground"></div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  );
};

export default Insights;