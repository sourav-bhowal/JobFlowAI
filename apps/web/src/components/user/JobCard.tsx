"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Clock,
  Star,
  ExternalLink,
  Building,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  IndianRupee,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Separator } from "@workspace/ui/components/separator";
import { Button } from "@workspace/ui/components/button";
import { Progress } from "@workspace/ui/components/progress";
import { JobWithMatch } from "@/src/utils/utils";
import Link from "next/link";
import { itemVariants } from "@/src/utils/variants";
import { containerVariants } from "@/src/utils/variants";
import { SelectJob } from "@repo/db/schema";

// Job Card Component Props
interface JobCardProps {
  job: JobWithMatch | SelectJob;
}

// Job Card Component
export default function JobCard({ job }: JobCardProps) {
  // State for job card expansion state
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  // Function to Expand Job
  const toggleExpandJob = (jobId: number) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
    }
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 max-sm:hidden"
      >
        {/* Desktop Job Card */}
        <motion.div key={job.id} variants={itemVariants}>
          <Card
            className={cn(
              "bg-zinc-900 border-zinc-800 overflow-hidden transition-all duration-300"
            )}
          >
            <CardHeader className="pb-0 text-white">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12">
                    
                    <AvatarImage src={job.logo!!} alt={job.company!!} />
                    <AvatarFallback className="rounded-md text-primary bg-zinc-800">
                      {job
                        .company!!.split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">
                        {job.title.includes("-") || job.title.includes("(")
                          ? job.title.slice(
                              0,
                              job.title.indexOf("-") > -1
                                ? job.title.indexOf("-")
                                : job.title.indexOf("(")
                            )
                          : job.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-zinc-400 text-sm">
                      <Building className="h-3.5 w-3.5 mr-1" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-zinc-400">
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                        <span>{job.location}</span>
                        {(job.location === "Remote" ||
                          job.remote === true ||
                          job.location === "Work from Home" ||
                          job.location === "Work from home" ||
                          job.location === "remote") && (
                          <Badge
                            variant="outline"
                            className="ml-2 bg-zinc-800 text-zinc-300 border-zinc-700 text-xs"
                          >
                            Remote
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                        <span>
                          {job.experience?.match(/month|months|year|years/) ? (
                            <p className="text-destructive">Not mentioned</p>
                          ) : (
                            job.experience
                          )}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <IndianRupee className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                        <span>
                          {// Extracting the currency symbol from the salary string
                          job?.salary?.replace(/₹|\s+/g, " ").trim()}{" "}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                        <span>
                          {
                            new Date(job.createdAt!!)
                              .toISOString()
                              .split("T")[0]
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {"matchPercentage" in job && (
                  <div className="flex flex-col items-end">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                      <span className="font-semibold text-white">
                        {job.matchPercentage}% AI Match
                      </span>
                    </div>
                    <div className="w-24">
                      <Progress
                        value={job.matchPercentage}
                        className="h-1.5 bg-zinc-800"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {job?.skills?.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/20"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedJobId === job.id ? "auto" : 0,
                  opacity: expandedJobId === job.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="list-disc space-y-1 text-white text-sm pl-5">
                  {formatDescription(job.description!!)
                    .split("\n")
                    .map((point, i) => (
                      <li key={i}>{point.replace("• ", "")}</li>
                    ))}
                </ul>
                <Separator className="bg-zinc-800 my-4" />
              </motion.div>
            </CardContent>

            <CardFooter className="flex justify-end pt-0">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-primary text-white hover:bg-primary/50 hover:text-white"
                  onClick={() => toggleExpandJob(job.id)}
                >
                  {expandedJobId === job.id ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Less Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      More Details
                    </>
                  )}
                </Button>

                <Link href={job.jobLink!} target="_blank">
                  <Button
                    size="sm"
                    className={cn(
                      "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
                    )}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Apply Now
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>

      {/* Mobile Job Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 sm:hidden" // Only show on small screens
      >
        <motion.div key={job.id} variants={itemVariants}>
          <Card className="bg-zinc-900 border-zinc-800 overflow-hidden transition-all duration-300">
            <CardHeader className="pb-2">
              {/* Company header with logo and match percentage */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={job.logo!!} alt={job.company!!} />
                    <AvatarFallback className="rounded-md text-primary bg-zinc-800">
                      {job
                        .company!!.split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {job.company}
                    </h3>
                  </div>
                </div>
              </div>
              {/* Job title */}
              <h4 className="text-lg font-medium text-white">
                {job.title.includes("-") || job.title.includes("(")
                  ? job.title.slice(
                      0,
                      job.title.indexOf("-") > -1
                        ? job.title.indexOf("-")
                        : job.title.indexOf("(")
                    )
                  : job.title}
              </h4>

              <div className="flex items-center justify-between">
                {"matchPercentage" in job && (
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="text-sm font-semibold text-yellow-500">
                      {job.matchPercentage}% AI Match
                    </span>
                  </div>
                )}

                {(job.location === "Remote" ||
                  job.remote === true ||
                  job.location === "Work from Home" ||
                  job.location === "Work from home" ||
                  job.location === "remote") && (
                  <Badge
                    variant="outline"
                    className="w-fit bg-zinc-800 text-zinc-300 border-zinc-700 text-xs"
                  >
                    Remote
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="py-2 space-y-3">
              {/* Job details in a vertical stack */}
              <div className="space-y-2 gap-y-2 text-xs text-zinc-400">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-yellow-500" />
                  <span className="line-clamp-1">
                    {job?.location?.length && job?.location?.length > 20
                      ? job?.location?.slice(0, 30) + "..."
                      : job?.location}
                  </span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-3 w-3 mr-1 text-yellow-500" />
                  <span>
                    {job.experience?.match(/month|months|year|years/) ? (
                      <p className="text-destructive">Not mentioned</p>
                    ) : (
                      job.experience
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-yellow-500" />
                  <span>
                    {new Date(job.createdAt!!).toISOString().split("T")[0]}
                  </span>
                </div>
                <div className="flex items-center col-span-2">
                  <IndianRupee className="h-3 w-3 mr-1 text-yellow-500" />
                  <span>{job?.salary?.replace(/₹|\s+/g, " ").trim()}</span>
                </div>
              </div>

              {/* Skills - horizontal scrollable container */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {job?.skills?.map((skill, index) => (
                  <Badge
                    key={index}
                    className="flex-shrink-0 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/20 text-xs"
                  >
                    <CheckCircle className="h-2.5 w-2.5 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Expandable job description */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedJobId === job.id ? "auto" : 0,
                  opacity: expandedJobId === job.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="list-disc space-y-1 text-white text-xs pl-4">
                  <ul className="list-disc space-y-1 text-white text-xs pl-4">
                    {formatDescription(job.description!!)
                      .split("\n")
                      .map((point, i) => (
                        <li key={i}>{point.replace(/^•\s*/, "")}</li>
                      ))}
                  </ul>
                </ul>
                <Separator className="bg-zinc-800 my-3" />
              </motion.div>
            </CardContent>

            <CardFooter className="pt-0 pb-3 flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-primary text-white hover:bg-primary/50 hover:text-white"
                onClick={() => toggleExpandJob(job.id)}
              >
                {expandedJobId === job.id ? (
                  <>
                    <ChevronUp className="h-3.5 w-3.5 mr-1" />
                    Less Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3.5 w-3.5 mr-1" />
                    More Details
                  </>
                )}
              </Button>

              <Link href={job.jobLink!!} className="w-full">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Apply Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
}

// Function to format the job description
function formatDescription(description: string): string {
  return description
    .split(/\d+\.\s+|(?<!\b(?:i|e|etc|vs|viz|no|al))\.\s+(?=[A-Z])|;/g) // smart splits
    .map((line) => line.trim()) // trim each part
    .filter((line) => line && line !== ".") // remove empty or dot-only lines
    .map((line) => `• ${line}`) // bullet prefix
    .join("\n");
}
