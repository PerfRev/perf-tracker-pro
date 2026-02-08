import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Domain, Impact, Task } from "@/lib/task-types";
import { getTypesForDomain, IMPACT_LEVELS } from "@/lib/task-types";

interface Props {
  domain: Domain;
  date: string;
  onAdd: (task: Omit<Task, "id">) => void;
}

export function TaskForm({ domain, date, onAdd }: Props) {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [impact, setImpact] = useState<Impact>("Medium");

  const types = getTypesForDomain(domain);

  const handleSubmit = () => {
    if (!description.trim() || !type) return;
    onAdd({ description: description.trim(), domain, type, impact, date });
    setDescription("");
    setType("");
    setImpact("Medium");
  };

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <Textarea
          placeholder="What did you do?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[70px] resize-none"
        />
        <div className="grid grid-cols-2 gap-3">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={impact} onValueChange={(v) => setImpact(v as Impact)}>
            <SelectTrigger>
              <SelectValue placeholder="Impact" />
            </SelectTrigger>
            <SelectContent>
              {IMPACT_LEVELS.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!description.trim() || !type}
          className={
            domain === "Programming"
              ? "w-full bg-blue-500 hover:bg-blue-600"
              : "w-full bg-emerald-500 hover:bg-emerald-600"
          }
        >
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </CardContent>
    </Card>
  );
}
