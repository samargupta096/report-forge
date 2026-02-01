
import { useState } from "react";
import { Star } from "lucide-react";
import { FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";

interface FeedbackRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export default function FeedbackRating({ value, onChange }: FeedbackRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <FormItem>
      <FormLabel>Overall Rating</FormLabel>
      <FormControl>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              className="focus:outline-none"
              onClick={() => onChange(rating)}
              onMouseEnter={() => setHoveredRating(rating)}
              onMouseLeave={() => setHoveredRating(0)}
              aria-label={`${rating} Star${rating > 1 ? "s" : ""}`}
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  rating <= (hoveredRating || value)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {value > 0 && `${value} out of 5 stars`}
          </span>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
