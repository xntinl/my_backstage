/**
 * Light Theme — "Enterprise Clean"
 *
 * Key design decisions:
 *   1. DARK SIDEBAR (#1e293b slate-800) — like Linear, GitHub, Vercel
 *   2. Indigo primary accent (#4f46e5) — premium, modern SaaS
 *   3. White cards on slate-50 canvas — clean, readable
 *   4. Proper card elevation with subtle shadows
 */

import { createUnifiedTheme, palettes } from '@backstage/theme';
import { tnL, inter } from '../tokens/primitives';
import { sharedButtonOverrides, sharedTabOverrides, sharedTabsOverrides } from '../shared/button-overrides';
import { makeSharedOverrides, scrollbarSize, RADIUS_LG, type ThemeColors } from '../shared/layout-overrides';
import { lightPageTheme, mapPageThemes } from '../shared/page-themes';

const t: ThemeColors = {
  appBg:           tnL.bg,
  surface:         tnL.paper,
  elevated:        tnL.elevated,
  overlay:         tnL.hover,
  navBg:           tnL.sidebarBg,
  border:          tnL.border,
  borderSubtle:    tnL.border,
  fg:              tnL.fg,
  fgSecondary:     tnL.fgMid,
  fgMuted:         tnL.subtle,
  fgDisabled:      tnL.disabled,
  placeholder:     tnL.subtle,
  primary:         tnL.blue,
  primaryHover:    tnL.blueHover,
  primaryDisabled: tnL.disabled,
  secondary:       tnL.teal,
  secondaryHover:  '#0f766e',
  errorBg:         tnL.errorBg,    errorText:    tnL.errorText,    errorIcon:    tnL.red,
  warnBg:          tnL.warnBg,     warnText:     tnL.warnText,     warnIcon:     tnL.orange,
  infoBg:          tnL.infoBg,     infoText:     tnL.infoText,     infoIcon:     tnL.cyan,
  successBg:       tnL.successBg,  successText:  tnL.successText,  successIcon:  tnL.green,
  focusRing:       tnL.focusRing,
  link:            tnL.blue,
  linkHover:       tnL.cyan,
};

