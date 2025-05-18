/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function GridSmallBackgroundDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Azure animation best practice - check for reduced motion preference
  useEffect(() => {
    // Debug logging for initialization steps
    console.log("Grid animation initializing");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      console.log("Reduced motion preference detected - skipping animation");
      return;
    }

    // Stage 1: Allow the component to fully mount and render
    const initTimeout = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(initTimeout);
  }, []);

  // Stage 2: After initialization flag is set, set up the actual animation
  useEffect(() => {
    if (!isInitialized) return;

    if (!canvasRef.current || !gridContainerRef.current) {
      console.error("Canvas or container refs not available");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });

    if (!ctx) {
      console.error("Could not get 2D context from canvas");
      return;
    }

    // Set canvas size to match container - force dimensions for reliability
    const updateCanvasSize = () => {
      const rect = gridContainerRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) {
        console.warn("Container has zero dimensions, using fallback size");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 2;
      } else {
        canvas.width = rect.width;
        canvas.height = rect.height;
        console.log(`Canvas resized to ${canvas.width}x${canvas.height}`);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Azure best practice: Wait for dimensions to stabilize
    setTimeout(() => {
      updateCanvasSize(); // Double-check dimensions

      // Grid settings - adjusted for better visibility
      const gridSize = 20;
      const nodeRadius = 1.5;
      const maxConnections = 3;
      const connectionProbability = 0.05; // Increased for more visible connections

      console.log(`Creating grid with cell size ${gridSize}px`);

      // Create grid points with more visual interest
      const gridPoints: {
        x: number;
        y: number;
        connections: Array<{
          to: number;
          progress: number;
          speed: number;
          hue: number;
        }>;
      }[] = [];

      // Ensure we have enough grid points
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          gridPoints.push({
            x,
            y,
            connections: [],
          });
        }
      }

      console.log(`Created ${gridPoints.length} grid points`);

      if (gridPoints.length === 0) {
        console.error(
          "No grid points were created, check container dimensions"
        );
        return; // Critical error - exit
      }

      // Create connections between points - Azure optimized algorithm
      // Seed some initial "hot spots" for more interesting visuals
      const hotspots = [
        { x: canvas.width / 2, y: canvas.height / 2 },
        { x: canvas.width / 4, y: canvas.height / 4 },
        { x: canvas.width * 0.75, y: canvas.height * 0.75 },
      ];

      gridPoints.forEach((point, idx) => {
        // Calculate proximity to hotspots for higher connection probability
        const nearHotspot = hotspots.some((hotspot) => {
          const dx = point.x - hotspot.x;
          const dy = point.y - hotspot.y;
          return Math.sqrt(dx * dx + dy * dy) < gridSize * 5;
        });

        // Adjust connection probability based on hotspot proximity
        const pointConnectionProbability = nearHotspot
          ? connectionProbability * 2
          : connectionProbability;

        // Only connect to points we haven't processed yet (for performance)
        for (let i = idx + 1; i < gridPoints.length; i++) {
          // Skip if we already have max connections
          if (point.connections.length >= maxConnections) break;

          // Only connect nearby points (improved performance)
          const otherPoint = gridPoints[i];
          const dx = otherPoint.x - point.x;
          const dy = otherPoint.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only connect points that are close
          if (
            distance <= gridSize * 2.5 &&
            Math.random() < pointConnectionProbability
          ) {
            // Azure blues and purples for the network effect
            // Using Azure color palette: #0078D4, #50e6ff, #773ADC
            const hue =
              Math.random() > 0.6
                ? 210 + Math.random() * 30 // Azure blues
                : 270 + Math.random() * 40; // Purples

            // Varied speeds for natural network flow
            const speed = 0.005 + Math.random() * 0.015;

            point.connections.push({
              to: i,
              progress: Math.random(), // Randomize starting positions
              speed,
              hue,
            });
          }
        }
      });

      // Add some long-range connections to simulate network routing
      const longRangeConnections = Math.min(
        20,
        Math.floor(gridPoints.length * 0.01)
      );
      for (let i = 0; i < longRangeConnections; i++) {
        const sourceIdx = Math.floor(Math.random() * gridPoints.length);
        const targetIdx = Math.floor(Math.random() * gridPoints.length);

        if (sourceIdx !== targetIdx) {
          gridPoints[sourceIdx].connections.push({
            to: targetIdx,
            progress: Math.random(),
            speed: 0.01 + Math.random() * 0.02, // Faster for long connections
            hue: 195 + Math.random() * 20, // Azure brand blue
          });
        }
      }

      console.log(`Created connections for the grid`);

      // Animation loop with performance monitoring
      let animationFrameId: number;
      let lastFrameTime = performance.now();
      let frameCount = 0;
      let lagDetected = false;

      const animate = () => {
        // Performance monitoring
        const now = performance.now();
        const elapsed = now - lastFrameTime;
        lastFrameTime = now;

        frameCount++;

        // Check for performance issues every ~5 seconds
        if (frameCount % 300 === 0) {
          const averageFrameTime = elapsed;
          if (averageFrameTime > 33) {
            // Over 30fps
            console.warn(
              "Animation performance degraded, average frame time:",
              averageFrameTime
            );
            lagDetected = true;
          } else {
            lagDetected = false;
          }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Only draw grid lines if not experiencing lag
        if (!lagDetected) {
          // Draw base grid - subtle in background
          ctx.strokeStyle = document.documentElement.classList.contains("dark")
            ? "rgba(38, 38, 38, 0.3)"
            : "rgba(228, 228, 231, 0.5)";
          ctx.lineWidth = 0.5;

          // Draw grid lines
          for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }

          for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }
        }

        // Draw connections with rainbow animation
        gridPoints.forEach((point, idx) => {
          point.connections.forEach((conn) => {
            const targetPoint = gridPoints[conn.to];

            if (!targetPoint) return; // Safety check

            // Update animation progress
            conn.progress += conn.speed;
            if (conn.progress > 1) {
              conn.progress = 0;
              conn.hue = (conn.hue + 40) % 360; // Shift hue for next animation
            }

            // Calculate gradient endpoints
            const startX = point.x;
            const startY = point.y;
            const endX = targetPoint.x;
            const endY = targetPoint.y;

            // Draw line with gradient (Azure optimized rendering)
            const gradient = ctx.createLinearGradient(
              startX,
              startY,
              endX,
              endY
            );

            // Create rainbow pulse effect moving along the line
            const pulsePos = conn.progress;
            const pulseWidth = 0.2;

            gradient.addColorStop(
              Math.max(0, pulsePos - pulseWidth),
              "transparent"
            );
            gradient.addColorStop(
              pulsePos,
              `hsla(${conn.hue}, 100%, 60%, 0.8)`
            );
            gradient.addColorStop(
              Math.min(1, pulsePos + pulseWidth),
              "transparent"
            );

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            // Draw glowing node at connection point when pulse passes
            const glowRadius = Math.abs(conn.progress - 0.5) < 0.1 ? 3 : 0;
            if (glowRadius > 0) {
              ctx.fillStyle = `hsla(${conn.hue}, 100%, 70%, 0.8)`;
              ctx.beginPath();
              ctx.arc(
                startX + (endX - startX) * conn.progress,
                startY + (endY - startY) * conn.progress,
                glowRadius,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          });

          // Draw grid points (subtle)
          ctx.fillStyle = document.documentElement.classList.contains("dark")
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(0, 0, 0, 0.2)";
          ctx.beginPath();
          ctx.arc(point.x, point.y, nodeRadius, 0, Math.PI * 2);
          ctx.fill();
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      console.log("Starting animation loop");
      animate();

      // Azure best practice: Clean up resources
      return () => {
        console.log("Cleaning up animation resources");
        window.removeEventListener("resize", updateCanvasSize);
        cancelAnimationFrame(animationFrameId);
      };
    }, 300); // Wait for layout to stabilize
  }, [isInitialized]);

  return (
    <div
      className="absolute flex h-[20%] w-full items-center mask-b-from-20% mask-b-to-100% justify-center bg-white dark:bg-black"
      ref={gridContainerRef}
      style={
        {
          minHeight: "400px",
          minWidth: "400px",
        } as React.CSSProperties
      } // Ensure minimum dimensions
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }} // Azure accessibility best practice
      />

      <div
        className={cn(
          "absolute inset-0",

          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
        aria-hidden="true" // Accessibility: decorative content
      />

      {/* Radial gradient */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
        aria-hidden="true"
      ></div>
    </div>
  );
}
