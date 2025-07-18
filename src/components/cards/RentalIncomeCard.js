import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../styles/fonts';

const CategoryBlock = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.categoryBlock}>
      <View style={{flexDirection: "row", gap:10}}>
        <Text style={styles.categoryTitle}>{title}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Dubai | Downtown</Text>
        </View>
      </View>
      {items.map((item) => (
        <Text key={item.id} style={styles.roomText}>
          {item.value}
        </Text>
      ))}
    </View>
  );
};

const RentalIncomeCard = ({ emirate, city, townhouses, villas, apartments }) => {
  return (
    <View style={styles.card}>
      <CategoryBlock title="Town House" items={townhouses} />
      <CategoryBlock title="Villa" items={villas} />
      <CategoryBlock title="Apartment" items={apartments} />
    </View>
  );
};

export default RentalIncomeCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryBlock: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 16,
    marginBottom: 4,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderColor:"#ddd",
    borderWidth:1,
    marginBottom: 6,
  },
  tagText: {
    fontFamily:fonts.PoppinsRegular,
    fontSize: 12,
    color: '#555',
  },
  roomText: {
    fontSize: 14,
    color: '#111',
    marginBottom: 3,
    fontFamily: fonts.PoppinsRegular,
  },
});
