import React from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Sparkles, ZoomIn } from "lucide-react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface PDFToolbarProps {
  pages: number;
  currentPage: number;
  isLoading?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onPageChange?: (page: number) => void;
  title?: string;
  chapterTitle?: string;
}

const ToolbarSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-4 w-[20px]" />
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[20px]" />
    </div>
  );
};

const PDFToolbar = ({
  pages = 1,
  currentPage = 1,
  onPrevious,
  onNext,
  onPageChange,
  isLoading = false,
  title = "Introduction to Python Programming",
  chapterTitle,
}: PDFToolbarProps) => {
  return (
    <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-4">
      {isLoading ? (
        <ToolbarSkeleton />
      ) : (
        <>
          {/* Title Section - Left */}
          <div className="flex-1 truncate">
            <h1 className="text-lg">
              <span className="font-semibold">{title}</span>
              {chapterTitle && (
                <span className="text-muted-foreground">
                  : {chapterTitle}
                </span>
              )}
            </h1>
          </div>

          {/* Page Controls - Right */}
          <div className="flex items-center gap-1.5 ml-4">
            <Button
              disabled={currentPage <= 1}
              variant="ghost"
              aria-label="previous page"
              onClick={onPrevious}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1.5">
              <Input
                className="w-14 h-8 appearance-none m-0"
                value={currentPage}
                type="number"
                min={1}
                max={pages}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (onPageChange && value >= 1 && value <= pages) {
                    onPageChange(value);
                  }
                }}
              />
              <p className="text-zinc-700 text-sm space-x-1">
                <span>/</span>
                <span>{pages}</span>
              </p>
            </div>

            <Button
              disabled={currentPage >= pages}
              variant="ghost"
              aria-label="next page"
              onClick={onNext}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PDFToolbar;
