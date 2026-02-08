import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task } from "@/lib/task-types";

interface Props {
  tasks: Task[];
  date: string;
  onDelete: (id: string) => void;
}

const impactColor: Record<string, string> = {
  Low: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function DailyView({ tasks, date, onDelete }: Props) {
  const dayTasks = tasks.filter((t) => t.date === date);
  const programming = dayTasks.filter((t) => t.domain === "Programming");
  const marketing = dayTasks.filter((t) => t.domain === "Marketing");

  if (dayTasks.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <p className="text-lg">No tasks yet for this day.</p>
          <p className="text-sm">Add your first task above! 🚀</p>
        </CardContent>
      </Card>
    );
  }

  const renderGroup = (label: string, items: Task[], color: string) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-2">
        <h3 className={`text-sm font-bold ${color}`}>
          {label} ({items.length})
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead className="w-[80px]">Impact</TableHead>
              <TableHead className="w-[40px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="max-w-[200px] truncate text-sm">
                  {t.description}
                </TableCell>
                <TableCell className="text-xs">{t.type}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={impactColor[t.impact]}>
                    {t.impact}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(t.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          Daily Tasks — {dayTasks.length} total
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderGroup("Programming", programming, "text-blue-600 dark:text-blue-400")}
        {renderGroup("Marketing", marketing, "text-emerald-600 dark:text-emerald-400")}
      </CardContent>
    </Card>
  );
}
