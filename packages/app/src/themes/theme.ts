/**
 * theme.ts — backward-compatible re-export.
 *
 * All theme logic has been modularized into:
 *   tokens/primitives.ts   — color token objects (tn, tnL)
 *   tokens/semantic.ts     — TypeScript interfaces
 *   shared/button-overrides.ts  — shared button/tab overrides
 *   shared/layout-overrides.ts  — shared layout constants
 *   shared/page-themes.ts      — page theme generators
 *   themes/dark.ts         — darkTheme (Tokyo Night Storm)
 *   themes/light.ts        — lightTheme (Tokyo Night Moon)
 */

export { darkTheme } from './themes/dark';
export { lightTheme } from './themes/light';
