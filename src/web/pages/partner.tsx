import { AppShell, NavLink } from '@mantine/core';
import { Link, Outlet, useLocation } from 'react-router';
import { IsAuthenticatedPage } from '@roxavn/core/web';
import { IconList } from '@tabler/icons-react';
import { webModule } from '../module.js';

export default function () {
  const location = useLocation();
  return (
    <IsAuthenticatedPage redirect>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'xs' }}
        padding="md"
      >
        <AppShell.Header>
          <img
            src={webModule.resolveStaticPath('/images/logo.png')}
            style={{ height: 60, padding: 10 }}
          />
        </AppShell.Header>
        <AppShell.Navbar>
          <NavLink
            label="Quest"
            leftSection={<IconList />}
            active={location.pathname === '/partner'}
            component={Link}
            to={'/partner'}
          />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet></Outlet>
        </AppShell.Main>
      </AppShell>
    </IsAuthenticatedPage>
  );
}
