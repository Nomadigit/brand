import type { BrandFile, FontStack } from "../types";
export type ColorMode = "light" | "dark";
/** "surfaceMuted" -> "surface-muted" */
export declare function kebab(key: string): string;
export declare function fontFamilyValue(font: FontStack): string;
/**
 * Every color role resolved for one mode, keyed by kebab-case role name.
 * Dark mode starts from the light palette and overrides whatever darkMode defines,
 * so a partial darkMode block never leaves a role undefined.
 */
export declare function resolveColors(brand: BrandFile, mode: ColorMode): Record<string, string>;
export declare function hasDarkMode(brand: BrandFile): boolean;
export declare function colorScale(brand: BrandFile): Record<string, Record<string, string>>;
export declare function hexNoHash(color: string): string;
