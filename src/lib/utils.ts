export function sanitizeOutput(input: string): string {
  // Remove '*/' and any character that is not a letter, number, space, period, or comma.
  // The 'g' flag ensures all occurrences are replaced.
  return input.replace(/\*\//g, '').replace(/[^a-zA-Z0-9 .,]/g, '');
}