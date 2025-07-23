import { ApiSource, policies, Type } from '@roxavn/core/base';
import {
  scopes,
  baseModule as projectBadModule,
  permissions,
} from '@roxavn/module-project/base';
import { EthereumAddressType } from '@roxavn/module-web3/base';

import { baseModule } from '../module.js';

const feeAirdropSource = new ApiSource(scopes.Project, baseModule);

export const feeAirdropApi = {
  getMany: feeAirdropSource.getMany({
    request: Type.PaginationRequest({}),
  }),
  create: feeAirdropSource.create({
    request: Type.Object({
      name: Type.String(),
      metadata: Type.Object({
        partnerId: Type.String(),
        image: Type.String(),
        fee: Type.Number(),
        tokenAddress: Type.String(),
        tokenAmount: Type.String(),
        tokenName: Type.String(),
        tokenDecimals: Type.Number(),
        networkId: Type.Number(),
        networkName: Type.String(),
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
  getUserTask: feeAirdropSource.api({
    method: 'GET',
    path: feeAirdropSource.apiPath({ includeId: true }) + '/task',
    request: Type.Object({ id: Type.String() }),
    response: Type.Partial(scopes.Task.schema),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  getUserSubtasks: feeAirdropSource.api({
    method: 'GET',
    path: feeAirdropSource.apiPath() + '/subtasks',
    request: Type.Object({
      taskId: Type.String(),
    }),
    response: Type.CollectionResponse(scopes.Task.schema),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  createUserTask: feeAirdropSource.api({
    method: 'POST',
    path: feeAirdropSource.apiPath({ includeId: true }) + '/task',
    request: Type.Object({ id: Type.String() }),
    response: Type.Object({ id: Type.String() }),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  inprogress: feeAirdropSource.api({
    method: 'POST',
    path: feeAirdropSource.apiPath() + '/inprogress',
    request: Type.Object({ taskId: Type.String() }),
    response: Type.Object({}),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  claim: feeAirdropSource.api({
    method: 'POST',
    path: feeAirdropSource.apiPath() + '/claim',
    request: Type.Object({ taskId: Type.String() }),
    response: Type.Object({}),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  finish: feeAirdropSource.api({
    method: 'POST',
    path: feeAirdropSource.apiPath() + '/finish',
    request: Type.Object({
      taskId: Type.String(),
      address: EthereumAddressType(),
    }),
    response: Type.Object({}),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
};
