import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, FlatList, StyleSheet } from 'react-native';
import TopHeader from '../components/TopHeader';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import axios from 'axios';

const HomeScreen = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const translateY = useRef(new Animated.Value(0)).current;
  const currentOffset = useRef(0);
  const scrollDirection = useRef('up'); // Track last direction

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://api.propertyseller.com/api/v1/projects');
        if (response.data.success) {
          setProperties(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const direction = offsetY > currentOffset.current ? 'down' : 'up';

    if (direction !== scrollDirection.current) {
      scrollDirection.current = direction;

      Animated.timing(translateY, {
        toValue: direction === 'down' ? -180 : 0, // Slide up or down
        duration: 700,
        useNativeDriver: true,
      }).start();
    }

    currentOffset.current = offsetY;
  };

  const renderItem = ({ item }) => (
    <PropertyCard
      title={item.projectTitle}
      propType={item.propertyTypes}
      projectType={item.projectType}
      type={item.type}
      discount={item.discount}
      handOverQuarter={item.handOverQuarter}
      handOverYear={item.handOverYear}
      paymentPlan={item.paymentPlan}
      price={item.priceInAED}
      rooms={item.type}
      baths="–"
      area="–"
      propertyId={item._id}
      location={item.address}
      image={item.mainImages[0]?.secure_url}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Fixed TopHeader */}
      <View style={styles.topHeaderWrapper}>
        <TopHeader />
      </View>

      {/* Animated FilterBar */}
      <Animated.View style={[styles.filterBarWrapper, { transform: [{ translateY }] }]}>
        <FilterBar />
      </Animated.View>

      {/* FlatList */}
      <FlatList
        data={properties}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 180 }} // 100 (TopHeader) + 80 (FilterBar)
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topHeaderWrapper: {
    height: 100,
    backgroundColor: '#fff',
    paddingTop: 40,
    zIndex: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterBarWrapper: {
    position: 'absolute',
    top: 150,// directly below TopHeader
    left: 0,
    right: 0,
    height: 80,
    zIndex: 10,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
