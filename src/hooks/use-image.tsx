import { useState, useEffect } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

export function useImage() {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);

  useEffect(() => {
    if (!imageBlob) return;

    const data = URL.createObjectURL(imageBlob);
    setImageUrl(data);

    return () => {
      URL.revokeObjectURL(data);
    }
  }, [imageBlob]);

  useEffect(() => {
    if (!imageUrl) {
      setDimensions(null);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };

    return () => {
      img.onload = null;
    };
  }, [imageUrl]);

  return {
    blob: imageBlob,
    setBlob: setImageBlob,
    url: imageUrl,
    dimensions
  }
}
