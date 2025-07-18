import React, { useEffect, useState,useRef } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';
import axios from 'axios';
import RentalIncomeCard from '../components/cards/RentalIncomeCard';
import TopHeader2 from '../components/Headers/TopHeader2';
import TopSearchHeader from '../components/Headers/TopSearchHeader';


const API_URL = 'https://api.propertyseller.com/api/v1';

const RentalIncomeScreen = () => {
  const [rentalData, setRentalData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  useEffect(() => {
    fetchRentalData();
  }, []);

  const fetchRentalData = async (page=1) => {
    if (!hasMore && page !== 1) return;
    try {
        if (page === 1) setLoading(true);
        else setLoadingMore(true);

        const res = await axios.get(`${API_URL}/rental-income?page=${page}`); // Replace with your API
        if (res.data.success) {
        const newCity = res.data.data || [];
        const pagination = res.data.pagination || {};



        setRentalData(prev =>
            page === 1 ? newCity : [...prev, ...newCity]
            );
        setCurrentPage(pagination.currentPage);
        setHasMore(pagination.currentPage < pagination.totalPages);
        }
    } catch (error) {
      console.error('Failed to fetch rental incomes:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  if (loading) {
      return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }
  
    const loadMore = () => {
        if (!loadingMore && hasMore) {
          fetchRentalData(currentPage + 1);
        }
      };
    
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
    
      if (loading && currentPage === 1) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
      }

  const renderItem = ({ item }) => (
    <RentalIncomeCard
      emirate={item.emirateDetails?.name}
      city={item.cityDetails?.name}
      townhouses={item.townhouses}
      villas={item.villas}
      apartments={item.apartments}
    />
  );

  return (
    <View style={styles.container}>
        <TopHeader2 title={"Rental Income"}/>
        <TopSearchHeader/>

        <View style={{ flex: 1 }}>

            <Animated.FlatList
            data={rentalData}
            keyExtractor={(item, index) => item._id || `rental-${index}`}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onContentSizeChange={(w, h) => setContentHeight(h)}
            onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
            loadingMore ? (
                <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="small" color="#FF1645" />
                </View>
            ) : null
            }
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
    </View>
  );
};

export default RentalIncomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  scrollbarTrack: {
    position: 'absolute',
    right: 2,
    top: 20,
    bottom: 0,
    width: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  scrollbarThumb: {
    width: 4,
    backgroundColor: '#FF1645',
    borderRadius: 2,
  },
});
