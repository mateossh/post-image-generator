import type {ReactNode} from 'react';

export default function AsdfTemplate({
  content
}: {
  content: ReactNode;
}) {
  return <div tw="w-full h-full flex items-center justify-center bg-green-200 text-black">
      <h1 tw="text-4xl font-bold text-blue-400">{content}</h1>
    </div>
}
