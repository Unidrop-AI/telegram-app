import { ApiSource, policies, Type } from '@roxavn/core/base';
import { scopes } from '@roxavn/module-project';

import { baseModule } from '../module.js';

const taskSource = new ApiSource(scopes.Task, baseModule);

export const taskApi = {
  getEarnTasks: taskSource.api({
    path: taskSource.apiPath() + '/earn',
    method: 'POST',
    request: Type.Object({
      type: Type.Union([Type.Literal('earn_1'), Type.Literal('earn_120')]),
    }),
    response: Type.Composite([
      scopes.Task.schema,
      Type.Object({
        children: Type.Array(scopes.Task.schema),
      }),
    ]),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
  claim: taskSource.api({
    method: 'POST',
    path: taskSource.apiPath({ includeId: true }) + '/claim',
    request: Type.Object({ id: Type.String() }),
    response: Type.Object({ levelChange: Type.Number() }),
    authorization: {
      policies: [policies.AuthUser],
    },
  }),
};
