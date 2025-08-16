// SplashScreen.js

import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hasSeenAiAgentIntro } from '../utils/IntroStorage';
import AiAgentSplash from '../assets/svg/svgimages/AiAgentSplash';

const AiAgentSplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const seen = await hasSeenAiAgentIntro();
      if (!mounted) return;
      // Use replace so splash isn't on the back stack
      if (seen) navigation.replace('AiAgentMain');
      else navigation.replace('AiAgentIntro');
    })();
    return () => { mounted = false; };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <AiAgentSplash/>
        {/* You can also use an SVG or Image here */}
      </View>
    </View>
  );
};

export default AiAgentSplashScreen;

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
