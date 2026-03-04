import type { ReactNode } from "react";

export type TemplateData = {
  content: ReactNode;
  backgroundFile: string | null;
};

type Props = {
  templateData: TemplateData;
};

export default function PosterTemplate({ templateData }: Props) {
  const { content, backgroundFile } = templateData;

  return (
    <div
      tw="w-full h-full flex items-center justify-center bg-green-200 text-black"
      style={{
        backgroundImage: `url(${backgroundFile})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <h1 tw="text-4xl font-bold text-blue-400">{content}</h1>
    </div>
  );
}
