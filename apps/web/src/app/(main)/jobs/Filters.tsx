"use client";
import { SelectJob } from "@repo/db/schema";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";

// JOBS FILTER LAYOUT PROPS
interface JobsFilterLayoutProps {
  children: React.ReactNode;
}

// JOBS FILTER LAYOUT COMPONENT
export const JobsFilterLayout = ({ children }: JobsFilterLayoutProps) => {
  // ROUTER
  const router = useRouter();

  // SEARCH PARAMS
  const searchParams = useSearchParams();

  // USE OPTIMISTIC HOOK TO MANAGE FILTERS
  const [optimisticFilters, setOptimisticFilters] = useOptimistic({
    jobs: searchParams.getAll("jobs"),
    skills: searchParams.get("skills") || undefined,
    location: searchParams.get("location") || undefined,
    sort: searchParams.get("sort") || undefined,
  });

  // USE TRANSITION HOOK  TO MANAGE PENDING STATE
  const [isPending, startTransition] = useTransition();

  // FUNCTION TO UPDATE FILTERS
  function updateFilters(updates: Partial<typeof optimisticFilters>) {
    // CREATE NEW STATE OBJECT
    const newState = { ...optimisticFilters, ...updates };

    // CREATE NEW SEARCH PARAMS OBJECT
    const newSearchParams = new URLSearchParams(searchParams);

    // ITERATE OVER NEW STATE OBJECT
    Object.entries(newState).forEach(([key, value]) => {
      // DELETE KEY FROM SEARCH PARAMS
      newSearchParams.delete(key);
      // IF VALUE IS ARRAY, APPEND EACH VALUE TO SEARCH PARAMS
      if (Array.isArray(value)) {
        value.forEach((v) => newSearchParams.append(key, v));
      } else if (value) {
        newSearchParams.set(key, value);
      }
    });

    // START TRANSITION AND UPDATE FILTERS
    startTransition(() => {
      setOptimisticFilters(newState);
      router.push(`?${newSearchParams.toString()}`);
    });
  }

  return <></>;
};
