"use client";
import { useOnClickOutside } from "@/lib/hooks/useOnClickOutside";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Copy, NotebookText, Sparkles } from "lucide-react";
import { useCopyToClipboard } from "@/lib/hooks/useClipboard";
import { useToast } from "../ui/use-toast";

export interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  close: () => void;
  onSummarize?: () => void;
  onExplain?: () => void;
}

const ContextMenu = ({
  x,
  y,
  visible,
  close,
  onSummarize,
  onExplain,
}: ContextMenuProps) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, close);
  const [_, copyText] = useCopyToClipboard();
  const getSelection = () => {
    if (document && document.getSelection()) {
      return document.getSelection()?.toString();
    }

    return null;
  };
  const { toast } = useToast();

  const handleOperation = (callback: () => void) => {
    callback();
    close();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={contextMenuRef}
          initial={{ opacity: 0, scale: 0.5 }}
          exit={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, top: `${y}px`, left: `${x}px` }}
          style={{ top: `${y}px`, left: `${x}px` }}
          className={cn(
            "w-[180px] absolute bg-primary-foreground rounded-md z-20 shadow-md space-y-2 flex flex-col"
          )}
        >
          {getSelection() && (
            <>
              <Button
                variant="ghost"
                className="flex justify-start p-4 space-x-4"
                onClick={() =>
                  handleOperation(() => {
                    copyText(getSelection()!);
                    toast({
                      title: "Copied to clipboard",
                    });
                  })
                }
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </Button>
              <Button
                variant="ghost"
                className="flex justify-start p-4 space-x-4"
                onClick={() =>
                  handleOperation(() => {
                    onExplain && onExplain();
                  })
                }
              >
                <Sparkles className="h-4 w-4" />
                <span>Explain</span>
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            className="flex justify-start p-4 space-x-4"
            onClick={() =>
              handleOperation(() => {
                onSummarize && onSummarize();
              })
            }
          >
            <NotebookText className="h-4 w-4" />
            <span>Summarize Page</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
