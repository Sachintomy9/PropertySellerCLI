// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTokens, isGuestUser, logout as logoutService } from '../services/AuthService';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isGuest: false,
    initializing: true,
  });

  const loadAuthState = async () => {
    const tokens = await getTokens();
    const guest = await isGuestUser();
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
  }, 400);
};

const continueAsGuest = async () => {
  await Keychain.setGenericPassword('guest', JSON.stringify({ isGuest: true }));
  setTimeout(async () => {
    await loadAuthState();
    console.log('Guest mode enabled in AuthContext');
  }, 400);
};

  const logout = async () => {
    await logoutService();
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
