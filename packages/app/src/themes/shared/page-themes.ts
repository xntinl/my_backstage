/**
 * Page theme generators — Enterprise Indigo palette.
 */

import { genPageTheme, shapes } from '@backstage/theme';

export const darkPageTheme = {
  home:          genPageTheme({ colors: ['#6366f1', '#4f46e5'], shape: shapes.wave }),
  documentation: genPageTheme({ colors: ['#0891b2', '#0d9488'], shape: shapes.wave2 }),
  tool:          genPageTheme({ colors: ['#9333ea', '#7c3aed'], shape: shapes.round }),
  api:           genPageTheme({ colors: ['#9333ea', '#7c3aed'], shape: shapes.wave2 }),
  database:      genPageTheme({ colors: ['#0891b2', '#22d3ee'], shape: shapes.wave }),
  service:       genPageTheme({ colors: ['#6366f1', '#4f46e5'], shape: shapes.wave }),
};

export const lightPageTheme = {
  home:          genPageTheme({ colors: ['#4f46e5', '#3730a3'], shape: shapes.wave }),
  documentation: genPageTheme({ colors: ['#0d9488', '#0f766e'], shape: shapes.wave2 }),
  tool:          genPageTheme({ colors: ['#7c3aed', '#6d28d9'], shape: shapes.round }),
  api:           genPageTheme({ colors: ['#7c3aed', '#6d28d9'], shape: shapes.wave2 }),
  database:      genPageTheme({ colors: ['#0891b2', '#0e7490'], shape: shapes.wave }),
  service:       genPageTheme({ colors: ['#4f46e5', '#3730a3'], shape: shapes.wave }),
};

export function mapPageThemes(pt: typeof darkPageTheme) {
  return {
    home:          pt.home,
    documentation: pt.documentation,
    tool:          pt.tool,
    service:       pt.service,
    website:       pt.service,
    library:       pt.documentation,
    other:         pt.service,
    api:           pt.api,
    app:           pt.service,
    database:      pt.database,
    cloud:         pt.documentation,
  };
}
