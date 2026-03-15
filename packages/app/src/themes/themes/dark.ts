/**
 * Dark Theme — "Enterprise Midnight"
 * Deep slate navy inspired by Linear / Vercel. Indigo primary accent.
 */

import { createUnifiedTheme, palettes } from '@backstage/theme';
import { tn, inter } from '../tokens/primitives';
import { sharedButtonOverrides, sharedTabOverrides, sharedTabsOverrides } from '../shared/button-overrides';
import { makeSharedOverrides, scrollbarSize, RADIUS_LG } from '../shared/layout-overrides';
import { darkPageTheme, mapPageThemes } from '../shared/page-themes';

const t = {
  appBg:           tn.bgBase,
  surface:         tn.surface,
  elevated:        tn.elevated,
  overlay:         tn.overlay,
  navBg:           tn.navBg,
  border:          tn.border,
  borderSubtle:    tn.borderSubtle,
  fg:              tn.fg,
  fgSecondary:     tn.fgSecondary,
  fgMuted:         tn.fgMuted,
  fgDisabled:      tn.fgDisabled,
  placeholder:     tn.placeholder,
  primary:         tn.blue,
  primaryHover:    tn.blueHover,
  primaryDisabled: tn.blueDisabled,
  secondary:       tn.teal,
  secondaryHover:  tn.tealHover,
  errorBg:         tn.errorBg,    errorText:    tn.errorText,    errorIcon:    tn.red,
  warnBg:          tn.warnBg,     warnText:     tn.warnText,     warnIcon:     tn.yellow,
  infoBg:          tn.infoBg,     infoText:     tn.infoText,     infoIcon:     tn.cyan,
  successBg:       tn.successBg,  successText:  tn.successText,  successIcon:  tn.green,
  focusRing:       tn.blueDisabled,
  link:            tn.blue,
  linkHover:       tn.cyanHover,
};

