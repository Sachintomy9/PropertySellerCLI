import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BackIcon from '../assets/svg/svgicons/Details/BackIcon';  // left top
import BellIcon from '../assets/svg/svgicons/Others/BellIcon';// right top
import PropertySellerWhite from '../assets/svg/svgimages/PropertySellerWhite';
import { useNavigation } from '@react-navigation/native';
import WhyDubai from '../assets/images/WhyDubai.png';

const { width, height } = Dimensions.get('window');

const WhyDubaiScreen = () => {
    const navigation=useNavigation();

  return (
    <ImageBackground source={WhyDubai} style={styles.imageBackground}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Row Icons */}


        <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                < BackIcon color="#fff"/>
            </TouchableOpacity>

            <PropertySellerWhite/>


            <TouchableOpacity >
                <BellIcon color='#fff'/>
            </TouchableOpacity>
        </View>

        {/* Content Box */}
        <View style={styles.contentBox}>
          <Text style={styles.subTitle}>Why Dubai</Text>
          <Text style={styles.title}>Why Invest in Dubai Real Estate?</Text>
          <Text style={styles.paragraph}>
            Dubai has emerged as one of the world’s most attractive destinations
            for real estate investment. With its thriving economy, world-class
            infrastructure, and investor-friendly policies, the city offers
            unparalleled opportunities for both local and international
            investors. Here’s why you should consider investing in Dubai real
            estate
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  contentBox: {
    alignSelf: "center",
    top: height * 0.3, // adjust based on image
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  subTitle: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default WhyDubaiScreen;
