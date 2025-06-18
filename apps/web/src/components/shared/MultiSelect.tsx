import {
  desiredLocationsOptions,
  desiredRolesOptions,
  desiredSkillsOptions,
} from "@/src/utils/utils";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";

// Interface for the options
interface MultiSelectProps {
  icon?: React.ReactNode; // Optional icon prop
  selected: string[];
  onChange: (updated: string[]) => void;
  fieldName: "roles" | "locations" | "skills";
  disabled?: boolean; // Optional disabled prop
}

// MultiSelect component
export function MultiSelect({
  icon,
  selected,
  onChange,
  fieldName,
  disabled = false, // Default to false if not provided
}: MultiSelectProps) {
  // State to manage the search input
  const [search, setSearch] = useState("");

  // Function to toggle the selected options
  const toggleOption = (value: string) => {
    // Check if the value is already selected
    const isSelected = selected.includes(value);

    // Update the selected options based on the toggle
    const updated = isSelected
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    // Call the onChange function with the updated options
    onChange(updated);
  };

  // Function to get the options based on the field name
  const getOptions = () => {
    switch (fieldName) {
      case "roles":
        return desiredRolesOptions;
      case "locations":
        return desiredLocationsOptions;
      case "skills":
        return desiredSkillsOptions;
      default:
        return [];
    }
  };

  // Filtered options based on the search input
  const filteredOptions = getOptions().filter(({ label }) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="bg-zinc-950 border-primary h-10 text-primary hover:bg-primary/80"
      >
        <Button
          variant="outline"
          className="md:w-[300px] w-[250px] justify-start text-left gap-2"
          disabled={disabled} // Disable the button if the prop is true
        >
          {/* Optional icon can be rendered here if needed */}
          {icon && <span className="mr-2">{icon}</span>}
          {selected.length > 0
            ? `${selected.length} ${fieldName} selected`
            : `Select ${fieldName}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[300px] w-[250px] p-2 space-y-2 max-h-72 overflow-y-auto">
        <Input
          placeholder={`Search ${fieldName}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm focus-visible:ring-0"
        />
        <div className="space-y-1">
          {filteredOptions.map(({ label, value }) => (
            <div
              key={value}
              className="flex items-center gap-2 cursor-pointer hover:bg-muted/30 rounded-md px-2 py-1"
              onClick={() => toggleOption(value)}
            >
              <Checkbox
                checked={selected.includes(value)}
                onCheckedChange={() => toggleOption(value)}
                id={value}
              />
              <label htmlFor={value} className="text-sm cursor-pointer">
                {label}
              </label>
            </div>
          ))}
        </div>

        {filteredOptions.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No {fieldName} found.
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
