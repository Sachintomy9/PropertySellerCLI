import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { fonts } from '../../styles/fonts'
import IntroButton from '../components/buttons/IntroButton'
import IntroScreen2svg from '../assets/svg/svgimages/IntroScreen2svg'
import { useNavigation } from '@react-navigation/native'

const IntroScreen2 = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('Intro3'); // Navigate to the next intro screen
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Duplicates. Ever.</Text>
      <Text style={styles.subtitle}>Every property on PropertySeller is verified, with zero duplication, ensuring your search is clean and efficient.</Text>
      <IntroScreen2svg   />
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

export default IntroScreen2;
