import { PosterPreview } from './poster-preview';
import { Panel } from "./panel";

import { getDimensionKey } from '@/lib/dimensions';

export function PreviewPanel({ previewUrl, dimensions }) {
  console.log('previewPanel dimensions', dimensions);

  return (
    <Panel className="w-full">
      <h1 className="text-center">Preview</h1>

      <PosterPreview
        src={previewUrl}
        variant={getDimensionKey(dimensions) || "verticalPost"}
        alt="Image preview"
      />
    </Panel>
  );
}
