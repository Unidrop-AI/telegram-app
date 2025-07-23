import { BaseModule } from '@roxavn/core/base';
import { staticFiles } from './static.files.js';

export const baseModule = new BaseModule('metadrop', { staticFiles });
