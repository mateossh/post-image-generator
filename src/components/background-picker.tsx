"use client";

import { useEffect, useRef, useState, type ChangeEventHandler } from "react";
import { Dropzone } from "./dropzone";
import { Input } from "./ui/input";

type BackgroundPickerProps = {
  onChange?: (file: File | null) => void;
};

export function BackgroundPicker({ onChange }: BackgroundPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pickFile = (next: File | null) => {
    setFile(next);
    onChange?.(next);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleDrop = (files: File[]) => {
    const firstImage = files.find((f) => f.type.startsWith("image/")) ?? null;
    if (!firstImage) return;
    pickFile(firstImage);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const next = e.currentTarget.files?.[0] ?? null;
    if (!next) return;
    if (!next.type.startsWith("image/")) return;
    pickFile(next);
  };

  return (
    <>
      <Input
        ref={inputRef}
        id="post-bg"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      <div className="space-y-2">
        <Dropzone onDrop={handleDrop} onClick={handleBrowse} />

        {file && (
          <div className="flex items-center gap-3 rounded-md border border-input bg-white px-3 py-2 text-xs text-muted-foreground">
            {previewUrl ? (
              <img
                alt="Selected background"
                src={previewUrl}
                className="size-10 rounded object-cover"
              />
            ) : null}
            <p className="min-w-0 truncate">{file.name}</p>
          </div>
        )}
      </div>
    </>
  );
}
