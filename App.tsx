import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import 'moment/locale/fr';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import Navigation from './navigation';
import { View } from './components/Themed';

const styles = StyleSheet.create({
  button: {
    marginTop: 100,
  }
});

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const discovery = useAutoDiscovery('https://login.microsoftonline.com/eae410ed-7a7e-451a-b931-636bbc191a74/v2.0');
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '6e7ff94f-0d1e-4ac6-af6a-15c5713f28fc',
      scopes: ['openid', 'profile', 'email', 'api://veto-lib/all'],
      redirectUri: makeRedirectUri({
        useProxy: true,
        scheme: 'myapp'
      }),
    },
    discovery
  );

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <Navigation colorScheme={colorScheme} /> */}
        <View style={styles.button}
        >
          <Button
            disabled={!request}
            title="Login"
            onPress={async () => {
              const res = await promptAsync({ useProxy: true });
              console.log(res);
            }}
          />
        </View>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
};

export default App;
