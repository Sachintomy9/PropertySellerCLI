import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ForwardIcon from '../../assets/svg/svgicons/Others/ForwardIcon';
import { fonts } from '../../../styles/fonts';


const DeveloperCard = ({ developer, onPress }) => {
  const imageUrl = developer.image?.webp?.url || developer.image?.png?.url || null;

  return (
    <View>
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.logoWrapper}>
        {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
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
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    width: "95%",
    height:120,
  },
  logoWrapper: {
    width: 120,
    height: 95,
    marginLeft:0,
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
