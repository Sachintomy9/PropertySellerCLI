import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'; 
import NetworkProvider from './src/components/NetworkChecker';
import { AuthProvider } from './src/context/AuthContext';
import { ProfileProvider } from './src/context/ProfileContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { MortgageProvider } from './src/context/MortgageContext';

const App = () => {
  return (
    <NetworkProvider>
      <ProfileProvider>
        <WishlistProvider>
          <AuthProvider>
            <MortgageProvider>
              <AppNavigator />
            </MortgageProvider>
          </AuthProvider>
        </WishlistProvider>
      </ProfileProvider>
    </NetworkProvider>
  )
}

export default App
