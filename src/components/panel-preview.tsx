import { PosterPreview } from './poster-preview';
import { Panel } from "./panel";

import { getDimensionKey } from '@/lib/dimensions';

type PreviewPanelProps = {
  previewUrl: string | null;
  dimensions: { width: number; height: number } | null;
};

export function PreviewPanel({ previewUrl, dimensions }: PreviewPanelProps) {
  console.log('previewPanel dimensions', dimensions);


  return (
    <Panel className="w-full">
      <h1 className="text-center">Preview</h1>

      {previewUrl && <PosterPreview
        src={previewUrl}
        variant={getDimensionKey(dimensions) || "verticalPost"}
        alt="Image preview"
      />}
    </Panel>
  );
}
