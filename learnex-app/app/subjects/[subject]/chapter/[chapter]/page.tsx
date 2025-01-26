"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const sections = [
  {
    name: "Section 1.1",
    number: "1.1",
    description: "A Section about Electricity",
  },
  {
    name: "Section 1.2",
    number: "1.2",
    description: "A Section about Magnetism",
  },
  {
    name: "Section 1.3",
    number: "1.3",
    description: "A Section about Waves",
  },
];

const Subject = ({
  params: { subject, chapter },
}: {
  params: { subject: string; chapter: string };
}) => {
  return (
    <div>
      <div className="flex items-center space-x-1 mb-4">
        <Link
          className="text-gray-400 capitalize"
          href={`/subjects/${subject}`}
        >
          {subject}
        </Link>
        <ChevronRight size={16} />
        <span className="font-bold capitalize">Chapter {chapter}</span>
      </div>

      <h1 className="font-bold text-2xl capitalize">Chapter {chapter}</h1>

      <div className="grid grid-cols-2 gap-4">
        {sections.map((section) => (
          <div key={section.number}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <CardTitle>{section.name}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                  <Button variant={"ghost"}>
                    <Star />
                  </Button>
                </div>
              </CardHeader>
              <CardFooter>
                <Link
                  href={`/subjects/${subject}/chapter/${chapter}/section/${section.number}`}
                  className={buttonVariants({ variant: "default" })}
                >
                  View
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subject;
