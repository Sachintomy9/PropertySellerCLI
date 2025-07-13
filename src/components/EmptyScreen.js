import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import EmptyImage from '../assets/svg/svgimages/EmptyImage';
const EmptyState = ({ message, subMessage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <EmptyImage/>
      </View>
      <Text style={styles.title}>{message || 'No Results.'}</Text>
      <Text style={styles.subtitle}>
        {subMessage || 'Sorry, there are no results for this search. Please try another phrase.'}
      </Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 150,
    right: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: -30
  },
});
