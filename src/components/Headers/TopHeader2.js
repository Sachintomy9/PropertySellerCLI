import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/svg/svgicons/Details/BackIcon';
import BellIcon from '../../assets/svg/svgicons/Others/BellIcon';
import { fonts } from '../../../styles/fonts';

const TopHeader2 = ({ title, showBack = true, onRightPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftIcon}>
          < BackIcon color="#ff1645"/>
        </TouchableOpacity>
      ) : (
        <View style={styles.leftIcon} /> // Empty space to align title
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icon (e.g., Bell) */}
      <TouchableOpacity onPress={onRightPress} style={styles.rightIcon}>
        <BellIcon/>
      </TouchableOpacity>
    </View>
  );
};

export default TopHeader2;

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  leftIcon: {
    width: 30,
    alignItems: 'flex-start',
    marginTop:40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    marginTop:40,
    fontFamily: fonts.PoppinsSemiBold
  },
  rightIcon: {
    width: 30,
    alignItems: 'flex-end',
    marginTop:40,
  },
});
