import { constants as coreConstants } from '@roxavn/core';
import { BaseService, inject } from '@roxavn/core/server';
import {
  CreateMessageService,
  CreateChannelService,
  GetChannelsService,
} from '@roxavn/module-message/server';
import {
  GetOrCreateUserService,
  UpdateMaxIdentitiesSettingService,
} from '@roxavn/module-user/server';
import { UtilsInstallHook } from '@roxavn/module-utils/hook';
import {
  CreateCurrencyService,
  GetCurrencyService,
} from '@roxavn/module-currency/server';
import {
  CreateSkillService,
  GetSkillsService,
} from '@roxavn/module-skill/server';
import { serverModule as utilsServerModule } from '@roxavn/module-utils/server';
import { constants as firebaseConstants } from '@roxavn/plugin-firebase/base';
import { constants as web3Constants } from '@roxavn/plugin-web3-auth/base';

import { serverModule } from '../server/index.js';
import { constants } from '../base/index.js';
import { webModule } from '../web/module.js';

@serverModule.injectable()
class InitChannelsService extends BaseService {
  constructor(
    @inject(GetChannelsService)
    protected getChannelsService: GetChannelsService,
    @inject(CreateChannelService)
    protected createChannelService: CreateChannelService,
    @inject(CreateMessageService)
    protected createMessageService: CreateMessageService,
    @inject(GetOrCreateUserService)
    protected getOrCreateUserService: GetOrCreateUserService
  ) {
    super();
  }

