import { Link, Outlet, useLocation } from 'react-router';

export default function () {
  const location = useLocation();

  const genLink = (title: string, to: string) => (
    <Link
      to={to}
      className={`nav-link${location.pathname === to ? ' active' : ''}`}
    >
      {title}
    </Link>
  );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-2">
          <ul
            className="nav nav-pills mb-3 profile-tabs"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              {genLink('Dashboard', '/launchpad')}
            </li>
            <li className="nav-item" role="presentation">
              {genLink('Staking', '/launchpad/staking')}
            </li>
            <li className="nav-item" role="presentation">
              {genLink('Launchpad', '/launchpad/all')}
            </li>
          </ul>
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
