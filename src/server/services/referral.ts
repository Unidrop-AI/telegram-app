import { BaseService, InferApiSuccessData, inject } from '@roxavn/core/server';
import { referralApi } from '@roxavn/module-referral/base';
import { RewardReferralService } from '@roxavn/module-referral/server';
import { CreatePaymentTransactionService } from '@roxavn/plugin-payment/server';
import { serverModule } from '../module.js';
import { constants } from '../../base/index.js';

@serverModule.useApiSuccessJob(referralApi.create)
export class RewardUnidropReferralService extends BaseService {
  constructor(
    @inject(RewardReferralService)
    private rewardReferralService: RewardReferralService,
    @inject(CreatePaymentTransactionService)
    private createPaymentTransactionService: CreatePaymentTransactionService
  ) {
    super();
  }

  async handle(data: InferApiSuccessData<typeof referralApi.create>) {
    await this.rewardReferralService.handle(
      { id: data.request.invitor },
      async () => {
        await this.createPaymentTransactionService.handle({
          currencyId: constants.ReferralReward.CURRENCY,
          type: 'referralReward',
          account: {
            userId: data.request.invitor,
            amount: constants.ReferralReward.AMOUNT,
          },
        });
        return undefined;
      }
    );
  }
}
