"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { BriefcaseBusinessIcon, MapPin, Pencil, Wrench } from "lucide-react";
import { MultiSelect } from "@/src/components/shared/MultiSelect";
import { Switch } from "@workspace/ui/components/switch";
import { Label } from "@workspace/ui/components/label";

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
    roles: searchParams.getAll("roles"),
    skills: searchParams.getAll("skills") || undefined,
    location: searchParams.getAll("location") || undefined,
    remote: searchParams.get("remote") === "true" || undefined,
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
        newSearchParams.set(key, String(value));
      }
    });

    // START TRANSITION
    startTransition(() => {
      // UPDATE OPTIMISTIC FILTERS
      setOptimisticFilters(newState);
      // PUSH NEW SEARCH PARAMS TO ROUTER
      router.push(`?${newSearchParams.toString()}`);
    });
  }

  return (
    <main className="bg-black min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-5">
        <div className="flex items-center">
          <BriefcaseBusinessIcon className="h-5 w-5 mr-2 text-yellow-600" />
          <h2 className="text-xl font-bold text-white">Recent Jobs</h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Roles Filter Dropdown */}
          <MultiSelect
            icon={<Wrench />}
            fieldName="roles"
            selected={optimisticFilters.roles || []}
            onChange={(selected) => updateFilters({ roles: selected })}
            disabled={isPending}
          />

          {/* Skills Filter Dropdown */}
          <MultiSelect
            icon={<Pencil />}
            fieldName="skills"
            selected={optimisticFilters.skills || []}
            onChange={(selected) => updateFilters({ skills: selected })}
            disabled={isPending}
          />

          {/* Location Filter Dropdown */}
          <MultiSelect
            icon={<MapPin />}
            fieldName="locations"
            selected={optimisticFilters.location || []}
            onChange={(selected) => updateFilters({ location: selected })}
            disabled={isPending}
          />

          <div className="flex items-center space-x-2">
            <Label className="flex items-center space-x-2 text-white">
              <span>Remote</span>
            </Label>
            {/* Remote Filter Switch */}
            <Switch
              checked={optimisticFilters.remote || false}
              onCheckedChange={(checked) =>
                updateFilters({ remote: checked ? true : undefined })
              }
              disabled={isPending}
            />
          </div>
        </div>

        {children}
      </div>
    </main>
  );
};
