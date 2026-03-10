import { fetchResources } from "@takumi-rs/helpers";
import { ImageResponse } from "@takumi-rs/image-response/wasm";
import module from "@takumi-rs/wasm/next";

import type { TemplateData } from "@/components/image-templates/poster-template";

import PosterTemplate from "@/components/image-templates/poster-template";

const fonts = [
  {
    name: "Geist",
    // TODO: handle loading fonts
    data: await fetch("https://takumi.kane.tw/fonts/Geist.woff2").then((r) =>
      r.arrayBuffer(),
    ),
  },
];

export async function renderImage(templateData: TemplateData) {
  const { dimensions } = templateData;

  let fetchedResources: Awaited<ReturnType<typeof fetchResources>> = [];
  if (templateData.backgroundFile) {
    fetchedResources = await fetchResources([templateData.backgroundFile]);
  }

  const asdf = new ImageResponse(
    <PosterTemplate templateData={templateData} />,
    {
      width: dimensions?.dimensions[0] || 1080,
      height: dimensions?.dimensions[1] || 1350,
      format: "png",
      module,
      fonts,
      fetchedResources,
      // drawDebugBorder: true,
    },
  );

  const data = await asdf.blob();

  return data;
}
