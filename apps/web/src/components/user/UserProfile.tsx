"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Edit2,
  Check,
  Settings,
  LogOut,
} from "lucide-react";
import { UserDataType } from "@repo/database/prisma";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { Badge } from "@workspace/ui/components/badge";

// Interface for user data
interface UserProfileProps {
  user: UserDataType;
}

export default function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header with user info */}
      <div className="bg-gradient-to-r from-yellow-600/50 to-orange-600/50 border-b border-zinc-800">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full blur-sm opacity-70" />
              <Avatar className="h-24 w-24 border-4 border-zinc-900 relative">
                <AvatarImage src={user.avatar!!} alt={user.username} />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-yellow-600 to-orange-600">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button
                className="absolute bottom-0 right-0 bg-yellow-600 p-1.5 rounded-full border-2 border-zinc-900 hover:bg-yellow-700 transition-colors"
                onClick={() => {}}
              >
                <Edit2 className="h-3.5 w-3.5" />
              </button>
            </motion.div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl md:text-3xl font-bold"
                  >
                    {user.firstName} {user.lastName}
                  </motion.h1>
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 flex items-center gap-2"
                  >
                    <Briefcase className="h-4 w-4 text-primary" />
                    {user.website}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={() => setEditMode(!editMode)}
                    variant="outline"
                    className="border-yellow-500 text-yellow-500 hover:bg-purple-500/10"
                  >
                    {editMode ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Mail className="h-4 w-4 text-yellow-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Phone className="h-4 w-4 text-yellow-400" />
                  <span>{user.gitHub}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  <span>{user.twitter}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6 h-12 bg-zinc-900">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r from-yellow-600 to-orange-600 h-10 text-white"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r from-yellow-600 to-orange-600 h-10 text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* About */}
                <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-yellow-600">About</CardTitle>
                        <CardDescription>
                          Tell us about yourself
                        </CardDescription>
                      </div>
                      {!editMode && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditMode(true)}
                        >
                          <Edit2 className="h-4 w-4 text-yellow-600" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300">{user.bio}</p>
                  </CardContent>
                </Card>

                {/* Desired Roles */}
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-yellow-600">
                          Desired Roles
                        </CardTitle>
                        <CardDescription>
                          Positions you're interested in
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user?.jobPreferences?.keywords.map((role, index) => (
                        <Badge
                          key={index}
                          className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/20"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Preferred Locations */}
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-yellow-600">
                          Preferred Locations
                        </CardTitle>
                        <CardDescription>
                          Where you want to work
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {user?.jobPreferences?.location.map((location, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 rounded-md bg-zinc-800/50"
                        >
                          <MapPin className="h-4 w-4 text-purple-400" />
                          <span>{location}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Job Types */}
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-600">Job Types</CardTitle>
                    <CardDescription>
                      Types of employment you're seeking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Internship"].map(
                        (type, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Switch disabled={!editMode} id={`type-${index}`} />
                            <Label
                              htmlFor={`type-${index}`}
                              className="text-yellow-600"
                            >
                              {type}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Remote Toggle */}
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-600">
                      Remote Preference
                    </CardTitle>
                    <CardDescription>
                      Toggle if you prefer fully remote roles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-zinc-400">
                        Remote Only
                      </Label>
                      <Switch
                        checked={user?.jobPreferences?.remote ?? false}
                        disabled={!editMode}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-yellow-600">
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">
                        Notifications
                      </h3>
                      <Separator className="bg-zinc-800" />
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="email-notifications"
                              className="text-base text-white"
                            >
                              Email Notifications
                            </Label>
                            <p className="text-sm text-zinc-400">
                              Receive job alerts and updates via email
                            </p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="job-alerts"
                              className="text-base text-white"
                            >
                              Job Alerts
                            </Label>
                            <p className="text-sm text-zinc-400">
                              Get notified about new job matches
                            </p>
                          </div>
                          <Switch id="job-alerts" defaultChecked />
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
