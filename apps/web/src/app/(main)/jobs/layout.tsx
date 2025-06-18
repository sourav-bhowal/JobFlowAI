import { JobsFilterLayout } from "./Filters";
import { Metadata } from "next";

// Metadata is a Next.js type that allows us to define metadata for the page
export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Explore job opportunities tailored to your skills and interests",
};

export default async function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobsFilterLayout>{children}</JobsFilterLayout>;
}
