import { useState } from 'react';
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import useAsyncEffect from './useAsyncEffect';

const useAuth = () => {
  const [prompt, setPrompt] = useState(null);
  const [token, setToken] = useState(null);

  useAsyncEffect(async () => {
    const discovery = useAutoDiscovery(
      'https://login.microsoftonline.com/eae410ed-7a7e-451a-b931-636bbc191a74/v2.0'
    );
    const [_, __, promptAsync] = useAuthRequest(
      {
        clientId: '6e7ff94f-0d1e-4ac6-af6a-15c5713f28fc',
        scopes: ['openid', 'profile', 'email', 'api://veto-lib/all'],
        redirectUri: makeRedirectUri({
          useProxy: true,
          scheme: 'myapp',
        }),
      },
      discovery
    );
    const promptResult = await promptAsync({ useProxy: true });
    setToken(promptResult);
    console.log(promptResult);
  });

  return [token, prompt];
};

export default useAuth;
