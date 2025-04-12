import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/Providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import React from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnex.ai | AI-powered Learning Platform",
  description: "An intelligent learning platform powered by AI",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        href: "/favicon.ico",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>

        {/* Move PDF viewer styles to head using next/head */}
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/react-pdf@7.7.1/dist/Page/AnnotationLayer.css" 
        />
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/react-pdf@7.7.1/dist/Page/TextLayer.css" 
        />
      </body>
    </html>
  );
}
