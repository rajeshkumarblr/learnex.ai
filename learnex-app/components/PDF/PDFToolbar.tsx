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
  pages: number; // Remove optional
  currentPage: number; // Remove optional
  isLoading?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onPageChange?: (page: number) => void;
  scale?: number;
  onScaleChange?: (scale: number) => void;
  onSummarize?: (type: "page" | "chapter") => void;
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
  scale = 1,
  onScaleChange,
  onSummarize,
}: PDFToolbarProps) => {
  return (
    <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-4">
      {isLoading && <ToolbarSkeleton />}
      {!isLoading && (
        <>
          <div className="flex items-center gap-1.5">
            <Button
              disabled={currentPage <= 1}
              variant="ghost"
              aria-label="previous page"
              onClick={onPrevious}
            >
              <ChevronUp className="h-4 w-4" /> {/* Changed from ChevronDown */}
            </Button>
            <div className="flex items-center gap-1.5">
              <Input
                className="w-14 h-8 appearance-none m-0" //no up down buttons
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
              <ChevronDown className="h-4 w-4" /> {/* Changed from ChevronUp */}
            </Button>
          </div>
          <div className="flex justify-between space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label="Summarize"
                  className="gap-1.5"
                >
                  <Sparkles className="h-4 w-4" />
                  Summarize
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() => onSummarize && onSummarize("page")}
                >
                  Page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onSummarize && onSummarize("chapter")}
                >
                  Entire Chapter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" aria-label="zoom" className="gap-1.5">
                  <ZoomIn className="h-4 w-4" />
                  {(scale ?? 0) * 100} %
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() => onScaleChange && onScaleChange(0.5)}
                >
                  50%
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onScaleChange && onScaleChange(1.0)}
                >
                  100%
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onScaleChange && onScaleChange(1.5)}
                >
                  150%
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onScaleChange && onScaleChange(2)}
                >
                  200%
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
};

export default PDFToolbar;
