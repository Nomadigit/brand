import type { BrandFile } from "../types";
export type FlatTokens = Record<string, string | number>;
/**
 * Dot-separated keys with primitive values, for languages without a CSS pipeline
 * (Go templates, Kotlin/Compose, Python scripts): "color.light.primary" -> "#04556D".
 */
export declare function toFlatJson(brand: BrandFile): FlatTokens;
