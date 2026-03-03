import { Pane } from "@/components/pane";
import { Configurator } from "./_configurator";



export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <Pane className="w-1/3">
        <h1 className="text-center text-xl">Post image generator</h1>

        <Configurator />
      </Pane>

      <div className="w-px h-screen bg-neutral-400"></div>

      <Pane className="w-full">
        Preview
      </Pane>
    </div>
  );
}
