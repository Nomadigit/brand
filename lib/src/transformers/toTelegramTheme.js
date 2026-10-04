"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTelegramTheme = toTelegramTheme;
const shared_1 = require("./shared");
function forMode(c) {
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
function toTelegramTheme(brand) {
    const light = forMode((0, shared_1.resolveColors)(brand, "light"));
    const dark = (0, shared_1.hasDarkMode)(brand) ? forMode((0, shared_1.resolveColors)(brand, "dark")) : light;
    return { light, dark };
}
