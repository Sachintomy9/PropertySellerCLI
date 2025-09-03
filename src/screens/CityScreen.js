import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator,Animated,SafeAreaView,TouchableOpacity,TextInput} from 'react-native';
import axios from 'axios';
import CityCard from '../components/cards/CityCard'; // adjust path accordingly
import TopHeader2 from '../components/Headers/TopHeader2';
import TopSearchHeader from '../components/Headers/TopSearchHeader';
import CloseIcon from '../assets/svg/svgicons/ProfileScreen/CloseIcon';
import SearchIcon from '../assets/svg/svgicons/Others/SearchIcon';

const CitiesScreen = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  

  const fetchCities = async (page = 1) => {
    if (!hasMore && page !== 1) return;
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const searchParam = searchQuery ? `&search=${searchQuery}` : '';
      const res = await axios.get(`https://v1-api.propertyseller.com/api/v1/city/all-cities/property-type-count/?page=${page}&limit=10${searchParam}`);
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

  useEffect(() => {
      const delayDebounce = setTimeout(() => {
        fetchCities(1); // Trigger a fresh search
      }, 800); // debounce delay
    
      return () => clearTimeout(delayDebounce); // cleanup timeout
    }, [searchQuery]);

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


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <TopHeader2 title={"Cities"}/>
          <View style={styles.searchBar}>
            <SearchIcon width={23} height={23} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search.."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => {
                  setSearchQuery('');
                  fetchCities(1); // Reset to original data
                }}>
                  <CloseIcon width={18} height={18} style={styles.clearIcon} />
                </TouchableOpacity>
              )}
          </View>
        <TopSearchHeader/>
        {loading && currentPage === 1 ? (
        <View style={styles.centerLoading}>
          <ActivityIndicator size="large" color="#ff1645" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Animated.FlatList
            data={cities}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <CityCard city={item} onPress={() => console.log('Navigate to city', item.slug)} />
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
      )}
    </SafeAreaView>
  );
};

export default CitiesScreen;

 const styles = StyleSheet.create({
  scrollbarTrack: {
    position: 'absolute',
    right: 2,
    top: 0,
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
  searchBar: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 44,
    width:"96%",
  },
  searchIcon: {
    marginRight: 8,
    top:10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  clearIcon: {
  marginLeft: 8,
  alignSelf: 'center',
  top:12,
},
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
