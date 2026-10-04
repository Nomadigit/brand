"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTailwindConfig = toTailwindConfig;
const shared_1 = require("./shared");
function toTailwindConfig(brand, options = {}) {
    const colorOf = (key, value) => (options.useCssVariables ? `var(--color-${key})` : value);
    const colors = {};
    for (const [key, value] of Object.entries((0, shared_1.resolveColors)(brand, "light")))
        colors[key] = colorOf(key, value);
    for (const [name, steps] of Object.entries((0, shared_1.colorScale)(brand))) {
        for (const [step, value] of Object.entries(steps))
            colors[`${name}-${step}`] = colorOf(`${name}-${step}`, value);
    }
    const t = brand.typography;
    const stack = (f) => [f.family, ...(f.fallback ?? [])];
    const fontFamily = { web: stack(t.webFont) };
    if (t.displayFont)
        fontFamily.display = stack(t.displayFont);
    if (t.monoFont)
        fontFamily.mono = stack(t.monoFont);
    const extend = { colors, fontFamily };
    const strings = (obj) => Object.fromEntries(Object.entries(obj ?? {}).map(([k, v]) => [(0, shared_1.kebab)(k), String(v)]));
    if (Object.keys(t.sizes).length > 0)
        extend.fontSize = { ...t.sizes };
    if (Object.keys(t.weights).length > 0)
        extend.fontWeight = strings(t.weights);
    if (t.lineHeight && Object.keys(t.lineHeight).length > 0)
        extend.lineHeight = strings(t.lineHeight);
    if (t.letterSpacing && Object.keys(t.letterSpacing).length > 0)
        extend.letterSpacing = strings(t.letterSpacing);
    const s = brand.spacing;
    if (s.borderRadius !== undefined || s.radius) {
        extend.borderRadius = {
            ...(s.borderRadius !== undefined ? { DEFAULT: `${s.borderRadius}px` } : {}),
            ...strings(s.radius),
        };
    }
    if (s.scale)
        extend.spacing = strings(s.scale);
    if (brand.motion?.durations)
        extend.transitionDuration = strings(brand.motion.durations);
    if (brand.motion?.easing)
        extend.transitionTimingFunction = strings(brand.motion.easing);
    const config = { theme: { extend } };
    if (options.useCssVariables)
        config.darkMode = ["selector", '[data-theme="dark"]'];
    return config;
}
