"use client";

import { useState, useEffect } from "react";

import { renderImage } from "@/lib/generate-image";
import { useStore } from "@/lib/store";
import { filenameDate } from "@/lib/utils";

import { Panel } from "./panel";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type Props = {
  getBlob: () => Promise<Blob>;
};

export function ImageFromAsyncBlob({ getBlob }: Props) {
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
  if (!src) return <Skeleton className="h-[200px] w-full rounded-none" />;

  return (
    <>
      <img src={src} alt="Image preview" />
      <Button onClick={handleDownload}>download</Button>
    </>
  );
}

export function PreviewPanel() {
  const store = useStore();

  const blob = async () => {
    return await renderImage(store.content || "lorem ipsum");
  };

  return (
    <Panel className="w-full">
      <ImageFromAsyncBlob getBlob={blob} />
    </Panel>
  );
}
