import { BaseException } from '@roxavn/core';
import { baseModule } from './module.js';

export const unfinishTaskException = new BaseException({
  baseModule,
  type: 'Error.UnfinishTaskException',
});
