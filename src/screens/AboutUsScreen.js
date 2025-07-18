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

const AboutUsScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

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
      <TopHeader2 title={"About Us"} />
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
    
        <Text style={styles.title}>Story Of PropertySeller.</Text>


          <Text style={styles.blogContent}>At PropertySeller, we are not just a marketplace—we are the bridge that connects buyers with 
            the best off-plan property opportunities. Our journey began with a clear vision: to simplify the real estate process,
            eliminate complexities, and bring transparency to every transaction.</Text>
            <Text style={styles.blogContent}>
            We saw a gap in the market where buyers struggled to find reliable information, access the right projects, and connect
             with trusted sellers. PropertySeller was born out of the need to fill this void—creating a seamless platform that offers
              verified listings, real-time insights, and expert support to guide every client toward their ideal investment.
              From the moment a buyer shows interest in a property to the final transaction, we ensure a smooth and efficient
               experience. We have built strong relationships with top developers, giving our users access to exclusive deals
                and early investment opportunities that are often hard to find elsewhere. Our approach is simple: provide accurate
                 information, eliminate unnecessary barriers, and help buyers make informed decisions with confidence.</Text>

            <Text style={styles.blogContent}>At PropertySeller, we believe real estate should be hassle-free, accessible, and rewarding. 
                That’s why we go beyond just being a platform—we act as your trusted partner in every step of the journey, ensuring 
                that you invest wisely and with full confidence. What makes PropertySeller different is our commitment to 
                transparency and efficiency. We understand that real estate transactions can be overwhelming, especially for
                 first-time buyers and investors. That’s why we leverage technology and market expertise to provide a streamlined,
                  user-friendly experience where buyers can explore properties, compare options, and get expert advice—all in one place.
                   Our platform is designed to save time, reduce risks, and maximize investment potential. Beyond just connecting buyers 
                   and sellers, we are building a community of real estate enthusiasts, investors, and industry experts. PropertySeller
                    is not just a marketplace; it is a movement towards a smarter, more connected, and more informed real estate industry.
                     Whether you are looking for a luxury apartment in Dubai or a high-growth investment opportunity, PropertySeller is
                      here to guide you every step of the way.PropertySeller operates under EMIRAAZ, its parent company, which provides
                       the foundation and vision to drive innovation in the real estate industry.</Text>

            <Text style={{fontSize: 22,fontFamily: fonts.PoppinsSemiBold, alignSelf: "center",paddingHorizontal: 12,paddingTop: 10,color: '#000'}}>Meet the Founder - </Text>
            <Text style={{fontSize: 22,fontFamily: fonts.PoppinsSemiBold, alignSelf: "center",paddingHorizontal: 12,paddingBottom: 40,color: '#000'}}>Ashiq Emiraaz </Text>

            <Text style={{fontFamily: fonts.PoppinsRegular, fontSize: 17, paddingHorizontal: 12, paddingBottom: 50, textAlign: "center"}} >Ashiq Emiraaz is the driving force behind PropertySeller. With years of experience in real estate
                 and business development, he understood the challenges that buyers and investors face when navigating the market. 
                 His vision was to create a tech-driven, customer-focused platform that removes uncertainty and makes property transactions
                  effortless.From launching startups to building industry connections, Ashiq’s journey has been fueled by innovation, 
                  determination, and a passion for real estate. Under his leadership, PropertySeller is not just growing—it is redefining the 
                  way off-plan properties are bought and sold.With a relentless focus on customer satisfaction and market transparency, 
                  Ashiq continues to push the boundaries of what’s possible in real estate, ensuring that PropertySeller remains the go-to 
                  destination for buyers and investors worldwide.</Text>


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

export default AboutUsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
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
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 10,
    color: '#000',
  },
  blogContent: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 17,
    paddingHorizontal: 12,
    paddingBottom: 50,
    textAlign: "justify"
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
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
