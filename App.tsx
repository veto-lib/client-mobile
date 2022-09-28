import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import 'moment/locale/fr';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import Navigation from './navigation';
import { setToken } from './services/auth-service';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const discovery = useAutoDiscovery(
    'https://login.microsoftonline.com/eae410ed-7a7e-451a-b931-636bbc191a74/v2.0'
  );
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '6e7ff94f-0d1e-4ac6-af6a-15c5713f28fc',
      scopes: ['openid', 'profile', 'email', 'api://veto-lib/all'],
      redirectUri: makeRedirectUri({
        useProxy: true,
        scheme: 'myapp',
      }),
      responseType: 'token'
    },
    discovery
  );

  useEffect(() => {
    if (!request) {
      return;
    }
    promptAsync({ useProxy: true })
      .then(() => setIsAuthenticated(true))
  }, [request]);

  useEffect(() => {
    if (!!response && response.type === 'success') {
      setToken(response.authentication?.accessToken as string);
    }
  }, [response]);

  if (!isLoadingComplete || !isAuthenticated) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
};

export default App;
