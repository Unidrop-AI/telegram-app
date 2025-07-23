import { accessManager, ApiSource, policies, Type } from '@roxavn/core/base';

import { baseModule } from '../module.js';

const botSource = new ApiSource(accessManager.scopes.Route, baseModule);

export const botApi = {
  savePreparedInlineMessage: botSource.api({
    method: 'POST',
    path: botSource.apiPath() + '/savePreparedInlineMessage',
    request: Type.Object({
      telegramUserId: Type.String(),
    }),
    response: Type.Object({
      id: Type.String(),
    }),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
};
