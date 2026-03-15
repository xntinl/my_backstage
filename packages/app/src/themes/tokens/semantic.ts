/**
 * Semantic token interfaces — shared type contracts between dark and light themes.
 *
 * These interfaces document the surface/text/accent structure that both
 * `tn` (dark) and `tnL` (light) token objects must satisfy.
 */

/** Surface hierarchy tokens (4–5 tiers from deepest to most elevated) */
export interface SurfaceTokens {
  /** Page/app background canvas */
  bg: string;
  /** Cards, panels, paper surfaces */
  paper: string;
  /** Elevated surfaces: popovers, menus */
  elevated: string;
  /** Hover state background */
  hover: string;
  /** Standard border color */
  border: string;
}

/** Text hierarchy tokens */
export interface TextTokens {
  /** Primary text — highest contrast */
  fg: string;
  /** Secondary / body text */
  fgSecondary: string;
  /** Tertiary: labels, captions, metadata */
  fgMuted: string;
}

/** Accent color set (shared IDs between dark and light) */
export interface AccentTokens {
  blue: string;
  cyan: string;
  teal: string;
  green: string;
  yellow: string;
  orange: string;
  red: string;
  purple: string;
}

/** Status feedback tokens */
export interface StatusTokens {
  errorBg: string;
  warnBg: string;
  infoBg: string;
  successBg: string;
  errorText: string;
  warnText: string;
  infoText: string;
  successText: string;
}
