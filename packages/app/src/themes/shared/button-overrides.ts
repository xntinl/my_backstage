/**
 * Shared button and tab overrides — identical between dark and light themes.
 */

export const sharedButtonOverrides = {
  root: {
    textTransform: 'none' as const,
    fontWeight: 500,
    borderRadius: '6px',
    boxShadow: 'none',
    '&:hover': { boxShadow: 'none' },
  },
  contained: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
};

export const sharedTabOverrides = {
  root: { textTransform: 'none' as const, fontWeight: 500, minWidth: 0 },
};

export const sharedTabsOverrides = {
  indicator: { height: '2px', borderRadius: '2px 2px 0 0' },
};
