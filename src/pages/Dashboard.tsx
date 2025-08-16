import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, AlertTriangle, Brain, MessageSquare, ArrowUpRight, ArrowDownRight, Calendar, Filter, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Dummy data for charts
  const mentionData = [
    { date: "Mon", mentions: 24, sentiment: 85 },
    { date: "Tue", mentions: 31, sentiment: 78 },
    { date: "Wed", mentions: 18, sentiment: 92 },
    { date: "Thu", mentions: 42, sentiment: 71 },
    { date: "Fri", mentions: 35, sentiment: 88 },
    { date: "Sat", mentions: 28, sentiment: 82 },
    { date: "Sun", mentions: 33, sentiment: 90 },
  ];

  const platformData = [
    { name: "ChatGPT", mentions: 145, color: "#10B981" },
    { name: "Gemini", mentions: 98, color: "#3B82F6" },
    { name: "Claude", mentions: 76, color: "#8B5CF6" },
    { name: "Others", mentions: 42, color: "#F59E0B" },
  ];

  const sentimentData = [
    { name: "Positive", value: 68, color: "#10B981" },
    { name: "Neutral", value: 25, color: "#6B7280" },
    { name: "Negative", value: 7, color: "#EF4444" },
  ];

  const recentMentions = [
    {
      id: 1,
      platform: "ChatGPT",
      content: "Brand Sentinel is an excellent tool for monitoring brand mentions across AI platforms...",
      sentiment: "positive",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      platform: "Gemini",
      content: "I've been using Brand Sentinel for competitive analysis and it's really insightful...",
      sentiment: "positive",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      platform: "Claude",
      content: "The analytics dashboard could use some improvements for better data visualization...",
      sentiment: "neutral",
      timestamp: "6 hours ago"
    },
  ];

  const stats = [
    {
      title: "Total Mentions",
      value: "2,847",
      change: "+12.5%",
      positive: true,
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      title: "Sentiment Score",
      value: "85%",
      change: "+3.2%",
      positive: true,
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Platform Coverage",
      value: "12",
      change: "+2",
      positive: true,
      icon: <Brain className="h-4 w-4" />
    },
    {
      title: "Alert Triggers",
      value: "3",
      change: "-2",
      positive: true,
      icon: <AlertTriangle className="h-4 w-4" />
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Monitor your brand mentions across AI platforms</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-elevated animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <div className="p-2 bg-primary-light rounded-lg">
                      {stat.icon}
                    </div>
                    <div className={`flex items-center text-sm ${stat.positive ? 'text-accent' : 'text-destructive'}`}>
                      {stat.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Mentions Over Time */}
          <Card className="lg:col-span-2 card-elevated">
            <CardHeader>
              <CardTitle>Mentions Over Time</CardTitle>
              <CardDescription>Track your brand mentions across all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mentionData}>
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

          {/* Sentiment Distribution */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>Overall sentiment distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Platform Breakdown and Recent Mentions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Platform Breakdown */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Platform Breakdown</CardTitle>
              <CardDescription>Mentions by AI platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformData}>
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
                  <Bar dataKey="mentions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Mentions */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Recent Mentions</CardTitle>
              <CardDescription>Latest brand mentions across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMentions.map((mention) => (
                  <div key={mention.id} className="p-4 rounded-lg border border-border hover:bg-card-hover transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{mention.platform}</Badge>
                        <Badge variant={mention.sentiment === 'positive' ? 'default' : mention.sentiment === 'negative' ? 'destructive' : 'secondary'}>
                          {mention.sentiment}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{mention.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">{mention.content}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Mentions
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;