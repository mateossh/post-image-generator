import { filenameDate } from "./utils";

export function download(src: string) {
  if (!src) return;

  const a = document.createElement("a");
  a.href = src;
  a.download = `poster-${filenameDate()}.png`;
  a.click();
}
