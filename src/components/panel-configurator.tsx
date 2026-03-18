"use client";

import { useForm } from "@tanstack/react-form";
import { Download, ScanEye } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useImage } from "@/hooks/use-image";
import { IMAGE_DIMENSIONS } from "@/lib/dimensions";
import { download } from "@/lib/download";
import { renderImage } from "@/lib/generate-image";
import { useStore } from "@/lib/store";

import { BackgroundPicker } from "./background-picker";
import { Logo } from "./logo";
import { Panel } from "./panel";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

type ConfiguratorPanelProps = {
  posterUrl: string | null;
  setBlob: Dispatch<SetStateAction<Blob | null>>;
};

type FormValues = {
  image: File | null;
  dimensions: Dimension | null;
  heading: string;
  content: string;
  footer: string;
  gradientColor: string;
  contentBgColor: string;
  headingBgColor: string;
  contentTextColor: string;
  headingTextColor: string;
};

export function ConfiguratorPanel({
  posterUrl,
  setBlob,
}: ConfiguratorPanelProps) {
  const { setBlob: setBackgroundBlob, url: backgroundUrl } = useImage();

  const handleDownloadPoster = () => {
    if (!posterUrl) {
      console.log("no blob!");
      return;
    }
    download(posterUrl);
  };

  const form = useForm({
    defaultValues: {
      image: null,
      dimensions: IMAGE_DIMENSIONS[0] as Dimension,
      heading: "",
      content: "",
      footer: "",
      gradientColor: "#1c398e",
      contentBgColor: "#2b7fff",
      headingBgColor: "#2b7fff",
      headingTextColor: "#fafafa",
      contentTextColor: "#fafafa",
    } as FormValues,
    onSubmit: async ({ value }) => {
      console.log("You submitted the following values:", value);

      const selectedDimensions = value.dimensions ?? IMAGE_DIMENSIONS[0];

      const templateData = {
        content: value.content || "lorem ipsum",
        // backgroundFile: value.image,
        backgroundFile: backgroundUrl,
        footer: value.footer,
        header: value.heading,
        dimensions: selectedDimensions,
        gradientColor: value.gradientColor,
        contentBgColor: value.contentBgColor,
        contentTextColor: value.contentTextColor,
        headingBgColor: value.headingBgColor,
        headingTextColor: value.headingTextColor,
      };

      const generatedPoster = await renderImage(templateData);

      setBlob(generatedPoster);
    },
  });

  return (
    <Panel className="flex w-1/3 grow-1 flex-col justify-start overflow-y-scroll">
      <Link href="/">
        <Logo className="pb-4" />
      </Link>

      <form
        id="configurator-form"
        className="grow-1"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="dimensions"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Dimensions</FieldLabel>
                  <Combobox
                    id={field.name}
                    items={IMAGE_DIMENSIONS}
                    itemToStringValue={(option: Dimension) => option.label}
                    value={field.state.value}
                    onValueChange={(value) => {
                      if (!value) return;
                      field.handleChange(value);
                    }}
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
              );
            }}
          />

          <form.Field
            name="image"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Background</FieldLabel>
                  <BackgroundPicker
                    id={field.name}
                    name={field.name}
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] ?? null;
                      setBackgroundBlob(file); // NOTE: ????
                      if (!file) return;
                      field.handleChange(file);
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="gradientColor"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Gradient color</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="lorem ipsum dolor sit amet..."
                      autoComplete="off"
                    />
                    <InputGroupAddon align="inline-end">
                      <div
                        className="size-4 rounded-full border"
                        style={{ backgroundColor: `${field.state.value}` }}
                      ></div>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="heading"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
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
                    placeholder="lorem ipsum dolor sit amet..."
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="headingBgColor"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Heading background color
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="lorem ipsum dolor sit amet..."
                      autoComplete="off"
                    />
                    <InputGroupAddon align="inline-end">
                      <div
                        className="size-4 rounded-full border"
                        style={{ backgroundColor: `${field.state.value}` }}
                      ></div>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="headingTextColor"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Heading text color
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="lorem ipsum dolor sit amet..."
                      autoComplete="off"
                    />
                    <InputGroupAddon align="inline-end">
                      <div
                        className="size-4 rounded-full border"
                        style={{ backgroundColor: `${field.state.value}` }}
                      ></div>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="content"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
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
                    placeholder="lorem ipsum dolor sit amet..."
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="contentBgColor"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Content background color
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="lorem ipsum dolor sit amet..."
                      autoComplete="off"
                    />
                    <InputGroupAddon align="inline-end">
                      <div
                        className="size-4 rounded-full border"
                        style={{ backgroundColor: `${field.state.value}` }}
                      ></div>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="contentTextColor"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Content text color
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="lorem ipsum dolor sit amet..."
                      autoComplete="off"
                    />
                    <InputGroupAddon align="inline-end">
                      <div
                        className="size-4 rounded-full border"
                        style={{ backgroundColor: `${field.state.value}` }}
                      ></div>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="footer"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
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
                    placeholder="lorem ipsum dolor sit amet..."
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
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

      <div className="text-xs">
        <Link href="https://github.com/mateossh" className="underline">
          Author: mateossh
        </Link>
      </div>
    </Panel>
  );
}