export const lightTheme = createUnifiedTheme({
  palette: {
    ...palettes.light,
    mode: 'light',

    primary:   { main: tnL.blue,   light: '#818cf8', dark: tnL.blueHover, contrastText: tnL.white },
    secondary: { main: tnL.teal,   light: '#2dd4bf', dark: '#0f766e',     contrastText: tnL.white },
    error:     { main: tnL.red,    light: '#f87171', dark: '#991b1b',      contrastText: tnL.white },
    warning:   { main: tnL.orange, light: '#fb923c', dark: '#9a3412',      contrastText: tnL.white },
    success:   { main: tnL.green,  light: '#4ade80', dark: '#166534',      contrastText: tnL.white },
    info:      { main: tnL.cyan,   light: '#22d3ee', dark: '#0e7490',      contrastText: tnL.white },

    background: { default: tnL.bg, paper: tnL.paper },

    status: { ok: tnL.green, warning: tnL.orange, error: tnL.red, running: tnL.blue, pending: tnL.yellow, aborted: tnL.disabled },

    border:            tnL.border,
    textContrast:      tnL.fg,
    textVerySubtle:    tnL.border,
    textSubtle:        tnL.subtle,
    highlight:         tnL.hover,
    errorBackground:   tnL.errorBg,
    warningBackground: tnL.warnBg,
    infoBackground:    tnL.infoBg,
    errorText:         tnL.errorText,
    infoText:          tnL.infoText,
    warningText:       tnL.warnText,
    link:              tnL.blue,
    linkHover:         tnL.cyan,
    gold:              tnL.yellow,

    navigation: {
      background:    tnL.sidebarBg,
      indicator:     tnL.blue,
      color:         tnL.sidebarMuted,
      selectedColor: tnL.sidebarFg,
      navItem:       { hoverBackground: tnL.sidebarHover },
      submenu:       { background: tnL.hover },
    },
    tabbar:           { indicator: tnL.blue },
    pinSidebarButton: { icon: tnL.sidebarMuted, background: tnL.sidebarBorder },
    banner: { info: tnL.blue, error: tnL.red, text: tnL.white, link: tnL.white, warning: tnL.orange, closeButtonColor: tnL.white },
  },

  defaultPageTheme: 'home',
  pageTheme: mapPageThemes(lightPageTheme),
  fontFamily: inter,

  components: {
    ...makeSharedOverrides(t),

    // ── Global baseline ───────────────────────────────────────────────────
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          backgroundColor: tnL.bg,
          backgroundImage: 'none',
          colorScheme: 'light',
          scrollbarColor: `${tnL.border} ${tnL.bg}`,
        },
        '&::-webkit-scrollbar':             scrollbarSize,
        '&::-webkit-scrollbar-track':       { background: tnL.bg },
        '&::-webkit-scrollbar-thumb':       { background: tnL.border, borderRadius: '4px' },
        '&::-webkit-scrollbar-thumb:hover': { background: tnL.borderStr },
        '[class*="groupWrapper"], [class*="CatalogReactUserListPicker-root"]': {
          backgroundColor: 'transparent !important',
          border: 'none !important',
          boxShadow: 'none !important',
          borderRadius: '0 !important',
        },
      },
    },

    // ── Backstage layout ─────────────────────────────────────────────────
    BackstagePage:    { styleOverrides: { root: { backgroundColor: tnL.bg } } },
    BackstageContent: { styleOverrides: { root: { backgroundColor: tnL.bg, '& > *': { color: tnL.fg } } } },
    BackstageContentHeader: { styleOverrides: { container: { backgroundColor: tnL.bg }, title: { color: tnL.fg, fontWeight: 700 } } },

    BackstageSidebar: {
      styleOverrides: {
        drawer: {
          backgroundColor: tnL.sidebarBg,
          borderRight: `1px solid ${tnL.sidebarBorder}`,
          boxShadow: 'none',
        },
      },
    },

    // ── Sidebar section dividers — very subtle ───────────────────────────
    BackstageSidebarDivider: {
      styleOverrides: { root: { borderColor: 'rgba(0,0,0,0.06)' } },
    },

    // ── Header (indigo gradient) ─────────────────────────────────────────
    BackstageHeader: {
      styleOverrides: {
        header:          { backgroundImage: lightPageTheme.home.backgroundImage, boxShadow: 'none' },
        title:           { color: tnL.white, fontWeight: 700, letterSpacing: '-0.01em' },
        subtitle:        { color: 'rgba(255,255,255,0.80)' },
        breadcrumb:      { color: 'rgba(255,255,255,0.65)' },
        breadcrumbTitle: { color: tnL.white },
      },
    },

    BackstageHeaderTabs: {
      styleOverrides: {
        tabsWrapper: { backgroundColor: tnL.paper },
        defaultTab:  { color: tnL.fgMid },
        selected:    { color: tnL.blue, backgroundColor: 'transparent' },
        tabRoot:     { '&:hover': { backgroundColor: tnL.hover, color: tnL.fg } },
      },
    },

    // ── Filter panels — flat, no nested boxes ────────────────────────────
    BackstageTableFilters: {
      styleOverrides: {
        root: {
          backgroundColor: tnL.bg,
          borderRight: `1px solid ${tnL.border}`,
          '& [class*="groupWrapper"]': {
            backgroundColor: 'transparent !important',
            border: 'none !important',
            boxShadow: 'none !important',
            borderRadius: '0 !important',
          },
        },
        filters: { backgroundColor: 'transparent' },
        heder:   { color: tnL.subtle },
        value:   { color: tnL.fgMid },
      },
    },
    BackstageTableFiltersContainer: {
      styleOverrides: {
        root:  { backgroundColor: 'transparent' },
        title: { color: tnL.subtle },
      },
    },

    BackstageItemCardHeader: { styleOverrides: { root: { backgroundImage: 'none', backgroundColor: tnL.hover } } },
    BackstageEmptyState:     { styleOverrides: { root: { color: tnL.fgMid, '& img': { borderRadius: RADIUS_LG } } } },
    BackstageMarkdownContent: {
      styleOverrides: {
        markdown: { color: tnL.fg, '& a': { color: tnL.blue }, '& code': { backgroundColor: tnL.hover, padding: '2px 4px', borderRadius: '3px' } },
      },
    },

    // ── AppBar ───────────────────────────────────────────────────────────
    MuiAppBar: {
      styleOverrides: { root: { backgroundColor: tnL.paper, backgroundImage: 'none', boxShadow: `0 1px 0 ${tnL.border}` } },
    },

    // ── Paper — flat + border system (coherent, no mixed shadow/border) ──
    // Rule: elevation0=page bg, elevation1/2=white+border (flat), elevated floating uses Paper elevation8+
    MuiPaper: {
      styleOverrides: {
        root:       { borderRadius: RADIUS_LG, backgroundColor: tnL.paper, backgroundImage: 'none' },
        elevation0: { backgroundColor: tnL.bg, boxShadow: 'none' },
        elevation1: { backgroundColor: tnL.paper, boxShadow: 'none', border: `1px solid ${tnL.border}` },
        elevation2: { backgroundColor: tnL.paper, boxShadow: 'none', border: `1px solid ${tnL.border}` },
      },
    },

    MuiDrawer: {
      styleOverrides: { paper: { backgroundColor: tnL.sidebarBg, backgroundImage: 'none', borderRight: `1px solid ${tnL.sidebarBorder}`, boxShadow: 'none' } },
    },

    // ── Card — border only, consistent with MuiPaper elevation1 ─────────
    MuiCard: {
      styleOverrides: {
        root: { backgroundColor: tnL.paper, border: `1px solid ${tnL.border}`, borderRadius: RADIUS_LG, boxShadow: 'none' },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root:      { backgroundColor: tnL.paper, borderBottom: `1px solid ${tnL.border}` },
        title:     { color: tnL.fg, fontWeight: 600 },
        subheader: { color: tnL.subtle },
      },
    },
    MuiCardContent: { styleOverrides: { root: { backgroundColor: tnL.paper, color: tnL.fgMid } } },

    MuiFilledInput: {
      styleOverrides: {
        root: { backgroundColor: tnL.hover, '&:hover': { backgroundColor: tnL.hoverAlt }, '&.Mui-focused': { backgroundColor: tnL.hover } },
      },
    },
    MuiSelect: {
      styleOverrides: { root: { color: tnL.fg }, icon: { color: tnL.subtle }, select: { '&:focus': { backgroundColor: 'transparent' } } },
    },

    // ── Menu (lighter shadow) ────────────────────────────────────────────
    MuiMenu: {
      styleOverrides: {
        paper: { backgroundColor: tnL.elevated, border: `1px solid ${tnL.border}`, boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)' },
        list:  { padding: '4px' },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: tnL.fgMid, borderRadius: '4px', margin: '1px 4px', padding: '6px 10px',
          '&:hover': { backgroundColor: tnL.hover, color: tnL.fg },
          '&.Mui-selected': { backgroundColor: tnL.hover, color: tnL.fg, '&:hover': { backgroundColor: tnL.hoverAlt } },
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          color: tnL.fgMid,
          '&.Mui-selected':       { backgroundColor: tnL.hover, color: tnL.fg },
          '&.Mui-selected:hover': { backgroundColor: tnL.hoverAlt },
          '&:hover':              { backgroundColor: tnL.hover },
        },
        button: { '&:hover': { backgroundColor: tnL.hover } },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: { color: tnL.subtle, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' as const, backgroundColor: 'transparent', paddingTop: '12px', paddingBottom: '4px', lineHeight: '1.4' },
      },
    },

    // ── TableRow (subtle zebra) ──────────────────────────────────────────
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': { backgroundColor: 'rgba(241,245,249,0.6)' },
          '&:hover':             { backgroundColor: tnL.hover },
          '&.Mui-selected':      { backgroundColor: `${tnL.hover} !important` },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { backgroundColor: tnL.bg, color: tnL.subtle, fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, borderBottom: `2px solid ${tnL.border}`, padding: '10px 16px' },
        root: { color: tnL.fgMid, borderBottom: `1px solid ${tnL.hover}`, padding: '12px 16px' },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          ...sharedTabOverrides.root,
          color: tnL.fgMid,
          '&.Mui-selected': { color: tnL.blue, backgroundColor: 'transparent' },
        },
      },
    },
    MuiTabs: { styleOverrides: { ...sharedTabsOverrides, root: { backgroundColor: tnL.paper, borderBottom: `1px solid ${tnL.border}` } } },

    MuiButton: {
      styleOverrides: {
        ...sharedButtonOverrides,
        containedPrimary:   { backgroundColor: tnL.blue,  color: tnL.white, '&:hover': { backgroundColor: tnL.blueHover } },
        containedSecondary: { backgroundColor: tnL.teal,  color: tnL.white, '&:hover': { backgroundColor: '#0f766e' } },
        outlinedPrimary:    { borderColor: tnL.blue, color: tnL.blue, '&:hover': { backgroundColor: 'rgba(79,70,229,0.06)', borderColor: tnL.blueHover } },
        textPrimary:        { color: tnL.blue, '&:hover': { backgroundColor: 'rgba(79,70,229,0.06)' } },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: '4px', fontWeight: 500, fontSize: '0.75rem', backgroundColor: tnL.hover, color: tnL.fgMid, border: `1px solid ${tnL.border}`, '&:hover': { backgroundColor: tnL.hoverAlt } },
        label:      { color: tnL.fgMid },
        deleteIcon: { color: tnL.subtle, '&:hover': { color: tnL.red } },
      },
    },

    // ── Tooltip (inverted: dark on light) ────────────────────────────────
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: tnL.fg, color: tnL.white, fontSize: '0.75rem', border: 'none' },
        arrow:   { color: tnL.fg },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        track: { backgroundColor: tnL.border },
        thumb: { backgroundColor: tnL.subtle },
        switchBase: { '&.Mui-checked': { '& + .MuiSwitch-track': { backgroundColor: tnL.blue }, '& .MuiSwitch-thumb': { backgroundColor: tnL.white } } },
      },
    },

    MuiStepIcon: {
      styleOverrides: { root: { color: tnL.border }, active: { color: tnL.blue }, completed: { color: tnL.teal }, text: { fill: tnL.white } },
    },

    MuiLinearProgress: {
      styleOverrides: { root: { backgroundColor: tnL.hover, borderRadius: '2px' }, bar: { borderRadius: '2px' } },
    },
  },
});
