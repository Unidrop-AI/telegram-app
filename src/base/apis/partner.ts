import { accessManager, ApiSource, policies, Type } from '@roxavn/core/base';

import { baseModule } from '../module.js';

const partnerSource = new ApiSource(accessManager.scopes.User, baseModule);

export const partnerApi = {
  getJwt: partnerSource.api({
    method: 'GET',
    path: partnerSource.apiPath() + '/jwt',
    request: Type.Object({}),
    response: Type.Object({
      user: Type.String(),
      hash: Type.String(),
    }),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  identity: partnerSource.api({
    method: 'POST',
    path: partnerSource.apiPath() + '/identity',
    request: Type.Object({
      identity: Type.String(),
      source: Type.Union([Type.Literal('Metastrike')]),
    }),
    response: Type.Object({}),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  exchange: partnerSource.api({
    method: 'POST',
    path: partnerSource.apiPath() + '/exchange',
    request: Type.Object({
      identity: Type.String(),
      amount: Type.Number(),
      source: Type.String(),
      key: Type.String(),
    }),
    response: Type.Object({}),
  }),
  balance: partnerSource.api({
    method: 'POST',
    path: partnerSource.apiPath() + '/balance',
    request: Type.Object({
      identity: Type.String(),
      source: Type.String(),
      key: Type.String(),
    }),
    response: Type.Object({
      balance: Type.String(),
    }),
  }),
};
