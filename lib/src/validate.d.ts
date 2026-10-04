import type { BrandFile } from "./types";
export interface ValidationResult {
    valid: boolean;
    errors: string;
}
export declare function checkBrand(data: unknown): ValidationResult;
export declare function validateBrand(data: unknown): BrandFile;
