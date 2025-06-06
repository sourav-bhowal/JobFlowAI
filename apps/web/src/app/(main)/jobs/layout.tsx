import { db } from "@repo/db/drizzle";
import { jobs } from "@repo/db/schema";
import { JobsFilterLayout } from "./Filters";

export default async function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobsFilterLayout>{children}</JobsFilterLayout>;
}
