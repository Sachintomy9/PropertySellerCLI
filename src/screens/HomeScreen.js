import React, { useRef, useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Animated, FlatList, StyleSheet } from 'react-native';
import TopHeader from '../components/Headers/TopHeader';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import LoginSuccess from '../components/popups/LoginSuccess';

import axios from 'axios';

const HomeScreen = () => {
  const route = useRoute();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const filterBarTranslateY = useRef(new Animated.Value(0)).current; // controls filterBar movement
  const lastScrollY = useRef(0);
  const isFilterBarHidden = useRef(false);
  const fetchProperties = async () => {
      try {
        setRefreshing(true);
        const response = await axios.get('https://api.propertyseller.com/api/v1/projects');
        if (response.data.success) {
          setProperties(response.data.data);
          console.log("From Home Screen",response.data.data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

  useEffect(() => {
    
    fetchProperties();
  }, []);

  const handleScroll = (event) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const deltaY = currentY - lastScrollY.current;

    // Scroll down → hide filter bar
    if (deltaY > 5 && !isFilterBarHidden.current) {
      Animated.timing(filterBarTranslateY, {
        toValue: -180, // fully slide out
        duration: 500,
        useNativeDriver: true,
      }).start();
      isFilterBarHidden.current = true;
    }

    // Scroll up → show filter bar
    else if (deltaY < -5 && isFilterBarHidden.current) {
      Animated.timing(filterBarTranslateY, {
        toValue: 0, // slide back in
        duration: 200,
        useNativeDriver: true,
      }).start();
      isFilterBarHidden.current = false;
    }

    lastScrollY.current = currentY;
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
      floors={item.totalFloors}
      baths="–"
      area="–"
      sqfeet={item.squareFeet}
      propertyId={item._id}
      location={item.address}
      image={item.mainImages[0]?.secure_url}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* Top Header */}
      <View style={styles.topHeaderWrapper}>
        <TopHeader />
      </View>

      {/* Filter Bar with slide animation */}
      <Animated.View style={[styles.filterBarWrapper, { transform: [{ translateY: filterBarTranslateY }] }]}>
        <FilterBar />
      </Animated.View>

      {/* Property List */}
      <FlatList
        data={properties}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 180 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshing={refreshing}
        onRefresh={fetchProperties}
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
    top: 150,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 10,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
