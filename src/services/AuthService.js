import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';
import { useWishlist } from '../context/WishlistContext';
import api from './ApiClient';


const API_URL = 'https://api.propertyseller.com/api/v1/';

// LOGIN: Store access + refresh tokens securely
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/user/login`, {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;

    await Keychain.setGenericPassword('tokens', JSON.stringify({
      accessToken,
      refreshToken,
    }));

    console.log('🔐 Tokens stored after login.');
    return { success: true };
  } catch (error) {
    const msg = error?.response?.data?.message || 'Login failed';
    console.error('❌ Login error:', msg);
    Alert.alert('Error', msg);
    return { success: false, error: msg };
  }
};

// LOGOUT: Clear tokens from secure storage
export const logout = async () => {
  await Keychain.resetGenericPassword();
  console.log('🔒 User logged out. Tokens cleared.');
};

// CHECK: If user is a guest
export const isGuestUser = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials?.username === 'guest') {
      const guestData = JSON.parse(credentials.password);
      return guestData?.isGuest === true;
    }
    return false;
  } catch (error) {
    console.error('❌ Error checking guest mode:', error);
    return false;
  }
};

// GET TOKENS: From Keychain
export const getTokens = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return JSON.parse(credentials.password);
    }
    return null;
  } catch (error) {
    console.error('❌ Keychain read error:', error);
    return null;
  }
};

// REFRESH ACCESS TOKEN: When JWT expires
export const refreshToken = async () => {
  try {
    const tokens = await getTokens();
    if (!tokens?.refreshToken) throw new Error('No refresh token found');

    console.log('🔁 Attempting to refresh token...');

    const response = await axios.post(`${API_URL}auth/user/refresh-token`, {
      refreshToken: tokens.refreshToken,
    });

    const { token: accessToken, refreshToken: newRefreshToken } = response.data;

    console.log("New tokens:", response.data);
    console.log("New Access Token:", accessToken);
    await Keychain.setGenericPassword('tokens', JSON.stringify({
      accessToken,
      refreshToken: newRefreshToken,
    }));


    console.log('✅ Token refreshed and stored successfully.');
    return accessToken;
  } catch (error) {
    console.error('❌ Refresh token failed:', error?.response?.data || error.message);
    await logout();
    return null;
  }
};

export const collectWishlist = async (profile, updateWishlist) => {
  try {
    const response = await api.get(`wishlist/${profile.id}`);
    if (response.data.success) {
      console.log("response from AuthService collectWishlist", response.data.data);
      updateWishlist(response.data.data);
    }
  } catch (error) {
    console.error('Error fetching properties:', error);
  }
};
