
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

export type TemplateFormValues = {
  name: string;
  type: string;
  description: string;
};

const TEMPLATE_TYPES = [
  { value: "Table", label: "Table" },
  { value: "Line Chart", label: "Line Chart" },
  { value: "Bar Chart", label: "Bar Chart" },
  { value: "Pie Chart", label: "Pie Chart" },
  { value: "Heat Map", label: "Heat Map" }, // Added Heat Map
  { value: "Summary", label: "Summary" },
];

export default function CreateTemplateDialog({
  children,
  onCreate,
}: {
  children: React.ReactNode;
  onCreate: (data: TemplateFormValues) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TemplateFormValues>({
    defaultValues: {
      name: "",
      type: "",
      description: "",
    },
  });

  const onSubmit = (data: TemplateFormValues) => {
    onCreate(data);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New Report Template</DialogTitle>
            <DialogDescription>
              Define the basic information for your new report template.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block mb-1 font-medium" htmlFor="template-name">
                Template Name
              </label>
              <Input
                id="template-name"
                placeholder="e.g. Monthly Revenue Analysis"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-xs text-destructive">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="template-type">
                Report Type
              </label>
              <Select
                value={watch("type")}
                onValueChange={(val) => setValue("type", val, { shouldValidate: true })}
                required
              >
                <SelectTrigger id="template-type">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <span className="text-xs text-destructive">{errors.type.message}</span>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="template-desc">
                Description <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                id="template-desc"
                placeholder="Briefly describe this template's purpose..."
                {...register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Template</Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
