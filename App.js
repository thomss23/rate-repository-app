import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/hooks/useAuthStorage';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

/*
  Accessing constants cand be done using Constants.manifest if ever needed
*/
const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider> 
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;

