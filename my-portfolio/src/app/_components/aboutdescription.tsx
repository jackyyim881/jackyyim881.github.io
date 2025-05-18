import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { CloudCog, Code, GitBranch } from "lucide-react";
const hireReasons = [
  {
    text: "Strong background in cloud computing",
    description: "Experience with modern cloud architectures and services",
    icon: <CloudCog className="h-14 w-14 text-blue-500" />,
  },
  {
    text: "Experience designing robust cloud systems",
    description: "Building scalable solutions following best practices",
    icon: <GitBranch className="h-14 w-14 text-emerald-500" />,
  },
  {
    text: "Technical skills & innovative mindset",
    description: "Combining technical expertise with creative problem-solving",
    icon: <Code className="h-14 w-14 text-purple-500" />,
  },
];

export default function AboutDescription() {
  return (
    <section
      id="about-description"
      className="max-w-4xl mx-auto my-20 p-8 bg-white/10  rounded-xl "
    >
      <div className="space-y-8 ">
        {/* Focus Section */}
        <div className="flex flex-col items-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>My Focus</span>
          </HoverBorderGradient>
        </div>
        <div>
          <p className="mb-4 p-6 mt-[50px] text-[28px] leading-[1.5]  font-medium  ">
            Passionate about building scalable cloud solutions and modern web
            applications. I specialize in cloud architecture, DevOps practices,
            and web development. My goal is to create efficient, reliable, and
            user-friendly applications that meet the needs of businesses and
            users alike.
          </p>
        </div>

        {/* Why Hire Me Section */}
        <div className="space-y-6 mt-[150px]">
          <div className="flex items-center justify-center sm:justify-start mb-6">
            <h3 className="text-3xl font-semibold flex items-center">
              <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
              Why Hire Me
            </h3>
          </div>

          <div className="grid gap-4   mt-5 leading-1.5 lg:grid-cols-2">
            {hireReasons.map((item, i) => (
              <Card
                key={i}
                className="group bg-white/5 backdrop-blur-sm  transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div className="gap-2">
                    {item.icon}
                    <CardTitle className="text-lg mt-5">{item.text}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
