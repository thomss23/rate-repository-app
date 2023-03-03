import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    height: 80,
    // justifyContent: 'center',
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
  return <View style={styles.container}>
  <Pressable onPress={() => console.log('pressed')}>
    <Text style={styles.text}>Repositories</Text>
  </Pressable>

  </View>;
};

export default AppBar;
