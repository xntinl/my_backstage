import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fs from 'fs-extra';

export const writeToLocalAction = createTemplateAction({
  id: 'local:fs:write',
  schema: {
    input: {
      required: ['targetPath'],
      properties: {
        targetPath: { type: 'string', title: 'Ruta de destino' },
      },
    },
  },
  async handler(ctx) {
    await fs.ensureDir(ctx.input.targetPath);
    await fs.copy(ctx.workspacePath, ctx.input.targetPath);
    ctx.logger.info(`Archivos copiados a ${ctx.input.targetPath}`);
  },
});