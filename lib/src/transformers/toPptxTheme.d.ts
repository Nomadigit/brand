import type { BrandFile } from "../types";
export interface PptxTheme {
    name: string;
    /** Office theme color slots, hex without '#'. */
    colors: {
        dk1: string;
        lt1: string;
        dk2: string;
        lt2: string;
        accent1: string;
        accent2: string;
        accent3: string;
        accent4: string;
        accent5: string;
        accent6: string;
        hlink: string;
        folHlink: string;
    };
    fonts: {
        major: string;
        minor: string;
        mono?: string;
    };
}
/** Office theme slots for python-pptx / PptxGenJS / a hand-made .thmx. */
export declare function toPptxTheme(brand: BrandFile): PptxTheme;
