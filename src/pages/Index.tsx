import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTasks } from "@/hooks/use-tasks";
import type { Domain } from "@/lib/task-types";
import { DomainSelector } from "@/components/perf/DomainSelector";
import { TaskForm } from "@/components/perf/TaskForm";
import { DailyView } from "@/components/perf/DailyView";
import { MonthlyView } from "@/components/perf/MonthlyView";
import { ChartView } from "@/components/perf/ChartView";

type ViewMode = "daily" | "monthly" | "chart";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [domain, setDomain] = useState<Domain>("Programming");
  const [view, setView] = useState<ViewMode>("daily");
  const { tasks, addTask, deleteTask } = useTasks();

  const dateStr = format(selectedDate, "yyyy-MM-dd");

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg space-y-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Perf Traacker
          </h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] justify-start text-left text-sm font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-1 h-4 w-4" />
                {format(selectedDate, "MMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => d && setSelectedDate(d)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Domain Selector */}
        <DomainSelector domain={domain} onChange={setDomain} />

        {/* Task Form */}
        <TaskForm domain={domain} date={dateStr} onAdd={addTask} />

        {/* View Toggle */}
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => v && setView(v as ViewMode)}
          className="w-full"
        >
          <ToggleGroupItem value="daily" className="flex-1">
            Daily
          </ToggleGroupItem>
          <ToggleGroupItem value="monthly" className="flex-1">
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem value="chart" className="flex-1">
            Chart
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Results */}
        {view === "daily" && (
          <DailyView tasks={tasks} date={dateStr} onDelete={deleteTask} />
        )}
        {view === "monthly" && (
          <MonthlyView tasks={tasks} selectedDate={selectedDate} />
        )}
        {view === "chart" && (
          <ChartView tasks={tasks} selectedDate={selectedDate} />
        )}
      </div>
    </div>
  );
};

export default Index;
