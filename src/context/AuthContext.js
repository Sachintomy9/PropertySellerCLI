// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTokens, isGuestUser, logout as logoutService } from '../services/AuthService';
import * as Keychain from 'react-native-keychain';
import { collectWishlist } from '../services/AuthService';
import { useProfile } from './ProfileContext';
import { useWishlist } from './WishlistContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { loadProfile,updateProfile} = useProfile();
  const { updateWishlist } = useWishlist();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isGuest: false,
    initializing: true,
  });

  const loadAuthState = async () => {
    const tokens = await getTokens();
    const guest = await isGuestUser();

    const freshProfile = await loadProfile();  /* from ProfileContext */
    console.log(" Profile id from AuthContext:", freshProfile.id);

  if (!guest && freshProfile?.id) {
    await collectWishlist(freshProfile, updateWishlist); 
  }
    setAuthState({
      isAuthenticated: !!tokens?.accessToken || guest,
      isGuest: guest,
      initializing: false,
    });
  };

  useEffect(() => {
    loadAuthState();
  }, []);

 const loginUser = async () => {
  // Add slight delay to let Keychain finish writing
  setTimeout(async () => {
    await loadAuthState();
  }, 800);
};

const continueAsGuest = async () => {
  await Keychain.setGenericPassword('guest', JSON.stringify({ isGuest: true }));
  setTimeout(async () => {
    await loadAuthState();
    console.log('Guest mode enabled in AuthContext');
  }, 700);
};

  const logout = async () => {
    await logoutService();

    updateProfile({ name: '', email: '', phone: '', id: '' });
    updateWishlist([]); // or null if default is null

    setAuthState({
      isAuthenticated: false,
      isGuest: false,
      initializing: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, loginUser, continueAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
