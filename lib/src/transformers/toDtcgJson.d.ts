import type { BrandFile } from "../types";
type Token = {
    $type: string;
    $value: unknown;
};
type Group = {
    [key: string]: Token | Group;
};
/** W3C Design Tokens Community Group format, for Figma Tokens Studio, Style Dictionary and similar tools. */
export declare function toDtcgJson(brand: BrandFile): Group;
export {};
