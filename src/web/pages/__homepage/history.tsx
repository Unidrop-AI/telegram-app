import { Table } from '@mantine/core';
import { useApiQuery, useAuthUser } from '@roxavn/core/web';
import { userCurrencyAccountApi } from '@roxavn/module-currency/base';
import { AccountTransactions } from '@roxavn/module-currency/web';

import { UserBalance } from '../../components/UserBalance.js';
import { constants } from '../../../base/index.js';

export default function () {
  const user = useAuthUser();
  const { data } = useApiQuery(
    userCurrencyAccountApi.getOrCreateMany,
    {
      userId: user!.id,
      currencyId_in: [constants.Currencies.TICKET, constants.Currencies.UND],
    },
    { enabled: !!user }
  );
  const currencyAccountId = data?.items.find(
    (item) => item.currencyId === constants.Currencies.UND
  )?.id;

  return (
    <section className="mt-3">
      <div className="container">
        <UserBalance></UserBalance>
        {currencyAccountId && (
          <Table.ScrollContainer minWidth={800} mt="xl">
            <AccountTransactions currencyAccountId={currencyAccountId} />
          </Table.ScrollContainer>
        )}
      </div>
    </section>
  );
}
