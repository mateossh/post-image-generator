import { ConfiguratorPanel } from "@/components/panel-configurator";
import { PreviewPanel } from "@/components/panel-preview";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <ConfiguratorPanel />

      <div className="h-screen w-px bg-neutral-400"></div>

      <PreviewPanel />
    </div>
  );
}
