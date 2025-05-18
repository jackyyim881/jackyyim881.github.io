"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/lib/components/ui/glowing-effect";

export function GlowingEffectDemo() {
  return (
    <>
      <div className="container-wrapper">
        <div className="container py-20">
          <h2 className="text-center text-3xl font-bold">
            Glowing Effect Demo
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <GridItem
              area="1"
              icon={<Sparkles size={32} />}
              title="Feature 1"
              description="Description of feature 1"
            />
            <GridItem
              area="2"
              icon={<Settings size={32} />}
              title="Feature 2"
              description="Description of feature 2"
            />
            <GridItem
              area="3"
              icon={<Search size={32} />}
              title="Feature 3"
              description="Description of feature 3"
            />
            <GridItem
              area="4"
              icon={<Lock size={32} />}
              title="Feature 4"
              description="Description of feature 4"
            />
          </ul>
        </div>
      </div>
    </>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={100}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
      </div>
    </li>
  );
};
