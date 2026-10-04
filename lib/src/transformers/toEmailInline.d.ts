import type { BrandFile } from "../types";
export interface EmailInlineStyles {
    body: string;
    container: string;
    heading: string;
    text: string;
}
export interface EmailTableWrapper {
    open: string;
    close: string;
}
export interface EmailInlineOutput {
    inline: EmailInlineStyles;
    styleTag: string;
    table: EmailTableWrapper;
}
export declare function toEmailInline(brand: BrandFile): EmailInlineOutput;
