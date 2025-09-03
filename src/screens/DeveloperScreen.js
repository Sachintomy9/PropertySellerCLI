import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import DeveloperCard from '../components/cards/DeveloperCard';
import TopHeader2 from '../components/Headers/TopHeader2';
import TopSearchHeader from '../components/Headers/TopSearchHeader';
import CloseIcon from '../assets/svg/svgicons/ProfileScreen/CloseIcon';
import SearchIcon from '../assets/svg/svgicons/Others/SearchIcon';

const DeveloperScreen = () => {
  const [developers, setDevelopers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const fetchDevelopers = async (page = 1) => {
    if (!hasMore && page !== 1) return;

    const searchParam = searchQuery ? `&search=${searchQuery}` : '';
    const url = `https://v1-api.propertyseller.com/api/v1/developers?page=${page}&limit=10${searchParam}`; 
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await axios.get(url);
      if (res.data.success) {
        const newDevelopers = res.data.data || [];
        const pagination = res.data.pagination || {};

        setDevelopers(prev =>
          page === 1 ? newDevelopers : [...prev, ...newDevelopers]
        );
        setCurrentPage(pagination.currentPage);
        setHasMore(pagination.currentPage < pagination.totalPages);
      }
    } catch (err) {
      console.error('Error fetching developers:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchDevelopers(1);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchDevelopers(1); // Trigger a fresh search
    }, 800); // debounce delay
  
    return () => clearTimeout(delayDebounce); // cleanup timeout
  }, [searchQuery]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchDevelopers(currentPage + 1);
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
      <TopHeader2 title="Developers" />
      <View style={styles.searchBar}>
        <SearchIcon width={18} height={18} style={styles.searchIcon} />
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
              fetchDevelopers(1); // Reset to original data
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
          data={developers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <DeveloperCard
              developer={item}
              onPress={() => console.log('Navigate to developer', item.slug)}
            />
          )}
          contentContainerStyle={{ paddingTop:10 }}
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

export default DeveloperScreen;

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
    top: 10,
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
