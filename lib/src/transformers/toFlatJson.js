"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFlatJson = toFlatJson;
const shared_1 = require("./shared");
/**
 * Dot-separated keys with primitive values, for languages without a CSS pipeline
 * (Go templates, Kotlin/Compose, Python scripts): "color.light.primary" -> "#04556D".
 */
function toFlatJson(brand) {
    const out = {};
    const put = (key, value) => {
        if (typeof value === "string" || typeof value === "number")
            out[key] = value;
    };
    put("meta.name", brand.meta.name);
    put("meta.version", brand.meta.version);
    put("identity.displayName", brand.identity.displayName);
    put("identity.tagline", brand.identity.tagline);
    put("brand.signature", brand.brandArchitecture?.signature);
    for (const [k, v] of Object.entries((0, shared_1.resolveColors)(brand, "light")))
        put(`color.light.${k}`, v);
    if ((0, shared_1.hasDarkMode)(brand))
        for (const [k, v] of Object.entries((0, shared_1.resolveColors)(brand, "dark")))
            put(`color.dark.${k}`, v);
    for (const [name, steps] of Object.entries((0, shared_1.colorScale)(brand))) {
        for (const [step, v] of Object.entries(steps))
            put(`color.scale.${name}.${step}`, v);
    }
    const t = brand.typography;
    const fonts = { web: t.webFont, print: t.printFont, display: t.displayFont, mono: t.monoFont };
    for (const [role, font] of Object.entries(fonts)) {
        if (!font)
            continue;
        put(`font.${role}.family`, font.family);
        put(`font.${role}.stack`, (0, shared_1.fontFamilyValue)(font));
    }
    for (const [k, v] of Object.entries(t.sizes))
        put(`font.size.${k}`, v);
    for (const [k, v] of Object.entries(t.weights))
        put(`font.weight.${k}`, v);
    for (const [k, v] of Object.entries(t.lineHeight ?? {}))
        put(`font.lineHeight.${k}`, v);
    put("spacing.unit", brand.spacing.unit);
    put("radius.default", brand.spacing.borderRadius);
    for (const [k, v] of Object.entries(brand.spacing.scale ?? {}))
        put(`spacing.${k}`, v);
    for (const [k, v] of Object.entries(brand.spacing.radius ?? {}))
        put(`radius.${(0, shared_1.kebab)(k)}`, v);
    for (const [k, v] of Object.entries(brand.motion?.durations ?? {}))
        put(`motion.duration.${k}`, v);
    for (const [k, v] of Object.entries(brand.motion?.easing ?? {}))
        put(`motion.easing.${k}`, v);
    return out;
}
