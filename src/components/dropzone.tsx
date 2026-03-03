'use client'

import type { DragEvent, FC } from "react";
import { useCallback, useState } from "react";
import { ImagePlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface DropzoneProps {
  onDrop: (files: File[]) => void;
  onClick: () => void;
}

export const Dropzone: FC<DropzoneProps> = ({ onDrop, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const preventDefaults = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = (e: DragEvent) => {
    setIsHovered(true);
    preventDefaults(e);
  };

  const handleDragLeave = (e: DragEvent) => {
    setIsHovered(false);
    preventDefaults(e);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsHovered(false);
    const files = e.dataTransfer?.files;

    if (files) {
      onDrop(Array.from(files));
    }
  };

  return (
    <section
      className={cn(
        "flex h-[220px] w-full flex-col items-center justify-center rounded-md border border-input bg-white text-sm text-muted-foreground",
        isHovered && "border-slate-500",
      )}
      onDragStart={preventDefaults}
      onDragOver={preventDefaults}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDropCapture={handleDrop}
    >
      <ImagePlus className="mb-3 size-10" />
      {isHovered ? (
        <p>Drop</p>
      ) : (
        <div className="leading-tight text-center">
          <p>Drag here...</p>
          <p className="text-xxs">or</p>

          <Button type="button" size="sm" variant="secondary" onClick={onClick}>
            Browse
          </Button>
        </div>
      )}
    </section>
  );
};
