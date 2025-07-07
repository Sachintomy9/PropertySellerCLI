import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';

const API_URL = 'https://api.propertyseller.com/api/v1/';

// Login & Store Tokens
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/user/login`, {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;
    console.log('Login successful:', response.data);
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    // Securely store tokens
    await Keychain.setGenericPassword('tokens', JSON.stringify({
      accessToken,
      refreshToken,
    }));

    return { success: true };
  } catch (error) {
    console.error('Login error coming from AuthService Screen:', error.response.data.message);
    Alert.alert('Error', error.response.data.message || 'Login failed');
    return { success: false, error: error.message };
  }
};

// check if user is in guest mode
export const isGuestUser = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials?.username === 'guest') {
      const guestData = JSON.parse(credentials.password);
      return guestData?.isGuest === true;
    }
    return false;
  } catch (error) {
    console.error('Error checking guest mode:', error);
    return false;
  }
};



// Get stored tokens
export const getTokens = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return JSON.parse(credentials.password);
    }
    return null;
  } catch (error) {
    console.error('Keychain error:', error);
    return null;
  }
};

// Refresh Access Token
export const refreshToken = async () => {
  try {
    const tokens = await getTokens();
    if (!tokens?.refreshToken) throw new Error('No refresh token');

    const response = await axios.post(`${API_URL}/auth/user/refresh-token`, {
      refreshToken: tokens.refreshToken,
    });

    const { accessToken } = response.data;
    
    // Update stored accessToken
    await Keychain.setGenericPassword('tokens', JSON.stringify({
      accessToken,
      refreshToken: tokens.refreshToken,  // Keep the same refreshToken
    }));

    return accessToken;
  } catch (error) {
    console.error('Refresh token error:', error);
    await logout();  // Force logout if refresh fails
    return null;
  }
};

// Logout
export const logout = async () => {
  await Keychain.resetGenericPassword();
};