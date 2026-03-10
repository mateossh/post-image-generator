// https://www.figma.com/resource-library/facebook-size-guide/
// https://www.figma.com/resource-library/facebook-size-guide/#facebook-post-image-size

interface ImageDimensions {
  width: number;
  height: number;
}

export const IMAGE_DIMENSIONS = [
  {
    key: "verticalPost",
    dimensions: [1080, 1350],
    label: "Vertical (1080x1350)",
  },
  {
    key: "horizontalPost",
    dimensions: [1200, 630],
    label: "Horizontal (1200x630)",
  },
  {
    key: "square",
    dimensions: [1080, 1080],
    label: "Square (1080x1080)",
  },
  {
    key: "story",
    dimensions: [1080, 1920],
    label: "Story (1080x1920)",
  },
] as const;

export type Dimension = (typeof IMAGE_DIMENSIONS)[number];

export function getDimensionKey(dimensions: ImageDimensions | null): Dimension["key"] | null {
  if (!dimensions) return null;

  const match = IMAGE_DIMENSIONS.find(
    (d) => d.dimensions[0] === dimensions.width && d.dimensions[1] === dimensions.height
  );
  return match?.key ?? null;
}
