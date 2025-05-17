"use client";

import Link from "next/link";

export function HeaderSection() {
  return (
    <>
      <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-wrapper">
          <div className="container flex h-14 items-center gap-2 md:gap-4">
            <div className="mr-4 hidden md:flex">
              <Link href="/">
                <span className="mr-4 flex items-center gap-2 lg:mr-6">JY</span>
              </Link>
            </div>
            <nav className="flex items-center gap-4 text-sm xl:gap-6">
              <Link
                href="#about"
                className="transition-colors hover:text-foreground/80 text-foreground/80"
              >
                About
              </Link>
              <Link
                href="#experience"
                className="transition-colors hover:text-foreground/80 text-foreground/80"
              >
                Experience
              </Link>
              <Link
                href="#contact"
                className="transition-colors hover:text-foreground/80 text-foreground/80"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
