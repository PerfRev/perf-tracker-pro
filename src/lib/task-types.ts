export interface Task {
  id: string;
  description: string;
  domain: Domain;
  type: string;
  impact: Impact;
  date: string; // YYYY-MM-DD
}

export type Domain = "Programming" | "Marketing";
export type Impact = "Low" | "Medium" | "High";

export const PROGRAMMING_TYPES = [
  "Bug Fix",
  "Grafana Logs",
  "Code Review",
  "Feature Work",
  "Infra",
] as const;

export const MARKETING_TYPES = [
  "Razpisi",
  "Video Made",
  "Video Edited",
  "Video Uploaded",
  "Case Study",
  "Website Update",
] as const;

export const IMPACT_LEVELS: Impact[] = ["Low", "Medium", "High"];

export function getTypesForDomain(domain: Domain): readonly string[] {
  return domain === "Programming" ? PROGRAMMING_TYPES : MARKETING_TYPES;
}
