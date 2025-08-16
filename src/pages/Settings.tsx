import { useState } from "react";
import { Settings as SettingsIcon, Moon, Sun, Monitor, Layout, Bell, Shield, CreditCard, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/ThemeProvider";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";


const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { navigationStyle, toggleNavigationStyle } = useAppContext();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    mentions: true,
    sentiment: true,
    competitors: false,
    weekly: true
  });

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Corp",
    website: "https://acme.com"
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const currentPlan = "Pro";
  const creditsUsed = 1247;
  const creditsTotal = 5000;

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and application settings</p>
          </div>

          {/* Appearance Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>Customize how Brand Sentinel looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center">
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center">
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center">
                        <Monitor className="h-4 w-4 mr-2" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Navigation Style</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose between top navigation bar or sidebar
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Top</span>
                  <Switch
                    checked={navigationStyle === 'side'}
                    onCheckedChange={toggleNavigationStyle}
                  />
                  <span className="text-sm text-muted-foreground">Side</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Update your personal and company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>Configure when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Brand Mentions</p>
                  <p className="text-sm text-muted-foreground">Get notified when your brand is mentioned</p>
                </div>
                <Switch
                  checked={notifications.mentions}
                  onCheckedChange={(checked) => setNotifications({...notifications, mentions: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sentiment Alerts</p>
                  <p className="text-sm text-muted-foreground">Alerts for significant sentiment changes</p>
                </div>
                <Switch
                  checked={notifications.sentiment}
                  onCheckedChange={(checked) => setNotifications({...notifications, sentiment: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Competitor Activity</p>
                  <p className="text-sm text-muted-foreground">Updates on competitor mentions</p>
                </div>
                <Switch
                  checked={notifications.competitors}
                  onCheckedChange={(checked) => setNotifications({...notifications, competitors: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Weekly summary of your brand performance</p>
                </div>
                <Switch
                  checked={notifications.weekly}
                  onCheckedChange={(checked) => setNotifications({...notifications, weekly: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Subscription & Billing */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Subscription & Billing</span>
              </CardTitle>
              <CardDescription>Manage your subscription and view usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm text-muted-foreground">You are on the {currentPlan} plan</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="default">{currentPlan}</Badge>
                  <Button variant="outline" size="sm">Upgrade</Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Credits Usage</p>
                  <span className="text-sm text-muted-foreground">
                    {creditsUsed.toLocaleString()} / {creditsTotal.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(creditsUsed / creditsTotal) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Resets on the 1st of each month
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full sm:w-auto">
                Change Password
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Download My Data
              </Button>
              <Separator />
              <Button variant="destructive" className="w-full sm:w-auto">
                <LogOut className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </div>
    </div>
  );
};

export default Settings;