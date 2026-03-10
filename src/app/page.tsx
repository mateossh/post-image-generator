'use client'

import { ConfiguratorPanel } from "@/components/panel-configurator";
import { PreviewPanel } from "@/components/panel-preview";
import { Separator } from "@/components/ui/separator";
import { useImage } from "@/hooks/use-image";

export default function Home() {
  const { blob, setBlob, url, dimensions } = useImage();


  return (
    <div className="flex min-h-screen items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <ConfiguratorPanel posterUrl={url} setBlob={setBlob} />

      <div className="h-screen w-px bg-neutral-100"></div>

      <PreviewPanel previewUrl={url} dimensions={dimensions} />
    </div>
  );
}
