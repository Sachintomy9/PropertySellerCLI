import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from '../../styles/fonts'
import IntroButton from '../components/buttons/IntroButton'
import IntroScreen4svg from '../assets/svg/svgimages/IntroScreen4svg'
import { useNavigation } from '@react-navigation/native'

const IntroScreen4 = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('Home'); // Navigate to the next intro screen
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Privacy, Our Priority</Text>
      <Text style={styles.subtitle}>Your data stays safe. We protect your privacy at every step of your property journey.</Text>
      <IntroScreen4svg   />
      <IntroButton 
        title="Next"
        onPress={handleNextPress}/>


    </View>
  )
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
    color: '#000',
    fontFamily: fonts.PoppinsBold
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },

});

export default IntroScreen4;
