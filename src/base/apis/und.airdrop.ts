import { ApiSource, policies, Type } from '@roxavn/core/base';
import {
  scopes as projectScopes,
  baseModule as projectBadModule,
  permissions,
} from '@roxavn/module-project/base';

import { baseModule } from '../module.js';
import { scopes } from '../access.js';

const undAirdropSource = new ApiSource(scopes.undAirdrop, baseModule);

export const undAirdropApi = {
  getMany: undAirdropSource.getMany({
    request: Type.PaginationRequest({}),
  }),
  create: undAirdropSource.create({
    request: Type.Object({
      name: Type.String(),
      metadata: Type.Object({
        partnerId: Type.String(),
        image: Type.String(),
        und: Type.Number(),
        slot: Type.Number(),
        linkX: Type.Optional(Type.String()),
        linkDiscord: Type.Optional(Type.String()),
        linkTelegram: Type.Optional(Type.String({ pattern: '^@' })),
        inviteDiscord: Type.Optional(Type.String()),
        inviteTelegram: Type.Optional(Type.String()),
        links: Type.Optional(
          Type.Array(
            Type.Object({
              title: Type.String(),
              link: Type.String(),
            })
          )
        ),
      }),
    }),
    authorization: {
      policies: [policies.Module(projectBadModule, permissions.CreateProject)],
    },
  }),
  getUserTask: undAirdropSource.api({
    method: 'GET',
    path: undAirdropSource.apiPath({ includeId: true }) + '/task',
    request: Type.Object({ id: Type.String() }),
    response: Type.Partial(projectScopes.Task.schema),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  getUserSubtasks: undAirdropSource.api({
    method: 'GET',
    path: undAirdropSource.apiPath() + '/subtasks',
    request: Type.Object({
      taskId: Type.String(),
    }),
    response: Type.CollectionResponse(projectScopes.Task.schema),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  createUserTask: undAirdropSource.api({
    method: 'POST',
    path: undAirdropSource.apiPath({ includeId: true }) + '/task',
    request: Type.Object({ id: Type.String() }),
    response: Type.Object({ id: Type.String() }),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  inprogress: undAirdropSource.api({
    method: 'POST',
    path: undAirdropSource.apiPath() + '/inprogress',
    request: Type.Object({ taskId: Type.String() }),
    response: Type.Object({}),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  claim: undAirdropSource.api({
    method: 'POST',
    path: undAirdropSource.apiPath() + '/claim',
    request: Type.Object({ taskId: Type.String() }),
    response: Type.Object({}),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  finish: undAirdropSource.api({
    method: 'POST',
    path: undAirdropSource.apiPath() + '/finish',
    request: Type.Object({
      taskId: Type.String(),
    }),
    response: Type.Object({}),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  stats: undAirdropSource.api({
    method: 'GET',
    path: undAirdropSource.apiPath() + '/stats',
    request: Type.PaginationRequest({ userId: Type.String() }),
    response: Type.PaginationResponse(
      Type.Object({
        id: Type.String(),
        name: Type.String(),
        participantsCount: Type.Number(),
        metadata: Type.Any(),
        createdDate: Type.Date(),
      })
    ),
    authorization: {
      policies: [policies.Owner],
    },
  }),
};
