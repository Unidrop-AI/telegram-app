import { Group } from '@mantine/core';
import { ReferenceUser, useApiQuery, useAuthUser } from '@roxavn/core/web';
import { userCurrencyAccountApi } from '@roxavn/module-currency/base';
import { constants } from '../../base/index.js';
import { webModule } from '../module.js';
import { useEffect } from 'react';

export function UserBalance({ refetchTs }: { refetchTs?: number }) {
  const user = useAuthUser();
  const { data: currenciesData, refetch } = useApiQuery(
    userCurrencyAccountApi.getOrCreateMany,
    {
      userId: user!.id,
      currencyId_in: [constants.Currencies.TICKET, constants.Currencies.UND],
    },
    { enabled: !!user }
  );

  useEffect(() => {
    if (refetchTs) {
      refetch();
    }
  }, [refetchTs]);

  return (
    user && (
      <div>
        <div
          className="fixed-top"
          style={{
            background: '#001351',
            top: 'var(--tg-safe-area-inset-top, 0px)',
          }}
        >
          <div
            style={{ height: 'var(--tg-content-safe-area-inset-top, 0px)' }}
          ></div>
          <Group justify="space-between" p="md">
            <ReferenceUser id={user.id} />
            <p>
              <img
                src={webModule.resolveStaticPath('/images/bt-l.png')}
                className="img-fluid me-2"
                width={30}
              />
              <b>
                {
                  currenciesData?.items.find(
                    (item) => item.currencyId === constants.Currencies.UND
                  )?.balance
                }
              </b>
            </p>
          </Group>
        </div>
        <div
          style={{
            height:
              'calc(50px + var(--tg-content-safe-area-inset-top, 0px) + var(--tg-safe-area-inset-top, 0px))',
          }}
        ></div>
      </div>
    )
  );
}
