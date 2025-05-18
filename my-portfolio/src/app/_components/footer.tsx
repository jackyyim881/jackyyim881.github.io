import { Card, CardFooter } from "@/components/ui/card";

export default function Footer() {
  return (
    <>
      <Card className="">
        <CardFooter className="flex flex-col items-center justify-center py-8">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://linkedin.com/in/jackyyim881"
              target="_blank"
              className=""
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/jackyyim881"
              target="_blank"
              className="hover:text-primary"
            >
              GitHub
            </a>
          </div>
          <p>© 2025 Jacky Yim. All rights reserved.</p>
        </CardFooter>
      </Card>
    </>
  );
}
