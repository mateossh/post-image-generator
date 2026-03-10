# DOM Image Generation Migration - Implementation Specs

## Overview
Replace the current @takumi-rs WASM-based image generation pipeline with an in-browser DOM-to-PNG solution using `html-to-image`.

## Goals
- Generate poster images entirely in the browser from real DOM/CSS
- Remove dependency on @takumi-rs packages
- Maintain visual parity with current output
- Support all dimension presets (verticalPost, horizontalPost, square, story)

---

## Phase 1: Setup & Dependencies

### 1.1 Install html-to-image
```bash
npm install html-to-image
# or
bun add html-to-image
```

### 1.2 Verify Current Takumi Dependencies
Current dependencies to remove later:
- `@takumi-rs/image-response@^0.70.4`
- `@takumi-rs/wasm@^0.70.4`
- `@takumi-rs/helpers` (may be a transitive dependency)

---

## Phase 2: Create DOM-Compatible Template

### 2.1 New File: `src/components/image-templates/poster-template-dom.tsx`

**Purpose**: DOM-native poster template using Tailwind className instead of `tw` prop

**Requirements**:
- Same `TemplateData` interface as current template
- Replace all `tw="..."` with `className="..."`
- Use Tailwind classes for all styling
- Keep inline styles for dynamic properties (backgroundImage)

**Key Changes from Current Template**:
```tsx
// OLD (Takumi):
<div tw="w-full h-full flex flex-col justify-end items-center">

// NEW (DOM):
<div className="w-full h-full flex flex-col justify-end items-center">
```

**Template Structure**:
1. Root container with full dimensions
2. Background layer with image + gradient overlay
3. Content area with header/content/footer

**Acceptance Criteria**:
- [ ] Renders correctly in browser with Tailwind classes
- [ ] Background image displays with object-cover behavior
- [ ] Gradient overlay renders correctly
- [ ] Text styling matches current output (fonts, colors, sizes)

---

## Phase 3: Create Offscreen Renderer

### 3.1 New File: `src/components/offscreen-poster.tsx`

**Purpose**: Render poster DOM offscreen at exact export dimensions for capture

**Requirements**:
- Accept `width`, `height`, and `templateData` props
- Use fixed pixel sizing: `style={{ width, height }}`
- Position offscreen without affecting layout:
  ```tsx
  style={{
    position: 'fixed',
    left: '-100000px',
    top: 0,
    width,
    height,
  }}
  ```
- Export `ref` to root DOM node for capture
- Do NOT use `display: none` or `opacity: 0`

**Interface**:
```tsx
type OffscreenPosterProps = {
  width: number;
  height: number;
  templateData: TemplateData;
  ref: React.RefObject<HTMLElement | null>;
};

// In React 19, pass ref as a prop directly (forwardRef is deprecated)
function OffscreenPoster({ width, height, templateData, ref }: OffscreenPosterProps) {
  return <div ref={ref}>...</div>;
}
```

**Acceptance Criteria**:
- [ ] Renders at exact pixel dimensions specified
- [ ] Hidden from viewport but still in DOM
- [ ] Ref provides access to capture-ready DOM node

---

## Phase 4: Create DOM Capture Utility

### 4.1 New File: `src/lib/render-image-dom.ts`

**Purpose**: Convert offscreen DOM to PNG Blob using html-to-image

**Requirements**:

1. **Font Loading**:
   ```ts
   await document.fonts.ready;
   ```

2. **Background Image Loading**:
   ```ts
   if (templateData.backgroundFile) {
     const img = new Image();
     img.src = templateData.backgroundFile;
     await img.decode();
   }
   ```

3. **Capture with html-to-image**:
   ```ts
   import { toBlob } from 'html-to-image';
   
   const blob = await toBlob(node, {
     pixelRatio: 1, // Exact output dimensions
     cacheBust: true,
   });
   ```

4. **Error Handling**:
   - Catch CORS errors
   - Provide meaningful error messages
   - Handle font loading failures gracefully

**Interface**:
```tsx
type RenderDomImageOptions = {
  node: HTMLElement;
  width: number;
  height: number;
  templateData: TemplateData;
};

export async function renderDomImage(
  options: RenderDomImageOptions
): Promise<Blob>;
```

**Acceptance Criteria**:
- [ ] Waits for fonts to load before capture
- [ ] Pre-loads background image before capture
- [ ] Returns valid PNG Blob
- [ ] Output dimensions match input dimensions
- [ ] Handles errors gracefully

---

## Phase 5: Update Preview Panel

### 5.1 Modify: `src/components/panel-preview.tsx`

**Changes Required**:

1. **Add Offscreen Poster Component**:
   ```tsx
   import { OffscreenPoster } from './offscreen-poster';
   import { renderDomImage } from '@/lib/render-image-dom';
   ```

2. **Create Ref for Capture**:
   ```tsx
   const posterRef = useRef<HTMLElement>(null);
   ```

