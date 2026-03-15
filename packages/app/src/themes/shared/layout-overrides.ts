/**
 * Shared layout overrides — structure + color-aware component overrides
 * shared by both dark and light themes via makeSharedOverrides(t).
 *
 * Usage:
 *   import { makeSharedOverrides } from '../shared/layout-overrides';
 *   components: { ...makeSharedOverrides(t), ...themeSpecificOverrides }
 */

export const RADIUS_LG = '8px';
export const RADIUS_MD = '6px';
export const scrollbarSize = { width: '8px', height: '8px' };

export const sectionHeaderStyle = {
  fontSize: '0.7rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
};

export const sidebarItemOverrides = {
  iconContainer: { marginRight: 0 },
  label: { width: '145px' },
};

/** Normalized color interface — maps tn/tnL to generic semantic names */
export interface ThemeColors {
  appBg: string;
  surface: string;
  elevated: string;
  overlay: string;
  navBg: string;
  border: string;
  borderSubtle: string;
  fg: string;
  fgSecondary: string;
  fgMuted: string;
  fgDisabled: string;
  placeholder: string;
  primary: string;
  primaryHover: string;
  primaryDisabled: string;
  secondary: string;
  secondaryHover: string;
  errorBg: string;
  errorText: string;
  errorIcon: string;
  warnBg: string;
  warnText: string;
  warnIcon: string;
  infoBg: string;
  infoText: string;
  infoIcon: string;
  successBg: string;
  successText: string;
  successIcon: string;
  focusRing: string;
  link: string;
  linkHover: string;
}

/**
 * Returns all component overrides shared between dark and light themes.
 * Each theme calls this once, then spreads theme-specific overrides on top.
 */
