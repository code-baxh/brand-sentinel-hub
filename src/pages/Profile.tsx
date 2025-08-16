import { useState } from "react";
import { User, Mail, Building, Globe, Calendar, MapPin, Camera, Edit3, Save, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";


const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Corporation",
    position: "Marketing Director",
    website: "https://acme.com",
    location: "San Francisco, CA",
    bio: "Passionate about brand analytics and AI-driven insights. Leading marketing initiatives at Acme Corp with a focus on data-driven decision making.",
    joinDate: "January 2024",
    avatar: ""
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: "Total Analyses", value: "47", icon: "📊" },
    { label: "Brands Monitored", value: "12", icon: "👁️" },
    { label: "Reports Generated", value: "23", icon: "📈" },
    { label: "Insights Created", value: "156", icon: "💡" }
  ];

  const recentActivity = [
    { action: "Generated competitive analysis report", time: "2 hours ago", type: "report" },
    { action: "Created sentiment analysis prompt", time: "1 day ago", type: "prompt" },
    { action: "Exported brand mention data", time: "3 days ago", type: "export" },
    { action: "Updated brand monitoring settings", time: "1 week ago", type: "settings" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
              <p className="text-muted-foreground">Manage your personal information and view your activity</p>
            </div>
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              variant={isEditing ? "default" : "outline"}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          {/* Profile Information */}
          <Card className="card-elevated">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary">Pro Member</Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      Member since {profile.joinDate}
                    </p>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-name">Full Name</Label>
                          <Input
                            id="edit-name"
                            value={editedProfile.name}
                            onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-email">Email</Label>
                          <Input
                            id="edit-email"
                            type="email"
                            value={editedProfile.email}
                            onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-company">Company</Label>
                          <Input
                            id="edit-company"
                            value={editedProfile.company}
                            onChange={(e) => setEditedProfile({...editedProfile, company: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-position">Position</Label>
                          <Input
                            id="edit-position"
                            value={editedProfile.position}
                            onChange={(e) => setEditedProfile({...editedProfile, position: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-website">Website</Label>
                          <Input
                            id="edit-website"
                            value={editedProfile.website}
                            onChange={(e) => setEditedProfile({...editedProfile, website: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-location">Location</Label>
                          <Input
                            id="edit-location"
                            value={editedProfile.location}
                            onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-bio">Bio</Label>
                        <Textarea
                          id="edit-bio"
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                          rows={4}
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button onClick={handleCancel} variant="outline">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                        <p className="text-lg text-muted-foreground">{profile.position}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{profile.email}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{profile.company}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{profile.website}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{profile.location}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">Joined {profile.joinDate}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">About</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{profile.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your activity and usage overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-lg border border-border">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
};

export default Profile;