3. **Memoize getBlob with useCallback**:
   ```tsx
   const getBlob = useCallback(async () => {
     if (!posterRef.current) throw new Error('Poster not ready');
     
     return renderDomImage({
       node: posterRef.current,
       width: dimensions?.dimensions[0] || 1080,
       height: dimensions?.dimensions[1] || 1350,
       templateData: {
         content: store.content || "lorem ipsum",
         backgroundFile: backgroundUrl,
         footer: store.footer,
         header: store.header,
       },
     });
   }, [dimensions, backgroundUrl, store.content, store.footer, store.header]);
   ```

4. **Render Offscreen Poster**:
   ```tsx
   return (
     <Panel className="w-full">
       <OffscreenPoster
         ref={posterRef}
         width={dimensions?.dimensions[0] || 1080}
         height={dimensions?.dimensions[1] || 1350}
         templateData={{
           content: store.content || "lorem ipsum",
           backgroundFile: backgroundUrl,
           footer: store.footer,
           header: store.header,
         }}
       />
       <ImageFromAsyncBlob
         getBlob={getBlob}
         variant={store.dimensions?.key || "verticalPost"}
         alt="Image preview"
       />
     </Panel>
   );
   ```

**Acceptance Criteria**:
- [ ] Offscreen poster renders at correct dimensions
- [ ] getBlob is memoized with useCallback
- [ ] ImageFromAsyncBlob receives proper getBlob function
- [ ] Preview updates when store changes

---

## Phase 6: Testing & Verification

### 6.1 Visual Parity Checklist
- [ ] Vertical post (1080x1350) matches Takumi output
- [ ] Horizontal post (1200x630) matches Takumi output  
- [ ] Square (1080x1080) matches Takumi output
- [ ] Story (1080x1920) matches Takumi output

### 6.2 Content Verification
- [ ] Header text renders with correct styling
- [ ] Main content text renders with correct styling
- [ ] Footer text renders with correct styling
- [ ] Background image displays correctly
- [ ] Gradient overlay renders correctly

### 6.3 Technical Verification
- [ ] No CORS errors in console
- [ ] Fonts load correctly (check computed styles)
- [ ] No memory leaks (URLs revoked properly)
- [ ] Works in Chrome/Chromium
- [ ] Works in Safari (if applicable)

### 6.4 Performance Checklist
- [ ] Capture completes within 1-2 seconds
- [ ] No UI freezing during capture
- [ ] Blob generation doesn't block main thread

---

## Phase 7: Cleanup & Migration

### 7.1 Remove Takumi Dependencies

Once DOM output matches Takumi output:

1. **Delete Files**:
   - `src/lib/generate-image.tsx`
   - `src/components/image-templates/poster-template.tsx` (Takumi version)

2. **Update package.json**:
   ```bash
   npm uninstall @takumi-rs/image-response @takumi-rs/wasm
   ```

3. **Remove Unused Imports**:
   - Search for any remaining @takumi-rs imports
   - Remove font fetching logic (handled by browser)

### 7.2 Update Imports
- Ensure all imports point to new DOM template
- Update any barrel exports if applicable

---

## File Changes Summary

### New Files
1. `src/components/image-templates/poster-template-dom.tsx` - DOM-native template
2. `src/components/offscreen-poster.tsx` - Offscreen renderer
3. `src/lib/render-image-dom.ts` - Capture utility
4. `specs/dom-image-migration-specs.md` - This document

### Modified Files
1. `src/components/panel-preview.tsx` - Integrate DOM pipeline
2. `package.json` - Add html-to-image, remove @takumi-rs deps

### Deleted Files (Phase 7)
1. `src/lib/generate-image.tsx`
2. `src/components/image-templates/poster-template.tsx`

---

## Risk Mitigation

### CORS Issues
- **Risk**: Remote images can't be captured
- **Mitigation**: Use object URLs from local file uploads (already implemented)

### Font Loading
- **Risk**: Fonts not loaded before capture
- **Mitigation**: Always await `document.fonts.ready`

### Browser Compatibility
- **Risk**: html-to-image behaves differently across browsers
- **Mitigation**: Test in target browsers, consider html2canvas as fallback

### Memory Leaks
- **Risk**: Object URLs not revoked
- **Mitigation**: Ensure cleanup in useEffect return functions

---

## Implementation Order

1. **Phase 1** - Install dependencies
2. **Phase 2** - Create DOM template (keep Takumi for comparison)
3. **Phase 3** - Create offscreen renderer
4. **Phase 4** - Create render utility
5. **Phase 5** - Update panel-preview.tsx
6. **Phase 6** - Test and verify visual parity
7. **Phase 7** - Remove Takumi dependencies

---

## Appendix: Reference Implementations

### html-to-image Basic Usage
```ts
import { toBlob } from 'html-to-image';

const blob = await toBlob(node, {
  pixelRatio: 1,
  cacheBust: true,
  skipFonts: false,
});
```

### Font Loading Pattern
```ts
// Wait for all fonts to be ready
await document.fonts.ready;

// Or check specific font
await document.fonts.load('1em Geist');
```

### Image Preloading Pattern
```ts
function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
}
```

---

## Notes

- Keep Takumi implementation until DOM version is verified
- Use feature toggle if doing gradual migration
- Monitor bundle size (html-to-image is ~20KB gzipped)
- Consider adding a loading state during capture
