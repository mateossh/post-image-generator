import type { ReactNode } from "react";

export type TemplateData = {
  content: ReactNode,
  backgroundFile: string | null,
}

type Props = {
  templateData: TemplateData
}

export default function AsdfTemplate({ templateData }: Props) {

  const { content, backgroundFile } = templateData;

  console.log("CO DOSTAŁEM", backgroundFile);

  // <img src="https://placehold.co/1200x600" width={1200} height={600} className="-z-10" />
  return (
    <div tw="w-full h-full flex items-center justify-center bg-green-200 text-black">
      {backgroundFile && <img src={backgroundFile} />}
      <h1 tw="text-4xl font-bold text-blue-400">{content}</h1>

    </div>
  );
}
