import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MultipleButton from '../components/buttons/MultipleButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AmenitiesInfoScreen = () => {
  const route = useRoute();
  const { facilitiesAmenitiesDetails} = route.params;

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const THUMB_MIN_HEIGHT = 30;

  // Compute scroll thumb height
  const thumbHeight = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
    outputRange: [
      THUMB_MIN_HEIGHT,
      Math.max((scrollViewHeight / contentHeight) * scrollViewHeight, THUMB_MIN_HEIGHT),
    ],
    extrapolate: 'clamp',
  });

  // Compute scroll thumb position
  const translateY = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
    outputRange: [0, scrollViewHeight - THUMB_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(w, h) => setContentHeight(h)}
          onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          <Text style={styles.title}>Features / Amenities</Text>
                  <View style={styles.amenitiesRow}>
                  {facilitiesAmenitiesDetails.map((item, index) => (
                      <View key={index} style={styles.amenityCard}>
                      <Image source={{ uri: item.image.secure_url }}  style={styles.amenityIcon} />
                      <Text style={styles.amenityText}>{item.name}</Text>
                      </View>
                  ))}
                  </View>
        </Animated.ScrollView>

        {/* Custom Scrollbar */}
        <View style={styles.scrollbarTrack}>
          <Animated.View
            style={[
              styles.scrollbarThumb,
              {
                height: thumbHeight,
                transform: [{ translateY }],
              },
            ]}
          />
        </View>
      </SafeAreaView>

      {/* Bottom Buttons */}
      <MultipleButton />
    </View>
  );
};

export default AmenitiesInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  amenitiesRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: 10,
  marginTop: 12,
},

amenityCard: {
  width: '30%',
  backgroundColor: '#F9F9F9',
  borderRadius: 10,
  padding: 8,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#eee',
},

amenityIcon: {
  width: 50,
  height: 50,
  marginBottom: 8,
  resizeMode: 'contain',
},

  // Scrollbar styles
  scrollbarTrack: {
    position: 'absolute',
    top: 40,
    right: 6,
    bottom: 100, // leave space for buttons
    width: 4,
    backgroundColor: 'transparent',
    zIndex: 99,
  },
  scrollbarThumb: {
    width: 4,
    borderRadius: 2,
    backgroundColor: '#FF1645',
  },
});
