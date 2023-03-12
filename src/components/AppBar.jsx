import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';

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
  return(
  <View style={styles.container}>
    <ScrollView horizontal>

      <View>
        <Link to="/signin">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </View>

      <Pressable onPress={() => console.log('pressed')}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
      </Pressable>
    </ScrollView>
  </View>
)};

export default AppBar;
