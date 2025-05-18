import Link from "next/link";
import { ArrowRight, Code, CloudCog } from "lucide-react";

import { cn } from "@/lib/utils";
const skillGroups = [
  {
    category: "Cloud & Infrastructure",
    icon: <CloudCog className="h-4 w-4" />,
    skills: ["Cloud Computing", "AWS", "Azure", "DevOps"],
    colorClass:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
  },
  {
    category: "Development",
    icon: <Code className="h-4 w-4" />,
    skills: ["JavaScript", "React", "Node.js", "Web Development"],
    colorClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
  },
];
export default function AboutSection() {
  return (
    <section
      id="about"
      className="flex min-h-screen w-full  items-center  justify-center bg-gradient-to-b from-background to-background/95 px-4 py-24 md:py-32"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col  items-center justify-center space-y-8 text-center">
          <h1 className="text-3xl  z-100 text-shadow-2xs dark:text-shadow-2xs font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Jacky Yim
          </h1>

          <h2 className="text-xl  z-100 text-shadow-2xs dark:text-shadow-2xs font-medium text-foreground/80 md:text-2xl">
            Cloud Specialist & Web Application Enthusiast
          </h2>

          <div className="w-full space-y-6 animate-fade-in-up delay-200">
            {skillGroups.map((group) => (
              <div key={group.category} className="space-y-3">
                <div className="flex flex-wrap justify-center gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`skill-tag inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                        skill === "Azure" ? "azure-skill" : group.colorClass
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className=" animate-fade-in-up delay-300">
            <Link href="/me" passHref>
              <button className="group relative inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                About Me
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                <span className="absolute -inset-px rounded-md bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 transition duration-500 group-hover:animate-pulse-slow group-hover:opacity-100" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
