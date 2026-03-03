import { ImageResponse } from "@takumi-rs/image-response/wasm";
import module from "@takumi-rs/wasm/next";

import AsdfTemplate from "@/components/image-templates/asdf";

const fonts = [
  {
    name: "Geist",
    // TODO: handle loading fonts
    data: await fetch("https://takumi.kane.tw/fonts/Geist.woff2").then((r) => r.arrayBuffer()),
  },
];

export async function renderImage(content: string) {
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
