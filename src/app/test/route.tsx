import { ImageResponse } from "@takumi-rs/image-response/wasm";
import module from "@takumi-rs/wasm/next";

import AsdfTemplate from '@/components/image-templates/asdf';

const fonts = [
  {
    name: "Geist",
    data: await fetch("https://takumi.kane.tw/fonts/Geist.woff2").then((r) =>
      r.arrayBuffer(),
    ),
  },
];

export function GET() {
  
    return new ImageResponse(
      <AsdfTemplate />,
    {
      width: 1200,
      height: 630,
      format: "webp",
      module,
      fonts,
    },
  );

}
