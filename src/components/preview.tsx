"use client";

import { ImageResponse } from "@takumi-rs/image-response/wasm";
import module from "@takumi-rs/wasm/next";
import { useState, useEffect } from "react";

import AsdfTemplate from "./image-templates/asdf";
import { useStore } from "@/lib/store";
import { Button } from "./ui/button";
import { filenameDate } from "@/lib/utils";

const fonts = [
  {
    name: "Geist",
    // TODO: handle loading fonts
    data: await fetch("https://takumi.kane.tw/fonts/Geist.woff2").then((r) => r.arrayBuffer()),
  },
];

async function renderImage(content: string) {
  const asdf = new ImageResponse(<AsdfTemplate content={content} />, {
    width: 1200,
    height: 630,
    format: "png",
    module,
    fonts,
  });

  const data = await asdf.blob();

  return data;
}

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
  }

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
  if (!src) return <div>Loading…</div>;

  return (
    <>
      <img src={src} alt="Image preview" />
      <Button onClick={handleDownload}>download</Button>
    </>
  );
}

export function Preview() {
  const store = useStore();

  const blob = async () => {
    return await renderImage(store.content || "lorem ipsum");
    // const res = await fetch("/image.webp");
    // return await res.blob();
  };

  return <ImageFromAsyncBlob getBlob={blob} />;
}
