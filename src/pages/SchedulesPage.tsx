import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import { format, addDays, addMonths, subMonths, subDays } from "date-fns";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

type Schedule = {
  id: number;
  name: string;
  report: string;
  frequency: string;
  startDate: Date;
  created: string;
};

const mockReports = [
  "Weekly Sales",
  "Customer Cohort Analysis",
  "Inventory Status",
  "Sales by Category",
];

const frequencies = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

// --- ADDED: Demo Sample Data ---
const sampleSchedules: Schedule[] = [
  {
    id: 1,
    name: "Monday Morning Sales",
    report: "Weekly Sales",
    frequency: "weekly",
    startDate: addDays(new Date(), 2),
    created: format(subDays(new Date(), 3), "yyyy-MM-dd"),
  },
  {
    id: 2,
    name: "Stock Check",
    report: "Inventory Status",
    frequency: "daily",
    startDate: new Date(),
    created: format(subDays(new Date(), 10), "yyyy-MM-dd"),
  },
  {
    id: 3,
    name: "Monthly Category Review",
    report: "Sales by Category",
    frequency: "monthly",
    startDate: addMonths(new Date(), 1),
    created: format(subMonths(new Date(), 1), "yyyy-MM-dd"),
  },
];

export default function SchedulesPage() {
  // --- UPDATED: Prepopulate with samples ---
  const [schedules, setSchedules] = React.useState<Schedule[]>(() => [...sampleSchedules]);
  const [open, setOpen] = React.useState(false);

  // Form setup
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      report: "",
      frequency: "weekly",
      startDate: null as Date | null,
    },
  });

  const startDate = watch("startDate");

  function onSubmit(data: any) {
    const schedule: Schedule = {
      id: Date.now(),
      name: data.name,
      report: data.report,
      frequency: data.frequency,
      startDate: data.startDate,
      created: format(new Date(), "yyyy-MM-dd"),
    };
    setSchedules((prev) => [...prev, schedule]);
    setOpen(false);
    reset();
    toast({
      title: "Schedule created",
      description: `Scheduled ${data.report} (${data.frequency})`,
    });
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold mb-1">Report Scheduling</h2>
          <p className="text-muted-foreground mb-0">
            Manage scheduled (cron) reports, email notifications, and history.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="gap-2">
              <Plus size={18} /> Create Schedule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Schedule</DialogTitle>
              <DialogDescription>
                Set a report, schedule timing, and frequency.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 pt-2"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Schedule Name</label>
                <Input
                  {...register("name", { required: "Name is required" })}
                  placeholder="e.g. Monday morning sales"
                />
                {errors.name && (
                  <div className="text-destructive text-xs mt-1">{errors.name.message as string}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Report</label>
                <select
                  className="border rounded px-3 py-2 w-full focus:outline-none bg-background"
                  {...register("report", { required: "Pick a report" })}
                  defaultValue=""
                >
                  <option value="" disabled>Select report</option>
                  {mockReports.map((report) => (
                    <option key={report} value={report}>{report}</option>
                  ))}
                </select>
                {errors.report && (
                  <div className="text-destructive text-xs mt-1">{errors.report.message as string}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Frequency</label>
                <select
                  className="border rounded px-3 py-2 w-full focus:outline-none bg-background"
                  {...register("frequency", { required: true })}
                  defaultValue="weekly"
                >
                  {frequencies.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                {/* Shadcn Datepicker using popover for a11y & clarity */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => setValue("startDate", date, { shouldValidate: true })}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && (
                  <div className="text-destructive text-xs mt-1">Date is required</div>
                )}
                {/* Required validation for date */}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save Schedule</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Schedules Table */}
      <div className="rounded bg-white p-3 sm:p-5 shadow-sm text-muted-foreground overflow-x-auto">
        {schedules.length === 0 ? (
          <p className="text-center py-10 text-sm text-muted-foreground">
            No schedules created yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Report</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.report}</TableCell>
                  <TableCell>
                    {s.frequency === "daily" && (
                      <span className="inline-flex items-center gap-1"><Clock size={14} /> Daily</span>
                    )}
                    {s.frequency === "weekly" && (
                      <span className="inline-flex items-center gap-1"><Calendar size={14} /> Weekly</span>
                    )}
                    {s.frequency === "monthly" && (
                      <span className="inline-flex items-center gap-1"><Calendar size={14} /> Monthly</span>
                    )}
                  </TableCell>
                  <TableCell>{format(s.startDate, "PPP")}</TableCell>
                  <TableCell>{s.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
