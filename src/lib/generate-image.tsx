import { ImageResponse } from "@takumi-rs/image-response/wasm";
import module from "@takumi-rs/wasm/next";

import type { TemplateData } from "@/components/image-templates/asdf";

import AsdfTemplate from "@/components/image-templates/asdf";
import { useStore } from "./store";

import { fetchResources } from "@takumi-rs/helpers";

const fonts = [
  {
    name: "Geist",
    // TODO: handle loading fonts
    data: await fetch("https://takumi.kane.tw/fonts/Geist.woff2").then((r) => r.arrayBuffer()),
  },
];


export async function renderImage(templateData: TemplateData) {
  const { dimensions } = useStore.getState();


  let fetchedResources: Awaited<ReturnType<typeof fetchResources>> = [];
  if (templateData.backgroundFile) {
    fetchedResources = await fetchResources([templateData.backgroundFile]);
  }

  const asdf = new ImageResponse(<AsdfTemplate templateData={templateData} />, {
    width: dimensions?.dimensions[0] || 1080,
    height: dimensions?.dimensions[1] || 1350,
    format: "png",
    module,
    fonts,
    fetchedResources,
  });

  const data = await asdf.blob();

  return data;
}
