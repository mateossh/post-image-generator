"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useState, useEffect } from "react";

import { cn, filenameDate } from "@/lib/utils";

import { Button } from "./ui/button";
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
  VariantProps<typeof componentVariants> & {
    getBlob: () => Promise<Blob>;
  };

export function ImageFromAsyncBlob({
  className,
  variant = "verticalPost",
  getBlob,
  ...props
}: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = () => {
    if (!src) return;

    const a = document.createElement("a");
    a.href = src;
    a.download = `poster-${filenameDate()}.png`;
    a.click();
  };

  useEffect(() => {
    let cancelled = false;
    let urlToRevoke: string | null = null;

    void (async () => {
      try {
        setError(null);
        setSrc(null);

        const blob = await getBlob();

        if (cancelled) return;

        const url = URL.createObjectURL(blob);
        urlToRevoke = url;
        setSrc(url);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      cancelled = true;
      if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
    };
  }, [getBlob]);

  if (error) return <div>Failed to load image: {error}</div>;
  if (!src) return <Skeleton className="h-full w-full rounded-none" />;

  return (
    <>
      <img
        className={cn(componentVariants({ variant, className }))}
        src={src}
        {...props}
      />
      <Button onClick={handleDownload}>download</Button>
    </>
  );
}
