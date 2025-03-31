"use client";
import React, { Suspense } from "react";
import PDFRenderer from "@/components/PDF/PDFRenderer";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to LearnEx</h1>
        <p className="text-muted-foreground">
          Select a book from the sidebar to start learning
        </p>
      </div>
    </div>
  );
}
