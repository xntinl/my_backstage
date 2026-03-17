import { createBackendModule } from '@backstage/backend-plugin-api';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
import { ConsultoraPermissionPolicy } from './permissionPolicy';

/**
 * Módulo backend que registra la política de permisos de la consultora.
 * Reemplaza el allow-all-policy por defecto.
 */
export const consultoraPermissionModule = createBackendModule({
  pluginId: 'permission',
  moduleId: 'consultora-policy',
  register(reg) {
    reg.registerInit({
      deps: { policy: policyExtensionPoint },
      async init({ policy }) {
        policy.setPolicy(new ConsultoraPermissionPolicy());
      },
    });
  },
});
