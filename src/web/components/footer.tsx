import { useLocation, useNavigate } from 'react-router';
import { useApiQuery, useAuthUser } from '@roxavn/core/web';
import { userCurrencyAccountApi } from '@roxavn/module-currency/base';
import { webModule } from '../module.js';
import { constants } from '../../base/index.js';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthUser();
  // force create user account
  useApiQuery(
    userCurrencyAccountApi.getOrCreateMany,
    {
      userId: user!.id,
      currencyId_in: [constants.Currencies.TICKET, constants.Currencies.UND],
    },
    { enabled: !!user }
  );

  return (
    <div>
      <div style={{ height: 80 }}></div>
      <section id="nav-sticky" className="fixed-bottom" style={{ zIndex: 900 }}>
        <div
          className={`button text-center h-100 ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <div className="p-2 h-100">
            <img
              src={webModule.resolveStaticPath('/images/lunar/home.png')}
              className="img-fluid"
            />
            <span className="small d-block">Home</span>
          </div>
        </div>
        <div
          className={`button text-center h-100 ${location.pathname.startsWith('/airdrops') ? 'active' : ''}`}
          onClick={() => navigate('/airdrops')}
        >
          <div className="p-2 h-100">
            <img
              src={webModule.resolveStaticPath('/images/lunar/airdrop.png')}
              className="img-fluid"
            />
            <span className="small d-block">Airdrop</span>
          </div>
        </div>
        <div
          className={`button text-center h-100 ${location.pathname.startsWith('/earn') ? 'active' : ''}`}
          onClick={() => navigate('/earn')}
        >
          <div className="p-2 h-100">
            <img
              src={webModule.resolveStaticPath('/images/lunar/earn.png')}
              className="img-fluid"
            />
            <span className="small d-block">Earn</span>
          </div>
        </div>
        <div
          className={`button text-center h-100 ${location.pathname.startsWith('/referral') ? 'active' : ''}`}
          onClick={() => navigate('/referral')}
        >
          <div className="p-2 h-100">
            <img
              src={webModule.resolveStaticPath('/images/lunar/invite.png')}
              className="img-fluid"
            />
            <span className="small d-block">Referral</span>
          </div>
        </div>
        <div
          className={`button text-center h-100 ${location.pathname.startsWith('/history') ? 'active' : ''}`}
          onClick={() => navigate('/history')}
        >
          <div className="p-2 h-100">
            <img
              src={webModule.resolveStaticPath('/images/lunar/profile.png')}
              className="img-fluid"
            />
            <span className="small d-block">History</span>
          </div>
        </div>
      </section>
    </div>
  );
}
