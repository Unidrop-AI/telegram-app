import { type InferAuthApiRequest } from '@roxavn/core';
import { AuthRequest, BaseService } from '@roxavn/core/server';
import { getReferralCode } from '@roxavn/module-referral/web';

import { botApi } from '../../base/index.js';
import { serverModule } from '../module.js';
import { BOT_TOKEN } from '../telegram.bot.js';

@serverModule.useApi(botApi.savePreparedInlineMessage)
export class SavePreparedInlineMessageService extends BaseService {
  async handle(
    @AuthRequest
    request: InferAuthApiRequest<typeof botApi.savePreparedInlineMessage>
  ) {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/savePreparedInlineMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: request.telegramUserId,
          result: {
            id: 'T' + Math.random(),
            type: 'photo',
            photo_url:
              'https://res.cloudinary.com/drgtgmlpp/image/upload/v1731294681/photo_6163256565314994735_y_s4qzub.jpg',
            thumbnail_url:
              'https://res.cloudinary.com/drgtgmlpp/image/upload/v1731294681/photo_6163256565314994735_y_s4qzub.jpg',
            caption:
              "Unidrop is a revolutionary platform that transforms how gamers interact with airdrops, projects, and casual games. It's a unified ecosystem designed to maximize user engagement and investment opportunities",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Join with us',
                    url: `https://t.me/UnidropBot/app?startapp=${getReferralCode(request.userId)}`,
                  },
                ],
              ],
            },
          },
          allow_user_chats: true,
        }),
      }
    ).then((resp) => resp.json());

    if (response.result) {
      return response.result;
    }
    throw new Error(response);
  }
}
