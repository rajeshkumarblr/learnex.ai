"use client";
import React from "react";
import { SideBar, SideBarSection } from "@/components/ui/sideBar";
import Link from "next/link";

const CustomSideBar = () => {
  return (
    <SideBar className="w-64 border-r bg-background">
      <SideBarSection 
        title="Python Programming" 
        link="/python"  // Added required link prop
      >
        <Link 
          href="/python"
          className="block p-4 hover:bg-accent rounded-md text-sm font-medium"
        >
          Introduction to Python Programming
        </Link>
      </SideBarSection>
    </SideBar>
  );
};

export default CustomSideBar;
