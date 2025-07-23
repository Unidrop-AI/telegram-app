import { BaseService, inject } from '@roxavn/core/server';
import { GetChannelsService } from '@roxavn/module-message/server';
import { constants } from '../../base/index.js';
import { serverModule } from '../module.js';

@serverModule.injectable()
export class GetUnidropChannelsService extends BaseService {
  cache?: {
    featuredProjectsId: string;
    miniGamesId: string;
  };

  constructor(
    @inject(GetChannelsService)
    protected getChannelsService: GetChannelsService
  ) {
    super();
  }

  async getChannelId(type: string) {
    const { items } = await this.getChannelsService.handle({
      type: type,
    });
    return items[0].id;
  }

  async handle() {
    if (!this.cache) {
      this.cache = {
        featuredProjectsId: await this.getChannelId(
          constants.ChannelTypes.FEATURED_PROJECTS
        ),
        miniGamesId: await this.getChannelId(constants.ChannelTypes.MINI_GAMES),
      };
    }
    return this.cache;
  }
}
