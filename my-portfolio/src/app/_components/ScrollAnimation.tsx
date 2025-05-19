"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

// Tech icons with Azure services prioritized first - following Azure naming conventions
const technologies = [
  { name: "Azure", path: "/azure.svg" },
  { name: "AWS", path: "/aws.svg" },
  { name: "GCP", path: "/google.svg" },
];

export default function ScrollAnimation() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <Card
          className="overflow-hidden  shadow-lg backdrop-blur-sm bg-gradient-to-b from-white/50 to-white/0 dark:from-gray-800/50 dark:to-gray-800/0 border border-gray-200 dark:border-gray-700 rounded-lg"
          role="region"
          aria-label="Technology skills showcase"
        >
          <div className="px-6 pt-6 pb-2">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  Technology Skills
                </CardTitle>
              </div>
            </CardHeader>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 p-6 pt-2">
            {technologies.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 h-full">
                  <div className="flex flex-col items-center justify-center p-4 h-full">
                    <div className="w-16 h-16 flex items-center justify-center mb-3 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm">
                      <Image
                        src={tech.path}
                        alt={`${tech.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                      {tech.name}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}
