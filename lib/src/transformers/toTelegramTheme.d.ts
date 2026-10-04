import type { BrandFile } from "../types";
export interface TelegramColors {
    header_color: string;
    bg_color: string;
    bottom_bar_color: string;
    secondary_bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
    accent_text_color: string;
    destructive_text_color: string;
}
export interface TelegramTheme {
    light: TelegramColors;
    dark: TelegramColors;
}
/**
 * Telegram Mini App colors in Telegram's own themeParams vocabulary.
 * Feed header/bg/bottom_bar to WebApp.setHeaderColor / setBackgroundColor / setBottomBarColor.
 */
export declare function toTelegramTheme(brand: BrandFile): TelegramTheme;
