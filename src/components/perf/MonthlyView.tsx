import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Task } from "@/lib/task-types";
import { PROGRAMMING_TYPES, MARKETING_TYPES } from "@/lib/task-types";
import { format, startOfMonth, endOfMonth, getWeeksInMonth } from "date-fns";

interface Props {
  tasks: Task[];
  selectedDate: Date;
}

export function MonthlyView({ tasks, selectedDate }: Props) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthLabel = format(selectedDate, "MMMM yyyy");
  const weeksInMonth = getWeeksInMonth(selectedDate);

  const monthTasks = tasks.filter((t) => {
    const d = new Date(t.date);
    return d >= monthStart && d <= monthEnd;
  });

  const countByType = (type: string) =>
    monthTasks.filter((t) => t.type === type).length;

  const renderSection = (
    label: string,
    types: readonly string[],
    color: string
  ) => {
    const total = types.reduce((s, t) => s + countByType(t), 0);
    return (
      <div className="space-y-2">
        <h3 className={`text-sm font-bold ${color}`}>
          {label} — {total} tasks
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Count</TableHead>
              <TableHead className="text-right">Avg/Week</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((type) => {
              const count = countByType(type);
              return (
                <TableRow key={type}>
                  <TableCell className="text-sm">{type}</TableCell>
                  <TableCell className="text-right font-medium">
                    {count}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {(count / weeksInMonth).toFixed(1)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{monthLabel} Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {renderSection("Programming", PROGRAMMING_TYPES, "text-blue-600 dark:text-blue-400")}
        {renderSection("Marketing", MARKETING_TYPES, "text-emerald-600 dark:text-emerald-400")}
      </CardContent>
    </Card>
  );
}
