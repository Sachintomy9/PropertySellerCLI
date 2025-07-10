import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../../styles/fonts';
import { useNavigation } from '@react-navigation/native';

const PropertyCard = ({ propertyId,propType,projectType,discount,paymentPlan,handOverQuarter,handOverYear, title, price, rooms, baths, area, location,image }) => {
  const navigation=useNavigation();

  const handleDetails = () => {
    navigation.navigate('PropDetails', { propertyId});

  }


  return(
    <View style={styles.card}>
    {/* Property Image */}
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: image }} // Replace with dynamic if needed
        style={styles.image}
        resizeMode="cover"
      />

 
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Handover Date : {handOverQuarter} {handOverYear}</Text>
          <Text style={styles.overlaySubText}>{projectType}</Text>
        </View>


       {discount && (
        <View style={styles.overlay1}>
          <Text style={styles.overlaySubText}>{discount} Discount</Text>
        </View>
      )}

    </View>

    {/* Property Info */}
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>AED {price}</Text>

      <View style={styles.specsRow}>
        <Text style={styles.specText1}>{propType}</Text>
        <Text style={styles.dot}>  |  </Text>
        <Text style={styles.specText}>{rooms} </Text>
        <Text style={styles.dot}>  |  </Text>
        <Text style={styles.specText}>{baths} Baths</Text>
        <Text style={styles.dot}>   |   </Text>
        <Text style={styles.specText}>{area} sqft</Text>
      </View>

      <Text style={styles.location}>{location}</Text>

      <Text style={styles.validated}>
        ⭐ Property Authenticity Was Validated On May 21
      </Text>

      {/* Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.detailsButton } onPress={handleDetails}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.enquireButton}>
          <Text style={styles.buttonText}>Enquire Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
    
  );
};
  




export default PropertyCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  imageWrapper: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    elevation: 2,
  },
  overlay1: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#37f73d',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    elevation: 2,
  },
  overlayText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  overlaySubText: {
    fontSize: 12,
    color: '#555',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
    fontFamily: fonts?.PoppinsMedium || undefined,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D91E5B',
    marginBottom: 6,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  specText: {
    fontSize: 15,
    color: '#555',
    marginHorizontal: 2,
    fontFamily:fonts.PoppinsRegular
  },
  specText1: {
    fontSize: 15,
    color: '#555',
    marginHorizontal: 2,
    fontFamily: fonts.PoppinsRegular
  },
  dot: {
    fontSize: 14,
    color: '#aaa',
    marginHorizontal: 2,
  },
  location: {
    fontSize: 13,
    color: '#777',
    marginBottom: 8,
  },
  validated: {
    fontSize: 12,
    color: '#D91E5B',
    marginBottom: 10,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#FF1645',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  enquireButton: {
    flex: 1,
    backgroundColor: '#FF1645',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
