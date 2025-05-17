import { HeaderSection } from "@/app/_components/header";
import AboutSection from "./_components/about";
import AboutDescription from "./_components/aboutdescription";
import Projects from "./_components/projects";
import Experience from "./_components/experience";
import Contact from "./_components/contact";
import Footer from "./_components/footer";
import ScrollAnimation from "./_components/ScrollAnimation";
export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background font-[family-name:var(--font-geist-sans)]">
      <HeaderSection />
      <main className="space-y-0">
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
