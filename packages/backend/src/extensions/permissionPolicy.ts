import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';
import {
  AuthorizeResult,
  PolicyDecision,
  isResourcePermission,
} from '@backstage/plugin-permission-common';
import { PermissionPolicy, PolicyQuery } from '@backstage/plugin-permission-node';
import {
  catalogConditions,
  createCatalogConditionalDecision,
} from '@backstage/plugin-catalog-backend/alpha';

export class ConsultoraPermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: BackstageIdentityResponse,
  ): Promise<PolicyDecision> {
    if (!user) return { result: AuthorizeResult.DENY };

    const ownershipRefs = user.identity.ownershipEntityRefs ?? [];
    const isPlatformTeam = ownershipRefs.includes('group:default/platform-team');

    if (isPlatformTeam) return { result: AuthorizeResult.ALLOW };

    if (isResourcePermission(request.permission, 'catalog-entity')) {
      return createCatalogConditionalDecision(
        request.permission,
        catalogConditions.isEntityOwner({ claims: ownershipRefs }),
      );
    }

    if (request.permission.name === 'scaffolder.task.create') {
      return { result: AuthorizeResult.ALLOW };
    }

    if (
      request.permission.name === 'scaffolder.task.read' ||
      request.permission.name === 'scaffolder.task.cancel'
    ) {
      return { result: AuthorizeResult.ALLOW };
    }

    return { result: AuthorizeResult.DENY };
  }
}
