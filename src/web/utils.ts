import { apiFetcher } from '@roxavn/core/web';
import {
  Config,
  getAccount,
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from '@wagmi/core';
import { erc20Abi } from 'viem';
import { partnerApi } from '../base/index.js';

export const utils = {
  openPartnerLink: async (link: string, newTab?: boolean) => {
    const url = new URL(link);
    let newLink = link;
    if (url.hostname.endsWith('unidrop.ai')) {
      const data = await apiFetcher.fetch(partnerApi.getJwt);
      url.search = new URLSearchParams(data).toString();
      newLink = url.toString();
    }
    if (newTab) {
      const a = document.createElement('a');
      a.href = newLink;
      a.target = '_blank';
      a.click();
    } else {
      location.replace(newLink);
    }
  },
  async allowance(
    tokenAddress: `0x${string}`,
    amount: bigint,
    to: `0x${string}`,
    config: Config
  ) {
    const account = getAccount(config);
    const allowance = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'allowance',
      args: [account.address as any, to],
    });
    if (allowance < amount) {
      const hash = await writeContract(config, {
        abi: erc20Abi,
        address: tokenAddress,
        functionName: 'approve',
        args: [to, amount],
      });
      await waitForTransactionReceipt(config, { hash });
    }
  },
};
