"use client";

import { useEffect, useState } from "react";

import { renderImage } from "@/lib/generate-image";
import { useStore } from "@/lib/store";

import { ImageFromAsyncBlob } from "./image-preview";
import { Panel } from "./panel";

export function PreviewPanel() {
  const store = useStore();

  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!store.backgroundFile) return;

    const data = URL.createObjectURL(store.backgroundFile);
    setBackgroundUrl(data);

    return () => {
      URL.revokeObjectURL(data);
    };
  }, [store.backgroundFile]);

  const blob = async () => {
    if (!store.content) console.log("oops, no content");
    if (store.backgroundFile) console.log("oops, no bg!!");

    const templateData = {
      content: store.content || "lorem ipsum",
      backgroundFile: backgroundUrl,
    };

    return await renderImage(templateData);
  };

  return (
    <Panel className="w-full">
      <ImageFromAsyncBlob
        getBlob={blob}
        variant={store.dimensions?.key || "verticalPost"}
        alt="Image preview"
      />
    </Panel>
  );
}