  async initMinigames(userId: string) {
    const type = constants.ChannelTypes.MINI_GAMES;
    const { items } = await this.getChannelsService.handle({
      type: type,
    });
    if (items.length < 1) {
      const channel = await this.createChannelService.handle({
        name: type,
        description: type,
        userId: userId,
        isPublic: true,
        type: type,
      });

      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Spin the Lucky Wheel</h2><p>Step up to the Lucky Wheel and feel the excitement as you give it a spin! This thrilling minigame offers a chance to test your luck and win amazing rewards. With each spin, you could land on coins, power-ups, or even special items that enhance your gameplay experience. Keep spinning to collect all the prizes and uncover surprises hidden within the wheel's colorful segments. Are you ready to spin your way to fortune and fun?</p>`,
        metadata: {
          title: 'Lucky Wheel',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: '#',
          twitterLink: '#',
          discordLink: '#',
          files: [
            { url: webModule.resolveStaticPath('/images/minigames/1.png') },
          ],
          banner: {
            url: webModule.resolveStaticPath('/images/game-banner.png'),
          },
        },
      });
      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Word Search Challenge</h2><p>Immerse yourself in the captivating Word Search Challenge, where your keen eye and word-finding skills are put to the ultimate test! Delve into grids filled with letters and hunt down a variety of hidden words. With each level presenting new and engaging puzzles, you'll explore themes ranging from nature and animals to food and technology. Race against the clock to find all the words before time runs out, or enjoy a relaxing session to unwind. Whether you're a seasoned word-search enthusiast or a newcomer, this game promises endless entertainment and mental stimulation with every search completed.</p>`,
        metadata: {
          title: 'Find Your Word',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: '#',
          twitterLink: '#',
          discordLink: '#',
          files: [
            { url: webModule.resolveStaticPath('/images/minigames/2.png') },
          ],
          banner: {
            url: webModule.resolveStaticPath('/images/game-banner.png'),
          },
        },
      });
      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Memory Match</h2><p>Engage your memory and concentration with the classic Memory Match game! Dive into a grid of cards arranged face down, each hiding colorful images and patterns. Your task is to flip pairs of cards to reveal their hidden sides and find matching pairs. The challenge escalates with each level, introducing more cards and faster-paced gameplay. Test your cognitive skills by remembering card positions and strategizing to clear the board within the allotted time. With delightful visuals and soothing music, Memory Match offers a rewarding experience for players of all ages, making it a perfect choice for sharpening your mind while having fun.</p>`,
        metadata: {
          title: 'Flip Card',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: '#',
          twitterLink: '#',
          discordLink: '#',
          files: [
            { url: webModule.resolveStaticPath('/images/minigames/3.png') },
          ],
          banner: {
            url: webModule.resolveStaticPath('/images/game-banner.png'),
          },
        },
      });
      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Slide to Solve</h2><p>Embark on a journey of puzzle-solving mastery with the captivating Sliding Puzzle game! Challenge yourself by rearranging scrambled tiles to recreate a stunning image or pattern. With various grid sizes and difficulty levels to choose from, every puzzle presents a unique challenge that demands strategic thinking and spatial awareness. Slide tiles into empty spaces, carefully planning each move to unlock the hidden picture. Whether you're a puzzle enthusiast or a casual gamer looking for a brain-teasing distraction, Sliding Puzzle offers hours of entertainment and the satisfaction of piecing together each puzzle to reveal its complete artwork.</p>`,
        metadata: {
          title: 'Sliding Puzzle',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: '#',
          twitterLink: '#',
          discordLink: '#',
          files: [
            { url: webModule.resolveStaticPath('/images/minigames/4.png') },
          ],
          banner: {
            url: webModule.resolveStaticPath('/images/game-banner.png'),
          },
        },
      });
    }
  }

  async initProjects(userId: string) {
    const type = constants.ChannelTypes.FEATURED_PROJECTS;
    const { items } = await this.getChannelsService.handle({ type });
    if (items.length < 1) {
      const channel = await this.createChannelService.handle({
        name: type,
        description: type,
        userId: userId,
        isPublic: true,
        type: type,
      });
      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Highlight</h2><p>Metastrike is an immersive First-Person Shooter that allows players to actively shape every aspect of the game. User-generated content (UGC) is at the core of what makes Metastrike different. Using our AI-based tools, players will be able to monetize their creativity by building custom skins, weapons, game maps and missions.<br><br>Our UGC-powered NFTs and $MTT&nbsp;work together to construct the Metastrike game economy. $MTT&nbsp;will facilitate: weapon rentals, cosmetic purchases, weapon upgrades, attribute rerolls, and NFT Purchases. With a fully on-chain economy, players will be able to be part of the creation of the Metastrike Universe, and share in the growth of the game's ecosystem. <br><br>Metastrike will be an end-to-end mobile experience. Esports ready Gameplay and NFT creation will be available to anyone with a smartphone, unlocking an untapped market of millions gamers. While adding new content from the community, we will be expanding the entire game to new platforms and game modes for fully customized experiences.</p>`,
        metadata: {
          title: 'Metastrike',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: 'https://t.me/MetaStrikeChat',
          twitterLink: 'https://twitter.com/MetastrikeHQ',
          discordLink:
            'https://discord.com/servers/metastrike-901088757107814451',
          files: [1, 2, 3, 4].map((i) => ({
            url: webModule.resolveStaticPath(
              `/images/metastrike/${i}.jpg` as any
            ),
          })),
          banner: {
            url: webModule.resolveStaticPath('/images/metastrike/thumb.jpg'),
          },
        },
      });
      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Highlight</h2><p>Metaflap is a pioneering 2D-scrolling-racing game built on robust and transparent blockchain technology. In Metaflap, each player owns a collection of unique pets. These pets are your avatars in the game, and you use them to race against other players or alone. The primary goal is to survive for as long as possible while navigating through various obstacles. The longer you survive and the more races you win, the more in-game currency you earn.</p><p>By leveraging blockchain technology, Metaflap ensures a transparent and secure gaming environment. All transactions, including the buying, selling, and earning of in-game assets, are recorded on the blockchain, making them tamper-proof and trustworthy.</p>`,
        metadata: {
          title: 'Metaflap',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: '#',
          twitterLink: '#',
          discordLink: '#',
          files: [1, 2, 3, 4].map((i) => ({
            url: webModule.resolveStaticPath(
              `/images/metaflap/${i}.jpg` as any
            ),
          })),
          banner: {
            url: webModule.resolveStaticPath('/images/metaflap/thumb.jpg'),
          },
        },
      });
      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Highlight</h2><p><span>Burning Battle is Moba Action Game in the UniDrop gaming ecosystem .We aim to become the future standard of high-end game and Esports on Web3 space by offering an innovative Free-to- Play and Play -to-Own Moba game combined with blockchain technology to satisfy both traditional and blockchain gamers.</span></p><p><span>Join Burning Battle for free,with a huge number of main characters up to different 100 drones select a drone with a distinct strengths, and abilities that helps you participate and win in every arena,collect rare weapons, artifacts and level up your drones. Players will have the opportunity to mint these assets using the blockchain technology claiming ownership, security (NFTs).</span></p><p><span>Each match has a maximum of 20 players,you can join with single or team mode.Burning Battle offers Quests, Battle Passes, Clans, Tournaments, and Social features.</span></p><p><span>A variety of NFTs from Drones, skins, and effects for players who can unlock or customize their characters.Through these NFTs, they can unlock the ability to staking/trade/sell/buy/rent other assets among each other via Token&nbsp; as well as attain exclusive items only available through the market, where they can earn real profits.</span></p>`,
        metadata: {
          title: 'Burning Battle',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: '#',
          twitterLink: '#',
          discordLink: '#',
          files: [1, 2, 3, 4, 5, 6].map((i) => ({
            url: webModule.resolveStaticPath(
              `/images/burning-battle/${i}.png` as any
            ),
          })),
          banner: {
            url: webModule.resolveStaticPath(
              '/images/burning-battle/thumb.png'
            ),
          },
        },
      });
      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Highlight</h2><p><span>LifeRises is an NFT project and Free-Play-Own AAA MMORPG in the UniDrop gaming ecosystem,be scheduled for gameplay demo release in 2024. The game can be played with or without crypto and NFTs.</span></p><p><span>This is an Fantasy AAA MMORPG with multiple challenges and dangerous monstrosities, giant bosses and massive quest system to keep players engaged while on</span></p><p><span>Our vision is to be the first game to transition AAA MMORPGs from web2 to web3, bridging the gap between traditional MMORPG games and blockchain.</span></p><p><span>Although the web3 revolution is a tough revolution with long-term obstacles, we think that with a team of professional blockchain engineers and a long-term vision, we will make a breakthrough for the AAA MMORPG series.</span></p><p><span>Apart from the play to earn projects that continue to draw a big number of users, there are many short-lived projects that just focus on collecting users' money, with no gameplay or a game that is not particularly engaging.</span></p><p><span>Therefore LifeRises's goal is to build an Free-Play-Own AAA</span></p><p><span>MMORPG game for the community's benefit, where you will truly play the game and not be ruled by Tokens.</span></p>`,
        metadata: {
          title: 'Liferises',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: '#',
          twitterLink: '#',
          discordLink: '#',
          files: [1, 2, 3, 4, 5, 6].map((i) => ({
            url: webModule.resolveStaticPath(
              `/images/liferises/${i}.png` as any
            ),
          })),
          banner: {
            url: webModule.resolveStaticPath('/images/liferises/thumb.png'),
          },
        },
      });
      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Highlight</h2><p><span>Metagaxy is Free-to- Play and Play -to-Own, mix of FPS/TPS and RTS gameplay with an NFT platform in the UniDrop gaming ecosystem.</span></p><p><span>Over different 2500+ spaceship and skills.Over different 150+ planets to build.Over different 500+ planets in galaxy to discover and own</span></p><p><span>As well as build and own from a tiny asteroid to a massive planetary union and can earn NFT through the use of spaceships to colonize other planets or through the black market.</span></p><p><span>The highlight of the game is that you can build a planet with a variety of battleships depending on your preferences and desires.There are not any patterns repeated in the designs that you are the Creator.</span></p><p><span>Can you see with an FPS or TPS even RTS gameplay has limitations that make you uncomfortable and boring? With Metagaxy during the construction period as well as the combat time, you will be the one who holds the full control and observation rights, you will be able to see the situation from a different perspective and more diverse to the gameplay in real-time, by controlling a character and piloting the main battleship from a FPS/TPS perspective while plotting your fleet from an RTS perspective.</span></p><p><span>In addition to the engaging gameplay, we also incorporate the NFT platform so that you can live in a 2nd world that is both entertaining and can increase your real profits.</span></p><p><span>That's what you can join in \"Metagaxy right now.</span></p>`,
        metadata: {
          title: 'Metagaxy',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: '#',
          twitterLink: '#',
          discordLink: '#',
          files: [1, 2, 3, 4, 5, 6].map((i) => ({
            url: webModule.resolveStaticPath(
              `/images/metagaxy/${i}.png` as any
            ),
          })),
          banner: {
            url: webModule.resolveStaticPath('/images/metagaxy/thumb.png'),
          },
        },
      });
      await this.createMessageService.handle({
        channelId: channel.id,
        userId: userId,
        type: constants.MessageTypes.UNIDROP,
        content: `<h2>Highlight</h2><p><span>Myst of Glorious is a Free To Play - Play to Own - Play to Earn action RPG in the UniDrop gaming ecosystem&nbsp;</span></p><p><span>Myst of Glorious be Inspired by two IP Games : The World Of Warcraft (MMORPG) and The Naraka (Battle Royale Survival game ) and combine them to create a whole new world .Each match has a maximum of 20 players, they fight until only 1 player remains the winner if playing single mode, and the team wins if playing in team mode</span></p><p><span>Myst of Glorious have a plan to develop a huge number of main characters up to different 100 Heroes that you can choose to join in the Myst of Glorious world. Each Hero has different attack,skill,skin,race as well as weapon,armor,asset types that ensuring that you will never be bored when join battles in Myst of Glorious world.</span></p><p><span>Myst of Glorious is Free To Play. This means players simply need to download the game and start playing. No need for wallets, or any upfront costs.</span></p><p><span>Throughout battles in The Myst of Glorious you will be able to collect rare weapons, artifacts and level up your characters. Players will have the opportunity to mint these assets using the blockchain technology claiming ownership, security (NFTs).</span></p><p><span>Through these NFTs, they can unlock the ability to staking/trade/sell/buy/rent other assets among each other via Token&nbsp; as well as attain exclusive items only available through the market, where they can earn real profits.</span></p>`,
        metadata: {
          title: 'Myst of glorious',
          targetedRaise: 200000,
          participants: 200,
          contributionAmount: 100000,
          telegramLink: '#',
          twitterLink: '#',
          discordLink: '#',
          files: [1, 2, 3, 4, 5, 6].map((i) => ({
            url: webModule.resolveStaticPath(
              `/images/glourious/${i}.png` as any
            ),
          })),
          banner: {
            url: webModule.resolveStaticPath('/images/glourious/thumb.png'),
          },
        },
      });
    }
  }

  async handle() {
    const user = await this.getOrCreateUserService.handle({
      username: coreConstants.Users.SYSTEM,
    });
    if (user) {
      await this.initProjects(user.id);
      await this.initMinigames(user.id);
    }
  }
}

