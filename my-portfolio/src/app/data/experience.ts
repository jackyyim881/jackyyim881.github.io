// data/experience.ts
export interface ExpItem {
  role: string;
  company: string;
  period: string;
  detail: string;
}
export const experience: ExpItem[] = [
  {
    role: "Cloud Support Engineer",
    company: "Sereno Cloud Solutions",
    period: "2021 - 2023",
    detail: "Designed and implemented cloud solutions on AWS/Azure...",
  },
];
