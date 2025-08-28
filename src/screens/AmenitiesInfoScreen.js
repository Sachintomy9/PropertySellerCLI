import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import MultipleButton from '../components/buttons/MultipleButton';
import TopHeader2 from '../components/Headers/TopHeader2';
import { fonts } from '../../styles/fonts';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const { width,height } = Dimensions.get('window');

// Responsive sizing functions
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;


const AmenitiesInfoScreen = () => {
  const route = useRoute();
  const { facilitiesAmenitiesDetails } = route.params;

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
    <SafeAreaProvider>
      <SafeAreaView
      style={{
        flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: responsiveWidth(2),
    paddingTop: 0,
      }}
      >

          <TopHeader2 title={"Features / Amenities"} />
          <View style={styles.container}>
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

              <View style={styles.amenitiesRow}>
                {facilitiesAmenitiesDetails.map((item, index) => (
                  <View key={index} style={styles.amenityCard}>
                    <Image source={{ uri: item.image?.webp?.url }} style={styles.amenityIcon} />
                    <Text style={styles.amenityText}>{item.name}</Text>
                  </View>
                ))}
              </View>
            </Animated.ScrollView>

            {/* Custom Scrollbar */}
            {/* <View style={styles.scrollbarTrack}>
          <Animated.View
            style={[
              styles.scrollbarThumb,
              {
                height: thumbHeight,
                transform: [{ translateY }],
              },
            ]}
          />
        </View> */}
          </View>

          {/* Bottom Buttons */}
          <MultipleButton />

      </SafeAreaView>

    </SafeAreaProvider>

  );
};

export default AmenitiesInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingLeft: 10,
    paddingHorizontal:responsiveHeight(2)
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: "100%",
    justifyContent: 'flex-start',
    gap: 8,
    // marginTop: 12,
  },
  amenityText: {
    color: "#000",
    textAlign: "center",
    fontSize: 12,
    fontFamily: fonts.PoppinsRegular,
  },

  amenityCard: {
    width: '31%',
    // flex:1,
    backgroundColor: '#F9F9F9',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },

  amenityIcon: {
    width: 38,
    height: 38,
    marginBottom: 8,
    resizeMode: 'contain',
  },

  // Scrollbar styles
  scrollbarTrack: {
    position: 'absolute',
    top: 40,
    right: 3,
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
