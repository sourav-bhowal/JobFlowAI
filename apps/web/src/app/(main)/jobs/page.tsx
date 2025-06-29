// app/(user)/all-jobs/page.tsx

import AllJobs from "@/src/components/jobs/AllJobs";
import { Suspense } from "react";

export default function AllJobsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <AllJobs searchParams={searchParams} />
    </Suspense>
  );
}
