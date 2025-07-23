export const constants = {
  ChannelTypes: {
    FEATURED_PROJECTS: 'featured-projects',
    MINI_GAMES: 'mini-games',
  },
  SkillTypes: {
    EARN: 'earn',
  },
  MessageTypes: {
    UNIDROP: 'unidrop',
  },
  Currencies: {
    TICKET: '1',
    UND: '2',
  },
  ReferralReward: {
    AMOUNT: 1000,
    CURRENCY: '2',
  },
  Skills: {
    EARN: '1',
  },
  EarnLevelUpReward: {
    AMOUNT: 1000,
    CURRENCY: '2',
  },

  getAirdropContract(
    networkId = import.meta.env.VITE_BSC_CHAIN
  ): `0x${string}` {
    switch (networkId?.toString()) {
      case '31337':
        return '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
      case '97':
        return '0x77973b3D5e919B2672EffC0Ac0de53d62D623399';
      case '56':
        return '0xfdca3A57C1d6201E54Fe8c4a3B025C9c62270452';
      default:
        throw new Error('Not support network id ' + networkId);
    }
  },
};
