import { ImageResponse } from "@takumi-rs/image-response/wasm";
import module from "@takumi-rs/wasm/next";

import AsdfTemplate from "@/components/image-templates/asdf";
import { useStore } from "./store";

const fonts = [
  {
    name: "Geist",
    // TODO: handle loading fonts
    data: await fetch("https://takumi.kane.tw/fonts/Geist.woff2").then((r) => r.arrayBuffer()),
  },
];

export async function renderImage(content: string) {
  const { dimensions } = useStore.getState();

  const asdf = new ImageResponse(<AsdfTemplate content={content} />, {
    width: dimensions?.dimensions[0] || 1080,
    height: dimensions?.dimensions[1] || 1350,
    format: "png",
    module,
    fonts,
  });

  const data = await asdf.blob();

  return data;
}
