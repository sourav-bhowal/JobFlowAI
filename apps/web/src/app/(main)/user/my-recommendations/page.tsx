"use client";
import InfiniteScrollContainer from "@/src/components/shared/InfiniteScrollContainer";
import JobCardLoadingSkeleton from "@/src/components/shared/JobCardLoadingSkeleton";
import JobRecommendations from "@/src/components/user/JobCard";
import { kyInstance } from "@/src/utils/ky";
import { JobsPage } from "@/src/utils/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Briefcase, Loader2 } from "lucide-react";

// User Recommendations Page Component
export default function UserReccomendationsPage() {
  // GET POSTS USING REACT QUERY INFINTE SCROLL
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["jobs", "my-recommendations"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/jobs/user-reccomendations",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<JobsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    retry: 3,
    gcTime: 1000 * 60 * 5, // 5 minutes
  });

  // FLATTENING THE DATA
  const jobs = data?.pages.flatMap((page) => page.jobs) ?? [];

  // RENDERING POSTS
  if (status === "pending") {
    return (
      <div className="min-h-screen py-8 px-4 bg-black">
        <div className="w-full h-10 bg-zinc-800 rounded-lg animate-pulse mb-6" />
        <div className="flex flex-col gap-4">
          <JobCardLoadingSkeleton />
          <JobCardLoadingSkeleton />
        </div>
      </div>
    );
  }

  if (status === "success" && !jobs.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No jobs found. Please check back later.
      </p>
    );
  }

  // IF THERE IS AN ERROR
  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occured while loading posts.
      </p>
    );
  }

  return (
    <main className="bg-black min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-yellow-600" />
            <h2 className="text-xl font-bold text-white">Recommended Jobs</h2>
          </div>
        </div>

        <InfiniteScrollContainer
          className="space-y-5"
          onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        >
          {jobs.map((job) => (
            <JobRecommendations key={job.id} job={job} />
          ))}
          {isFetchingNextPage && (
            <Loader2 className="mx-auto my-3 animate-spin text-white" />
          )}
        </InfiniteScrollContainer>
      </div>
    </main>
  );
}
