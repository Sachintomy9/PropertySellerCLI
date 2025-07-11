import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'; 
import { AuthProvider } from './src/context/AuthContext';
import { ProfileProvider } from './src/context/ProfileContext';
import { WishlistProvider } from './src/context/WishlistContext';

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <WishlistProvider>
        <AppNavigator/>
        </WishlistProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
