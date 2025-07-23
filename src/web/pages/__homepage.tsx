import { Outlet } from 'react-router';
import { useApiMutation, useAuthData } from '@roxavn/core/web';
import { useTelegramIdentity } from '@roxavn/plugin-telegram-bot/web';
import { MyInvitor } from '@roxavn/module-referral/web';
import telegramAnalytics from '@telegram-apps/analytics';
import { useEffect, useState } from 'react';

import { webModule } from '../module.js';
import { Header, Footer } from '../components/index.js';
import { partnerApi } from '../../base/index.js';

export const links = () => {
  return [
    {
      rel: 'icon',
      href: webModule.resolveStaticPath('/favicon.png'),
      type: 'image/png',
    },
    {
      rel: 'stylesheet',
      href: webModule.resolveStaticPath('/css/bootstrap.min.css'),
    },
    {
      rel: 'stylesheet',
      href: webModule.resolveStaticPath('/css/animate.css'),
    },
    { rel: 'stylesheet', href: webModule.resolveStaticPath('/css/style.css') },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap',
    },
  ];
};

const description =
  "Unidrop is a revolutionary platform that transforms how gamers interact with airdrops, projects, and casual games. It's a unified ecosystem designed to maximize user engagement and investment opportunities";

export const meta = () => {
  return [
    {
      title: 'Unidrop',
    },
    {
      property: 'og:title',
      content: 'Unidrop',
    },
    {
      property: 'description',
      content: description,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `https://unidrop.ai${webModule.resolveStaticPath('/images/hero1.png')}`,
    },
  ];
};

export default function () {
  const [referral, setReferral] = useState<string>();
  const identityMutation = useApiMutation(partnerApi.identity);

  useTelegramIdentity({ botName: import.meta.env.VITE_TELEGRAM_BOT });
  useEffect(() => {
    const WOW = (window as any).WOW;
    new WOW().init();

    telegramAnalytics.init({
      token:
        'eyJhcHBfbmFtZSI6InVuaWRyb3AiLCJhcHBfdXJsIjoiaHR0cHM6Ly90Lm1lL1VuaWRyb3BCb3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9tb2JpbGUudW5pZHJvcC5haS8ifQ==!+tgyEDohMGbJ+lCOVryOH+69gkx+omLvBc5i6wfe2KQ=',
      appName: 'unidrop',
    });

    try {
      const Telegram = (window as any).Telegram;
      Telegram.WebApp.expand();
      Telegram.WebApp.disableVerticalSwipes();
      if (['android', 'ios'].includes(Telegram.WebApp.platform)) {
        Telegram.WebApp.requestFullscreen();
      }
    } catch {}

    try {
      const startParam = new URLSearchParams(location.search).get(
        'tgWebAppStartParam'
      );
      if (startParam) {
        const startParamParts = atob(startParam).split(':');
        if (startParamParts[0] === 'ref') {
          setReferral(startParamParts[1]);
        } else if (startParamParts[0] === 'identity') {
          identityMutation.mutate({
            identity: startParamParts[1],
            source: startParamParts[2] as any,
          });
        }
      }
    } catch {}
  }, []);
  const { user } = useAuthData();

  return (
    <div>
      {user ? (
        <>
          <Header />
          {referral && (
            <MyInvitor
              renderInvitor={() => <></>}
              referralCode={referral}
              renderInvitorForm={() => <></>}
            ></MyInvitor>
          )}
          <Outlet />
          <Footer />
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '90vh' }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <script src="https://telegram.org/js/telegram-web-app.js?56"></script>
      <script
        src={webModule.resolveStaticPath('/js/bootstrap.bundle.min.js')}
      ></script>
      <script src={webModule.resolveStaticPath('/js/wow.js')}></script>
    </div>
  );
}
