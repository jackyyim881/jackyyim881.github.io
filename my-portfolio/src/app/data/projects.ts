// data/projects.ts
export interface Project {
  title: string;
  desc: string;
  tags: string[];
  link: string;
}
export const projects: Project[] = [
  {
    title: "Cloud Migration Solution",
    desc: "Seamless migration strategy for legacy systems to AWS.",
    tags: ["AWS", "Terraform", "DevOps"],
    link: "#",
  },
  {
    title: "React Dashboard",
    desc: "Interactive dashboard for real-time data visualization.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#",
  },
];
