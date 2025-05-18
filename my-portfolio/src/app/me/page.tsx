/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { HeaderSection } from "../_components/header";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Cloud,
  Code,
  Database,
  Server,
} from "lucide-react";
import Link from "next/link";

// Import GSAP for advanced animations
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import TextPlugin from "gsap/dist/TextPlugin";
import { Button } from "@/lib/components/ui/button";
import { Card } from "@/components/ui/card";

// Azure's primary colors
const AZURE_BLUE = "#0078d4";

// Interactive skill bar that reacts to hover
function InteractiveSkillBar({ skill, percentage, color = AZURE_BLUE }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (isHovered && barRef.current) {
      gsap.to(barRef.current, {
        scaleY: 1.5,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)",
      });
    } else if (barRef.current) {
      gsap.to(barRef.current, {
        scaleY: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }, [isHovered]);

  return (
    <div
      className="space-y-2 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium">{skill}</span>
        <span className="text-[#0078d4] font-bold">{percentage}</span>
      </div>
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden backdrop-blur-md relative">
        <div
          ref={barRef}
          className="skill-bar-fill h-full origin-left transition-transform rounded-xl relative overflow-hidden"
          data-percentage={percentage}
          style={{
            width: percentage,
            transformOrigin: "left center",
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          }}
        >
          {/* Animated light effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 -translate-x-full animate-skill-shine"></div>
        </div>
        {/* Tooltip that appears on hover */}
        <div
          className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-xs rounded-md opacity-0 transition-opacity duration-300 pointer-events-none ${
            isHovered ? "opacity-100" : ""
          }`}
        >
          {skill} expertise
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // Section references for scroll animations
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Azure-inspired typing effect text
  const typingTexts = [
    "Azure Cloud Architect",
    "DevOps Engineer",
    "Full Stack Developer",
    "Cloud Infrastructure Expert",
  ];

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Page load animation sequence
    const tl = gsap.timeline();
    tl.to(".page-reveal", { opacity: 1, duration: 1, ease: "power3.out" });

    // Typing animation
    const typingElement = document.querySelector(".typing-text");
    let currentIndex = 0;

    const animateTyping = () => {
      if (!typingElement) return;

      const text = typingTexts[currentIndex];
      gsap.to(typingElement, {
        duration: 2,
        text: text,
        ease: "none",
        onComplete: () => {
          // Pause at the end
          gsap.delayedCall(1.5, () => {
            // Delete the text
            gsap.to(typingElement, {
              duration: 1,
              text: "",
              ease: "none",
              onComplete: () => {
                currentIndex = (currentIndex + 1) % typingTexts.length;
                animateTyping();
              },
            });
          });
        },
      });
    };

    animateTyping();

    // Animated cloud presence
    gsap.to(".azure-cloud-presence", {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
      delay: 0.5,
    });

    // Skill bars animation with ScrollTrigger
    const bars = document.querySelectorAll(".skill-bar-fill");
    bars.forEach((bar) => {
      const percent = bar.getAttribute("data-percentage") || "0%";

      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: percent,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    });

    // Parallax effect for background elements
    gsap.to(".parallax-bg-1", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    gsap.to(".parallax-bg-2", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(".typing-text");
    };
  }, []);

  // Transform values based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -60]);

  return (
    <div className="relative min-h-screen page-reveal opacity-0 bg-gradient-to-br from-gray-50 via-background to-gray-100 dark:from-gray-900 dark:via-black dark:to-blue-950/30 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      {/* Custom cursor */}

      {/* Background elements */}
      <div className="parallax-bg-1 absolute top-0 left-0 w-full h-full opacity-70 pointer-events-none">
        <div className="absolute top-[10%] right-[20%] w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl"></div>
        <div className="absolute bottom-[30%] left-[15%] w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <div className="parallax-bg-2 absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
        <div className="absolute top-[40%] right-[10%] w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-cyan-400/5 blur-3xl"></div>
      </div>

      {/* Azure cloud grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <HeaderSection />

      {/* Hero Section with 3D elements */}
      <section
        ref={heroRef}
        className="relative min-h-screen pt-20 flex items-center justify-center"
      >
        <motion.div
          style={{ opacity, scale, y }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="azure-cloud-presence opacity-0 scale-90 absolute w-96 h-96 transform -translate-y-16"></div>
        </motion.div>

        <div className="container mx-auto px-4 z-10 mt-40 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 text-center"
          >
            <div className="mb-6 inline-block rounded-full bg-blue-500/10 backdrop-blur-md px-4 py-1.5 text-sm text-[#0078d4] font-medium border border-blue-200/30 dark:border-blue-500/20">
              Cloud Specialist
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Jacky Yim
            </h1>

            <div className="h-8 mb-8">
              <p className="typing-text text-xl md:text-2xl text-[#0078d4] font-medium"></p>
            </div>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Building next-generation cloud solutions that scale with your
              business needs and exceed performance expectations.
            </p>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0078d4] to-[#50e6ff] p-0.5 rounded-lg shadow-lg shadow-blue-500/20 transform hover:scale-105 transition-all duration-300">
              <Button className="px-8 py-4 h-10 bg-white dark:bg-gray-900  font-medium">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0078d4] to-[#50e6ff]">
                  Available for hire →
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Skills Matrix Section */}
      <div className="absolute inset-0"></div>
      <section
        ref={skillsRef}
        className="relative px-4 py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="flex flex-col mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0078d4] to-[#50e6ff] mb-3 text-center"
            >
              Azure Cloud Expertise
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-32 h-1.5 bg-gradient-to-r from-[#0078d4] to-[#50e6ff] rounded-full mx-auto"
            />
          </div>
          <Card className="relative overflow-hidden rounded-3xl   dark:bg-gray-900/40 dark:border-blue-500/10 p-8 sm:p-10 md:p-12">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-1 gap-16"
              >
                {/* Cloud & Technical Skills */}
                <div>
                  <div className="flex relative items-center gap-3 mb-8">
                    <Cloud className="w-6 h-6 text-[#0078d4]" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Cloud & Technical
                    </h3>
                    <span className="w-full absolute mt-12 h-[1px] bg-gradient-to-r from-[#0078d4] to-[#50e6ff] rounded-full"></span>
                  </div>

                  <div className="space-y-6">
                    <InteractiveSkillBar
                      skill="Azure"
                      percentage="95%"
                      color="#0078d4"
                    />
                    <InteractiveSkillBar
                      skill="AWS"
                      percentage="90%"
                      color="#ff9900"
                    />
                    <InteractiveSkillBar
                      skill="DevOps CI/CD"
                      percentage="88%"
                      color="#8661c5"
                    />
                    <InteractiveSkillBar
                      skill="Infrastructure as Code"
                      percentage="85%"
                      color="#2eb67d"
                    />
                    <InteractiveSkillBar
                      skill="Kubernetes"
                      percentage="82%"
                      color="#326ce5"
                    />

                    {/* Tech Badges with hover effects */}
                    <div className="flex flex-wrap gap-3 pt-6">
                      {[
                        {
                          name: "Terraform",
                          icon: <Server className="w-3 h-3" />,
                        },
                        {
                          name: "Docker",
                          icon: <Database className="w-3 h-3" />,
                        },
                        {
                          name: "Azure DevOps",
                          icon: <Code className="w-3 h-3" />,
                        },
                        {
                          name: "GitHub Actions",
                          icon: <ArrowRight className="w-3 h-3" />,
                        },
                        {
                          name: "Azure Functions",
                          icon: <Cloud className="w-3 h-3" />,
                        },
                      ].map((tech) => (
                        <span
                          key={tech.name}
                          className="group flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-gray-900 dark:text-white text-sm font-medium rounded-full border border-blue-200/30 dark:border-blue-500/20 hover:bg-[#0078d4]/10 hover:border-[#0078d4]/40 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <span className="text-[#0078d4] group-hover:scale-110 transition-transform duration-300">
                            {tech.icon}
                          </span>
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Development Skills */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Code className="w-6 h-6 text-[#0078d4]" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Development
                    </h3>
                    <span className="w-full absolute mt-12 h-[1px] bg-gradient-to-r from-[#0078d4] to-[#50e6ff] rounded-full"></span>
                  </div>

                  <div className="space-y-6">
                    <InteractiveSkillBar
                      skill="JavaScript/TypeScript"
                      percentage="92%"
                      color="#3178c6"
                    />
                    <InteractiveSkillBar
                      skill="React/Next.js"
                      percentage="90%"
                      color="#61dafb"
                    />
                    <InteractiveSkillBar
                      skill="Node.js"
                      percentage="85%"
                      color="#68a063"
                    />
                    <InteractiveSkillBar
                      skill="Python"
                      percentage="80%"
                      color="#ffd43b"
                    />
                    <InteractiveSkillBar
                      skill="C#/.NET"
                      percentage="75%"
                      color="#512bd4"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Languages & Soft Skills */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20"
              >
                {/* Languages */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Languages
                    </h3>
                    <span className="w-full absolute mt-12 h-[1px] bg-gradient-to-r from-[#0078d4] to-[#50e6ff] rounded-full"></span>
                  </div>

                  <div className="space-y-6">
                    <InteractiveSkillBar
                      skill="🇭🇰 Cantonese"
                      percentage="100%"
                      color="#f55151"
                    />
                    <InteractiveSkillBar
                      skill="🇬🇧 English"
                      percentage="85%"
                      color="#3b82f6"
                    />
                    <InteractiveSkillBar
                      skill="🇨🇳 Mandarin"
                      percentage="80%"
                      color="#ffc53d"
                    />
                  </div>
                </div>

                {/* Soft Skills with animated cards */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Professional Skills
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2  gap-3 relative perspective-500">
                    {[
                      "Communication",
                      "Leadership",
                      "Problem-Solving",
                      "Teamwork",
                      "Time Management",
                      "Adaptability",
                    ].map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ rotateX: 25, y: 20, opacity: 0 }}
                        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                        className="group relative rounded-xl bg-gradient-to-r from-[#0078d4]/10 to-transparent hover:from-[#0078d4]/20 border border-blue-200/30 dark:border-blue-500/20 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-grid-pattern opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="p-4  relative">
                          <p className="text-base font-medium text-center text-gray-900 dark:text-white">
                            {skill}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Call to action */}
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-20"
          >
            <Link
              href="/CV.pdf"
              target="_blank"
              className="group
              hover:border-4 
              relative overflow-hidden px-8 py-4 bg-[#0078d4] text-white font-medium rounded-lg flex items-center gap-2 hover:bg-[#0078d4]/90 transition-colors shadow-xl shadow-blue-500/20"
            >
              <span className="relative z-10">Download Complete Resume</span>
              <ExternalLink className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              {/* Background animation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
            </Link>
            <Link
              href="/#contact"
              className="relative px-8 py-4 border-2 border-[#0078d4] text-[#0078d4] font-medium rounded-lg hover:bg-[#0078d4]/5 transition-colors after:content-[''] after:absolute after:inset-0 after:border-2 after:border-[#0078d4]/0 after:rounded-lg hover:after:scale-110 hover:after:border-[#0078d4]/50 after:transition-all after:duration-300"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
