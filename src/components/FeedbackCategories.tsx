
import { FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";

interface FeedbackCategoriesProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function FeedbackCategories({
  options,
  value = [],
  onChange,
}: FeedbackCategoriesProps) {
  return (
    <FormItem>
      <FormLabel>Feedback Categories (select one or more)</FormLabel>
      <FormControl>
        <div className="flex flex-wrap gap-3">
          {options.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 bg-muted px-2 py-1 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                value={category}
                checked={value.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...value, category]);
                  } else {
                    onChange(value.filter((c) => c !== category));
                  }
                }}
                className="accent-primary w-4 h-4"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
