"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SideBar = ({ className, children }: SidebarProps) => {
  return (
    <aside className={cn("pb-12 border-l", className)}>
      <div className="space-y-4 py-4">{children}</div>
    </aside>
  );
};

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  link: string;
}

export const SideBarSection = ({
  className,
  children,
  link,
  title,
}: SidebarSectionProps) => {
  return (
    <div className={cn("px-3 py-2", className)}>
      <Link href={link} className="mb-2 px-4 text-lg font-semibold">
        {title}
      </Link>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  items: {
    link: string;
    name: string;
  }[];
}
export const SidebarItem = ({ className, title, items }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild className="w-full">
        <Button variant="ghost" className="justify-between">
          <h4>{title}</h4> {isOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 my-4 ml-8">
        {items.map((item) => (
          <div key={item.link}>
            <Link href={item.link}>{item.name}</Link>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
