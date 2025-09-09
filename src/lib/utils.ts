import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeOutput(input: string): string {
  // Remove '*/' and allow a broader range of characters including common punctuation and newlines.
  // This regex allows letters, numbers, spaces, periods, commas, question marks,
  // exclamation marks, hyphens, parentheses, square brackets, curly braces, colons,
  // semicolons, apostrophes, double quotes, slashes, and newlines.
  return input.replace(/\*\//g, '').replace(/[^a-zA-Z0-9 .,?!-()[]{}:;'"\n]/g, '');
}