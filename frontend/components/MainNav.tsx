import { BookOpenCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const MainNav = () => {
  return (
    <header className="h-16 border-b px-4 flex items-center">
      <div className="flex items-center gap-2">
        <BookOpenCheck className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Learnex.ai</h1>
      </div>
    </header>
  );
};

export default MainNav;
