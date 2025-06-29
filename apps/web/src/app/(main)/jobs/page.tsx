// app/(user)/all-jobs/page.tsx

import AllJobs from "@/src/components/jobs/AllJobs";

export default function AllJobsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  return <AllJobs searchParams={searchParams} />;
}
