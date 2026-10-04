import type { BrandFile } from "../types";
export interface DocxRunStyle {
    font: string;
    size: number;
    bold?: boolean;
    color: string;
}
export interface DocxStyles {
    colors: Record<string, string>;
    heading1: DocxRunStyle;
    heading2: DocxRunStyle;
    heading3: DocxRunStyle;
    body: DocxRunStyle;
    small?: DocxRunStyle;
}
export declare function toDocxStyles(brand: BrandFile): DocxStyles;
