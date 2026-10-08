// Generated from tokens/brand.json by @nomadigit/brand. Do not edit; edit the tokens and run `npm run build`.
// Use with dist/tokens.css on the page: colors are CSS variables, so dark mode follows [data-theme] / OS.
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "primary": "var(--color-primary)",
        "text": "var(--color-text)",
        "background": "var(--color-background)",
        "accent": "var(--color-accent)",
        "border": "var(--color-border)",
        "surface": "var(--color-surface)",
        "surface-muted": "var(--color-surface-muted)",
        "muted": "var(--color-muted)",
        "on-primary": "var(--color-on-primary)",
        "on-accent": "var(--color-on-accent)",
        "link": "var(--color-link)",
        "focus": "var(--color-focus)",
        "success": "var(--color-success)",
        "warning": "var(--color-warning)",
        "error": "var(--color-error)",
        "info": "var(--color-info)",
        "primary-50": "var(--color-primary-50)",
        "primary-100": "var(--color-primary-100)",
        "primary-200": "var(--color-primary-200)",
        "primary-300": "var(--color-primary-300)",
        "primary-400": "var(--color-primary-400)",
        "primary-500": "var(--color-primary-500)",
        "primary-600": "var(--color-primary-600)",
        "primary-700": "var(--color-primary-700)",
        "primary-800": "var(--color-primary-800)",
        "primary-900": "var(--color-primary-900)"
      },
      "fontFamily": {
        "web": [
          "Onest",
          "system-ui",
          "sans-serif"
        ],
        "display": [
          "Onest",
          "system-ui",
          "sans-serif"
        ],
        "mono": [
          "Geist Mono",
          "ui-monospace",
          "monospace"
        ]
      },
      "fontSize": {
        "xs": "12px",
        "sm": "14px",
        "body": "16px",
        "lg": "18px",
        "h3": "20px",
        "h2": "28px",
        "h1": "36px",
        "display": "48px"
      },
      "fontWeight": {
        "regular": "400",
        "medium": "500",
        "bold": "600",
        "display": "700"
      },
      "lineHeight": {
        "tight": "1.1",
        "heading": "1.2",
        "body": "1.55"
      },
      "letterSpacing": {
        "display": "-0.02em",
        "heading": "-0.01em",
        "body": "0",
        "label": "0.06em"
      },
      "borderRadius": {
        "DEFAULT": "10px",
        "sm": "6px",
        "md": "10px",
        "lg": "16px",
        "pill": "999px"
      },
      "spacing": {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px"
      },
      "transitionDuration": {
        "fast": "120ms",
        "base": "200ms",
        "slow": "320ms"
      },
      "transitionTimingFunction": {
        "standard": "cubic-bezier(0.2, 0, 0, 1)",
        "exit": "cubic-bezier(0.3, 0, 1, 1)"
      }
    }
  },
  "darkMode": [
    "selector",
    "[data-theme=\"dark\"]"
  ]
};
