// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import P_logosvg from '../assets/svg/svgimages/P_logosvg'; 

const SplashScreen = () => {
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
