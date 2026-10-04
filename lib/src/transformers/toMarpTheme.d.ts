import type { BrandFile } from "../types";
/**
 * A Marp (https://marp.app) theme: write decks in Markdown, export to PDF/PPTX/HTML.
 * Classes: default (light), `lead` (title slide on primary), `invert` (dark).
 */
export declare function toMarpTheme(brand: BrandFile, name?: string): string;
