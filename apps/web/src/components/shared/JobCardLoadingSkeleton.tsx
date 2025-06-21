import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import React from "react";

// Loading skeleton for the job card
export function JobCardLoadingSkeletonSM() {
  return (
    <div className="flex flex-col max-w-6xl mx-auto md:px-4">
      <div className="max-sm:w-full w-64 h-10 bg-zinc-800 rounded-lg animate-pulse mb-6" />
      <div className="flex flex-col gap-4">
        <JobCardSkeleton />
        <JobCardSkeleton />
      </div>
    </div>
  );
}

// JobCardSkeleton component
function JobCardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="animate-pulse">
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <CardHeader className="pb-2">
            {/* Company header with logo placeholder */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-800" />
                <div className="h-4 w-24 bg-zinc-800 rounded" />
              </div>
              <div className="flex items-center">
                <div className="h-4 w-12 bg-zinc-800 rounded" />
              </div>
            </div>

            {/* Job title placeholder */}
            <div className="h-6 w-3/4 bg-zinc-800 rounded mt-2" />
          </CardHeader>

          <CardContent className="py-2 space-y-3">
            {/* Job details placeholders */}
            <div className="grid grid-cols-2 gap-y-2">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-zinc-800 mr-2" />
                <div className="h-3 w-16 bg-zinc-800 rounded" />
              </div>
              <div className="justify-self-end">
                <div className="h-5 w-14 bg-zinc-800 rounded" />
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-zinc-800 mr-2" />
                <div className="h-3 w-16 bg-zinc-800 rounded" />
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-zinc-800 mr-2" />
                <div className="h-3 w-16 bg-zinc-800 rounded" />
              </div>
              <div className="flex items-center col-span-2">
                <div className="h-3 w-3 rounded-full bg-zinc-800 mr-2" />
                <div className="h-3 w-24 bg-zinc-800 rounded" />
              </div>
            </div>

            {/* Skills placeholder - horizontal scrollable container */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="h-6 w-16 flex-shrink-0 bg-zinc-800 rounded"
                />
              ))}
            </div>
          </CardContent>

          <CardFooter className="pt-0 pb-3 flex flex-col space-y-2">
            {/* Button placeholders */}
            <div className="h-8 w-full bg-zinc-800 rounded" />
            <div className="h-8 w-full bg-zinc-800 rounded" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