export const darkTheme = createUnifiedTheme({
  palette: {
    ...palettes.dark,
    mode: 'dark',
    primary:   { main: tn.blue,   light: tn.blueHover,  dark: tn.blueDark,  contrastText: tn.bgBase },
    secondary: { main: tn.teal,   light: tn.tealHover,  dark: tn.tealDark,  contrastText: tn.bgBase },
    error:     { main: tn.red,    light: tn.redHover,   dark: '#b91c1c',    contrastText: tn.bgBase },
    warning:   { main: tn.yellow, light: tn.yellowHover,dark: '#b45309',    contrastText: tn.bgBase },
    success:   { main: tn.green,  light: tn.greenHover, dark: '#15803d',    contrastText: tn.bgBase },
    info:      { main: tn.cyan,   light: tn.cyanHover,  dark: tn.cyanDark,  contrastText: tn.bgBase },
    background: { default: tn.bgBase, paper: tn.surface },
    status: { ok: tn.green, warning: tn.yellow, error: tn.red, running: tn.blue, pending: tn.orange, aborted: tn.fgDisabled },
    border:            tn.border,
    textContrast:      tn.fg,
    textVerySubtle:    tn.borderSubtle,
    textSubtle:        tn.fgMuted,
    highlight:         tn.overlay,
    errorBackground:   tn.errorBg,
    warningBackground: tn.warnBg,
    infoBackground:    tn.infoBg,
    errorText:         tn.errorText,
    infoText:          tn.infoText,
    warningText:       tn.warnText,
    link:              tn.blue,
    linkHover:         tn.cyanHover,
    gold:              tn.yellow,
    navigation: {
      background: tn.navBg, indicator: tn.blue, color: tn.fgMuted, selectedColor: tn.fg,
      navItem: { hoverBackground: tn.overlay },
      submenu:    { background: tn.elevated },
    },
    tabbar:           { indicator: tn.blue },
    pinSidebarButton: { icon: tn.fgMuted, background: tn.border },
    banner: { info: tn.blue, error: tn.red, text: tn.fg, link: tn.cyan, warning: tn.yellow, closeButtonColor: tn.fgSecondary },
  },

  defaultPageTheme: 'home',
  pageTheme: mapPageThemes(darkPageTheme),
  fontFamily: inter,

  components: {
    ...makeSharedOverrides(t),

    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          backgroundColor: `${tn.bgBase} !important`,
          backgroundImage: 'none !important',
          colorScheme: 'dark',
          scrollbarColor: `${tn.border} ${tn.bgBase}`,
        },
        '&::-webkit-scrollbar':             scrollbarSize,
        '&::-webkit-scrollbar-track':       { background: tn.bgBase },
        '&::-webkit-scrollbar-thumb':       { background: tn.border, borderRadius: '4px' },
        '&::-webkit-scrollbar-thumb:hover': { background: tn.fgMuted },
        '[class*="groupWrapper"], [class*="CatalogReactUserListPicker-root"]': {
          backgroundColor: 'transparent !important',
          border: 'none !important',
          boxShadow: 'none !important',
          borderRadius: '0 !important',
        },
      },
    },

    BackstagePage:    { styleOverrides: { root: { backgroundColor: tn.bgBase } } },
    BackstageContent: { styleOverrides: { root: { backgroundColor: tn.bgBase, '& > *': { color: tn.fg } } } },
    BackstageContentHeader: { styleOverrides: { container: { backgroundColor: tn.bgBase }, title: { color: tn.fg } } },

    BackstageHeader: {
      styleOverrides: {
        header:          { backgroundImage: darkPageTheme.home.backgroundImage },
        title:           { color: '#ffffff', fontWeight: 700, letterSpacing: '-0.01em' },
        subtitle:        { color: 'rgba(255,255,255,0.80)' },
        breadcrumb:      { color: 'rgba(255,255,255,0.65)' },
        breadcrumbTitle: { color: '#ffffff' },
      },
    },

    BackstageItemCardHeader: { styleOverrides: { root: { backgroundImage: 'none', backgroundColor: tn.elevated } } },

    BackstageEmptyState: {
      styleOverrides: { root: { color: tn.fgSecondary, '& img': { filter: 'brightness(0.12) contrast(0.8)', borderRadius: RADIUS_LG } } },
    },

    BackstageMarkdownContent: {
      styleOverrides: { markdown: { color: tn.fg, '& a': { color: tn.blue }, '& code': { backgroundColor: tn.elevated } } },
    },

    MuiAppBar: { styleOverrides: { root: { backgroundImage: 'none', backgroundColor: tn.navBg } } },

    MuiCardHeader:  { styleOverrides: { root: { borderBottom: `1px solid ${tn.borderSubtle}` }, title: { color: tn.fg, fontWeight: 600 }, subheader: { color: tn.fgMuted } } },
    MuiCardContent: { styleOverrides: { root: { color: tn.fgSecondary } } },

    MuiFilledInput: {
      styleOverrides: {
        root: { backgroundColor: tn.elevated, '&:hover': { backgroundColor: tn.overlay }, '&.Mui-focused': { backgroundColor: tn.elevated } },
      },
    },

    MuiSelect: {
      styleOverrides: { root: { color: tn.fg }, icon: { color: tn.fgMuted }, select: { backgroundColor: tn.bgBase, '&:focus': { backgroundColor: tn.bgBase } } },
    },

    MuiTab:  { styleOverrides: sharedTabOverrides },
    MuiTabs: { styleOverrides: { ...sharedTabsOverrides, root: { backgroundColor: tn.surface, borderBottom: `1px solid ${tn.border}` } } },

    MuiButton: {
      styleOverrides: {
        ...sharedButtonOverrides,
        containedPrimary:   { backgroundColor: tn.blue,  color: tn.bgBase, '&:hover': { backgroundColor: tn.blueHover },   '&.Mui-disabled': { backgroundColor: tn.blueDisabled,   color: tn.fgDisabled } },
        containedSecondary: { backgroundColor: tn.teal,  color: tn.bgBase, '&:hover': { backgroundColor: tn.tealHover },   '&.Mui-disabled': { backgroundColor: tn.tealDisabled,   color: tn.fgDisabled } },
        outlinedPrimary:    { borderColor: tn.blue,   color: tn.blue,   '&:hover': { backgroundColor: 'rgba(129,140,248,0.10)', borderColor: tn.blueHover }, '&.Mui-disabled': { borderColor: tn.blueDisabled, color: tn.blueDisabled } },
        outlinedSecondary:  { borderColor: tn.teal,   color: tn.teal,   '&:hover': { backgroundColor: 'rgba(45,212,191,0.10)',  borderColor: tn.tealHover },  '&.Mui-disabled': { borderColor: tn.tealDisabled, color: tn.tealDisabled } },
        textPrimary:        { color: tn.blue,  '&:hover': { backgroundColor: 'rgba(129,140,248,0.10)' }, '&.Mui-disabled': { color: tn.blueDisabled } },
        textSecondary:      { color: tn.teal,  '&:hover': { backgroundColor: 'rgba(45,212,191,0.10)'  }, '&.Mui-disabled': { color: tn.tealDisabled } },
      },
    },

    MuiChip: {
      styleOverrides: {
        colorPrimary:   { backgroundColor: 'rgba(129,140,248,0.15)', color: tn.blue,   border: '1px solid rgba(129,140,248,0.30)', '&:hover': { backgroundColor: 'rgba(129,140,248,0.25)' } },
        colorSecondary: { backgroundColor: 'rgba(45,212,191,0.15)',  color: tn.teal,   border: '1px solid rgba(45,212,191,0.30)',  '&:hover': { backgroundColor: 'rgba(45,212,191,0.25)' } },
        colorError:     { backgroundColor: 'rgba(248,113,113,0.15)', color: tn.red,    border: '1px solid rgba(248,113,113,0.30)', '&:hover': { backgroundColor: 'rgba(248,113,113,0.25)' } },
        colorWarning:   { backgroundColor: 'rgba(251,191,36,0.15)',  color: tn.yellow, border: '1px solid rgba(251,191,36,0.30)',  '&:hover': { backgroundColor: 'rgba(251,191,36,0.25)' } },
        colorSuccess:   { backgroundColor: 'rgba(74,222,128,0.15)',  color: tn.green,  border: '1px solid rgba(74,222,128,0.30)',  '&:hover': { backgroundColor: 'rgba(74,222,128,0.25)' } },
        colorInfo:      { backgroundColor: 'rgba(34,211,238,0.15)',  color: tn.cyan,   border: '1px solid rgba(34,211,238,0.30)',  '&:hover': { backgroundColor: 'rgba(34,211,238,0.25)' } },
      },
    },

    MuiLinearProgress: { styleOverrides: { root: { backgroundColor: tn.border } } },
  },
});
