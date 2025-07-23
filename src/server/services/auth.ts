import { identityApi } from '@roxavn/plugin-web3-auth/base';
import { AuthAndRegisterIdentityService } from '@roxavn/plugin-web3-auth/server';
import { serverModule } from '../module.js';

@serverModule.useApi(identityApi.authAndRegister)
export class AuthAndRegisterService extends AuthAndRegisterIdentityService {}
