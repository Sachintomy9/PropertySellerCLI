import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
  RefreshControl,
  Text,
} from 'react-native';
import axios from 'axios';
import { fonts } from '../../styles/fonts';
import { useAuth } from '../context/AuthContext'
import OpenHouseCard from '../components/cards/OpenHouseCard';
import TopHeader2 from '../components/Headers/TopHeader2';
import EmptyState from '../components/others/EmptyScreen';

const API_URL = 'https://api.propertyseller.com/api/v1/open-houses';
const THUMB_MIN_HEIGHT = 30;

const OpenHouseScreen = () => {
  const {isGuest} = useAuth();
  const [openHouses, setOpenHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [listHeight, setListHeight] = useState(0);

  const thumbHeight = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - listHeight, 1)],
    outputRange: [
      THUMB_MIN_HEIGHT,
      Math.max((listHeight / contentHeight) * listHeight, THUMB_MIN_HEIGHT),
    ],
    extrapolate: 'clamp',
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - listHeight, 1)],
    outputRange: [0, listHeight - THUMB_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const fetchOpenHouses = async (pageNum = 1, refreshing = false) => {
    try {
      if (refreshing) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await axios.get(`${API_URL}?page=${pageNum}`);
      const newData = response.data.data;

      if (refreshing) {
        setOpenHouses(newData);
      } else {
        setOpenHouses((prev) => (pageNum === 1 ? newData : [...prev, ...newData]));
      }

      setHasMore(pageNum < response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching open houses:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchOpenHouses(page);
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOpenHouses(nextPage);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    fetchOpenHouses(1, true);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#FF3366" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TopHeader2 title="Open Houses" />
      {/* Empty State Handling */}
    {isGuest ? (
      <EmptyState
        message="You're Not Logged In"
        subMessage="To view and book a slot in Open Houses, please log in."
      />
      ) : openHouses.length === 0 && !loading ? (
      <EmptyState
        message="Come Back Later"
        subMessage="There are no Open Houses Happening right now."
      />
    ) : (
      <>
      <Text style={{fontFamily: fonts.PoppinsSemiBold, fontSize: 23, textAlign: "center"}}>
            Join Us for Upcoming
        </Text>
        <Text style={{fontFamily: fonts.PoppinsSemiBold, fontSize: 23, textAlign: "center", color:"#ff1645"}}>
            Open Houses
        </Text>
      <View style={styles.scrollContainer}>
        <Animated.FlatList
          data={openHouses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OpenHouseCard item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onContentSizeChange={(_, height) => setContentHeight(height)}
          onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        />

        {/* Custom Scrollbar */}
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
      </>
    )}
    </View>
  );
};

export default OpenHouseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  scrollbarTrack: {
    position: 'absolute',
    right: 0,
    marginTop: -78,
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
