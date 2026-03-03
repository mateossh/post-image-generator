import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filenameDate() {
  const now = new Date()

  const yyyy = now.getFullYear()
  const m = (now.getMonth() + 1).toString();
  const d = now.getDate().toString();

  const mm = m.padStart(2, "0");
  const dd = d.padStart(2, "0");

  const hour = now.getHours();
  const minutes = now.getMinutes();

  return `${yyyy}${mm}${dd}${hour}${minutes}`;

}
