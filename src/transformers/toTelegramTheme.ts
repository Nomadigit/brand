import type { BrandFile } from "../types";
import { hasDarkMode, resolveColors } from "./shared";

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

function forMode(c: Record<string, string>): TelegramColors {
  return {
    header_color: c.background,
    bg_color: c.background,
    bottom_bar_color: c.surface ?? c.background,
    secondary_bg_color: c["surface-muted"] ?? c.surface ?? c.background,
    text_color: c.text,
    hint_color: c.muted ?? c.text,
    link_color: c.link ?? c.primary,
    button_color: c.primary,
    button_text_color: c["on-primary"] ?? "#FFFFFF",
    accent_text_color: c.primary,
    destructive_text_color: c.error ?? c.primary,
  };
}

/**
 * Telegram Mini App colors in Telegram's own themeParams vocabulary.
 * Feed header/bg/bottom_bar to WebApp.setHeaderColor / setBackgroundColor / setBottomBarColor.
 */
export function toTelegramTheme(brand: BrandFile): TelegramTheme {
  const light = forMode(resolveColors(brand, "light"));
  const dark = hasDarkMode(brand) ? forMode(resolveColors(brand, "dark")) : light;
  return { light, dark };
}
