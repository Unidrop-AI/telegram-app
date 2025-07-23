import { Banner } from '../../components/banner.js';
import { webModule } from '../../module.js';
import { utils } from '../../utils.js';

function GameItem({
  data,
}: {
  data: {
    name: string;
    joinCount: number;
    link: string;
    image: string;
    external?: boolean;
  };
}) {
  const button = (
    <div className="btn-float position-absolute top-50 end-0 translate-middle-y">
      <img
        src={webModule.resolveStaticPath('/images/icon1.png')}
        className="img-fluid w-75 pt-1"
      />
    </div>
  );
  return (
    <div className="card vip p-2 mb-2 position-relative">
      <div className="row">
        <div className="col-3">
          <div className="card-img m-img">
            <img src={data.image} className="img-fluid" />
          </div>
        </div>
        <div className="col-9">
          <b>{data.name}</b>
          <span
            className="small d-block"
            style={{ marginTop: -5, marginBottom: -5 }}
          >
            {data.joinCount} users
          </span>
          <span className="badge text-bg-primary me-1">Airdrop</span>
          <span className="badge text-bg-warning">Earn</span>
        </div>
      </div>
      <div onClick={() => utils.openPartnerLink(data.link, data.external)}>
        {button}
      </div>
    </div>
  );
}

export default function () {
  const games = [
    {
      name: 'Tonka Tribe',
      image:
        'https://pbs.twimg.com/profile_images/1868607207362703360/6c3iVZHt_400x400.jpg',
      link: 'https://t.me/tonka_tribe_bot',
      joinCount: 1800,
    },
    {
      name: 'MemeMyKingdom',
      image:
        'https://pbs.twimg.com/profile_images/1868960780273500160/aVxGaSzx_400x400.jpg',
      link: 'https://t.me/mmmkdbot/mememykingdomgame',
      joinCount: 1100,
    },
    {
      name: 'Alien Mine',
      image:
        'https://pbs.twimg.com/profile_images/1876916865337004032/bg-s9Cut_400x400.jpg',
      joinCount: 1300,
      link: 'https://t.me/AlienMineBot/game',
    },
    {
      name: 'Pet Tap Tap',
      image:
        'https://pbs.twimg.com/profile_images/1820693937839132672/TYILk36r_400x400.jpg',
      joinCount: 1500,
      link: 'https://t.me/PetTapTap_bot',
    },
    {
      name: 'Mushroom Warrior',
      image:
        'https://pbs.twimg.com/profile_images/1783370110004338688/_Gwy_6Pk_400x400.jpg',
      joinCount: 1600,
      link: 'https://t.me/NotMushCoin_bot/Play',
    },
    {
      name: 'Swipe Arena',
      image:
        'https://pbs.twimg.com/profile_images/1821217546840018944/TI1ivkxC_400x400.jpg',
      joinCount: 1500,
      link: 'https://t.me/SwipeArenaBot/SwipeArena',
    },
    {
      name: 'Mono Farm',
      image:
        'https://pbs.twimg.com/profile_images/1870869371226136576/l4CQl74A_400x400.jpg',
      joinCount: 1100,
      link: 'https://t.me/MonoFarmCN',
      external: true,
    },
    {
      name: 'PlayZap Games',
      image:
        'https://pbs.twimg.com/profile_images/1663804544667779078/oIsIqf7T_400x400.jpg',
      joinCount: 1300,
      link: 'https://www.playzap.games/',
      external: true,
    },
    {
      name: 'Alpaca Money',
      image:
        'https://pbs.twimg.com/profile_images/1829880608199262209/XYrlpqJ8_400x400.jpg',
      joinCount: 1400,
      link: 'https://t.me/AlpacaMoneyBot',
    },
    {
      name: 'Tom Talk',
      image:
        'https://pbs.twimg.com/profile_images/1867900824380157952/S93i_EvM_400x400.jpg',
      joinCount: 1200,
      link: 'https://t.me/TOMTALK_BOT',
    },
    {
      name: 'TON Battleground',
      image:
        'https://pbs.twimg.com/profile_images/1863669044471046144/Po-kopnd_400x400.png',
      joinCount: 1300,
      link: 'https://t.me/TON_BATTLEGROUND_bot',
    },
    {
      name: 'UND',
      image: webModule.resolveStaticPath('/images/s1.png'),
      joinCount: 1500,
      link: 'https://und.unidrop.ai',
    },
    {
      name: 'Metastrike',
      image: webModule.resolveStaticPath('/images/s2.png'),
      joinCount: 2000,
      external: true,
      link: 'https://metastrike.io',
    },
    {
      name: 'Metaflap',
      image: webModule.resolveStaticPath('/images/s3.png'),
      joinCount: 1200,
      external: true,
      link: 'https://metaflap.unidrop.ai/game',
    },
    {
      name: 'BabyBeer',
      image: webModule.resolveStaticPath('/images/s5.jpeg'),
      joinCount: 500,
      external: true,
      link: 'https://t.me/BabyBeer_bot/app',
    },
    {
      name: 'PVU IDLE',
      image: webModule.resolveStaticPath('/images/s4.jpeg'),
      joinCount: 600,
      external: true,
      link: 'https://t.me/pvu_idle_bot',
    },
  ];
  return (
    <>
      <Banner />
      <section className="mt-3">
        <div className="container">
          <div className="row">
            {
              <div className="col-12">
                {games.map((g) => (
                  <GameItem key={g.name} data={g} />
                ))}
              </div>
            }
          </div>
        </div>
      </section>
    </>
  );
}
