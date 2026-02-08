import { Code2, Megaphone } from "lucide-react";
import type { Domain } from "@/lib/task-types";
import { cn } from "@/lib/utils";

interface Props {
  domain: Domain;
  onChange: (d: Domain) => void;
}

export function DomainSelector({ domain, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => onChange("Programming")}
        className={cn(
          "flex flex-col items-center gap-2 rounded-lg border-2 bg-card p-4 transition-all",
          domain === "Programming"
            ? "border-blue-500 bg-blue-50 shadow-md dark:bg-blue-950/30"
            : "border-border hover:border-blue-300"
        )}
      >
        <Code2 className="h-8 w-8 text-blue-500" />
        <span className="font-semibold text-blue-600 dark:text-blue-400">Programming</span>
      </button>
      <button
        onClick={() => onChange("Marketing")}
        className={cn(
          "flex flex-col items-center gap-2 rounded-lg border-2 bg-card p-4 transition-all",
          domain === "Marketing"
            ? "border-emerald-500 bg-emerald-50 shadow-md dark:bg-emerald-950/30"
            : "border-border hover:border-emerald-300"
        )}
      >
        <Megaphone className="h-8 w-8 text-emerald-500" />
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Marketing</span>
      </button>
    </div>
  );
}
