import {
  ResourceList,
  ArrayInput,
  IfCanAccessApi,
  JSONTree,
  ResourceAction,
  UserInput,
} from '@roxavn/core/web';
import { webModule as projectWebModule } from '@roxavn/module-project/web';
import { IconNews, IconSquareRoundedLetterU } from '@tabler/icons-react';
import { formatDateTime } from '@roxavn/core';
import { Group, NumberInput, TextInput } from '@mantine/core';
import { feeAirdropApi, undAirdropApi } from '../../base/index.js';

const FeeAirdropsPage = () => {
  return (
    <ResourceList
      api={feeAirdropApi.getMany}
      header="Fee airdrops"
      fields={{
        id: {},
        name: {},
        metadata: {
          render: (value) => value && <JSONTree data={value}></JSONTree>,
        },
        createdDate: { render: formatDateTime },
      }}
      renderHeaderActions={() => [
        ResourceAction.createForm({
          api: feeAirdropApi.create,
          initialApiRequest: {
            metadata: {} as any,
          },
          renderForm: ({ field }) => [
            <Group key="name">
              {field(TextInput, { name: 'name' })}
              {field(TextInput, {
                name: 'metadata.image',
                label: 'Image',
              })}
              {field(UserInput, {
                name: 'metadata.partnerId',
                label: 'Partner',
              })}
            </Group>,
            <Group key="fee">
              {field(NumberInput, {
                name: 'metadata.fee',
                label: 'Fee (in UND)',
              })}
              {field(NumberInput, {
                name: 'metadata.slot',
                label: 'Slot',
              })}
            </Group>,
            <Group key="token">
              {field(TextInput, {
                name: 'metadata.tokenAddress',
                label: 'Token address',
              })}
              {field(TextInput, {
                name: 'metadata.tokenAmount',
                label: 'Token amount',
              })}
              {field(NumberInput, {
                name: 'metadata.networkId',
                label: 'Network id',
              })}
            </Group>,
            <Group key="tokenName">
              {field(TextInput, {
                name: 'metadata.tokenName',
                label: 'Token name',
              })}
              {field(NumberInput, {
                name: 'metadata.tokenDecimals',
                label: 'Token decimals',
              })}
              {field(TextInput, {
                name: 'metadata.networkName',
                label: 'Network name',
              })}
            </Group>,
            <Group key="link">
              {field(TextInput, {
                name: 'metadata.linkDiscord',
                label: 'Discord server id',
              })}
              {field(TextInput, {
                name: 'metadata.linkTelegram',
                label: 'Telegram channel name',
              })}
              {field(TextInput, {
                name: 'metadata.linkX',
                label: 'Twitter username',
              })}
            </Group>,
            <Group key="invite">
              {field(TextInput, {
                name: 'metadata.inviteDiscord',
                label: 'Discord invite link',
              })}
              {field(TextInput, {
                name: 'metadata.inviteTelegram',
                label: 'Telegram invite link',
              })}
            </Group>,
            field(ArrayInput, {
              name: 'metadata.links',
              label: 'Custom links',
              renderLayout: 'horizontal',
              renderInputs: (index) => (
                <Group grow>
                  {field(TextInput, {
                    name: `metadata.links.${index}.title`,
                    placeholder: 'Title',
                  })}
                  {field(TextInput, {
                    name: `metadata.links.${index}.link`,
                    placeholder: 'Link',
                  })}
                </Group>
              ),
            }),
          ],
          size: 'xl',
        }),
      ]}
    />
  );
};

const UndAirdropsPage = () => {
  return (
    <ResourceList
      api={undAirdropApi.getMany}
      header="Und airdrops"
      fields={{
        id: {},
        name: {},
        metadata: {
          render: (value) => value && <JSONTree data={value}></JSONTree>,
        },
        createdDate: { render: formatDateTime },
      }}
      renderHeaderActions={() => [
        ResourceAction.createForm({
          size: 'xl',
          api: undAirdropApi.create,
          initialApiRequest: {
            metadata: {} as any,
          },
          renderForm: ({ field }) => [
            <Group key="name">
              {field(TextInput, { name: 'name' })}
              {field(TextInput, {
                name: 'metadata.image',
                label: 'Image',
              })}
              {field(UserInput, {
                name: 'metadata.partnerId',
                label: 'Partner',
              })}
            </Group>,
            <Group key="fee">
              {field(NumberInput, {
                name: 'metadata.und',
                label: 'Reward UND',
              })}
              {field(NumberInput, {
                name: 'metadata.slot',
                label: 'Slot',
              })}
            </Group>,
            <Group key="link">
              {field(TextInput, {
                name: 'metadata.linkDiscord',
                label: 'Discord server id',
              })}
              {field(TextInput, {
                name: 'metadata.linkTelegram',
                label: 'Telegram channel name',
              })}
              {field(TextInput, {
                name: 'metadata.linkX',
                label: 'Twitter username',
              })}
            </Group>,
            <Group key="invite">
              {field(TextInput, {
                name: 'metadata.inviteDiscord',
                label: 'Discord invite link',
              })}
              {field(TextInput, {
                name: 'metadata.inviteTelegram',
                label: 'Telegram invite link',
              })}
            </Group>,
            field(ArrayInput, {
              name: 'metadata.links',
              label: 'Custom links',
              renderLayout: 'horizontal',
              renderInputs: (index) => (
                <Group grow>
                  {field(TextInput, {
                    name: `metadata.links.${index}.title`,
                    placeholder: 'Title',
                  })}
                  {field(TextInput, {
                    name: `metadata.links.${index}.link`,
                    placeholder: 'Link',
                  })}
                </Group>
              ),
            }),
          ],
        }),
      ]}
    />
  );
};

export default function () {
  projectWebModule.adminPages.push(
    {
      label: 'Fee airdrops',
      path: 'feeAirdrops',
      icon: IconNews,
      element: (
        <IfCanAccessApi api={feeAirdropApi.getMany}>
          <FeeAirdropsPage />
        </IfCanAccessApi>
      ),
    },
    {
      label: 'Und airdrops',
      path: 'undAirdrops',
      icon: IconSquareRoundedLetterU,
      element: (
        <IfCanAccessApi api={undAirdropApi.getMany}>
          <UndAirdropsPage />
        </IfCanAccessApi>
      ),
    }
  );
}
