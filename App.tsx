import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'; 
import { AuthProvider } from './src/context/AuthContext';
import { ProfileProvider } from './src/context/ProfileContext';
const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AppNavigator/>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
