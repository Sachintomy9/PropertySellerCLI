import React,{useState,useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../styles/fonts';

import ArrowIcon from '../assets/svg/svgicons/MoreScreen/ArrowIcon';

import ProfileIcon from '../assets/svg/svgicons/MoreScreen/ProfileIcon';
import AboutIcon from '../assets/svg/svgicons/MoreScreen/AboutIcon';
import WhyDubaiIcon from '../assets/svg/svgicons/MoreScreen/WhyDubaiIcon';
import CitiesIcon from '../assets/svg/svgicons/MoreScreen/CitiesIcon';
import DevelopersIcon from '../assets/svg/svgicons/MoreScreen/DevelopersIcon';

import SavedIcon from '../assets/svg/svgicons/MoreScreen/SavedIcon';
import EnqPropIcon from '../assets/svg/svgicons/MoreScreen/EnqPropIcon';
import PurHistoryIcon from '../assets/svg/svgicons/MoreScreen/PurHistoryIcon';
import RentIncomeIcon from '../assets/svg/svgicons/MoreScreen/RentIncomeIcon';

import BlogIcon from '../assets/svg/svgicons/MoreScreen/BlogIcon';
import PropTalksIcon from '../assets/svg/svgicons/MoreScreen/PropTalksIcon';

import FreelanceRegIcon from '../assets/svg/svgicons/MoreScreen/FreelanceRegIcon';
import OpenHouseIcon from '../assets/svg/svgicons/MoreScreen/OpenHouseIcon';

import PrivacyIcon from '../assets/svg/svgicons/MoreScreen/PrivacyIcon';
import TermsCondIcon from '../assets/svg/svgicons/MoreScreen/TermsCondIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const Section = ({ items, onItemPress }) => (
  <View style={styles.section}>
    {items.map(({ label, Icon, screen }, index) => (
      <TouchableOpacity
        key={index}
        style={styles.row}
        onPress={() => onItemPress(screen || label)}
      >
        <Icon width={20} height={20} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
        <View style={styles.spacer} />
        <ArrowIcon  />
      </TouchableOpacity>
    ))}
  </View>
);

const MoreScreen = () => {
  const navigation = useNavigation();


  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const SCROLLBAR_WIDTH = 4;
  const THUMB_MIN_HEIGHT = 30;

  // 🚀 Handle press action for any item
  const handleItemPress = (screenName) => {
    console.log('Pressed:', screenName);

    // Sample logic — update as per your routes
    switch (screenName) {
      case 'Profile':
        navigation.navigate('Profile');
        break;
      case 'About':
        navigation.navigate('AboutScreen');
        break;
      case 'Saved':
        navigation.navigate('Saved');
        break;
      case 'Signin':
        navigation.navigate('LoginScreen');
        break;
      default:
        alert(`No screen configured for: ${screenName}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onContentSizeChange={(w, h) => setContentHeight(h)}
        onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Signin/Signup Button */}
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => handleItemPress('Signin')}
        >
          <Text style={styles.authText}>Signin/Signup</Text>
        </TouchableOpacity>

        {/* Sections */}
        <Section
          onItemPress={handleItemPress}
          items={[
            { label: 'Profile', Icon: ProfileIcon, screen: 'Profile' },
            { label: 'About', Icon: AboutIcon, screen: 'AboutScreen' },
            { label: 'Why Dubai', Icon: WhyDubaiIcon },
            { label: 'Cities', Icon: CitiesIcon },
            { label: 'Developers', Icon: DevelopersIcon },
          ]}
        />

        <Section
          onItemPress={handleItemPress}
          items={[
            { label: 'Saved', Icon: SavedIcon, screen: 'Saved' },
            { label: 'Enquired Property', Icon: EnqPropIcon },
            { label: 'Purchase History', Icon: PurHistoryIcon },
            { label: 'Rental Income', Icon: RentIncomeIcon },
          ]}
        />

        <Section
          onItemPress={handleItemPress}
          items={[
            { label: 'Blog', Icon: BlogIcon },
            { label: 'Property Talks', Icon: PropTalksIcon },
          ]}
        />

        <Section
          onItemPress={handleItemPress}
          items={[
            { label: 'Freelance Registration', Icon: FreelanceRegIcon },
            { label: 'Open House', Icon: OpenHouseIcon },
          ]}
        />

        <Section
          onItemPress={handleItemPress}
          items={[
            { label: 'Privacy Policy', Icon: PrivacyIcon },
            { label: 'Terms & Conditions', Icon: TermsCondIcon },
          ]}
        />
      </Animated.ScrollView>
      
        <View style={styles.scrollbarTrack}>
          <Animated.View
            style={[
              styles.scrollbarThumb,
              {
                height: scrollY.interpolate({
                  inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
                  outputRange: [
                    THUMB_MIN_HEIGHT,
                    Math.max(
                      (scrollViewHeight / contentHeight) * scrollViewHeight,
                      THUMB_MIN_HEIGHT
                    ),
                  ],
                  extrapolate: 'clamp',
                }),
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
                      outputRange: [0, scrollViewHeight - THUMB_MIN_HEIGHT],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  authButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF1645',
    alignItems: 'center',
  },
  authText: {
    color: '#FF1645',
    fontFamily: fonts.PoppinsBold,
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.PoppinsRegular
  },
  icon: {
    marginRight: 15,
  },
  spacer: {
    flex: 1,
  },
  scrollbarTrack: {
  width: 6,
  backgroundColor: '#f0f0f0',
  borderRadius: 3,
  marginRight: 2,
  marginTop: 10,
  marginBottom: 10,
},
scrollbarThumb: {
  width: 4,
  backgroundColor: '#FF1645',
  borderRadius: 2,
  position: 'absolute',
  left: 1,
},
});

export default MoreScreen;


