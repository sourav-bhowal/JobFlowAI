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

// This component is a multi-select dropdown that allows users to select multiple options from a list.
interface MultiSelectProps {
  selected: string[];
  onChange: (updated: string[]) => void;
  fieldName: "roles" | "locations" | "skills";
}

// The MultiSelect component takes in three props: selected (an array of selected values), onChange (a function to update the selected values), and fieldName (to determine which options to display).
export function MultiSelect({
  selected,
  onChange,
  fieldName,
}: MultiSelectProps) {
  // toggleOption function updates the selected options based on user interaction.
  const toggleOption = (value: string) => {
    const isSelected = selected.includes(value); // Check if the value is already selected
    const updated = isSelected // If it is selected, remove it from the list
      ? selected.filter((v) => v !== value) // Otherwise, add it to the list
      : [...selected, value];
    onChange(updated); // Call the onChange function with the updated list
  };

  // The Popover component is used to create a dropdown menu that displays the options.
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="bg-zinc-950 border-primary h-10 text-primary hover:bg-primary/80"
      >
        <Button
          variant="outline"
          className="md:w-[300px] w-[250px] justify-between"
        >
          {selected.length > 0
            ? `${selected.length} ${fieldName} selected`
            : `Select ${fieldName}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[300px] w-[250px] p-2 space-y-1 max-h-64 overflow-y-auto">
        {fieldName === "roles" &&
          desiredRolesOptions.map(({ label, value }) => (
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
        {fieldName === "locations" &&
          desiredLocationsOptions.map(({ label, value }) => (
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
        {fieldName === "skills" &&
          desiredSkillsOptions.map(({ label, value }) => (
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
      </PopoverContent>
    </Popover>
  );
}
