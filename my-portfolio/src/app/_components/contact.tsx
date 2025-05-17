import { Button } from "@/lib/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-20 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
      <p className="mb-8 text-gray-600">
        Interested in working together? Feel free to reach out!
      </p>
      <div className="flex justify-center gap-6">
        <Button className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition">
          <a href="mailto:jackyyim881@hotmail.com">Email Me</a>
        </Button>
        <Button className="px-6 py-3 border-2 border-primary text-white rounded-lg h transition">
          <a href="CV.pdf">Download CV</a>
        </Button>
      </div>
    </section>
  );
}
