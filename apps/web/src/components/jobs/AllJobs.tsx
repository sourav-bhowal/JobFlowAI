// AllJobsClient.tsx
"use client";

import InfiniteScrollContainer from "@/src/components/shared/InfiniteScrollContainer";
import { JobCardLoadingSkeletonSM } from "@/src/components/shared/JobCardLoadingSkeleton";
import JobCard from "@/src/components/user/JobCard";
import { kyInstance } from "@/src/utils/ky";
import { AllJobsPage } from "@/src/utils/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function AllJobs({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const roles = Array.isArray(searchParams.roles)
    ? searchParams.roles
    : searchParams.roles?.split(",") ?? [];
  const skills = Array.isArray(searchParams.skills)
    ? searchParams.skills
    : searchParams.skills?.split(",") ?? [];
  const location = Array.isArray(searchParams.location)
    ? searchParams.location
    : searchParams.location?.split(",") ?? [];
  const remote = searchParams.remote === "true";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "jobs",
      roles.sort().join(","),
      skills.sort().join(","),
      location.sort().join(","),
      remote,
    ],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get("/api/jobs", {
          searchParams: {
            roles: roles.join(","),
            skills: skills.join(","),
            location: location.join(","),
            remote: remote ? "true" : "false",
            cursor: pageParam ?? "",
          },
        })
        .json<AllJobsPage>(),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    retry: 3,
  });

  const jobs = data?.pages.flatMap((page) => page.jobs) ?? [];

  if (status === "pending") {
    return <JobCardLoadingSkeletonSM />;
  }

  if (status === "success" && !jobs.length) {
    return <p className="text-center text-muted-foreground">No jobs found.</p>;
  }

  if (status === "error") {
    return <p className="text-center text-destructive">Failed to load jobs.</p>;
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      {isFetchingNextPage && (
        <Loader2 className="mx-auto my-3 animate-spin text-white" />
      )}
    </InfiniteScrollContainer>
  );
}
