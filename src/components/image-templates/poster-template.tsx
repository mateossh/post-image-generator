import type { ReactNode, PropsWithChildren } from "react";
import type { Dimension } from '@/lib/dimensions';

export type TemplateData = {
  content: ReactNode;
  backgroundFile: string | null;
  footer: ReactNode | null;
  header: ReactNode | null;
  dimensions: Dimension;
};

type Props = {
  templateData: TemplateData;
};

export default function PosterTemplate({ templateData }: Props) {
  const { content, footer, header, backgroundFile } = templateData;

  return (
    <Container backgroundFile={backgroundFile}>
      <div tw="w-full h-full flex flex-col justify-end items-center">
        {header &&
          <div tw="text-5xl bg-pink-100 p-4 font-bold text-blue-400">{header}</div>
        }

        <div
          tw="max-w-full p-4 text-4xl bg-yellow-200"
        >
          {content}
        </div>

        {footer && <div tw="w-full text-left pt-4">{footer}</div>}
      </div>
    </Container>
  );
}

type ContainerProps = PropsWithChildren<{
  backgroundFile: string | null
}>

function Container({ backgroundFile, children }: ContainerProps) {
  return (
    <div
      tw="w-full h-full flex items-center justify-center bg-green-200 p-16 relative"
      style={{
        backgroundImage: `url(${backgroundFile})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // NOTE: it doesn't behave correctly
      }}
    >
      <div
        style={{
          width: "100%",
          height: "40%",
          backgroundImage: "linear-gradient(0deg, red 0%, rgba(255, 0, 0, 0) 100%)",
          position: 'absolute',
          left: 0,
          bottom: 0,
        }}
      ></div>

      <div tw="w-full h-full flex items-center justify-center relative">
        {children}
      </div>

    </div>
  );
}
