import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/svg/svgicons/Details/BackIcon';
import BellIcon from '../../assets/svg/svgicons/Others/BellIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../../styles/fonts';
const { width, height } = Dimensions.get('window');

// Responsive sizing functions
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;


const TopHeader2 = ({ title, showBack = true, showNotification = true }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['right', 'left','top']}>
      <View style={styles.container}>
        {/* Back Button */}
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftIcon}>
            <BackIcon
            style={{ width: 20, height: 20 }}
            color="#ff1645" />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftIcon} /> // Empty space to align title
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icon (e.g., Bell) */}
      {showNotification ? (
        <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={styles.rightIcon}>
          <BellIcon />
        </TouchableOpacity>
      ) : null}
    </View>
    </SafeAreaView>
  );
};

export default TopHeader2;

const styles = StyleSheet.create({
  container: {
    // height: 10,
    paddingHorizontal: responsiveWidth(3),
    paddingBottom: responsiveHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    // elevation: 0,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: 3,
  },
  leftIcon: {
    width: 30,
    alignItems: 'flex-start',
    // marginTop: 40,
  },
  title: {
    color: "#000",
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    // marginTop: 40,
    fontFamily: fonts.PoppinsSemiBold,
  },
  rightIcon: {
    width: 30,
    alignItems: 'flex-end',
    // marginTop: 40,
  },
});
