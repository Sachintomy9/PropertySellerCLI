import React,{useState,useRef,useEffect} from 'react';
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
import { useAuth } from '../context/AuthContext';

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
      <React.Fragment key={index}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => onItemPress(screen || label)}
        >
          <Icon width={20} height={20} style={styles.icon} />
          <Text style={styles.label}>{label}</Text>
          <View style={styles.spacer} />
          <ArrowIcon color='#888'/>
        </TouchableOpacity>
        
        {/* Add divider between items (except last one) */}
        {index < items.length - 1 && (
          <View style={styles.divider} />
        )}
      </React.Fragment>
    ))}
  </View>
);

const MoreScreen = () => {
  const navigation = useNavigation();

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const {isGuest,loginUser} = useAuth();

  const SCROLLBAR_WIDTH = 4;
  const THUMB_MIN_HEIGHT = 30;

  // check if user is in guest mode










  // 🚀 Handle press action for any item
  const handleItemPress = async (screenName) => {
    console.log('Pressed:', screenName);

    // Sample logic — update as per your routes
    switch (screenName) {
      case 'Profile':
        navigation.navigate('Profile');
        break;
      case 'About':
        navigation.navigate('About');
        break;
      case 'Why Dubai':
        navigation.navigate('WhyDubai');
        break;
      case 'Cities':
        navigation.navigate('City');
        break;
      case 'Developers':
        navigation.navigate('Developer');
        break;

      case 'Freelance Registration':
        navigation.navigate('FreelanceReg');
        break;
      case 'Seller Registration':
        navigation.navigate('SellerReg');
        break;
      case 'Open House':
        navigation.navigate('OpenHouse');
        break;
      case 'Careers':
        navigation.navigate('Careers');
        break;
      case 'Blog':
        navigation.navigate('Blogs');
        break;
      case 'News':
        navigation.navigate('News');
        break;
      case 'Login':
         await loginUser();
        navigation.navigate('Login');
        break;
      case 'Rental Income':
         await loginUser();
        navigation.navigate('Rental');
        break;
      case 'Privacy Policy':
        navigation.navigate('Privacy');
        break;
      case 'Terms & Conditions':
        navigation.navigate('Terms');
        break;
      case 'Help':
        navigation.navigate('HelpCenter');
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
        {isGuest && (
          <TouchableOpacity
          style={styles.authButton}
          onPress={() => handleItemPress('Login')}
        >
          <Text style={styles.authText}>Signin/Signup</Text>
        </TouchableOpacity>
      )}
        {/* Sections */}
        <Section
          onItemPress={handleItemPress}
          items={[
            ...(!isGuest ? [{ label: 'Profile', Icon: ProfileIcon, screen: 'Profile' }] : []),
            { label: 'About', Icon: AboutIcon, screen: 'About' },
            { label: 'Why Dubai', Icon: WhyDubaiIcon },
            { label: 'Cities', Icon: CitiesIcon },
            { label: 'Developers', Icon: DevelopersIcon },
          ]}
        />

        <Section
          onItemPress={handleItemPress}
          items={[
            { label: 'Enquired Properties', Icon: EnqPropIcon },
            { label: 'Purchase History', Icon: PurHistoryIcon },
            { label: 'Rental Income', Icon: RentIncomeIcon },
          ]}
        />

        <Section
          onItemPress={handleItemPress}
          items={[
            { label: 'Blog', Icon: BlogIcon },
            { label: 'Property Talks', Icon: PropTalksIcon },
            { label: 'News', Icon: PropTalksIcon },
          ]}
        />

        <Section
          onItemPress={handleItemPress}
          items={[
            { label: 'Freelance Registration', Icon: FreelanceRegIcon },
            { label: 'Seller Registration', Icon: FreelanceRegIcon },
            { label: 'Open House', Icon: OpenHouseIcon },
            { label: 'Careers', Icon: OpenHouseIcon },
          ]}
        />

        <Section
          onItemPress={handleItemPress}
          items={[
            { label: 'Privacy Policy', Icon: PrivacyIcon },
            { label: 'Terms & Conditions', Icon: TermsCondIcon },
            { label: 'Help', Icon: TermsCondIcon },
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
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginLeft: 20,  // Space from left edge
    marginRight: 20, // Space from right edge
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginLeft:10,
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


