import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/lib/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-20 max-w-3xl mx-auto text-center">
      <Card className="p-8  shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">
            Get In Touch
          </CardTitle>
          <CardDescription className="">
            Interested in working together? Feel free to reach out!
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-center items-center">
          <div className="flex gap-4">
            <Button className="px-6 py-3">
              <a href="mailto:jackyyim881@hotmail.com">Email Me</a>
            </Button>
            <Button className="px-6 py-3">
              <a href="CV.pdf">Download CV</a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
