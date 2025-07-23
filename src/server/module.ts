import { ServerModule } from '@roxavn/core/server';
import { baseModule } from '../base/index.js';
// import { bot } from './telegram.bot.js';

export const serverModule = ServerModule.fromBase(baseModule);

//Start the Bot
// bot.launch().then(() => {
//   console.log('Telegram bot is running...');
// });
