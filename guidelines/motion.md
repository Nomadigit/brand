# Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 120ms | Hover, press, toggles |
| `--duration-base` | 200ms | Menus, sheets, tabs |
| `--duration-slow` | 320ms | Page-level transitions |
| `--easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Entering, moving |
| `--easing-exit` | `cubic-bezier(0.3, 0, 1, 1)` | Leaving |

- Motion confirms an action or shows where something came from. Nothing loops for decoration.
- Under `prefers-reduced-motion: reduce`, remove movement and keep only short opacity fades.
- The logo never animates. The one exception is a loading state that draws the route line once.
