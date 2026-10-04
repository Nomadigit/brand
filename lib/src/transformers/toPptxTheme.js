"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPptxTheme = toPptxTheme;
const shared_1 = require("./shared");
/** Office theme slots for python-pptx / PptxGenJS / a hand-made .thmx. */
function toPptxTheme(brand) {
    const l = (0, shared_1.resolveColors)(brand, "light");
    const scale = brand.colors.scale?.primary ?? {};
    const pick = (...values) => (0, shared_1.hexNoHash)(values.find((v) => !!v) ?? l.primary);
    const t = brand.typography;
    return {
        name: brand.meta.name,
        colors: {
            dk1: pick(l.text),
            lt1: pick(l.surface, "#FFFFFF"),
            dk2: pick(l.primary),
            lt2: pick(l.background),
            accent1: pick(l.primary),
            accent2: pick(l.accent),
            accent3: pick(scale["400"], l.secondary),
            accent4: pick(scale["200"]),
            accent5: pick(l.success),
            accent6: pick(l.warning),
            hlink: pick(l.link, l.primary),
            folHlink: pick(scale["700"], l.primary),
        },
        fonts: {
            major: (t.displayFont ?? t.webFont).family,
            minor: t.webFont.family,
            ...(t.monoFont ? { mono: t.monoFont.family } : {}),
        },
    };
}
