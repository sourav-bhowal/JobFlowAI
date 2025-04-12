"use client";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  // Phone,
  // MapPin,
  Edit2,
  Check,
  Settings,
  LogOut,
  Globe,
  Loader2,
} from "lucide-react";
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
// import { Textarea } from "@workspace/ui/components/textarea";
import { useForm, zodResolver } from "@workspace/ui/hooks";
import {
  updateJobPreferencesSchema,
  UpdateJobPreferencesSchemaType,
} from "@repo/validations/src/job-preference-validation";
import { areObjectsEqual, jobTypeOptions } from "@/src/utils/utils";
import { MultiSelect } from "../shared/MultiSelect";
import { X } from "lucide-react";
import { updateUserJobPreferenceAction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SelectUserWithJobPreferences, JobType } from "@repo/db/schema";
import { useQueryClient } from "@tanstack/react-query";

// Interface for user data
interface UserProfileProps {
  user: SelectUserWithJobPreferences;
}

// User Profile Component
export default function UserProfile({ user }: UserProfileProps) {
  // State for active tab and edit mode
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);

  // Transition state for form submission
  const [isPending, startTransition] = useTransition();

  // Router for navigation
  const router = useRouter();

  // Import the query client from react-query
  const queryClient = useQueryClient();

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // Form
  const { handleSubmit, watch, setValue } =
    useForm<UpdateJobPreferencesSchemaType>({
      resolver: zodResolver(updateJobPreferencesSchema),
      defaultValues: {
        remote: user.jobPreferences?.remote,
        jobTypes: user.jobPreferences?.jobTypes || [],
        keywords: user.jobPreferences?.keywords || [],
        location: user.jobPreferences?.location || [],
        skills: user.jobPreferences?.skills || [],
      },
    });

  // Watch job types
  const selectedTypes = watch("jobTypes") || [];

  // Toggle job type selection
  const toggleJobType = (value: JobType, checked: boolean) => {
    const updated = checked // If checked, add to selected types
      ? [...selectedTypes, value]
      : selectedTypes.filter((v) => v !== value); // If unchecked, remove from selected types
    setValue("jobTypes", updated); // Update the form value
  };

  // Watch desired roles
  const selectedRoles = watch("keywords") || [];

  // Handle role selection
  const handleRoleChange = (updatedRoles: string[]) => {
    setValue("keywords", updatedRoles, { shouldValidate: true }); // Update the form value
  };

  // Remove role
  const handleRemoveRole = (role: string) => {
    const updated = selectedRoles.filter((r) => r !== role); // Remove the role
    setValue("keywords", updated, { shouldValidate: true }); // Update the form value
  };

  // Watch location
  const selectedLocations = watch("location") || [];

  // Handle location selection
  const handleLocationChange = (updatedLocations: string[]) => {
    setValue("location", updatedLocations, { shouldValidate: true }); // Update the form value
  };

  // Remove location
  const handleRemoveLocation = (location: string) => {
    const updated = selectedLocations.filter((l) => l !== location); // Remove the location
    setValue("location", updated, { shouldValidate: true }); // Update the form value
  };

  // Watch skills
  const selectedSkills = watch("skills") || [];

  // Handle skill selection
  const handleSkillChange = (updatedSkills: string[]) => {
    setValue("skills", updatedSkills, { shouldValidate: true }); // Update the form value
  };

  // Remove skill
  const handleRemoveSkill = (skill: string) => {
    const updated = selectedSkills.filter((s) => s !== skill); // Remove the skill
    setValue("skills", updated, { shouldValidate: true }); // Update the form value
  };

  // Initial values of the user job preferences
  const initialValues = {
    remote: user.jobPreferences?.remote,
    jobTypes: user.jobPreferences?.jobTypes,
    keywords: user.jobPreferences?.keywords,
    location: user.jobPreferences?.location,
    skills: user.jobPreferences?.skills,
  };

  // Handle form submission
  const onSubmit = (data: UpdateJobPreferencesSchemaType) => {
    // Check if the form values are equal to the initial values
    const isDifferent = !areObjectsEqual(data, initialValues);

    // If no changes are detected, show a success message
    if (!isDifferent) {
      setEditMode(false); // Disable edit mode
      toast.success("No changes detected."); // Show error message
      return;
    }

    // If changes are detected, proceed with the update
    startTransition(async () => {
      const { error } = await updateUserJobPreferenceAction(data);
      if (error) {
        toast.error(error);
      } else {
        setEditMode(false); // Disable edit mode
        // Invalidate the queries to refetch the data
        queryClient.invalidateQueries({
          queryKey: ["jobs", "my-recommendations"],
        });
        toast.success("Job preferences updated successfully");
        router.refresh(); // Refresh the page to show updated data
      }
    });
  };

  // Render
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header with user info */}
      <div className="bg-gradient-to-r from-yellow-600/50 to-orange-600/50 border-b border-zinc-800">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 max-sm:relative">
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
              {/* <Button
                className="absolute bottom-0 right-0 bg-yellow-600 p-1.5 rounded-full border-2 border-zinc-900 hover:bg-yellow-700 transition-colors"
                onClick={() => setEditMode(!editMode)}
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button> */}
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
                    <Globe className="h-4 w-4 text-yellow-400" />
                    {user.username}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="max-sm:absolute max-sm:right-0 max-sm:top-8"
                >
                  <Button
                    onClick={() => {
                      if (editMode) {
                        handleSubmit(onSubmit)(); // Submit if editMode is true
                      } else {
                        setEditMode(true); // Otherwise just enable editing
                      }
                    }}
                    variant="outline"
                    className="bg-white/10 text-white hover:bg-white/20 border-orange-400 transition-colors flex items-center gap-2"
                  >
                    {!isPending ? (
                      editMode ? (
                        <>
                          <Check className="h-4 w-4" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit2 className="h-4 w-4" />
                          Edit Profile
                        </>
                      )
                    ) : (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
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
                {/* <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Phone className="h-4 w-4 text-yellow-400" />
                  <span>{user.gitHub}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  <span>{user.twitter}</span>
                </div> */}
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
          <form onSubmit={handleSubmit(onSubmit)} id="job-preferences-form">
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
                  {/* <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-yellow-600">About</CardTitle>
                      <CardDescription>Tell us about yourself</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        disabled={!editMode}
                        placeholder="Write a brief description about yourself..."
                        className="resize-none p-0 text-white border-none focus-visible:border-none focus-visible:ring-0"
                        defaultValue={user?.bio!!}
                      />
                    </CardContent>
                  </Card> */}

                  {/* Desired Roles */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-yellow-600">
                        Desired Roles
                      </CardTitle>
                      <CardDescription>
                        Positions you're interested in
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Show selected roles as removable badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedRoles.map((role) => (
                          <Badge
                            key={role}
                            className="flex items-center gap-1 bg-yellow-600/10 text-yellow-400 border-orange-500/20 hover:bg-orange-600/20"
                          >
                            {role}
                            {editMode && (
                              <button
                                onClick={() => handleRemoveRole(role)}
                                type="button"
                                className="ml-1"
                              >
                                <X className="w-3 h-3 hover:text-red-500" />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>

                      {/* Actual MultiSelect */}
                      {editMode && (
                        <MultiSelect
                          selected={selectedRoles}
                          onChange={handleRoleChange}
                          fieldName="roles"
                        />
                      )}
                    </CardContent>
                  </Card>

                  {/* Skills */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-yellow-600">Skills</CardTitle>
                      <CardDescription>
                        Your technical skills and expertise
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Show selected skills as removable badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedSkills.map((skill) => (
                          <Badge
                            key={skill}
                            className="flex items-center gap-1 bg-yellow-600/10 text-yellow-400 border-orange-500/20 hover:bg-orange-600/20"
                          >
                            {skill}
                            {editMode && (
                              <button
                                onClick={() => handleRemoveSkill(skill)}
                                type="button"
                                className="ml-1"
                              >
                                <X className="w-3 h-3 hover:text-red-500" />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>

                      {/* Actual MultiSelect */}
                      {editMode && (
                        <MultiSelect
                          selected={selectedSkills}
                          onChange={handleSkillChange}
                          fieldName="skills"
                        />
                      )}
                    </CardContent>
                  </Card>

                  {/* Preferred Locations */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-yellow-600">
                        Preferred Locations
                      </CardTitle>
                      <CardDescription>Where you want to work</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Show selected locations as removable badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedLocations.map((location) => (
                          <Badge
                            key={location}
                            className="flex items-center gap-1 bg-yellow-600/10 text-yellow-400 border-orange-500/20 hover:bg-orange-600/20"
                          >
                            {location}
                            {editMode && (
                              <button
                                onClick={() => handleRemoveLocation(location)}
                                type="button"
                                className="ml-1"
                              >
                                <X className="w-3 h-3 hover:text-red-500" />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>

                      {/* Actual MultiSelect */}
                      {editMode && (
                        <MultiSelect
                          selected={selectedLocations}
                          onChange={handleLocationChange}
                          fieldName="locations"
                        />
                      )}
                    </CardContent>
                  </Card>

                  {/* Job Types */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-yellow-600">
                        Job Types
                      </CardTitle>
                      <CardDescription>
                        Types of employment you're seeking
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {jobTypeOptions.map(({ label, value }) => (
                          <div
                            key={value}
                            className="flex items-center space-x-2"
                          >
                            <Switch
                              disabled={!editMode}
                              checked={selectedTypes.includes(value)}
                              onCheckedChange={(checked) =>
                                toggleJobType(value, checked)
                              }
                            />
                            <Label className="text-yellow-600">{label}</Label>
                          </div>
                        ))}
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
                          checked={watch("remote") || false}
                          disabled={!editMode}
                          onCheckedChange={(checked) =>
                            setValue("remote", checked)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </form>

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
                        onClick={() => signOut()}
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
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
