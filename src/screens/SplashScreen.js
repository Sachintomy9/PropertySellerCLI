// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import P_logosvg from '../assets/svg/svgimages/P_logosvg'; 

const SplashScreen = () => {
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      // Navigate to the next screen after the delay
      // For example, you can use navigation.navigate('NextScreen');
      console.log('Splash screen finished');
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);
  return (
    <View style={styles.container}>
      <P_logosvg />
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { 
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
