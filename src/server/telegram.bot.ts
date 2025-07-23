import { Telegraf } from 'telegraf';
import { Agent } from 'node:https';

export const BOT_TOKEN = JSON.parse(process.env.TELEGRAM_BOT_TOKENS!)[
  process.env.VITE_TELEGRAM_BOT as any
];

//Create a new bot
const bot = new Telegraf(BOT_TOKEN, {
  telegram: {
    agent: new Agent({ keepAlive: false, family: 4 }),
  },
});

bot.start((ctx) => {
  ctx.sendPhoto(
    {
      url: 'https://res.cloudinary.com/drgtgmlpp/image/upload/v1731294681/photo_6163256565314994735_y_s4qzub.jpg',
    },
    {
      caption: `Hey there, ${ctx.from.username || ctx.from.first_name || 'user'}! This is UNIDROP! 👋🏻

🎮  Play games and earn UND

👯 Got friends? Invite them! Spread the fun and multiply your UND together.

That’s all you need to know to get started. ⬇️
`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Play for airdrop',
              web_app: { url: 'https://mobile.unidrop.ai' },
            },
          ],
          [{ text: 'News', url: 'https://t.me/UnidropNews' }],
          [{ text: 'Join Community', url: 'https://t.me/UnidropOfficial' }],
        ],
      },
    }
  );
});

export { bot };
