"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Skeleton } from "./ui/skeleton";

const componentVariants = cva("max-h-full", {
  variants: {
    variant: {
      verticalPost: "max-w-[1080px] aspect-[4/5]",
      horizontalPost: "aspect-[1.91/1]",
      square: "max-w-[1080px] aspect-square",
      story: "max-w-[1080px] aspect-[9/16]",
    },
    defaultVariants: {
      variant: "verticalPost",
    },
  },
});

type Props = React.ComponentProps<"img"> &
  VariantProps<typeof componentVariants>;

export function PosterPreview({
  className,
  variant = "verticalPost",
  src,
  ...props
}: Props) {
  if (!src) return <Skeleton className="h-full w-full rounded-none" />;

  return (
    <img
      className={cn(componentVariants({ variant, className }))}
      src={src}
      {...props}
    />
  );
}
