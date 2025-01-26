"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const chapters = [
  {
    name: "Chapter 1",
    number: 1,
    description: "A Chapter about Electricity",
  },
  {
    name: "Chapter 2",
    number: 2,
    description: "A Chapter about Magnetism",
  },
  {
    name: "Chapter 3",
    number: 3,
    description: "A Chapter about Waves",
  },
];

const Subject = ({ params: { subject } }: { params: { subject: string } }) => {
  return (
    <div>
      <h1 className="font-bold text-2xl capitalize mb-4">{subject}</h1>
      {/* Shadcn card that shows sections*/}
      <div className="grid grid-cols-2 gap-4">
        {chapters.map((chapter) => (
          <div key={chapter.number}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <CardTitle>{chapter.name}</CardTitle>
                    <CardDescription>{chapter.description}</CardDescription>
                  </div>
                  <Button variant={"ghost"}>
                    <Star />
                  </Button>
                </div>
              </CardHeader>
              <CardFooter>
                <Link
                  href={`/subjects/${subject}/chapter/${chapter.number}`}
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
