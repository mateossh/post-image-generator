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
import { IMAGE_DIMENSIONS } from "@/lib/dimensions";
import { useStore } from "@/lib/store";

import { BackgroundPicker } from "./background-picker";
import { Panel } from "./panel";
import { Input } from "./ui/input";

import { useForm } from '@tanstack/react-form';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { renderImage } from "@/lib/generate-image";
import { download } from "@/lib/download";
import { useImage } from "@/hooks/use-image";

export function ConfiguratorPanel({ posterUrl, setBlob }) {
  const store = useStore();

  const { setBlob: setBackgroundBlob, url: backgroundUrl } = useImage();

  const handleDownloadPoster = () => {
    if (!posterUrl) {
      console.log('no blob!');
      return;
    }
    download(posterUrl);
  }

  const form = useForm({
    defaultValues: {
      image: null,
      dimensions: IMAGE_DIMENSIONS[0],
      heading: "",
      content: "",
      footer: "",
    },
    onSubmit: async ({ value }) => {
      console.log("You submitted the following values:", value);

      // store.setFooter(value.footer)
      // store.setHeader(value.heading)
      // store.setContent(value.content)
      // store.setBackgroundFile(value.image);
      // store.setDimensions(value.dimensions);

      const templateData = {
        content: value.content || "lorem ipsum",
        // backgroundFile: value.image,
        backgroundFile: backgroundUrl,
        footer: value.footer,
        header: value.heading,
        dimensions: value.dimensions,
      };

      const generatedPoster = await renderImage(templateData);
      setBlob(generatedPoster);
    },
  })

  return (
    <Panel className="w-1/3">
      <h1 className="text-center text-xl pb-4">Post image generator</h1>

      <form id="configurator-form" onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
        <FieldGroup>

          <form.Field
            name="dimensions"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Dimensions</FieldLabel>
                  <Combobox
                    id={field.name}
                    items={IMAGE_DIMENSIONS}
                    itemToStringValue={(option: Dimension) => option.label}
                    value={field.state.value}
                    onValueChange={field.handleChange}
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
                </Field>
              )
            }}
          />


          <form.Field
            name="image"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Background</FieldLabel>
                  <BackgroundPicker
                    id={field.name}
                    name={field.name}
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] ?? null;
                      setBackgroundBlob(file); // NOTE: ????
                      field.handleChange(file);
                    }}
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          />

          <form.Field
            name="heading"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Heading</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    className="bg-white"
                    placeholder="lorem ipsum dolor sit amet..."
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          />


          <form.Field
            name="content"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    className="bg-white"
                    placeholder="lorem ipsum dolor sit amet..."
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          />

          <form.Field
            name="footer"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Footer</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    className="bg-white"
                    placeholder="lorem ipsum dolor sit amet..."
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          />
        </FieldGroup>
      </form>

      <div className="flex justify-center space-x-4 py-6">
        <Button type="submit" form="configurator-form" variant="secondary">
          <ScanEye />
          Preview
        </Button>
        <Button onClick={handleDownloadPoster}>
          <Download />
          Download
        </Button>
      </div>
    </Panel>
  );
}
