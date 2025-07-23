import { accessManager, Scope } from '@roxavn/core/base';
import { scopes as projectScopes } from '@roxavn/module-project/base';
import { baseModule } from './module.js';

export const scopes = accessManager.makeScopes(baseModule, {
  undAirdrop: new Scope({
    name: 'undAirdrop',
    schema: projectScopes.Project.schema,
  }),
});

export const permissions = accessManager.makePermissions({});
