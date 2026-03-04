import type { ReactNode, PropsWithChildren } from "react";

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
    <Container backgroundFile={backgroundFile}>
      <div tw="h-full flex flex-col justify-end items-center">

        <div tw="text-5xl bg-pink-100 p-4 font-bold text-blue-400">{content}</div>

        <div
          tw="w-full inline p-4 text-4xl bg-yellow-200"
          style={{ textWrap: 'pretty' }}
        >
          lorem ipsum dolor sit amet
          <br />
          lorem ipsum dolor sit amet
          <br />
          lorem ipsum dolor sit amet
          <br />
          lorem ipsum dolor sit amet
          <br />
          lorem ipsum dolor sit amet
          <br />
          lorem ipsum dolor sit amet
          <br />

        </div>

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
      tw="w-full h-full flex items-center justify-center bg-green-200 p-16"
      style={{
        backgroundImage: `url(${backgroundFile})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // NOTE: it doesn't behave correctly
      }}
    >
      {children}
    </div>
  );
}
