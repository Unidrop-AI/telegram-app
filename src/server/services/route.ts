import { BaseService, inject } from '@roxavn/core/server';
import {
  badRequestException,
  generateQueryStr,
  InferApiRequest,
  InferAuthApiRequest,
} from '@roxavn/core';
import {
  GetMessageService,
  GetMessagesService,
} from '@roxavn/module-message/server';
import { GetIdentitiesService } from '@roxavn/module-user/server';
import { constants as web3Constants } from '@roxavn/plugin-web3-auth';

import { routeApi } from '../../base/index.js';
import { serverModule } from '../module.js';
import { GetUnidropChannelsService } from './channel.js';

@serverModule.useApi(routeApi.airdrops)
export class AirdropsService extends BaseService {
  async handle(request: InferApiRequest<typeof routeApi.airdrops>) {
    const resp = await fetch(
      'https://metaflap.metastrike.io/__api/metaflap/v1/airdropCampaigns?' +
        generateQueryStr(request)
    ).then((r) => r.json());
    return resp.data;
  }
}

@serverModule.useApi(routeApi.tickets)
export class TicketsService extends BaseService {
  async handle(request: InferApiRequest<typeof routeApi.tickets>) {
    const resp = await fetch(
      'https://metaflap.metastrike.io/__api/metaflap/v1/airdropTickets?' +
        generateQueryStr(request)
    ).then((r) => r.json());
    return resp.data;
  }
}

@serverModule.useApi(routeApi.getUserTasks)
export class GetUserTasksService extends BaseService {
  constructor(
    @inject(GetIdentitiesService)
    private getIdentitiesService: GetIdentitiesService
  ) {
    super();
  }

  async handle(request: InferAuthApiRequest<typeof routeApi.getUserTasks>) {
    const identities = await this.getIdentitiesService.handle({
      userId: request.userId,
      type: web3Constants.IdentityTypes.WEB3_ADDRESS,
    });

    if (identities.items.length) {
      const resp = await fetch(
        'https://metaflap.metastrike.io/__api/metaflap/v1/airdropUserTasks?' +
          generateQueryStr({
            campaignId: request.campaignId,
            address: identities.items[0].subject,
          })
      ).then((r) => r.json());
      return resp.data;
    }

    throw badRequestException.make();
  }
}

@serverModule.useApi(routeApi.updateUserTasks)
export class UpdateUserTasksService extends BaseService {
  constructor(
    @inject(GetIdentitiesService)
    private getIdentitiesService: GetIdentitiesService
  ) {
    super();
  }

  async handle(request: InferAuthApiRequest<typeof routeApi.updateUserTasks>) {
    const identities = await this.getIdentitiesService.handle({
      userId: request.userId,
      type: web3Constants.IdentityTypes.WEB3_ADDRESS,
    });

    if (identities.items.length) {
      await fetch(
        'https://metaflap.metastrike.io/__api/metaflap/v1/airdropUserTasks',
        {
          method: 'PATCH',
          body: JSON.stringify({
            campaignId: request.campaignId,
            address: identities.items[0].subject,
            network: 'sdfkwe@#$fdg34654VCXDSF ' + request.network,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      ).then((r) => r.json());
      return {};
    }

    throw badRequestException.make();
  }
}

@serverModule.useApi(routeApi.index)
export class IndexService extends BaseService {
  constructor(
    @inject(AirdropsService)
    private airdropsService: AirdropsService,
    @inject(GetMessagesService)
    private getMessagesService: GetMessagesService,
    @inject(GetUnidropChannelsService)
    private getUnidropChannelsService: GetUnidropChannelsService
  ) {
    super();
  }

  async handle() {
    const ids = await this.getUnidropChannelsService.handle();
    const featuredProjects = await this.getMessagesService.handle({
      channelId: ids.featuredProjectsId,
      maxContentLength: 10,
    });
    const miniGames = await this.getMessagesService.handle({
      channelId: ids.miniGamesId,
      maxContentLength: 10,
    });
    const airdrops = await this.airdropsService.handle({});
    return {
      featuredAirdrops: airdrops.items,
      featuredProjects: featuredProjects.items,
      miniGames: miniGames.items,
    };
  }
}

@serverModule.useApi(routeApi.message)
export class MessageService extends BaseService {
  constructor(
    @inject(GetMessageService)
    private getMessageService: GetMessageService
  ) {
    super();
  }

  async handle(request: InferApiRequest<typeof routeApi.message>) {
    return this.getMessageService.handle({ id: request.id });
  }
}
