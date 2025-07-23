import { Web3Auth } from '@roxavn/plugin-web3-auth/web';

export function Web3Action(props: { children: JSX.Element }) {
  return (
    <Web3Auth
      guestComponent={(openWeb3Modal) => (
        <button
          className="btn btn-primary rounded-pill px-4"
          onClick={() => openWeb3Modal()}
        >
          Connect wallet to play
        </button>
      )}
      userComponent={() => props.children}
    />
  );
}
