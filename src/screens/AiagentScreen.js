// SplashScreen.js

import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AiAgentSplash from '../assets/svg/svgimages/AiAgentSplash';

const AiAgentScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('AiAgentIntro'); // Replace with your actual screen
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <AiAgentSplash/>
        {/* You can also use an SVG or Image here */}
      </View>
    </View>
  );
};

export default AiAgentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff1645',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
  width: 300,                  // Increased from 150
  height: 300,                 // Increased from 150
  borderRadius: 150,           // Half of the new width/height
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
}
});
