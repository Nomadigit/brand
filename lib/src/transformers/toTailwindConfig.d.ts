import type { BrandFile } from "../types";
export interface TailwindThemeExtend {
    colors: Record<string, string>;
    fontFamily: Record<string, string[]>;
    fontSize?: Record<string, string>;
    fontWeight?: Record<string, string>;
    lineHeight?: Record<string, string>;
    letterSpacing?: Record<string, string>;
    borderRadius?: Record<string, string>;
    spacing?: Record<string, string>;
    transitionDuration?: Record<string, string>;
    transitionTimingFunction?: Record<string, string>;
}
export interface TailwindConfigFragment {
    darkMode?: [string, string];
    theme: {
        extend: TailwindThemeExtend;
    };
}
export interface TailwindOptions {
    /**
     * Point colors at the CSS variables from toWebCss() instead of literal values, so
     * light/dark switching comes for free. Requires tokens.css on the page.
     */
    useCssVariables?: boolean;
}
export declare function toTailwindConfig(brand: BrandFile, options?: TailwindOptions): TailwindConfigFragment;
