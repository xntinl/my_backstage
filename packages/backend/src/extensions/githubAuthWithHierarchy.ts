import { createBackendModule, coreServices } from '@backstage/backend-plugin-api';
import {
  authProvidersExtensionPoint,
  createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';
import { githubAuthenticator } from '@backstage/plugin-auth-backend-module-github-provider';
import { stringifyEntityRef } from '@backstage/catalog-model';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';

const MAX_HIERARCHY_DEPTH = 10;

async function expandGroupHierarchy(
  catalog: any,
  token: string,
  initialGroupRefs: string[],
): Promise<string[]> {
  const all = new Set<string>(initialGroupRefs);
  const queue = initialGroupRefs.map(ref => ({ ref, depth: 0 }));

  while (queue.length > 0) {
    const { ref, depth } = queue.shift()!;
    if (depth >= MAX_HIERARCHY_DEPTH) continue;

    let entity: any;
    try {
      entity = await catalog.getEntityByRef(ref, { token });
    } catch (err) {
      console.warn(`[githubAuth] Failed to fetch group "${ref}" during hierarchy expansion: ${err}`);
      continue;
    }
    if (!entity?.spec?.parent) continue;

    const raw = entity.spec.parent as string;
    const parentRef = raw.includes(':') ? raw : `group:default/${raw}`;
    if (!all.has(parentRef)) {
      all.add(parentRef);
      queue.push({ ref: parentRef, depth: depth + 1 });
    }
  }

  return Array.from(all);
}

export const consultoraGithubAuthModule = createBackendModule({
  pluginId: 'auth',
  moduleId: 'consultora-github-provider',
  register(env) {
    env.registerInit({
      deps: {
        providers: authProvidersExtensionPoint,
        auth: coreServices.auth,
        catalog: catalogServiceRef,
      },
      async init({ providers, auth, catalog }) {
        providers.registerProvider({
          providerId: 'github',
          factory: createOAuthProviderFactory({
            authenticator: githubAuthenticator,
            async signInResolver(info, ctx) {
              const username = info.result.fullProfile.username?.toLowerCase();
              if (!username) {
                throw new Error('No GitHub username available on the OAuth profile');
              }

              const { token } = await auth.getPluginRequestToken({
                onBehalfOf: await auth.getOwnServiceCredentials(),
                targetPluginId: 'catalog',
              });

              const userRef = `user:default/${username}`;
              const userEntity = await catalog.getEntityByRef(userRef, { token });

              if (!userEntity) {
                throw new Error(
                  `GitHub user "${username}" has no matching User entity in the catalog. ` +
                    `Ensure the GitHub Org Provider has synced and the user exists.`,
                );
              }

              const directGroupRefs = (userEntity.relations ?? [])
                .filter((r: any) => r.type === 'memberOf')
                .map((r: any) => r.targetRef as string);

              const allGroupRefs = await expandGroupHierarchy(catalog, token, directGroupRefs);

              const userEntityRef = stringifyEntityRef(userEntity);

              return ctx.issueToken({
                claims: {
                  sub: userEntityRef,
                  ent: [userEntityRef, ...allGroupRefs],
                },
              });
            },
          }),
        });
      },
    });
  },
});
