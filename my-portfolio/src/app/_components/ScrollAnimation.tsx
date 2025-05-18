"use client";

import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

// Tech icons with Azure services prioritized first - following Azure naming conventions
const technologies = [
  { name: "Azure", path: "/azure.svg" },
  { name: "AWS", path: "/aws.svg" },
  { name: "GCP", path: "/google.svg" },
];

export default function ScrollAnimation() {
  return (
    <>
      <div
        className="max-w-4xl mx-auto rounded-md flex justify-center overflow-hidden bg-white/5 backdrop-blur-md py-8 border-y border-white/10"
        role="region"
        aria-label="Technology skills carousel"
      >
        <div className="flex gap-8 pr-8">
          <h2 className="text-3xl font-semibold flex items-center bg-gradient-to-r dark:from-[#f6f6f7] text-shadow-2xs dark:text-shadow-2xs dark:to-[#aea4a4] dark:bg-clip-text dark:text-transparent text-black mb-3">
            <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
            Technology Skills
          </h2>
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="flex flex-col  items-center justify-center min-w-[150px] p-5 rounded-lg bg-[rgba(0,120,212,0.08)] border border-[rgba(0,120,212,0.15)] hover:bg-[rgba(0,120,212,0.15)] hover:border-[rgba(0,120,212,0.3)] transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={tech.path}
                  alt={tech.name}
                  width={100}
                  height={100}
                  className="object-contain transition-transform duration-300 transform hover:scale-105 bg-white p-2 rounded-lg shadow-md"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
