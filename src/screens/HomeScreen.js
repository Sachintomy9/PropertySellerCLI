import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import TopHeader from '../components/Headers/TopHeader';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import axios from 'axios';

const HomeScreen = () => {
  const route = useRoute();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const filterBarTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isFilterBarHidden = useRef(false);



  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const THUMB_MIN_HEIGHT = 30;

  const thumbHeight = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
    outputRange: [
      THUMB_MIN_HEIGHT,
      Math.max((scrollViewHeight / contentHeight) * scrollViewHeight, THUMB_MIN_HEIGHT),
    ],
    extrapolate: 'clamp',
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
    outputRange: [0, scrollViewHeight - THUMB_MIN_HEIGHT],
    extrapolate: 'clamp',
  });


  const fetchProperties = async (pageNum = 1, isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else if (pageNum === 1) {
        setLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const response = await axios.get(`https://api.propertyseller.com/api/v1/projects?page=${pageNum}&limit=20`);
      if (response.data.success) {
        const newProjects = response.data.data;
        const pagination = response.data.pagination;

        setProperties(prev =>
          pageNum === 1 || isRefreshing ? newProjects : [...prev, ...newProjects]
        );

        setPage(pagination.currentPage);
        setTotalPages(pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchProperties(1);
  }, []);

  const handleScroll = (event) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const deltaY = currentY - lastScrollY.current;

    if (deltaY > 5 && !isFilterBarHidden.current) {
      Animated.timing(filterBarTranslateY, {
        toValue: -180,
        duration: 500,
        useNativeDriver: true,
      }).start();
      isFilterBarHidden.current = true;
    } else if (deltaY < -5 && isFilterBarHidden.current) {
      Animated.timing(filterBarTranslateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      isFilterBarHidden.current = false;
    }

    lastScrollY.current = currentY;
  };

  const handleLoadMore = () => {
    if (!isFetchingMore && page < totalPages) {
      fetchProperties(page + 1);
    }
  };

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" />
      </View>
    );
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
      createdAt={item.createdAt}
      image={item.mainImages?.[0]?.secure_url}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.topHeaderWrapper}>
        <TopHeader />
      </View>

      <Animated.View style={[styles.filterBarWrapper, { transform: [{ translateY: filterBarTranslateY }] }]}>
        <FilterBar />
      </Animated.View>

      <FlatList
  data={properties}
  keyExtractor={(item) => item._id}
  renderItem={renderItem}
  contentContainerStyle={{ paddingTop: 180 }}
  scrollEventThrottle={16}
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: handleScroll, // This runs your filterBar animation logic
    }
  )}
  onEndReached={handleLoadMore}
  onEndReachedThreshold={0.5}
  ListFooterComponent={renderFooter}
  refreshing={refreshing}
  onRefresh={() => fetchProperties(1, true)}
  onContentSizeChange={(w, h) => setContentHeight(h)}
  onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)}
/>

      <View style={styles.scrollbarTrack}>
        <Animated.View
          style={[
            styles.scrollbarThumb,
            {
              height: thumbHeight,
              transform: [{ translateY }],
            },
          ]}
        />
      </View>
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
    scrollbarTrack: {
    position: 'absolute',
    right: 2,
    top: 180, // same as paddingTop
    bottom: 0,
    width: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  scrollbarThumb: {
    width: 4,
    backgroundColor: '#999',
    borderRadius: 2,
    backgroundColor: '#FF1645',
  },
});

export default HomeScreen;
