"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebab = kebab;
exports.fontFamilyValue = fontFamilyValue;
exports.resolveColors = resolveColors;
exports.hasDarkMode = hasDarkMode;
exports.colorScale = colorScale;
exports.hexNoHash = hexNoHash;
/** "surfaceMuted" -> "surface-muted" */
function kebab(key) {
    return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function fontFamilyValue(font) {
    const stack = [font.family, ...(font.fallback ?? [])];
    return stack.map((name) => (name.includes(" ") ? `"${name}"` : name)).join(", ");
}
function stringEntries(obj) {
    if (!obj || typeof obj !== "object")
        return [];
    return Object.entries(obj).filter((entry) => typeof entry[1] === "string");
}
/**
 * Every color role resolved for one mode, keyed by kebab-case role name.
 * Dark mode starts from the light palette and overrides whatever darkMode defines,
 * so a partial darkMode block never leaves a role undefined.
 */
function resolveColors(brand, mode) {
    const c = brand.colors;
    const out = {
        primary: c.primary,
        text: c.text,
        background: c.background,
    };
    if (c.secondary)
        out.secondary = c.secondary;
    if (c.accent)
        out.accent = c.accent;
    if (c.border)
        out.border = c.border;
    for (const [k, v] of stringEntries(c.roles))
        out[kebab(k)] = v;
    for (const [k, v] of stringEntries(c.semantic))
        out[kebab(k)] = v;
    if (mode === "dark" && c.darkMode) {
        const d = c.darkMode;
        for (const key of ["primary", "secondary", "accent", "text", "background", "border"]) {
            const v = d[key];
            if (typeof v === "string")
                out[key] = v;
        }
        for (const [k, v] of stringEntries(d.roles))
            out[kebab(k)] = v;
        for (const [k, v] of stringEntries(d.semantic))
            out[kebab(k)] = v;
    }
    return out;
}
function hasDarkMode(brand) {
    return !!brand.colors.darkMode && Object.keys(brand.colors.darkMode).length > 0;
}
function colorScale(brand) {
    const out = {};
    for (const [name, steps] of Object.entries(brand.colors.scale ?? {})) {
        out[kebab(name)] = Object.fromEntries(stringEntries(steps));
    }
    return out;
}
function hexNoHash(color) {
    return color.startsWith("#") ? color.slice(1).toUpperCase() : color.toUpperCase();
}
