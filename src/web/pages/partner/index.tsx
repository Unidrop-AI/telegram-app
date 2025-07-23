import { formatDate } from '@roxavn/core';
import { ResourceList, authService } from '@roxavn/core/web';
import { undAirdropApi } from '../../../base/index.js';

export default function () {
  const user = authService.getUser();

  return (
    user && (
      <ResourceList
        api={undAirdropApi.stats}
        header="UND Airdrops"
        initialApiRequest={{ userId: user?.id }}
        fields={{
          name: {},
          participantsCount: {
            label: 'Participants',
            render: (v, item) => `${v}/${item.metadata.slot}`,
          },
          metadata: { label: 'Reward', render: (v) => v.und + ' UND' },
          createdDate: { render: formatDate },
        }}
      ></ResourceList>
    )
  );
}
