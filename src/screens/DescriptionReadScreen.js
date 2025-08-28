import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  I18nManager,
  Animated,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
// import BackIcon from '../assets/svg/svgicons/Details/BackIcon';
import { fonts } from '../../styles/fonts';
const THUMB_MIN_HEIGHT = 30;
// Responsive sizing functions
import BackIcon from '../assets/svg/svgicons/Details/BackIcon';

const { width } = Dimensions.get('window');
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;

const DescriptionReadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { description, descriptionInArabic } = route.params;

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


  const [language, setLanguage] = useState('en'); // 'en' or 'ar'

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const isArabic = language === 'ar';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <View style={{ alignSelf: "center", }}>
            <BackIcon
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.languageButtons}>
          <TouchableOpacity
            onPress={() => setLanguage('en')}
            style={[styles.langBtn, language === 'en' && styles.activeBtn]}
          >
            <Text style={language === 'en' ? styles.activeText : styles.inactiveText}>English</Text>
          </TouchableOpacity>

          {descriptionInArabic && (
            <TouchableOpacity
              onPress={() => setLanguage('ar')}
              style={[styles.langBtn, language === 'ar' && styles.activeBtn]}
              disabled={!descriptionInArabic}
            >
              <Text style={[language === 'ar' ? styles.activeText : styles.inactiveText, { textAlign: 'right', writingDirection: 'rtl' }]}> عربي</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <Animated.ScrollView
        style={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onContentSizeChange={(_, height) => setContentHeight(height)}
        onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
      >
        <Text style={[styles.descriptionText, isArabic && { textAlign: 'right', writingDirection: 'rtl' }]}>
          {isArabic ? (descriptionInArabic || 'لا توجد بيانات متاحة') : (description || 'No description available')}
        </Text>
      </Animated.ScrollView>
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
  );
};

export default DescriptionReadScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(4),
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom:5,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#FFDDE5',
    height: 35,
    width: 35,
    borderRadius: 4,
  },
  languageButtons: {
    flexDirection: 'row',
    // marginRight: 140,
    flex:1,
    marginLeft:10,
    gap:10,
    // width: "48%"

  },
  langBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    // marginHorizontal: 4,
    backgroundColor: '#f1f1f1',
    // width: "48%",
    flex:1,
  },
  activeBtn: {
    backgroundColor: '#FFDDE5',
  },
  activeText: {
    color: '#ff1645',
    fontFamily: fonts.PoppinsSemiBold,
  },
  inactiveText: {
    color: '#000',
    fontFamily: fonts.PoppinsSemiBold,
  },
  content: {
    // padding: 20,
    paddingVertical:10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#333',
    fontFamily: fonts.PoppinsRegular,
  },
  scrollbarTrack: {
    position: 'absolute',
    right: 0,
    top: 90,
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