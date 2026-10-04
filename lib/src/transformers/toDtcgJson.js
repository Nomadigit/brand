"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDtcgJson = toDtcgJson;
const shared_1 = require("./shared");
/** W3C Design Tokens Community Group format, for Figma Tokens Studio, Style Dictionary and similar tools. */
function toDtcgJson(brand) {
    const colorGroup = (values) => Object.fromEntries(Object.entries(values).map(([k, v]) => [k, { $type: "color", $value: v }]));
    const color = { light: colorGroup((0, shared_1.resolveColors)(brand, "light")) };
    if ((0, shared_1.hasDarkMode)(brand))
        color.dark = colorGroup((0, shared_1.resolveColors)(brand, "dark"));
    for (const [name, steps] of Object.entries((0, shared_1.colorScale)(brand)))
        color[name] = colorGroup(steps);
    const t = brand.typography;
    const fontFamily = {};
    const fonts = { web: t.webFont, print: t.printFont, display: t.displayFont, mono: t.monoFont };
    for (const [role, font] of Object.entries(fonts)) {
        if (font)
            fontFamily[role] = { $type: "fontFamily", $value: [font.family, ...(font.fallback ?? [])] };
    }
    const dim = (obj) => Object.fromEntries(Object.entries(obj ?? {}).map(([k, v]) => [k, { $type: "dimension", $value: String(v) }]));
    const out = {
        color,
        fontFamily,
        fontSize: dim(t.sizes),
        fontWeight: Object.fromEntries(Object.entries(t.weights).map(([k, v]) => [k, { $type: "fontWeight", $value: v }])),
    };
    if (brand.spacing.scale)
        out.spacing = dim(brand.spacing.scale);
    if (brand.spacing.radius)
        out.radius = dim(brand.spacing.radius);
    if (brand.motion?.durations) {
        out.duration = Object.fromEntries(Object.entries(brand.motion.durations).map(([k, v]) => [k, { $type: "duration", $value: String(v) }]));
    }
    if (brand.motion?.easing) {
        out.easing = Object.fromEntries(Object.entries(brand.motion.easing).map(([k, v]) => [k, { $type: "cubicBezier", $value: String(v) }]));
    }
    return out;
}