export function makeSharedOverrides(t: ThemeColors) {
  const BORDER        = `1px solid ${t.border}`;
  const BORDER_SUBTLE = `1px solid ${t.borderSubtle}`;
  const BORDER_STRONG = `2px solid ${t.border}`;

  return {
    // ── Sidebar ──────────────────────────────────────────────────────────────
    BackstageSidebar: {
      styleOverrides: {
        drawer: { backgroundColor: t.navBg, borderRight: BORDER_SUBTLE },
      },
    },
    BackstageSidebarItem: {
      styleOverrides: {
        ...sidebarItemOverrides,
        root: { borderBottom: `1px solid ${t.border}` },
      },
    },

    // ── Tables ───────────────────────────────────────────────────────────────
    BackstageTable:        { styleOverrides: { root: { backgroundColor: t.surface } } },
    BackstageTableToolbar: {
      styleOverrides: {
        root:        { backgroundColor: t.surface, borderBottom: BORDER },
        title:       { color: t.fg, fontWeight: 600 },
        searchField: { backgroundColor: t.appBg, borderRadius: RADIUS_MD },
      },
    },
    BackstageTableFilters: {
      styleOverrides: {
        root: {
          backgroundColor: t.surface,
          borderRight: BORDER,
          '& [class*="groupWrapper"]': {
            backgroundColor: 'transparent !important',
            border: 'none !important',
            boxShadow: 'none !important',
            borderRadius: '0 !important',
          },
        },
        filters: { backgroundColor: t.surface },
        value:   { color: t.fgSecondary },
        heder:   { color: t.fgMuted, ...sectionHeaderStyle },
      },
    },
    BackstageTableFiltersContainer: {
      styleOverrides: {
        root:  { backgroundColor: t.surface },
        title: { color: t.fgMuted, ...sectionHeaderStyle },
      },
    },
    BackstageTableHeader: {
      styleOverrides: {
        header: { backgroundColor: t.appBg, color: t.fgMuted, borderBottom: BORDER_STRONG },
      },
    },

    // ── Cards ────────────────────────────────────────────────────────────────
    BackstageInfoCard: {
      styleOverrides: {
        header:          { backgroundColor: t.surface, borderBottom: BORDER_SUBTLE },
        headerTitle:     { color: t.fg, fontWeight: 600 },
        headerSubheader: { color: t.fgMuted },
      },
    },
    BackstageMetadataTableTitleCell: { styleOverrides: { root: { color: t.fgMuted } } },
    BackstageMetadataTableCell:      { styleOverrides: { root: { color: t.fgSecondary } } },
    BackstageBreadcrumbsStyledBox:   { styleOverrides: { root: { color: t.fgMuted } } },

    // ── Select / Dropdown ────────────────────────────────────────────────────
    BackstageSelect: {
      styleOverrides: {
        root:        { backgroundColor: t.appBg },
        formControl: { backgroundColor: t.appBg },
        label:       { color: t.fgMuted },
      },
    },
    BackstageClosedDropdown: { styleOverrides: { icon: { color: t.fgMuted } } },
    BackstageOpenedDropdown: { styleOverrides: { icon: { color: t.primary } } },

    // ── MUI Paper (base — MuiCard, MuiDialog, etc. inherit from here) ────────
    MuiPaper: {
      styleOverrides: {
        root:       { backgroundImage: 'none', backgroundColor: t.surface, borderRadius: RADIUS_LG },
        elevation0: { backgroundColor: t.appBg },
        elevation1: { backgroundColor: t.surface, boxShadow: `0 1px 3px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.06)` },
        elevation2: { backgroundColor: t.elevated, boxShadow: `0 4px 16px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)` },
      },
    },

    // ── Drawer / AppBar ──────────────────────────────────────────────────────
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: t.surface, backgroundImage: 'none', borderRight: BORDER_SUBTLE },
      },
    },

    // ── Dialog ───────────────────────────────────────────────────────────────
    MuiDialog:        { styleOverrides: { paper: { border: BORDER_SUBTLE } } },
    MuiDialogTitle:   { styleOverrides: { root: { color: t.fg } } },
    MuiDialogContent: { styleOverrides: { root: { color: t.fgSecondary } } },
    MuiDialogActions: { styleOverrides: { root: { borderTop: BORDER_SUBTLE } } },

    // ── Form / Inputs ────────────────────────────────────────────────────────
    MuiFormControl:    { styleOverrides: { root: { '& label': { color: t.fgMuted } } } },
    MuiFormLabel:      { styleOverrides: { root: { color: t.fgMuted, '&.Mui-focused': { color: t.primary } } } },
    MuiInputLabel:     { styleOverrides: { root: { color: t.fgMuted, '&.Mui-focused': { color: t.primary } } } },
    MuiFormHelperText: { styleOverrides: { root: { color: t.fgDisabled } } },
    MuiInputBase: {
      styleOverrides: {
        root:  { color: t.fg, backgroundColor: t.appBg, '&.Mui-disabled': { color: t.fgDisabled, opacity: 0.6 } },
        input: { '&::placeholder': { color: t.placeholder, opacity: 1 } },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: t.appBg,
          borderRadius: RADIUS_MD,
          '&:hover .MuiOutlinedInput-notchedOutline':         { borderColor: t.fgMuted },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline':   { borderColor: t.primary, borderWidth: '2px', boxShadow: `0 0 0 3px ${t.focusRing}` },
        },
        notchedOutline: { borderColor: t.border },
      },
    },

    // ── Menu / List ──────────────────────────────────────────────────────────
    MuiMenu: {
      styleOverrides: {
        paper: { backgroundColor: t.elevated, border: BORDER_SUBTLE },
        list:  { padding: '4px' },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: { backgroundColor: t.elevated, border: BORDER_SUBTLE, backgroundImage: 'none' },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: t.fgSecondary,
          borderRadius: '4px',
          margin: '1px 4px',
          padding: '6px 10px',
          '&:hover':                              { backgroundColor: t.overlay, color: t.fg },
          '&.Mui-selected':                       { backgroundColor: t.overlay, color: t.fg },
          '&.Mui-selected:hover':                 { backgroundColor: t.border },
        },
      },
    },
    MuiList:     { styleOverrides: { root: { backgroundColor: 'transparent' } } },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: t.fgSecondary,
          '&.Mui-selected':       { backgroundColor: t.overlay, color: t.fg },
          '&.Mui-selected:hover': { backgroundColor: t.overlay },
          '&:hover':              { backgroundColor: t.overlay },
        },
        button: { '&:hover': { backgroundColor: t.overlay } },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: { backgroundColor: t.appBg, color: t.fgMuted, ...sectionHeaderStyle, fontWeight: 600, paddingTop: '12px', paddingBottom: '4px', lineHeight: '1.4' },
      },
    },
    MuiListItemText: {
      styleOverrides: { primary: { color: t.fgSecondary }, secondary: { color: t.fgMuted } },
    },

    // ── Table ────────────────────────────────────────────────────────────────
    MuiTableContainer: { styleOverrides: { root: { backgroundColor: t.surface } } },
    MuiTableCell: {
      styleOverrides: {
        head: { backgroundColor: t.appBg, color: t.fgMuted, fontWeight: 600, ...sectionHeaderStyle, borderBottom: BORDER_STRONG, padding: '10px 16px' },
        root: { color: t.fgSecondary, borderBottom: BORDER_SUBTLE, padding: '12px 16px' },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': { backgroundColor: t.appBg },
          '&:nth-of-type(odd)':  { backgroundColor: t.surface },
          '&:hover':             { backgroundColor: `${t.overlay} !important` },
          '&.Mui-selected':      { backgroundColor: `${t.overlay} !important` },
        },
      },
    },

    // ── Tabs ─────────────────────────────────────────────────────────────────
    MuiTabs: {
      styleOverrides: { root: { backgroundColor: t.surface, borderBottom: BORDER } },
    },

    // ── Icon button ──────────────────────────────────────────────────────────
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: t.fgMuted,
          borderRadius: RADIUS_MD,
          '&:hover':        { backgroundColor: t.overlay, color: t.fg },
          '&.Mui-disabled': { color: t.fgDisabled },
        },
      },
    },

    // ── Chip ─────────────────────────────────────────────────────────────────
    MuiChip: {
      styleOverrides: {
        root: { backgroundColor: t.elevated, color: t.fgSecondary, border: BORDER_SUBTLE, borderRadius: '4px', fontWeight: 500, fontSize: '0.75rem', '&:hover': { backgroundColor: t.overlay } },
        label:      { color: 'inherit' },
        deleteIcon: { color: t.fgMuted },
        outlined:   { backgroundColor: 'transparent', border: BORDER, '&:hover': { backgroundColor: t.overlay } },
      },
    },

    // ── Divider ──────────────────────────────────────────────────────────────
    MuiDivider: { styleOverrides: { root: { borderColor: t.borderSubtle } } },

    // ── Tooltip ──────────────────────────────────────────────────────────────
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: t.elevated, color: t.fg, border: BORDER, fontSize: '0.75rem' },
        arrow:   { color: t.elevated },
      },
    },

    // ── Autocomplete ─────────────────────────────────────────────────────────
    MuiAutocomplete: {
      styleOverrides: {
        paper:  { backgroundColor: t.elevated, border: BORDER_SUBTLE },
        option: { color: t.fgSecondary, '&[aria-selected="true"]': { backgroundColor: t.overlay }, '&[data-focus="true"]': { backgroundColor: t.overlay }, '&:hover': { backgroundColor: t.overlay, color: t.fg } },
        noOptions:    { color: t.fgMuted, backgroundColor: t.elevated },
        endAdornment: { color: t.fgMuted },
      },
    },

    // ── Accordion ────────────────────────────────────────────────────────────
    MuiAccordion: {
      styleOverrides: {
        root: { backgroundColor: t.surface, backgroundImage: 'none', border: BORDER_SUBTLE, '&:before': { display: 'none' }, '&.Mui-expanded': { margin: 0 } },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root:              { color: t.fg, '&:hover': { backgroundColor: t.elevated } },
        expandIconWrapper: { color: t.fgMuted },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: { root: { backgroundColor: t.appBg, color: t.fgSecondary, borderTop: BORDER_SUBTLE } },
    },

    // ── Alert ────────────────────────────────────────────────────────────────
    MuiAlert: {
      styleOverrides: {
        standardError:   { backgroundColor: t.errorBg,   color: t.errorText,   '& .MuiAlert-icon': { color: t.errorIcon } },
        standardWarning: { backgroundColor: t.warnBg,    color: t.warnText,    '& .MuiAlert-icon': { color: t.warnIcon } },
        standardInfo:    { backgroundColor: t.infoBg,    color: t.infoText,    '& .MuiAlert-icon': { color: t.infoIcon } },
        standardSuccess: { backgroundColor: t.successBg, color: t.successText, '& .MuiAlert-icon': { color: t.successIcon } },
      },
    },

    // ── Structural-only (no color) ────────────────────────────────────────────
    MuiBadge:         { styleOverrides: { badge: { fontWeight: 600, fontSize: '0.65rem' } } },
    MuiLinearProgress: { styleOverrides: { root: { borderRadius: '2px' }, bar: { borderRadius: '2px' } } },

    // ── Link ─────────────────────────────────────────────────────────────────
    MuiLink: {
      styleOverrides: {
        root: { color: t.link, textDecorationColor: 'transparent', '&:hover': { color: t.linkHover, textDecorationColor: t.linkHover } },
      },
    },

    // ── Switch ───────────────────────────────────────────────────────────────
    MuiSwitch: {
      styleOverrides: {
        track:      { backgroundColor: t.border },
        thumb:      { backgroundColor: t.fgMuted },
        switchBase: { '&.Mui-checked': { '& + .MuiSwitch-track': { backgroundColor: t.primary }, '& .MuiSwitch-thumb': { backgroundColor: t.primaryHover } } },
      },
    },

    // ── Checkbox / Radio ─────────────────────────────────────────────────────
    MuiCheckbox: { styleOverrides: { root: { color: t.border, '&.Mui-checked': { color: t.primary } } } },
    MuiRadio:    { styleOverrides: { root: { color: t.border, '&.Mui-checked': { color: t.primary } } } },

    // ── Slider ───────────────────────────────────────────────────────────────
    MuiSlider: {
      styleOverrides: { rail: { backgroundColor: t.border }, track: { backgroundColor: t.primary, border: 'none' }, thumb: { backgroundColor: t.primary } },
    },

    // ── Skeleton ─────────────────────────────────────────────────────────────
    MuiSkeleton: { styleOverrides: { root: { backgroundColor: t.elevated } } },

    // ── Stepper ──────────────────────────────────────────────────────────────
    MuiStepLabel:     { styleOverrides: { label: { color: t.fgMuted }, active: { color: t.fg }, completed: { color: t.fgSecondary } } },
    MuiStepIcon:      { styleOverrides: { root: { color: t.border }, active: { color: t.primary }, completed: { color: t.secondary }, text: { fill: t.fg } } },
    MuiStepConnector: { styleOverrides: { line: { borderColor: t.border } } },
  } as const;
}
