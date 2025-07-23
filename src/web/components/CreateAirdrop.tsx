import { Grid, Modal, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import { ActionButton, openNoticeModal } from '@roxavn/core/web';
import { IconSend } from '@tabler/icons-react';
import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { useConfig } from 'wagmi';

import { utils } from '../utils.js';
import { airdropAbi, constants } from '../../base/index.js';

export function CreateAirdrop({
  onClose,
  opened,
}: {
  onClose: () => void;
  opened: boolean;
}) {
  const config = useConfig();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const form = useForm({
    initialValues: {
      tokenAddress: '' as `0x${string}`,
      tokenId: 0,
      tokenAmount: 1000,
      tokenAmountPerAccount: 100,
      start: tomorrow,
      duration: 14,
      dropPercent: 50,
      claimDuration: 7,
      name: '',
      image: '',
    },
  });

  async function submit() {
    const airdropAddress = constants.getAirdropContract();
    const tokenAmount = BigInt(form.values.tokenAmount) * BigInt(10 ** 18);
    const tokenAmountPerAccount =
      BigInt(form.values.tokenAmountPerAccount) * BigInt(10 ** 18);
    if (form.values.tokenId === 0) {
      await utils.allowance(
        form.values.tokenAddress,
        tokenAmount,
        airdropAddress,
        config
      );
    }
    const hash = await writeContract(config, {
      abi: airdropAbi,
      address: airdropAddress,
      functionName: 'createCampaign',
      args: [
        form.values.tokenAddress,
        BigInt(form.values.tokenId),
        tokenAmount,
        tokenAmountPerAccount,
        BigInt(Math.floor(form.values.start.getTime() / 1000)),
        BigInt((form.values.duration + form.values.claimDuration) * 24 * 3600),
        BigInt(form.values.claimDuration * 24 * 3600),
        JSON.stringify({
          name: form.values.name,
          image: form.values.image,
          dropPercent: form.values.dropPercent / 100,
        }),
      ],
    });
    await waitForTransactionReceipt(config, { hash });
    openNoticeModal({ message: 'Create airdrop campaign successfully' });
  }

  return (
    <Modal
      size="xl"
      opened={opened}
      onClose={onClose}
      title={`Create airdrop campaign`}
    >
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            label="Campaign name"
            {...form.getInputProps('name')}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            label={
              <span>
                {'Campaign image url '}
                <a
                  href="https://postimages.org/"
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  postimages.org
                </a>
              </span>
            }
            placeholder="Image size: width 500px, height 300px"
            {...form.getInputProps('image')}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            withAsterisk
            label="Token address"
            {...form.getInputProps('tokenAddress')}
          ></TextInput>
        </Grid.Col>
        {/* <Grid.Col span={6}>
          <NumberInput
            withAsterisk
            label="Token id"
            {...form.getInputProps('tokenId')}
          ></NumberInput>
        </Grid.Col> */}
        <Grid.Col span={6}>
          <NumberInput
            withAsterisk
            label="Drop token percent (%)"
            {...form.getInputProps('dropPercent')}
            min={1}
            max={100}
          ></NumberInput>
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            withAsterisk
            label="Token amount"
            {...form.getInputProps('tokenAmount')}
          ></NumberInput>
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            withAsterisk
            label="Token amount per account"
            {...form.getInputProps('tokenAmountPerAccount')}
          ></NumberInput>
        </Grid.Col>
        <Grid.Col span={4}>
          <DateTimePicker
            withAsterisk
            label="Start date"
            minDate={new Date()}
            {...form.getInputProps('start')}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            withAsterisk
            label="Duration (in days)"
            {...form.getInputProps('duration')}
          ></NumberInput>
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            withAsterisk
            label="Claim duration (in days)"
            {...form.getInputProps('claimDuration')}
            min={7}
          ></NumberInput>
        </Grid.Col>
        <Grid.Col span={4}>
          <ActionButton leftSection={<IconSend size="1rem" />} onClick={submit}>
            Submit
          </ActionButton>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
