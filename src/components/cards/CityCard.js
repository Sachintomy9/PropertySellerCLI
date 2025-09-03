import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../../../styles/fonts';
import ForwardIcon from '../../assets/svg/svgicons/Others/ForwardIcon';
const CityCard = ({ city, onPress }) => {
  // Get the image URL from the API response structure
  const imageUrl = city.image?.webp?.url || city.image?.png?.url || null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          resizeMode="cover" 
        />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <Text style={styles.title}>{city.name}</Text>
      <View style={styles.tagWrapper}>
        <View style={styles.tag}><Text style={styles.tagText}>Offplan Projects - 10</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>Offplan Resale - 10</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>Secondary - 10</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>Land - 10</Text></View>
      </View>
      <View style={styles.arrowContainer}>
        <ForwardIcon width={25} height={25}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
    
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontFamily:fonts.PoppinsSemiBold,
    color: '#000',
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 13,
    color: '#333',
    fontFamily:fonts.PoppinsRegular,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#767676',
    borderRadius: 20,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CityCard;
