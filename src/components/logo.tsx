import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ImageIcon className="size-5" />
      <span className="font-semibold tracking-tight">post-image-generator</span>
    </div>
  )
}
