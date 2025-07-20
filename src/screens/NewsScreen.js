import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator,Animated,SafeAreaView } from 'react-native';
import axios from 'axios';
import NewsCard from '../components/cards/NewsCard'; // adjust path accordingly
import TopHeader2 from '../components/Headers/TopHeader2';
import TopSearchHeader from '../components/Headers/TopSearchHeader';

const NewsScreen = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);  
  

  const fetchCities = async (page = 1) => {
    if (!hasMore && page !== 1) return;
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await axios.get(`https://api.propertyseller.com/api/v1/news?page=${page}`);// similar code as the CitiesScreen, but there are minor changes
      if (res.data.success) {
        const newCity = res.data.data || [];
        const pagination = res.data.pagination || {};

        setCities(prev =>
          page === 1 ? newCity : [...prev, ...newCity]
        );
        setCurrentPage(pagination.currentPage);
        setHasMore(pagination.currentPage < pagination.totalPages);

      }
    } catch (err) {
      console.error('Error fetching cities:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  const loadMore = () => {
      if (!loadingMore && hasMore) {
        fetchCities(currentPage + 1);
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



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <TopHeader2 title={"News"}/>
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          data={cities}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
              <NewsCard news={item} onPress={() => console.log('Navigate to city', item.slug)} />
          )}
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

    </SafeAreaView>
  );
};

export default NewsScreen;

 const styles = StyleSheet.create({
  scrollbarTrack: {
    position: 'absolute',
    right: 2,
    top: 10,
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
