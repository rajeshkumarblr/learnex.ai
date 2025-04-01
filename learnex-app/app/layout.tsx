import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/Providers/ThemeProvider";
import MainNav from "@/components/MainNav";
import CustomSideBar from "@/components/CustomSidebar";
import { Toaster } from "@/components/ui/toaster";
import "simplebar-react/dist/simplebar.min.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnex.ai | AI-powered Learning Platform",
  description: "An intelligent learning platform powered by AI",
  icons: {
    icon: [
      {
        url: "/app/favicon.ico",
        href: "/app/favicon.ico",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className={cn(inter.className, "overflow-hidden h-screen")}>
        <ThemeProvider>
          <MainNav />
          <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
            <CustomSideBar />
            <div className="flex-1 overflow-hidden">{children}</div>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