@serverModule.injectable()
class CreateCurrencyHook extends BaseService {
  constructor(
    @inject(CreateCurrencyService)
    public createCurrencyService: CreateCurrencyService,
    @inject(GetCurrencyService)
    public getCurrencyService: GetCurrencyService
  ) {
    super();
  }

  async handle() {
    try {
      await this.getCurrencyService.handle({
        id: constants.Currencies.TICKET,
      });
    } catch {
      await this.createCurrencyService.handle({
        name: 'TICKET',
        symbol: 'TICKET',
        id: constants.Currencies.TICKET,
      });
      await this.createCurrencyService.handle({
        name: 'UND',
        symbol: 'UND',
        id: constants.Currencies.UND,
      });
    }
  }
}

@serverModule.injectable()
class CreateSkillHook extends BaseService {
  constructor(
    @inject(CreateSkillService)
    public createSkillService: CreateSkillService,
    @inject(GetSkillsService)
    public getSkillsService: GetSkillsService
  ) {
    super();
  }

  async handle() {
    const skills = await this.getSkillsService.handle({});
    if (skills.items.length < 1) {
      await this.createSkillService.handle({
        id: constants.Skills.EARN,
        name: constants.SkillTypes.EARN,
        levels: Array(20)
          .fill('')
          .map((_, i) => ({
            name: `Level ${i + 1}`,
            maxPoint: (i + 1) * 300,
          })),
      });
    }
  }
}

