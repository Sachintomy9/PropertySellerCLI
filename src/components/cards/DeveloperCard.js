import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ForwardIcon from '../../assets/svg/svgicons/Others/ForwardIcon';
import { fonts } from '../../../styles/fonts';


const DeveloperCard = ({ developer, onPress }) => {
  return (
    <View>
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.logoWrapper}>
        {developer?.image?.url ? (
        <Image
          source={{ uri: developer.image.url }}
          style={styles.logo}
          resizeMode="contain"
        />
      ) : (
        <View style={[styles.logo, styles.fallbackLogo]}>
          {/* Optional: Add a placeholder icon or text */}
          <Text>No Image</Text>
        </View>
      )}
      </View>
      <Text style={styles.name}>{developer.name}</Text>
      <ForwardIcon color='#000' height={20} width={20}/>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    width: "92%",
    height:160,
  },
  logoWrapper: {
    width: 130,
    height: 120,
    marginLeft:10,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
  },
  logo: {
    width: 48,
    height: 48,
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    fontFamily: fonts.PoppinsRegular,
    color: '#000',
  },
  icon: {
    marginLeft: 'auto',
  },
});

export default DeveloperCard;
