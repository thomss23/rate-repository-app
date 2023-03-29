import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link, useNavigate } from 'react-router-native';
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
    fontSize: 16,
    letterSpacing: 1.5,
    marginLeft: 16 
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: 16
  },
  signedInOptions: {
    flexDirection: 'row'
  }
});

const AppBar = () => {
  const [signedIn, setSignedIn] = useState(false);
  const authStorage = useAuthStorage();
  const navigate = useNavigate()
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
    navigate('/')
  };

  return(
  <View style={styles.container}>
    <ScrollView horizontal>

    <Link to="/">
        <Text style={styles.text}>Repositories</Text>
    </Link>

      {
        signedIn 
        ?
        <View style={styles.signedInOptions}>
          <View >
            <Link to="/createReview">
              <Text style={styles.text}>Create a review</Text>
            </Link>
          </View>
          <Pressable onPress={() => handleSignOut()}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        </View>


        :
        <View>
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        </View>
      } 
    </ScrollView>
  </View>
)};

export default AppBar;