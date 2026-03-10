import Link from "next/link";
import { ImageIcon, Layers, Download, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const EDITOR_URL = "/editor"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Logo />
          <Button asChild size="sm">
            <Link href={EDITOR_URL}>Open Editor</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center px-6 py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Generate social post images in seconds
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Create polished, on-brand images for social media with custom
              backgrounds, typography, and gradients — no design skills needed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href={EDITOR_URL}>Start creating</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">See features</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Preview placeholder */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-yellow-400" />
              <span className="size-3 rounded-full bg-green-400" />
            </div>
            <div className="flex items-center justify-center p-12 text-muted-foreground">
              <div className="flex aspect-video w-full max-w-lg flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-background">
                <ImageIcon className="size-10 opacity-30" />
                <span className="text-sm">Your post image preview</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border bg-muted/40 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight">
              Everything you need
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Feature
                icon={<Layers className="size-5" />}
                title="Multiple formats"
                description="Choose from common social media dimensions — square, portrait, landscape, and more."
              />
              <Feature
                icon={<ImageIcon className="size-5" />}
                title="Custom backgrounds"
                description="Upload your own background image to make every post uniquely yours."
              />
              <Feature
                icon={<Palette className="size-5" />}
                title="Gradient overlays"
                description="Add a colour gradient overlay to create depth and keep text readable."
              />
              <Feature
                icon={<Download className="size-5" />}
                title="Instant download"
                description="Export your finished image in one click, ready to post anywhere."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">
              Ready to make your posts stand out?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Open the editor and create your first image in under a minute.
            </p>
            <Button asChild size="lg">
              <Link href={EDITOR_URL}>Open editor</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        post-image-generator &mdash; a simple social post image generator
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-foreground">
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
