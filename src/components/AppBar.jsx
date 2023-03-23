import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client'; 
import { ME } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    height: 80,
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    fontSize: 18,
    letterSpacing: 1.5,
    marginLeft: 16 // adjust this value to shift the text to the right

  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: 16
  }
});

const AppBar = () => {
  const [signedIn, setSignedIn] = useState(false);
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  
  useEffect(() => {
    if (data && data.me) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [data]);

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
    setSignedIn(false);
  };

  return(
  <View style={styles.container}>
    <ScrollView horizontal>

      {
        signedIn 
        ?
        <Pressable onPress={() => handleSignOut()}>
          <Text style={styles.text}>Sign out</Text>
        </Pressable>
        :
        <View>
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        </View>
      } 

      <Pressable onPress={() => console.log('pressed')}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
      </Pressable>
      
    </ScrollView>
  </View>
)};

export default AppBar;
