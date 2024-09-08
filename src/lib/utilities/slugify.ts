/**
 * Converts a given string into a URL-friendly slug.
 *
 * This function performs the following operations:
 * - Converts the string to lowercase.
 * - Normalizes accented characters to their base forms.
 * - Removes special characters except alphanumeric characters, spaces, and hyphens.
 * - Replaces spaces, underscores, and multiple hyphens with a single hyphen.
 * - Trims leading and trailing hyphens.
 *
 * @param text - The string to be slugified. Can be of any type, but it will be converted to a string.
 * @returns A URL-friendly slug derived from the input string. The slug is lowercase, and special characters are removed or replaced.
 *
 * @example
 * ```typescript
 * const title = "Café Déjà Vu: Top 10 Must-Have Items in 2024!";
 * const slug = slugify(title);
 * console.log(slug); // Output: "cafe-deja-vu-top-10-must-have-items-in-2024"
 * ```
 */

export function slugify(text: string) {
  return text
    .toString() // Ensure the input is a string
    .normalize('NFD') // Normalize to decompose accents
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
    .toLowerCase() // Convert to lowercase
    .trim() // Trim leading and trailing whitespace
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except alphanumeric, spaces, and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Trim leading and trailing hyphens
}
