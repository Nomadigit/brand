import type { BrandFile } from "../types";
export type CssVariables = Record<string, string>;
export declare function brandToCssVariables(brand: BrandFile): CssVariables;
/** Only the color variables whose dark value differs from light. */
export declare function darkModeCssVariables(brand: BrandFile): CssVariables;
export declare function cssVariablesToRootBlock(vars: CssVariables, selector?: string): string;
/**
 * Light values on :root. Dark values follow the OS setting unless the page pins a theme
 * with <html data-theme="light|dark">, which wins in both directions.
 */
export declare function toWebCss(brand: BrandFile): string;
