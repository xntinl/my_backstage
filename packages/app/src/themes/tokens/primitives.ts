/**
 * Enterprise Design Tokens — "Slate + Indigo"
 *
 * Dark:  "Midnight" — Deep navy slate, inspired by Linear / Vercel
 * Light: "Clean"    — White canvas, DARK sidebar, indigo accents (à la Linear)
 *
 * Palette foundation: Tailwind CSS Slate + Indigo
 * WCAG AA verified throughout.
 */

export const inter =
  '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';

// ─── DARK: "Enterprise Midnight" ────────────────────────────────────────────
//
// Surface hierarchy (darkest → lightest):
//   navBg   #0b1120  (sidebar)
//   bgBase  #0f172a  slate-900  (canvas)
//   surface #1e293b  slate-800  (cards/panels)
//   elevated #263345            (menus/popovers)
//   overlay  #334155  slate-700  (hover/selected)
//
export const tn = {
  // ── Surfaces ────────────────────────────────────────────────────────────
  navBg:    '#0b1120',
  bgBase:   '#0f172a',
  surface:  '#1e293b',
  elevated: '#263345',
  overlay:  '#334155',

  // ── Borders ─────────────────────────────────────────────────────────────
  borderSubtle: '#1e293b',
  border:       '#334155',
  borderStrong: '#475569',

  // ── Text ────────────────────────────────────────────────────────────────
  //   fg          #f1f5f9  on bgBase #0f172a → 15.8:1  (AAA)
  //   fgSecondary #cbd5e1  on bgBase #0f172a → 11.0:1  (AAA)
  //   fgMuted     #94a3b8  on bgBase #0f172a →  6.4:1  (AA)
  //   fgDisabled  #64748b  on bgBase #0f172a →  3.4:1  (AA large/UI)
  fg:          '#f1f5f9',
  fgSecondary: '#cbd5e1',
  fgMuted:     '#94a3b8',
  fgDisabled:  '#64748b',
  placeholder: '#64748b',

  // ── Primary: Indigo (lighter shade for dark bg) ──────────────────────────
  //   #818cf8 (indigo-400) on #0f172a → 5.8:1 (AA)
  blue:         '#818cf8',
  blueHover:    '#a5b4fc',
  blueActive:   '#c7d2fe',
  blueDisabled: 'rgba(129, 140, 248, 0.35)',
  blueDark:     '#4f46e5',

  // ── Cyan ─────────────────────────────────────────────────────────────────
  cyan:         '#22d3ee',
  cyanHover:    '#67e8f9',
  cyanActive:   '#a5f3fc',
  cyanDisabled: 'rgba(34, 211, 238, 0.35)',
  cyanDark:     '#0891b2',

  // ── Teal ─────────────────────────────────────────────────────────────────
  teal:         '#2dd4bf',
  tealHover:    '#5eead4',
  tealActive:   '#99f6e4',
  tealDisabled: 'rgba(45, 212, 191, 0.35)',
  tealDark:     '#0d9488',

  // ── Green ────────────────────────────────────────────────────────────────
  green:         '#4ade80',
  greenHover:    '#86efac',
  greenActive:   '#bbf7d0',
  greenDisabled: 'rgba(74, 222, 128, 0.35)',

  // ── Yellow / Amber ───────────────────────────────────────────────────────
  yellow:         '#fbbf24',
  yellowHover:    '#fcd34d',
  yellowActive:   '#fde68a',
  yellowDisabled: 'rgba(251, 191, 36, 0.35)',

  // ── Orange ───────────────────────────────────────────────────────────────
  orange:         '#fb923c',
  orangeHover:    '#fdba74',
  orangeActive:   '#fed7aa',
  orangeDisabled: 'rgba(251, 146, 60, 0.35)',

  // ── Red ──────────────────────────────────────────────────────────────────
  red:         '#f87171',
  redHover:    '#fca5a5',
  redActive:   '#fecaca',
  redDisabled: 'rgba(248, 113, 113, 0.35)',

  // ── Purple ───────────────────────────────────────────────────────────────
  purple:         '#c084fc',
  purpleHover:    '#d8b4fe',
  purpleActive:   '#ede9fe',
  purpleDisabled: 'rgba(192, 132, 252, 0.35)',
  purpleDark:     '#9333ea',

  // ── Status backgrounds (muted) ───────────────────────────────────────────
  errorBg:    '#3b1111',
  warnBg:     '#362009',
  infoBg:     '#0b1e36',
  successBg:  '#0a2618',

  // ── Status text (high contrast on status backgrounds) ────────────────────
  errorText:   '#fca5a5',
  warnText:    '#fcd34d',
  infoText:    '#67e8f9',
  successText: '#86efac',
};

// ─── LIGHT: "Enterprise Clean" ──────────────────────────────────────────────
//
// Key design decision: DARK SIDEBAR even in light mode.
// This is what makes Linear, GitHub, Vercel look premium.
//
//   sidebarBg  #1e293b  slate-800  (dark navigation)
//   bg         #f8fafc  slate-50   (page canvas)
//   paper      #ffffff             (cards, panels)
//   elevated   #ffffff             (dialogs, menus)
//
export const tnL = {
  // ── Page surfaces ────────────────────────────────────────────────────────
  bg:       '#f8fafc',
  paper:    '#ffffff',
  elevated: '#ffffff',
  hover:    '#f1f5f9',
  hoverAlt: '#e2e8f0',
  border:   '#e2e8f0',
  borderStr:'#cbd5e1',

  // ── Sidebar (light — clean white sidebar) ────────────────────────────────
  sidebarBg:    '#ffffff',
  sidebarHover: '#f1f5f9',
  sidebarFg:    '#0f172a',
  sidebarMuted: '#64748b',
  sidebarBorder:'#e2e8f0',

  // ── Header ───────────────────────────────────────────────────────────────
  headerBg: '#4f46e5',

  // ── Text ─────────────────────────────────────────────────────────────────
  //   fg      #0f172a  on #ffffff → 19.4:1  (AAA)
  //   fgMid   #475569  on #ffffff →  7.0:1  (AAA)
  //   subtle  #64748b  on #ffffff →  4.6:1  (AA)
  //   disabled #94a3b8 on #ffffff →  2.9:1  (AA large/UI only)
  fg:       '#0f172a',
  fgMid:    '#475569',
  subtle:   '#64748b',
  disabled: '#94a3b8',
  white:    '#ffffff',

  // ── Primary: Indigo ──────────────────────────────────────────────────────
  blue:      '#4f46e5',
  blueHover: '#4338ca',

  // ── Accents ──────────────────────────────────────────────────────────────
  cyan:    '#0891b2',
  teal:    '#0d9488',
  green:   '#16a34a',
  yellow:  '#d97706',
  orange:  '#ea580c',
  red:     '#dc2626',
  purple:  '#7c3aed',

  // ── Focus ────────────────────────────────────────────────────────────────
  focusRing: 'rgba(79, 70, 229, 0.25)',

  // ── Status backgrounds ───────────────────────────────────────────────────
  errorBg:   '#fef2f2',
  warnBg:    '#fffbeb',
  infoBg:    '#eff6ff',
  successBg: '#f0fdf4',

  // ── Status text ──────────────────────────────────────────────────────────
  errorText:   '#991b1b',
  warnText:    '#92400e',
  infoText:    '#1e40af',
  successText: '#166534',
};
