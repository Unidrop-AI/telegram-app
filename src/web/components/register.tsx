import { Link } from 'react-router';
import { ApiFirebaseAuth, firebase } from '@roxavn/plugin-firebase-auth/web';
import { Web3AuthAndRegister } from '@roxavn/plugin-web3-auth/web';

export function Register() {
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  const firebaseConfig = {
    appId: '1:1049642876411:web:18896d0a9f07529db99f5e',
    apiKey: 'AIzaSyDhgNs9gGPimhMeHIE4APgFrh6cD-uPnTk',
    authDomain: 'metadrop-f361d.firebaseapp.com',
    projectId: 'metadrop-f361d',
  };

  return (
    <ApiFirebaseAuth uiConfig={uiConfig} firebaseConfig={firebaseConfig} />
  );
}

export function SignInButton() {
  return (
    <Web3AuthAndRegister
      guestComponent={(open) => (
        <button
          className="btn btn-primary rounded-pill ps-4 pe-4 me-2"
          onClick={() => open()}
        >
          Sign in
        </button>
      )}
      userComponent={({ address }) => (
        <Link
          to="/profile"
          className="btn btn-outline-primary rounded-pill ps-4 pe-4"
        >
          {address.slice(0, 10)}...
        </Link>
      )}
    />
  );
}
