import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { useSelector } from 'react-redux';
import MultipleButton from '../components/buttons/MultipleButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ImageViewing from 'react-native-image-viewing';
import HeaderTab from '../components/Headers/HeaderTab';
// Responsive sizing functions
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;
const { width } = Dimensions.get('window');


const FloorPlansScreen = () => {
  const property = useSelector((state) => state.property.property);
  const mainImages = property?.mainImages || [];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const THUMB_MIN_HEIGHT = 20;

  const thumbHeight = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
    outputRange: [
      THUMB_MIN_HEIGHT,
      Math.max((scrollViewHeight / contentHeight) * scrollViewHeight, THUMB_MIN_HEIGHT),
    ],
    extrapolate: 'clamp',
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
    outputRange: [0, scrollViewHeight - THUMB_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const openViewer = (index) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <HeaderTab activeTab="Image Gallery" />

          <Animated.ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onContentSizeChange={(w, h) => setContentHeight(h)}
            onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
          >

            {mainImages?.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => openViewer(index)}>
                <Image
                  source={{ uri: item?.webp?.url }}
                  style={styles.image}
                  resizeMode="cover"
                />

              </TouchableOpacity>
            ))}

          </Animated.ScrollView>


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
          <MultipleButton />

          {/* Image Zoom Modal */}
          <ImageViewing
            images={mainImages.map(img => ({ uri: img.secure_url }))}
            imageIndex={currentIndex}
            visible={visible}
            onRequestClose={() => setVisible(false)}
            swipeToCloseEnabled
            doubleTapToZoomEnabled
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  );
};
export default FloorPlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(3),
    paddingTop: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: "center"
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 8,
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
