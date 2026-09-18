# Procedural glitch background

A zero-build, full-screen Canvas 2D background made from composable JavaScript effects.

Open `index.html` through a static web server. GitHub Pages serves it directly.

## URL parameters

Every parameter is optional. Missing parameters are generated from a random seed on each page load. When `seed` is provided, all other missing values are derived deterministically from it.

| Parameter | Range | Purpose |
| --- | ---: | --- |
| `seed` | unsigned integer | Controls the generated composition |
| `density` | `0.05–0.8` | Amount of pixel noise |
| `glitch` | `0–1` | Cluster activity and tearing |
| `speed` | `0.15–2` | Animation speed |
| `scale` | `2–8` | Internal pixel scale |
| `scanlines` | `2–8` | Distance between scanlines |
| `shift` | `4–48` | Maximum horizontal tear shift |
| `tearHeight` | `1–12` | Maximum tear-band height |

Example:

```text
?seed=1234&glitch=0.8&density=0.25&speed=0.5
```

The resolved configuration and a complete shareable query string are available in the browser console:

```js
window.proceduralBackground.config
window.proceduralBackground.query
```
