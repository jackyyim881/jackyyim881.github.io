"use client";
import { useEffect, useState, useMemo, useId } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { InfoIcon } from "lucide-react";

interface SkillPoint {
  name: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
}

interface SkillRadarProps {
  skills: SkillPoint[];
  centerScore?: number;
  maxValue?: number;
  size?: "sm" | "md" | "lg";
  glowIntensity?: "low" | "medium" | "high";
  className?: string;
  darkMode?: boolean;
}

export function SkillRadarChart({
  skills = [],
  centerScore = 0,
  maxValue = 100,
  size = "md",
  glowIntensity = "medium",
  className = "",
  darkMode = true,
}: SkillRadarProps) {
  // Generate unique IDs for SVG elements to prevent conflicts with multiple charts
  const uniqueId = useId();
  const skillGradientId = `skill-gradient-${uniqueId}`;
  const glowId = `glow-${uniqueId}`;

  const [isAnimated, setIsAnimated] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Size mappings
  const sizeValues = {
    sm: { chart: "w-[220px] h-[220px]", score: "text-3xl", centerSize: 16 },
    md: { chart: "w-[300px] h-[300px]", score: "text-4xl", centerSize: 24 },
    lg: { chart: "w-[400px] h-[400px]", score: "text-5xl", centerSize: 28 },
  };

  // Azure-themed color palette
  const azureColors = {
    primary: "#0078D4", // Azure blue
    secondary: "#50E6FF", // Azure cyan
    accent: "#008AD7", // Darker Azure blue
  };

  // Calculate glow based on the selected intensity
  const glowStyles = {
    low: `shadow-[0_0_10px_${azureColors.primary}40]`,
    medium: `shadow-[0_0_20px_${azureColors.primary}60]`,
    high: `shadow-[0_0_30px_${azureColors.primary}80]`,
  };

  // Calculate chart size and dimensions - use useMemo for performance
  const chartDimensions = useMemo(() => {
    const chartSize = parseInt(
      sizeValues[size].chart.match(/\d+/)?.[0] || "300",
      10
    );
    const center = chartSize / 2;
    const outerRadius = center * 0.85; // Slightly smaller than before for better visibility

    return { chartSize, center, outerRadius };
  }, [size]);

  const { chartSize, center, outerRadius } = chartDimensions;

  // Calculate points for the polygon - memoized for performance
  const chartPoints = useMemo(() => {
    // Ensure we have at least 3 points but prefer 6 points minimum for a hexagon
    const pointCount = Math.max(6, skills.length);
    const angleStep = (2 * Math.PI) / pointCount;

    return Array.from({ length: pointCount }).map((_, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      return {
        x: outerRadius * Math.cos(angle),
        y: outerRadius * Math.sin(angle),
      };
    });
  }, [outerRadius, skills.length]);

  // Generate polygon paths with better error handling - memoized for performance
  const paths = useMemo(() => {
    // Grid paths at different levels
    const gridPaths = [0.2, 0.4, 0.6, 0.8, 1].map((level) => {
      return chartPoints
        .map(({ x, y }) => `${x * level + center},${y * level + center}`)
        .join(" ");
    });

    // Skill data path - only create when we have valid data
    let skillPath = "";
    if (skills.length > 0 && isAnimated) {
      // Ensure we have an array matching our points length
      const validSkills = skills.slice(0, chartPoints.length);

      skillPath = validSkills
        .map((skill, i) => {
          if (!skill) return null;

          // Handle edge cases and make sure we have a valid value
          const value = Math.max(0, Math.min(skill.value, maxValue));
          const scale = value / maxValue;
          const point = chartPoints[i];

          return `${point.x * scale + center},${point.y * scale + center}`;
        })
        .filter(Boolean)
        .join(" ");
    }

    return { gridPaths, skillPath };
  }, [chartPoints, center, skills, maxValue, isAnimated]);

  // Initialize the component after client-side mount
  useEffect(() => {
    setIsClient(true);

    // Small delay to ensure DOM is ready for animations
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // If not client-side yet, return empty div to prevent hydration errors
  if (!isClient) {
    return (
      <div className={cn("relative", sizeValues[size].chart, className)} />
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizeValues[size].chart,
        className
      )}
      // Accessibility enhancements
      role="img"
      aria-label={`Skill radar chart showing scores for ${skills
        .map((s) => s.name)
        .join(", ")}`}
    >
      {/* Background grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        {paths.gridPaths.map((pathPoints, idx) => (
          <svg
            key={`grid-${idx}`}
            className={cn(
              "absolute",
              "w-full h-full",
              darkMode ? "text-gray-700/40" : "text-gray-300/40"
            )}
            viewBox={`0 0 ${chartSize} ${chartSize}`}
          >
            <polygon
              points={pathPoints}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray={
                idx === paths.gridPaths.length - 1 ? "none" : "4 4"
              }
            />
          </svg>
        ))}
      </div>

      {/* Skill chart */}
      <svg
        className="absolute w-full h-full z-10"
        viewBox={`0 0 ${chartSize} ${chartSize}`}
      >
        <defs>
          <linearGradient
            id={skillGradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={azureColors.primary}
              stopOpacity="0.8"
            />
            <stop
              offset="100%"
              stopColor={azureColors.secondary}
              stopOpacity="0.6"
            />
          </linearGradient>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Animate only if we have valid path data */}
        {paths.skillPath && (
          <motion.polygon
            points={paths.skillPath}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 0.8,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.2,
            }}
            fill={`url(#${skillGradientId})`}
            stroke={azureColors.primary}
            strokeWidth="2"
            filter={`url(#${glowId})`}
          />
        )}

        {/* Skill points with fixed motion.circle implementation */}
        {skills.slice(0, chartPoints.length).map((skill, idx) => {
          if (!skill) return null;

          const point = chartPoints[idx];
          const value = Math.max(0, Math.min(skill.value, maxValue));
          const scale = isAnimated ? value / maxValue : 0;
          const x = point.x * scale + center;
          const y = point.y * scale + center;

          return (
            <motion.g
              key={`point-${skill.name}-${idx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + idx * 0.08 }}
              onMouseEnter={() => setActiveSkill(skill.name)}
              onMouseLeave={() => setActiveSkill(null)}
            >
              <motion.circle
                cx={x}
                cy={y}
                r={activeSkill === skill.name ? 6 : 4}
                fill={azureColors.secondary}
                stroke="white"
                strokeWidth={activeSkill === skill.name ? 2 : 1}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.4 + idx * 0.08,
                }}
              />
            </motion.g>
          );
        })}
      </svg>

      {/* Center score */}
      <div className="absolute flex items-center justify-center z-20">
        <motion.div
          className={cn(
            "flex items-center justify-center rounded-full",
            "bg-black/80 backdrop-blur-sm",
            glowStyles[glowIntensity],
            "border-2",
            "border-opacity-30",
            "border-blue-500"
          )}
          style={{
            width: sizeValues[size].centerSize * 2 + "px",
            height: sizeValues[size].centerSize * 2 + "px",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <motion.span
            className={cn("font-bold text-white", sizeValues[size].score)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {centerScore}
          </motion.span>
        </motion.div>
      </div>

      {/* Skill labels */}
      {skills.slice(0, chartPoints.length).map((skill, idx) => {
        if (!skill) return null;

        const point = chartPoints[idx];
        const labelDistance = outerRadius * 1.15;
        const x = (point.x * labelDistance) / outerRadius + center;
        const y = (point.y * labelDistance) / outerRadius + center;

        // Label positioning with improved logic
        const isRight = x > center;
        const isBottom = y > center;
        const isTop = y < center - outerRadius * 0.5;
        const isExtremeLeft = x < center - outerRadius * 0.5;
        const isExtremeRight = x > center + outerRadius * 0.5;

        const labelPositionClass = cn(
          isRight ? "left-0 ml-2" : "right-0 mr-2",
          isTop ? "bottom-0 mb-1" : "",
          isBottom ? "top-0 mt-1" : "",
          isExtremeLeft ? "-left-12" : "",
          isExtremeRight ? "-right-12" : "",
          !isTop && !isBottom ? "top-1/2 -translate-y-1/2" : ""
        );

        return (
          <motion.div
            key={`label-${skill.name}-${idx}`}
            className={cn(
              "absolute transform",
              activeSkill === skill.name && "z-30"
            )}
            style={{
              left: `${(x / chartSize) * 100}%`,
              top: `${(y / chartSize) * 100}%`,
            }}
            initial={{
              opacity: 0,
              y: isBottom ? -5 : isTop ? 5 : 0,
              x: isRight ? -5 : isExtremeLeft ? 5 : 0,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.08, duration: 0.4 }}
          >
            <motion.div
              className={cn(
                "relative px-2.5 py-1 rounded-full",
                "flex items-center gap-1.5",
                "bg-blue-500 backdrop-blur-sm text-white font-medium text-sm",
                "whitespace-nowrap",
                "border border-blue-400/30",
                labelPositionClass
              )}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: activeSkill === skill.name ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {skill.icon && <span className="text-white">{skill.icon}</span>}
              {skill.name}
              <span className="font-semibold opacity-90">{skill.value}</span>
              {activeSkill === skill.name && <InfoIcon className="w-3 h-3" />}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Example implementation with Azure skills
export function AzureSkillChart() {
  const azureSkills = [
    { name: "Cloud Architecture", value: 85, color: "#0078D4" },
    { name: "DevOps", value: 78, color: "#0078D4" },
    { name: "Kubernetes", value: 82, color: "#0078D4" },
    { name: "Terraform", value: 75, color: "#0078D4" },
    { name: "Azure Security", value: 80, color: "#0078D4" },
    { name: "Cost Management", value: 70, color: "#0078D4" },
  ];

  // Calculate overall Azure skill score (average)
  const overallScore = Math.round(
    azureSkills.reduce((sum, skill) => sum + skill.value, 0) /
      azureSkills.length
  );

  return (
    <div className="flex items-center justify-center p-4">
      <SkillRadarChart
        skills={azureSkills}
        centerScore={overallScore}
        size="lg"
        glowIntensity="medium"
      />
    </div>
  );
}
