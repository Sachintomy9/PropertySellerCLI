import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { fonts } from '../../styles/fonts'
import IntroButton from '../components/buttons/IntroButton'
import IntroScreen3svg from '../assets/svg/svgimages/IntroScreen3svg'
import { useNavigation } from '@react-navigation/native'

const IntroScreen3 = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('Intro4'); // Navigate to the next intro screen
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transparent & Honest.</Text>
      <Text style={styles.subtitle}>We give clear, accurate details with organized listings, so you can decide confidently without hidden surprises.</Text>
      <IntroScreen3svg   />
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

export default IntroScreen3;
