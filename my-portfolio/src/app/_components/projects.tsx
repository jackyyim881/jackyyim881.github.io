import React from "react";
import { projects, Project } from "../data/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 max-w-5xl mx-auto">
      <div className="mb-12 text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Featured Projects
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Here are some of my notable projects that showcase my skills and
          expertise in cloud computing and web development.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project: Project) => (
          <Card
            key={project.title}
            className="overflow-hidden border border-border/40 bg-white/5 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
          >
            {project.image && (
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {project.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-foreground/70">
                {project.desc}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`${
                      tag.toLowerCase().includes("azure")
                        ? "bg-[#0078d4]/10 text-[#0078d4] border-[#0078d4]/30"
                        : "bg-primary/10 text-primary/90 border-primary/30"
                    } hover:bg-primary/20`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  View Project
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                >
                  Code
                  <Github className="h-4 w-4" />
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
