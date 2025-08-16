import React from 'react';
import { View, Text, StyleSheet, SafeAreaView,StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../styles/fonts';
import { setSeenAiAgentIntro } from '../utils/IntroStorage';
import AiAgentIntro from '../assets/svg/svgimages/AiAgentIntro';
import IntroButton from '../components/buttons/IntroButton';
import BackIcon from '../assets/svg/svgicons/Details/BackIcon';
import IntroNextIcon from '../assets/svg/svgicons/Others/IntroNextIcon';

const AiAgentIntroScreen = () => {
  const navigation = useNavigation();

  const onContinue = async () => {
    await setSeenAiAgentIntro();
    // replace so user doesn't go back to intro
    navigation.replace('AiAgentMain');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={{top:50}}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                < BackIcon color="#000"/>
            </TouchableOpacity>
            </View>
        {/* This content container takes up all available space and centers its content */}
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>
            Meet Your New{'\n'} {/* Added a newline character for the line break */}
            <Text style={styles.highlight}>Property Agent</Text>
          </Text>

          <Text style={styles.subText}>
            No more filters. No more forms. Just chat and discover. Powered by{' '}
            <Text style={styles.aiText}>AI</Text>
          </Text>

          {/* Your custom SVG image component */}
          <AiAgentIntro />
        </View>

        {/* The button is placed outside the content container to fix it to the bottom */}
        <TouchableOpacity style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonText}>Continue</Text>
          {/* The icon is absolutely positioned within the button */}
          <View style={styles.iconWrapper}>
            <IntroNextIcon />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AiAgentIntroScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    // Add padding at the bottom to give the button some space from the screen edge
    paddingBottom: 30,
  },
  // This new container holds the text and image
  contentContainer: {
    flex: 1, // Takes up all available vertical space, pushing the button down
    alignItems: 'center',
    justifyContent: 'center', // Centers the content vertically and horizontally
  },
  heading: {
    fontSize: 34, // Increased font size to match screenshot
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16, // Adjusted margin
    fontFamily: fonts?.PoppinsSemiBold,
    lineHeight: 44, // Added line height for better spacing
  },
  highlight: {
    color: '#ff1645',
    fontFamily: fonts?.PoppinsSemiBold,
  },
  subText: {
    fontSize: 16, // Increased font size
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 40, // Adjusted margin
    fontFamily: fonts?.PoppinsRegular,
    lineHeight: 24, // Added line height
  },
  aiText: {
    color: '#ff1645',
    fontWeight: '600',
    fontFamily: fonts?.PoppinsSemiBold,
  },
  // Mock style for the SVG placeholder
  mockImage: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#ff1645',
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // This centers the buttonText
    width: '100%', // Make button take full width within padding
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Increased font size
    fontWeight: '600',
    fontFamily: fonts?.PoppinsMedium,
  },
  // This wrapper positions the icon on the right side of the button
  iconWrapper: {
    position: 'absolute',
    right: 25,
  },
});