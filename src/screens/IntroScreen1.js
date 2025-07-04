import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { fonts } from '../../styles/fonts'
import IntroButton from '../components/buttons/IntroButton'
import IntroScreen1svg from '../assets/svg/svgimages/IntroScreen1svg'
import { useNavigation } from '@react-navigation/native'

const IntroScreen1 = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('Intro2'); // Navigate to the next intro screen
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Properties in One Place.</Text>
      <Text style={styles.subtitle}>Explore off-plan projects, off-plan resale, secondary sales, and land. Both commercial and residential directly on PropertySeller.</Text>
      <IntroScreen1svg   />
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

export default IntroScreen1;
