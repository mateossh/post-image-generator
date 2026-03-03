'use client';

import { renderImage } from "@/lib/generate-image";
import { useStore } from "@/lib/store";

import { Panel } from "./panel";

import { ImageFromAsyncBlob } from './image-preview';


export function PreviewPanel() {
  const store = useStore();

  const blob = async () => {
    return await renderImage(store.content || "lorem ipsum");
  };

  return (
    <Panel className="w-full">
      <ImageFromAsyncBlob getBlob={blob} variant={store.dimensions?.key || 'verticalPost'} alt="Image preview" />
    </Panel>
  );
}
