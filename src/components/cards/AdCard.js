// components/AdCard.js
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AdCard = ({ ads }) => {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fading out current image
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,  // Total fade duration
        useNativeDriver: true,
      }).start();

      // After 500ms (when fade-out is halfway), change image and start fade-in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ads.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,  // Should match fade-out duration
          useNativeDriver: true,
        }).start();
      }, 1000);  // Overlap after 500ms of fade-out
    }, 5000);  // Change every 3 seconds

    return () => clearInterval(interval);
  }, [ads]);

  if (!ads || ads.length === 0) return null;

  const currentAd = ads[index];

  return (
    <View style={styles.container}>
      {<Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <Image
          source={{ uri: currentAd?.mobileImage?.webp?.url }}
          style={styles.image}
          resizeMode="contain"  // Changed from 'cover' to 'contain'
        />
      </Animated.View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 112,
    width: width - 20,
    marginBottom: 5,
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default AdCard;
