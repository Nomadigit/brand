export { validateBrand, checkBrand } from "./validate";
export type { ValidationResult } from "./validate";
export type { BrandFile, ColorValue, FontStack } from "./types";

export { resolveColors, kebab } from "./transformers/shared";
export type { ColorMode } from "./transformers/shared";

export { toWebCss, brandToCssVariables, darkModeCssVariables, cssVariablesToRootBlock } from "./transformers/toWebCss";
export type { CssVariables } from "./transformers/toWebCss";

export { toTailwindConfig } from "./transformers/toTailwindConfig";
export type { TailwindConfigFragment, TailwindThemeExtend, TailwindOptions } from "./transformers/toTailwindConfig";

export { toDocxStyles } from "./transformers/toDocxStyles";
export type { DocxStyles, DocxRunStyle } from "./transformers/toDocxStyles";

export { toPdfCss } from "./transformers/toPdfCss";

export { toEmailInline } from "./transformers/toEmailInline";
export type { EmailInlineOutput, EmailInlineStyles, EmailTableWrapper } from "./transformers/toEmailInline";

export { toFlatJson } from "./transformers/toFlatJson";
export type { FlatTokens } from "./transformers/toFlatJson";

export { toDtcgJson } from "./transformers/toDtcgJson";

export { toTelegramTheme } from "./transformers/toTelegramTheme";
export type { TelegramTheme, TelegramColors } from "./transformers/toTelegramTheme";

export { toMarpTheme } from "./transformers/toMarpTheme";

export { toPptxTheme } from "./transformers/toPptxTheme";
export type { PptxTheme } from "./transformers/toPptxTheme";
