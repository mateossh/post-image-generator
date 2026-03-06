"use client";

import { Download, ScanEye } from "lucide-react";

import type { Dimension } from "@/lib/dimensions";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IMAGE_DIMENSIONS } from "@/lib/dimensions";
import { useStore } from "@/lib/store";

import { BackgroundPicker } from "./background-picker";
import { Panel } from "./panel";
import { Input } from "./ui/input";

export function ConfiguratorPanel() {
  const store = useStore();

  const handleDimensionsChange = (value: Dimension | null) => {
    if (!value) return;

    store.setDimensions(value);
  };

  return (
    <Panel className="w-1/3">
      <h1 className="text-center text-xl">Post image generator</h1>

      <section className="space-y-2 py-4">
        <div>
          <Label htmlFor="post-dimensions">Dimensions</Label>
          <Combobox
            id="post-dimensions"
            items={IMAGE_DIMENSIONS}
            itemToStringValue={(option: Dimension) => option.label}
            onValueChange={handleDimensionsChange}
            defaultValue={IMAGE_DIMENSIONS[0]}
          >
            <ComboboxInput placeholder="Select a framework" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.key} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div>
          <Label htmlFor="post-bg" className="pb-1">
            Background
          </Label>
          <BackgroundPicker />
        </div>

        <div>
          <Label htmlFor="post-header" className="pb-1">
            Header
          </Label>
          <Input
            className="bg-white"
            id="post-header"
            placeholder="lorem ipsum dolor sit amet..."
            onChange={(e) => store.setHeader(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="post-text" className="pb-1">
            Main content
          </Label>
          <Textarea
            className="bg-white"
            id="post-text"
            placeholder="lorem ipsum dolor sit amet..."
            onChange={(e) => store.setContent(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="post-footer" className="pb-1">
            Footer
          </Label>
          <Input
            className="bg-white"
            id="post-footer"
            placeholder="lorem ipsum dolor sit amet..."
            onChange={(e) => store.setFooter(e.target.value)}
          />
        </div>

        <div className="flex justify-center space-x-4 py-6">
          <Button variant="secondary">
            <ScanEye />
            Preview
          </Button>
          <Button>
            <Download />
            Download
          </Button>
        </div>
      </section>
    </Panel>
  );
}
