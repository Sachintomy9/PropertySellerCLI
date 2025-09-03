import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { fonts } from '../../../styles/fonts';

const CategoryBlock = ({ title, items, city }) => {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.categoryBlock}>
      <View style={{flexDirection: "row", gap: 10}}>
        <Text style={styles.categoryTitle}>{title}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{city}</Text>
        </View>
      </View>
      {items
        .filter(item => item?.value)  // skip empty/null/undefined
        .map((item) => (
          <Text key={item.id} style={styles.roomText}>
            {item.value}
          </Text>
      ))}
    </View>
  );
};

const RentalIncomeCard = ({ emirate, city, townhouses, villas, apartments }) => { 
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Transform the array of strings into objects with id and value
  const transformData = (dataArray) => {
    if (!dataArray || !Array.isArray(dataArray)) return [];
    
    return dataArray.map((item, index) => ({
      id: `${index}-${item}`, // Create a unique ID using index and content
      value: item
    }));
  };

  const transformedTownhouses = transformData(townhouses);
  const transformedVillas = transformData(villas);
  const transformedApartments = transformData(apartments);

  if (
    transformedTownhouses.length === 0 &&
    transformedVillas.length === 0 &&
    transformedApartments.length === 0
  ) {
    return null;
  }

  const thumbHeight = contentHeight > 0
    ? Animated.multiply(
        containerHeight,
        Animated.divide(containerHeight, contentHeight)
      ).interpolate({
        inputRange: [0, 1000],
        outputRange: [0, 1000],
        extrapolate: 'clamp',
      })
    : new Animated.Value(0);

  const translateY = contentHeight > 0
    ? Animated.multiply(
        scrollY,
        Animated.divide(containerHeight, contentHeight)
      ).interpolate({
        inputRange: [0, 1000],
        outputRange: [0, 1000],
        extrapolate: 'clamp',
      })
    : new Animated.Value(0);

  return (
    <View style={styles.card}>
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}
        nestedScrollEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        onContentSizeChange={(w, h) => setContentHeight(h)}
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      >
        <CategoryBlock title="Town House" items={transformedTownhouses} city={city} />
        <CategoryBlock title="Villa" items={transformedVillas} city={city}/>
        <CategoryBlock title="Apartment" items={transformedApartments} city={city}/>
      </ScrollView>
      
      {contentHeight > containerHeight && (
        <View style={styles.customScrollbarTrack}>
          <Animated.View 
            style={[
              styles.customScrollbarThumb,
              {
                height: thumbHeight,
                transform: [{ translateY }],
              }
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  scrollContent: {
    paddingBottom: 10,
  },
  categoryBlock: {
    marginBottom: 16,
  },
  categoryTitle: {
    color: '#111',
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    marginBottom: 4,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 6,
  },
  tagText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 12,
    color: '#555',
  },
  roomText: {
    fontSize: 14,
    color: '#111',
    marginBottom: 3,
    fontFamily: fonts.PoppinsRegular,
  },
  customScrollbarTrack: {
    position: 'absolute',
    right: 4,
    top: 14,
    bottom: 14,
    width: 4,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  customScrollbarThumb: {
    position: 'absolute',
    width: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
});

export default RentalIncomeCard;