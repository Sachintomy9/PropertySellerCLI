// components/PressableButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native';
import { fonts } from '../../../styles/fonts';
import IntroNextIcon from '../../assets/svg/svgicons/IntroNextIcon';

const IntroButton = ({ title, onPress, style = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => {
        if (typeof onPress === 'function') {
          onPress();
        }
      }}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
      <View style={styles.iconContainer}><IntroNextIcon/></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#FF2D55',
    paddingHorizontal: 160,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    position: 'absolute',
    bottom: 40,
  },
  text: {
    color: '#fff',
    fontFamily: fonts.PoppinsBold,
    
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    right: 20, // adjust as needed
  },
});

export default IntroButton;
