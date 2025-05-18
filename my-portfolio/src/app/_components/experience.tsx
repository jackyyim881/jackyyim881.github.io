"use client";
import React from "react";
import { experience, ExpItem } from "../data/experience";
import { BriefcaseBusiness, Calendar, Building2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 overflow-hidden ">
      {/* Azure-inspired gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0078d4]/5 via-background to-[#50e6ff]/5 -z-10" />

      {/* Decorative elements */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight  bg-white dark:from-[#f6f6f7] text-shadow-2xs dark:text-shadow-2xs dark:to-[#aea4a4] dark:bg-clip-text dark:text-transparent mb-3">
            Professional Experience
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#828182] to-[#000000] rounded-full" />
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#0078d4]/80 to-[#50e6ff]/50" />

          <div className="space-y-20">
            {experience.map((e: ExpItem, idx) => (
              <div
                key={idx}
                className="relative md:grid md:grid-cols-5 md:gap-8 group"
              >
                {/* Timeline dot with pulse effect */}
                <div className="hidden md:flex absolute  right-0 top-3  transform -translate-x-1/2 -translate-y-1 z-10">
                  <span className="w-6 h-6 bg-white dark:bg-gray-900 border-4 border-[#0078d4] rounded-full">
                    <span className="absolute w-full h-full rounded-full bg-[#0078d4] animate-ping opacity-20"></span>
                  </span>
                </div>

                {/* Date column for desktop */}
                <div className="hidden md:block  m-4 md:col-span-2 md:text-right pr-8 pt-1 opacity-80">
                  <div className="flex items-center justify-end font-medium text-[#0078d4]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{e.period}</span>
                  </div>
                </div>

                {/* Content card */}
                <div className="md:col-span-3 relative">
                  {/* Mobile timeline dot */}

                  <div className="ml-8 md:ml-0 pl-6 md:pl-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl transition-all duration-300 hover:shadow-[#0078d4]/10 hover:border-[#0078d4]/20">
                    <div className="flex flex-col space-y-4">
                      <div>
                        {/* Role */}
                        <h3 className="text-xl font-bold mb-1 flex items-center">
                          <BriefcaseBusiness className="w-5 h-5 mr-2 text-[#0078d4]" />
                          {e.role}
                        </h3>

                        {/* Company and period (mobile) */}
                        <div className="flex items-center text-sm text-foreground/70 mb-3">
                          <Building2 className="w-4 h-4 mr-4.5 text-[#0078d4]" />
                          <span className="mr-2">{e.company}</span>
                          <span className="md:hidden">• {e.period}</span>
                        </div>
                      </div>

                      {/* Details with better typography */}
                      <div>
                        <p className="text-foreground/80 leading-relaxed">
                          {e.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
