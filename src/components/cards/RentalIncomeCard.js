import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { fonts } from '../../../styles/fonts';

const CategoryBlock = ({ title, items, city }) => {
  if (!items || items.length === 0) return null;
  console.log("Data: ",items);

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

  if (
  (!townhouses || townhouses.length === 0) &&
  (!villas || villas.length === 0) &&
  (!apartments || apartments.length === 0)
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
  : new Animated.Value(0).interpolate({
    inputRange: [0, 1000],
    outputRange: [0, 1000],
    extrapolate: 'clamp'
  });

  const translateY = contentHeight > 0
  ? Animated.multiply(
      scrollY,
      Animated.divide(containerHeight, contentHeight)
    ).interpolate({
      inputRange: [0, 1000],
      outputRange: [0, 1000],
      extrapolate: 'clamp',
    })
  : new Animated.Value(0).interpolate({
    inputRange: [0, 1000],
    outputRange: [0, 1000],
    extrapolate: 'clamp'
  });

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
        <CategoryBlock title="Town House" items={townhouses} city={city} />
        <CategoryBlock title="Villa" items={villas} city={city}/>
        <CategoryBlock title="Apartment" items={apartments} city={city}/>
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
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingBottom: 10,
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
    backgroundColor: "fff",
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