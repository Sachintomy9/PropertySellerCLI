import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PropertyCard = ({ property }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.price}>AED {property.price.toLocaleString()}</Text>
        <Text style={styles.details}>Apartment • {property.beds} Bed • {property.baths} Bath • {property.area} sqft</Text>
        <Text style={styles.location}>{property.location}</Text>
        <Text style={styles.auth}>✔ Property Validated on {property.verifiedDate}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Details</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Enquire Now</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    height: 200,
    width: '100%',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#e91e63',
    marginBottom: 6,
  },
  details: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
  },
  auth: {
    fontSize: 12,
    color: '#c2185b',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#e91e63',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default PropertyCard;
