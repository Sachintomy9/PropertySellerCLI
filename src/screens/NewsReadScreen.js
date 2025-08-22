import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import TopHeader2 from '../components/Headers/TopHeader2';
import { useRoute } from '@react-navigation/native';
import { fonts } from '../../styles/fonts';

const THUMB_MIN_HEIGHT = 30;

const NewsReadScreen = () => {
  const route = useRoute();
  const { news } = route.params;

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const formatBlogDate = (isoDateString) => {
    if (!isoDateString) return "N/A";
    
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    
    // Use hyphens to match the image
    return `${day}-${month}-${year}`;
  };


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

  return (
    <View style={styles.container}>
      <TopHeader2 title={"News"} />
      <View style={styles.scrollContainer}>
        <Animated.ScrollView
          style={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          onContentSizeChange={(_, height) => setContentHeight(height)}
          onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: news?.image?.secure_url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.featuredBadge}>
                <Text style={styles.featuredText}>{news?.newCategoryDetails?.name || 'Market Insights'}</Text>
            </View>
                <Text style={styles.date}>
                Date Published : {formatBlogDate(news?.date)}
            </Text>
        </View>

      <Text style={styles.title}>{news?.newsTitle}</Text>


          <Text style={styles.newsContent}>{news?.newsBody}</Text>
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
      </View>
    </View>
  );
};

export default NewsReadScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageWrapper: {
    height: 200,
    width: '100%',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  featuredBadge: {
    top: 10,
    left: 10,
    backgroundColor: '#FFDDE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredText: {
    color: '#ff1645',
    fontFamily: fonts.PoppinsRegular,
    fontSize: 13,
  },
  date: {
    color: '#000',
    fontSize: 13,
    fontFamily: fonts.PoppinsRegular,
    left: 30,
    top: 17,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.PoppinsSemiBold,
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 10,
    color: '#000',
  },
  newsContent: {
    color: '#333',
    fontFamily: fonts.PoppinsRegular,
    fontSize: 17,
    paddingHorizontal: 12,
    paddingBottom: 50,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    paddingHorizontal: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollbarTrack: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  scrollbarThumb: {
    width: 4,
    backgroundColor: '#FF1645',
    borderRadius: 2,
  },
});
