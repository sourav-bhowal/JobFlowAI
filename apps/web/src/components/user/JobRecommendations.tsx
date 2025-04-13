"use client";
import InfiniteScrollContainer from "@/src/components/shared/InfiniteScrollContainer";
import { JobCardLoadingSkeletonSM } from "@/src/components/shared/JobCardLoadingSkeleton";
import JobRecommendations from "@/src/components/user/JobCard";
import { kyInstance } from "@/src/utils/ky";
import { JobsPage } from "@/src/utils/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Briefcase, Loader2 } from "lucide-react";

// User Recommendations Page Component
export default function UserJobReccomendations() {
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
    retry: 5,
  });

  // FLATTENING THE DATA
  const jobs = data?.pages.flatMap((page) => page.jobs) ?? [];

  // RENDERING POSTS
  if (status === "pending") {
    return (
      <div className="min-h-screen py-8 px-4 bg-black">
        <JobCardLoadingSkeletonSM />
      </div>
    );
  }

  // IF THERE ARE NO JOBS
  if (status === "success" && !jobs.length && !hasNextPage) {
    return (
      <div className="min-h-screen py-8 px-4 bg-black">
        <p className="text-center text-muted-foreground">
          No job recommendations available. Please check back later.
        </p>
      </div>
    );
  }

  // IF THERE IS AN ERROR
  if (status === "error") {
    return (
      <div className="min-h-screen py-8 px-4 bg-black">
        <p className="text-center text-destructive">
          An error occured while loading posts.
        </p>
      </div>
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