@serverModule.injectable()
export class SetFirebaseConfigHook extends UtilsInstallHook {
  async handle() {
    await this.upsertSettingService.handle({
      module: utilsServerModule.name,
      name: firebaseConstants.FIREBASE_SERVER_SETTING,
      metadata: {
        serviceAccounts: [
          {
            type: 'service_account',
            project_id: 'metadrop-f361d',
            private_key_id: '8fbf4c58ae2c975d3e1ca040122a2304d1c6d933',
            private_key:
              '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1aKMAg6xVAHIp\ntP2hOWf2Vno9omB5XcxO1bw5DD03gM8o9YgoM5uQwAP58vtJlZkNjSzWQT7gnjrJ\nwr9niIGwPN8KMsqyMzZoHB0SXM01Oza3geqhQiCB4zsskDV0qFn0iarOBwphIE1+\nsH6idEtvMyyx2xQtT+bvT58ajbAH//NF/586UYZ9YHUgnCo4yxJWXCvgFy/tNcai\nN9vSEb1/6yoIf8EY/S3LtSan/XvJY8IrxIdNWjZKCCNWPhxnnUbD7xYVhhnMhtWX\nSzbDltW/IoxplvCKcRTimEpFYgpOW1cqxRng26KwmLZtL77px72Gma1qpooyy0WG\niVneKQ9tAgMBAAECggEABYjNzIxljNwucbs4pqjsgraZC1Uc9W7trWvj8x5QuIKW\nZjc/IkOz8OPlogQb84ylFEECcv568JCSFhJ6Cg8s97Umj9GyOnUuBMdzE79M+UG7\n44EdMjJ3XscRmvswmAUyHIJLsIh7qzBBorPuq/ULrRtGCbDlTpUD2zj6qtHltQlK\n2JmdYIAmB7Le4abofp1xCD3N+2CnIKqmnuDjKev3CXk/VKPUuRbRUO/Mkpqz3ROf\ndVjMYdWTu2kM+eA6csvEDbFOLBjlMTFmvzVZ5W85AgbEgPZj2dJnjzR+8r2X3QWu\nBPq2FnRkOsb3b17ul2TW298yo40JXwD30g4lzNMaEQKBgQDfhNywxAGgO9cGrNul\n108qEIJUzsHxPLRs4rkZSM55T7Rq+gF9QpF8DACtLLsQcDETrbd3bsO11Brb7R09\n8zA+GywyGGYaU7hiVsyVSD4vhcvd1Lzo/dOQZluQqVEfDbPmmEQ5fxLhYKshmECL\nHCxVOlqld23dtld2zzZWwAnkvQKBgQDPxTrEmNMP65JK3kCemS4RelqjDACKvFTd\ns7lErPESGK6rrqreFGxBVIWNOb3Q+uiBi6P8ZSl2sK3FwgHGADZcugTVjRdrOml/\nzv1GeBRs+hyP6gQEpCoka1Q5MWUv7j3nJwkZ7GAOIK3xFhiDcVh739z6tkHJycRt\nBieQ6kT4cQKBgG9hFFudADZpOyffYQBNvuv2GAvMj4X3Ouz7OUMpLYHzvrKD69QQ\nJNDMZlXk8T4qubnVmZORBUMI821dxXGGSibYgXhhAhfiWgHewMkum5YwtLrQdGYh\nfZf5+Wyngn3X5Spl+7Eu6iiWdBAkfx0Sp+C8WEkVrxCI+SKB9NDbltJ9AoGAILus\n7444KljtulfbjGELrfs9zlQ0vabAJBGNjbFFZZl341poVwaWq5A6Xi6LpiHxgX9T\nfY8egjGBnxdamiwsZF12J4LL/ru8JUOiCXkflq+s0kuHCIgoj4ZNRZlvnKaHICS5\nPVlNJMynOsVFZWf1DccOFH2kTbs49Ag1MZKG/TECgYEAlbZeOb1HN5fUfElHe0hE\nScYIiXKqD2pGIowjlhMfheVdZhWn5oFk/jLYOJBi99f6794YIlvhoe89bKA4WKg+\n6hbYPVYti0G4kYEhce5/56+DALau0HCkRza38HUHTT9kRGROzx5/4/swGgmzpwkA\nTiSjssFq96yxrbj+dey+ppM=\n-----END PRIVATE KEY-----\n',
            client_email:
              'firebase-adminsdk-b5w1a@metadrop-f361d.iam.gserviceaccount.com',
            client_id: '105545106138606637400',
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url:
              'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url:
              'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b5w1a%40metadrop-f361d.iam.gserviceaccount.com',
            universe_domain: 'googleapis.com',
          },
        ],
      },
      isPublic: false,
    });
  }
}

@serverModule.injectable()
export class InstallHook extends BaseService {
  constructor(
    @inject(SetFirebaseConfigHook)
    public setFirebaseConfigHook: SetFirebaseConfigHook,
    @inject(CreateCurrencyHook) public createCurrencyHook: CreateCurrencyHook,
    @inject(InitChannelsService)
    public initChannelsService: InitChannelsService,
    @inject(CreateSkillHook)
    public createSkillHook: CreateSkillHook,
    @inject(UpdateMaxIdentitiesSettingService)
    public updateMaxIdentitiesSettingService: UpdateMaxIdentitiesSettingService
  ) {
    super();
  }

  async handle() {
    await this.setFirebaseConfigHook.handle();
    await this.initChannelsService.handle();
    await this.createCurrencyHook.handle();
    await this.createSkillHook.handle();
    await this.updateMaxIdentitiesSettingService.handle({
      setting: {
        [web3Constants.IdentityTypes.WEB3_ADDRESS]: 1,
      },
    });
  }
}
