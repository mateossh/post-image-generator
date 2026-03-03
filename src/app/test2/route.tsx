import { ImageResponse } from "@takumi-rs/image-response/wasm";
import module from "@takumi-rs/wasm/next";

import QwerTemplate from "@/components/image-templates/qwer";

import { Axe } from "lucide-react";

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
      <QwerTemplate 
        title={`Hello world!`}
        description="If you see this, the TanStack Start example works."
        icon={<Axe color="hsl(354, 90%, 60%)" size={64} />}
        primaryColor="hsla(354, 90%, 54%, 0.3)"
        primaryTextColor="hsl(354, 90%, 60%)"
        site="Takumi"
      />,
    {
      width: 1200,
      height: 630,
      format: "webp",
      module,
      fonts,
    },
  );

}
