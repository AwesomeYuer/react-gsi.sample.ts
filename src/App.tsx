import './App.css';
import jwt_decode from 'jwt-decode';

import {
  GsiButton,
  GsiClient,
  IdTokenProvider,
  useIdToken
} from 'react-gsi';


import {
  ErrorFallback,
  IdleFallback,
  LoadingFallback
} from './Fallback';



const idConfiguration: IdConfiguration = {
  client_id: '944301045116-usq3bf0h2algmn9g39gp34qobs82171v.apps.googleusercontent.com',
  auto_select: true // automatically sign in, see: https://developers.google.com/identity/gsi/web/guides/automatic-sign-in-sign-out
}

const buttonConfiguration: GsiButtonConfiguration = {
  type: 'standard',
  theme: 'outline',
  size: 'large'
}

const signOut = () => {
  // refresh the page
  window.location.reload();
}


export function App() {
  return (
      <GsiClient idle={IdleFallback} loading={LoadingFallback} error={ErrorFallback}>
          <IdTokenProvider configuration={idConfiguration}>
              <Page />
          </IdTokenProvider>
      </GsiClient>
  )
}

function Page() {
  const token = useIdToken();

  


  const signedOut = token === null;

  // useOneTap({
  //     show: signedOut
  // })

  if (signedOut) {
      return (
          <>
              <h1>Logged Out</h1>
              <GsiButton configuration={buttonConfiguration} />
          </>
      );
  } else {
      const { select_by, credential } = token;

      const jwt = jwt_decode(credential);

      return (
          <>
              <h1>Logged In via {select_by}</h1>
              <p>{credential}</p>
              <p>
              <pre style={{ maxHeight: '400px', overflow: 'auto', padding: '0.5em 0' }}>
                {JSON.stringify(jwt, null, 2)}
              </pre>
              </p>
              <button className="g_id_signout" onClick={() => signOut()}>Sign Out</button>
          </>
      )
  }
}



export default App;
