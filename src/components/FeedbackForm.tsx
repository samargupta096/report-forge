
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, User, Mail } from "lucide-react";
import FeedbackRating from "./FeedbackRating";
import FeedbackCategories from "./FeedbackCategories";

// Schema: categories as array of strings (multi-select)
const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  rating: z.number().min(1, "Please select a rating").max(5, "Rating cannot exceed 5"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

const categories = [
  "General Feedback",
  "Bug Report",
  "Feature Request",
  "User Experience",
  "Performance",
  "Other"
];

export default function FeedbackForm() {
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      categories: [],
      message: "",
    },
  });

  const onSubmit = (data: FeedbackForm) => {
    console.log("Feedback submitted:", data);
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable feedback. We'll review it and get back to you soon.",
    });
    form.reset();
    setSelectedRating(0);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageSquare className="h-8 w-8 text-primary" />
          <CardTitle className="text-3xl font-bold">Customer Feedback</CardTitle>
        </div>
        <CardDescription className="text-lg">
          We value your opinion! Please share your experience with us.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FeedbackRating
                  value={selectedRating}
                  onChange={(rating) => {
                    setSelectedRating(rating);
                    field.onChange(rating);
                  }}
                />
              )}
            />

            {/* Categories - Multi-select */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FeedbackCategories
                  options={categories}
                  value={field.value || []}
                  onChange={field.onChange}
                />
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please share your thoughts, suggestions, or any issues you've encountered..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg">
              Submit Feedback
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
