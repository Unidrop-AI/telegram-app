import { Checkbox, Group, Modal, Stack, Text } from '@mantine/core';
import classes from './UserTasks.module.css';
import { useState } from 'react';
import { apiFetcher } from '@roxavn/core/web';
import { routeApi } from '../../base/index.js';

export function UserTasks({
  opened,
  onClose,
  tasks,
  partner,
  campaignId,
}: {
  onClose: () => void;
  opened: boolean;
  tasks: Record<string, any>;
  partner: Record<string, any>;
  campaignId: string;
}) {
  const [value, setValue] = useState<string[]>(Object.keys(tasks));

  return (
    <Modal opened={opened} onClose={onClose} title="Todo list">
      <Checkbox.Group
        value={value}
        onChange={setValue}
        label="Please join or follow social media groups before playing game"
      >
        <Stack pt="md" gap="xs">
          {Object.entries(partner).map(([k, link]) => (
            <Checkbox.Card
              className={classes.root}
              radius="md"
              value={k}
              key={k}
              disabled={value.includes(k)}
              onClick={async () => {
                window.open(link, '__blank');
                await apiFetcher.fetch(routeApi.updateUserTasks, {
                  campaignId,
                  network: k,
                });
              }}
            >
              <Group wrap="nowrap" align="flex-start">
                <Checkbox.Indicator />
                <div>
                  <Text className={classes.label} tt="capitalize">
                    {k}
                  </Text>
                  <Text className={classes.description} lineClamp={1}>
                    {link}
                  </Text>
                </div>
              </Group>
            </Checkbox.Card>
          ))}
        </Stack>
      </Checkbox.Group>
      {value.length === Object.keys(partner).length && (
        <Group justify="center">
          <button
            className="btn btn-primary rounded-pill px-4 mt-4"
            onClick={() =>
              window.open('https://metaflap.unidrop.ai/game', '__blank')
            }
          >
            Play game
          </button>
        </Group>
      )}
    </Modal>
  );
}
