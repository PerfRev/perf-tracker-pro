import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@/lib/task-types";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  tasks: Task[];
  selectedDate: Date;
}

export function ChartView({ tasks, selectedDate }: Props) {
  const data = useMemo(() => {
    const days = eachDayOfInterval({
      start: startOfMonth(selectedDate),
      end: endOfMonth(selectedDate),
    });

    const labels = days.map((d) => format(d, "d"));

    let progCum = 0;
    let mktCum = 0;
    const progData: number[] = [];
    const mktData: number[] = [];

    days.forEach((day) => {
      const dateStr = format(day, "yyyy-MM-dd");
      progCum += tasks.filter(
        (t) => t.date === dateStr && t.domain === "Programming"
      ).length;
      mktCum += tasks.filter(
        (t) => t.date === dateStr && t.domain === "Marketing"
      ).length;
      progData.push(progCum);
      mktData.push(mktCum);
    });

    return {
      labels,
      datasets: [
        {
          label: "Programming",
          data: progData,
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59,130,246,0.1)",
          borderWidth: 4,
          tension: 0.3,
          fill: true,
        },
        {
          label: "Marketing",
          data: mktData,
          borderColor: "#10B981",
          backgroundColor: "rgba(16,185,129,0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [tasks, selectedDate]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          {format(selectedDate, "MMMM yyyy")} — Cumulative Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
            },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 1 } },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
