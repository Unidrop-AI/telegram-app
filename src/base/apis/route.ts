import { accessManager, ApiSource, policies, Type } from '@roxavn/core/base';
import { scopes } from '@roxavn/module-message/base';

import { baseModule } from '../module.js';

const routeSource = new ApiSource(accessManager.scopes.Route, baseModule);

export const routeApi = {
  airdrops: routeSource.api({
    method: 'GET',
    path: routeSource.apiPath() + '/airdrops',
    request: Type.PaginationRequest({
      ids: Type.Optional(Type.Array(Type.String())),
      type: Type.Optional(Type.String()),
    }),
    response: Type.PaginationResponse(Type.Object({})),
  }),
  tickets: routeSource.api({
    method: 'GET',
    path: routeSource.apiPath() + '/tickets',
    request: Type.PaginationRequest({
      campaignId: Type.Optional(Type.String()),
    }),
    response: Type.PaginationResponse(
      Type.Object({
        id: Type.String(),
        userId: Type.String(),
        status: Type.String(),
        metadata: Type.Any(),
        createdDate: Type.String(),
        updatedDate: Type.String(),
      })
    ),
  }),
  getUserTasks: routeSource.api({
    method: 'GET',
    path: routeSource.apiPath() + '/userTasks',
    request: Type.Object({
      campaignId: Type.String(),
    }),
    response: Type.Object({
      metadata: Type.Any(),
    }),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  updateUserTasks: routeSource.api({
    method: 'POST',
    path: routeSource.apiPath() + '/userTasks',
    request: Type.Object({
      campaignId: Type.String(),
      network: Type.String(),
    }),
    response: Type.Object({}),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  message: routeSource.api({
    method: 'GET',
    path: routeSource.apiPath() + '/message',
    request: Type.Object({ id: Type.String() }),
    response: scopes.Message.schema,
  }),
  index: routeSource.api({
    method: 'GET',
    path: routeSource.apiPath() + '/index',
    request: Type.Object({}),
    response: Type.Object({
      featuredAirdrops: Type.Array(Type.Any()),
      featuredProjects: Type.Array(scopes.Message.schema),
      miniGames: Type.Array(scopes.Message.schema),
    }),
  }),
};
