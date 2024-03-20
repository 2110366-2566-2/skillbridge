import { type ClassValue, clsx } from "clsx";
import { toJpeg } from "html-to-image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function customTrim(inputString: string): string {
  // Regular expression to remove leading and trailing whitespaces
  const trimRegex = /^\s+|\s+$/g;

  // Use replace method with the regex to trim the string
  const trimmedString = inputString.replace(trimRegex, "");

  return trimmedString;
}

async function convertImage(element: HTMLElement) {
  let dataUrl = "";
  const minDataLength = 150000;
  const maxAttempts = 20;

  for (let i = 0; dataUrl.length < minDataLength && i < maxAttempts; ++i) {
    dataUrl = await toJpeg(element, { quality: 0.95 });
  }

  return dataUrl;
}

export async function downloadImage(id: string, filename: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const dataUrl = await convertImage(element);

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
