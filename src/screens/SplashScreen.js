// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../styles/fonts';
import P_logosvg from '../assets/svg/svgimages/P_logosvg'; 

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Intro1'); // Navigate to the first intro screen after 3 seconds
        }, 2000); // 3000 milliseconds = 3 seconds

        return () => clearTimeout(timer); // Clear the timer on unmount
    }, [navigation]);

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
