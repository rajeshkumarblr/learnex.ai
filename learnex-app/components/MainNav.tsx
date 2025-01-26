import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const MainNav = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16">
        <Link href="/" className="items-center space-x-2 flex">
          <BookOpen />
          <span className="font-bold">Learnex</span>
        </Link>
        <div className="flex flex-1 items-center space-x-4 justify-end">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default MainNav;
