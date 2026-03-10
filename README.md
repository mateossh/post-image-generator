# post-image-generator

Generate social post images (PNG) in the browser: pick a format, upload a background, add text and colors, then download.

## Features

- Presets for common social media sizes (vertical, horizontal, square, story)
- Background image upload (drag-and-drop or browse)
- Gradient overlay + configurable colors for heading/content blocks
- One-click export to PNG

## Tech

- Next.js App Router + React
- Tailwind CSS (v4) + shadcn/ui components
- Image rendering via `@takumi-rs/image-response` (WASM) using a React template

## Getting Started

Prereqs: Bun

```bash
bun install
bun dev
```

Open `http://localhost:3000` and click "Open Editor".

## How Image Generation Works

- The editor lives at `src/app/editor/page.tsx`.
- On preview, `src/lib/generate-image.tsx` calls `renderImage()` which renders `src/components/image-templates/poster-template.tsx` into a PNG Blob.
- Background uploads are turned into an object URL (see `src/hooks/use-image.tsx`) and passed into the template.

## Customization

- Add/adjust size presets in `src/lib/dimensions.ts`.
- Update the preview aspect ratios in `src/components/poster-preview.tsx` if you add new presets.
- The current output template is `src/components/image-templates/poster-template.tsx`.

## Roadmap

- Planned migration to DOM-based rendering
- Background search integration
