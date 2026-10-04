"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandToCssVariables = brandToCssVariables;
exports.darkModeCssVariables = darkModeCssVariables;
exports.cssVariablesToRootBlock = cssVariablesToRootBlock;
exports.toWebCss = toWebCss;
const shared_1 = require("./shared");
function brandToCssVariables(brand) {
    const t = brand.typography;
    const vars = {};
    for (const [key, value] of Object.entries((0, shared_1.resolveColors)(brand, "light"))) {
        vars[`--color-${key}`] = value;
    }
    for (const [name, steps] of Object.entries((0, shared_1.colorScale)(brand))) {
        for (const [step, value] of Object.entries(steps))
            vars[`--color-${name}-${step}`] = value;
    }
    vars["--font-web-family"] = (0, shared_1.fontFamilyValue)(t.webFont);
    vars["--font-display-family"] = (0, shared_1.fontFamilyValue)(t.displayFont ?? t.webFont);
    if (t.monoFont)
        vars["--font-mono-family"] = (0, shared_1.fontFamilyValue)(t.monoFont);
    vars["--font-weight-regular"] = String(t.weights.regular ?? 400);
    vars["--font-weight-medium"] = String(t.weights.medium ?? 500);
    vars["--font-weight-bold"] = String(t.weights.bold ?? 700);
    for (const [key, value] of Object.entries(t.weights)) {
        if (!["regular", "medium", "bold"].includes(key))
            vars[`--font-weight-${(0, shared_1.kebab)(key)}`] = String(value);
    }
    for (const [key, value] of Object.entries(t.sizes))
        vars[`--font-size-${key}`] = value;
    for (const [key, value] of Object.entries(t.lineHeight ?? {}))
        vars[`--line-height-${key}`] = String(value);
    for (const [key, value] of Object.entries(t.letterSpacing ?? {}))
        vars[`--letter-spacing-${key}`] = String(value);
    const s = brand.spacing;
    if (s.unit !== undefined)
        vars["--spacing-unit"] = `${s.unit}px`;
    if (s.borderRadius !== undefined)
        vars["--radius"] = `${s.borderRadius}px`;
    for (const [key, value] of Object.entries(s.scale ?? {}))
        vars[`--space-${key}`] = String(value);
    for (const [key, value] of Object.entries(s.radius ?? {}))
        vars[`--radius-${key}`] = String(value);
    for (const [key, value] of Object.entries(brand.motion?.durations ?? {}))
        vars[`--duration-${key}`] = String(value);
    for (const [key, value] of Object.entries(brand.motion?.easing ?? {}))
        vars[`--easing-${key}`] = String(value);
    return vars;
}
/** Only the color variables whose dark value differs from light. */
function darkModeCssVariables(brand) {
    if (!(0, shared_1.hasDarkMode)(brand))
        return {};
    const light = (0, shared_1.resolveColors)(brand, "light");
    const vars = {};
    for (const [key, value] of Object.entries((0, shared_1.resolveColors)(brand, "dark"))) {
        if (light[key] !== value)
            vars[`--color-${key}`] = value;
    }
    return vars;
}
function cssVariablesToRootBlock(vars, selector = ":root") {
    const lines = Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`);
    return `${selector} {\n${lines.join("\n")}\n}\n`;
}
function indent(block) {
    return block
        .trimEnd()
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");
}
/**
 * Light values on :root. Dark values follow the OS setting unless the page pins a theme
 * with <html data-theme="light|dark">, which wins in both directions.
 */
function toWebCss(brand) {
    const root = cssVariablesToRootBlock(brandToCssVariables(brand));
    const darkVars = darkModeCssVariables(brand);
    if (Object.keys(darkVars).length === 0)
        return root;
    const withScheme = { ...darkVars, "color-scheme": "dark" };
    const mediaBlock = cssVariablesToRootBlock(withScheme, ':root:not([data-theme="light"])');
    const forced = cssVariablesToRootBlock(withScheme, ':root[data-theme="dark"]');
    return `${root}\n@media (prefers-color-scheme: dark) {\n${indent(mediaBlock)}\n}\n\n${forced}`;
}
