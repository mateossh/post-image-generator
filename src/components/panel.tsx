import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function Panel({ children, className }: PropsWithChildren<Props>) {
  return <div className={cn("h-screen p-4", className)}>{children}</div>;
}
