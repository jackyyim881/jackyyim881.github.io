import { HeaderSection } from "@/app/_components/header";
import AboutSection from "./_components/about";
import AboutDescription from "./_components/aboutdescription";
import Projects from "./_components/projects";
import Experience from "./_components/experience";
import Contact from "./_components/contact";
import Footer from "./_components/footer";
import ScrollAnimation from "./_components/ScrollAnimation";
import Image from "next/image";
import { GridSmallBackgroundDemo } from "./_components/GridSmallBackgroundDemo";
export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background font-[family-name:var(--font-geist-sans)]">
      <GridSmallBackgroundDemo />
      <Image
        src="/bg.jpg"
        alt="Background Image"
        width={100}
        height={100}
        className="absolute inset-0 z-0 h-[100%] mask-b-from-20% mask-b-to-80%  w-full object-cover opacity-20 pointer-events-none select-none"
      />
      <HeaderSection />
      <main className="space-y-0 ">
        <AboutSection />
        <AboutDescription />
        <ScrollAnimation />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
