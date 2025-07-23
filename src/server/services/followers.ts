import { BaseService } from '@roxavn/core/server';
import { TelegramClient, Api } from 'telegram';
import { Client, GatewayIntentBits } from 'discord.js';
import { StringSession } from 'telegram/sessions/StringSession.js';

import { serverModule } from '../module.js';

@serverModule.injectable()
export class GetFollowerTelegramService extends BaseService {
  client?: TelegramClient;

  async handle(request: { channelName: string }) {
    if (!this.client) {
      this.client = await this.init();
    }
    const result = await this.client.invoke(
      new Api.channels.GetFullChannel({
        channel: request.channelName,
      })
    );

    return (result.fullChat as any).participantsCount as number;
  }

  async init() {
    const apiId = 27416515;
    const apiHash = '30d7857b178f9ae4fb2d673cf051db81';
    const client = new TelegramClient(new StringSession(''), apiId, apiHash, {
      connectionRetries: 5,
    });

    await client.start({
      botAuthToken: process.env.TELEGRAM_BOT_TOKEN,
    });

    return client;
  }
}

@serverModule.injectable()
export class GetFollowerDiscordService extends BaseService {
  client?: Client;

  async handle(request: { serverId: string }) {
    if (!this.client) {
      this.client = await this.init();
    }
    const guild = await this.client.guilds.fetch(request.serverId);
    return guild.memberCount;
  }

  async init() {
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    });
    await client.login(
      process.env.DISCORD_BOT_TOKEN
    );
    return client;
  }
}
