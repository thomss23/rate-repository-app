import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {

  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:token`)
    // JSON.parse(accessToken)
    return accessToken ? accessToken : null;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    // JSON.stringify(accessToken)
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      accessToken)
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`)
  }
}

export default AuthStorage;