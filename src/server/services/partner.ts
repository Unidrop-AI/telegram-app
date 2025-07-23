import {
  type InferApiRequest,
  notFoundException,
  type InferAuthApiRequest,
  badRequestException,
} from '@roxavn/core/base';
import { AuthRequest, BaseService, inject } from '@roxavn/core/server';
import {
  GetIdentityByTypeService,
  CreateIdentityService,
} from '@roxavn/module-user/server';
import { CreatePaymentTransactionService } from '@roxavn/plugin-payment/server';
import { GetUserCurrencyAccountsService } from '@roxavn/module-currency/server';
import crypto from 'crypto';

import { constants, partnerApi } from '../../base/index.js';
import { serverModule } from '../module.js';

@serverModule.useApi(partnerApi.getJwt)
export class GetIdentityService extends BaseService {
  async handle(
    @AuthRequest request: InferAuthApiRequest<typeof partnerApi.getJwt>
  ) {
    const user = JSON.stringify({
      userId: request.userId,
      ts: new Date().getTime(),
    });
    const secretKey = crypto
      .createHmac('sha256', 'Unidrop')
      .update('sdfsdweiSDFksdncv234@#kdsdk-92034cfd@FQ')
      .digest();
    const hash = crypto
      .createHmac('sha256', secretKey as any)
      .update(user)
      .digest('hex');
    return { user, hash };
  }
}

@serverModule.useApi(partnerApi.identity)
export class IdentityPartnerService extends BaseService {
  constructor(
    @inject(CreateIdentityService)
    private createIdentityService: CreateIdentityService
  ) {
    super();
  }

  async handle(
    @AuthRequest request: InferAuthApiRequest<typeof partnerApi.identity>
  ) {
    let subject;
    if (request.source === 'Metastrike') {
      const userId = request.identity.split('.')[1];
      const result = await fetch(
        'https://marketplace.metastrike.io/__api/metastrike/v1/users/' + userId,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${request.identity}`,
          },
        }
      ).then((r) => r.json());
      subject = result.data?.mtsUserId;
    }
    if (subject) {
      await this.createIdentityService.handle({
        subject: subject,
        type: request.source,
        userId: request.userId,
      });
      return {};
    }
    throw badRequestException.make();
  }
}

@serverModule.useApi(partnerApi.exchange)
export class ExchangeService extends BaseService {
  constructor(
    @inject(GetIdentityByTypeService)
    private getIdentityByTypeService: GetIdentityByTypeService,
    @inject(CreatePaymentTransactionService)
    private createPaymentTransactionService: CreatePaymentTransactionService
  ) {
    super();
  }

  async handle(request: InferApiRequest<typeof partnerApi.exchange>) {
    if (request.key != 'ncv234@#kdsdk-92034cfd@FQ') {
      throw notFoundException.make();
    }
    const identity = await this.getIdentityByTypeService.handle({
      subject: request.identity,
      type: request.source,
    });
    if (identity) {
      return this.createPaymentTransactionService.handle({
        currencyId: constants.Currencies.UND,
        type: request.source,
        account: { userId: identity.userId, amount: request.amount },
      });
    }
    throw notFoundException.make();
  }
}

@serverModule.useApi(partnerApi.balance)
export class GetBalanceService extends BaseService {
  constructor(
    @inject(GetIdentityByTypeService)
    private getIdentityByTypeService: GetIdentityByTypeService,
    @inject(GetUserCurrencyAccountsService)
    private getUserCurrencyAccountsService: GetUserCurrencyAccountsService
  ) {
    super();
  }

  async handle(request: InferApiRequest<typeof partnerApi.balance>) {
    if (request.key != 'ncv234@#kdsdk-92034cfd@FQ') {
      throw notFoundException.make();
    }
    const identity = await this.getIdentityByTypeService.handle({
      subject: request.identity,
      type: request.source,
    });
    if (identity) {
      const data = await this.getUserCurrencyAccountsService.handle({
        currencyId: constants.Currencies.UND,
        accounts: [{ userId: identity.userId }],
      });
      if (data.items.length) {
        return { balance: data.items[0].balance };
      }
    }
    throw notFoundException.make();
  }
}
