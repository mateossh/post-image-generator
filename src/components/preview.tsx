"use client";
import {useState} from 'react'
import module from "@takumi-rs/wasm/next";
import { ImageResponse } from "@takumi-rs/image-response/wasm";
import AsdfTemplate from "./image-templates/asdf";
import { useEffect } from "react";

const fonts = [
  {
    name: "Geist",
    // TODO: handle loading fonts
    data: await fetch("https://takumi.kane.tw/fonts/Geist.woff2").then((r) =>
      r.arrayBuffer(),
    ),
  },
];

async function renderImage() {
  const asdf = new ImageResponse(<AsdfTemplate content="lorem ipsum" />, {
    width: 1200,
    height: 630,
    format: "png",
    module,
    fonts,
  });

  console.log("asdf", asdf);
  console.log("qwer", asdf.body);

  const data = await asdf.blob();
  console.log("blob data??", data);

  return data;
}

type Props = {
  getBlob: () => Promise<Blob>;
}

export function WebpFromAsyncBlob({ getBlob }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let urlToRevoke: string | null = null;

    (async () => {
      try {
      setError(null);
      setSrc(null);

      const blob = await getBlob();

      if (cancelled) return;

      const url = URL.createObjectURL(blob);
      urlToRevoke = url;
      setSrc(url);
      } catch(e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
      }

    })();

    return () => {
      cancelled = true;
      if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
    };

  }, [getBlob])


  if (error) return <div>Failed to load image: {error}</div>;
  if (!src) return <div>Loading…</div>;

  return <img src={src} alt="Image preview" />;
}


export function Preview() {
  const blob = async () => {
    return await renderImage();
    // const res = await fetch("/image.webp");
    // return await res.blob();
  }

  return <WebpFromAsyncBlob
    getBlob={blob}
  />
}
