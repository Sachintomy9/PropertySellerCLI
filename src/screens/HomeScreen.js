import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, FlatList, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import TopHeader from '../components/Headers/TopHeader';
import FilterBar from '../components/others/FilterBar';
import PropertyCard from '../components/cards/PropertyCard';
import axios from 'axios';
import AdCard from '../components/cards/AdCard';
import SearchIcon from '../assets/svg/svgicons/Others/SearchIcon';
import EmptyState from '../components/others/EmptyScreen';
import CloseIcon from '../assets/svg/svgicons/ProfileScreen/CloseIcon';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

// Responsive sizing functions
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;



const HomeScreen = () => {
  const filters = useSelector((state) => state.filters);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');



  const [adPage, setAdPage] = useState(1);
  const [totalAdPages, setTotalAdPages] = useState(1);
  const [isFetchingAdMore, setIsFetchingAdMore] = useState(false);

  // const filterBarTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isFilterBarHidden = useRef(false);
  const [ads, setAds] = useState([]);
  const [adIndex, setAdIndex] = useState(0);
  const [combinedData, setCombinedData] = useState([]);


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
      let queryParams = new URLSearchParams({
        page: pageNum,
        limit: 10,
        search: searchQuery ? searchQuery : '',
        developers: filters.developers || '',
        facilities: filters.facilities || '',
        completionType: filters.completionType || 'all',
        projectTypeFirst: filters.projectTypeFirst || '',
        projectTypeLast: filters.projectTypeLast || '',
        emirate: filters.emirateName || '',
        city: filters.cityName || '',
        priceMin: filters.priceMin || '',
        priceMax: filters.priceMax || '',
        areaMin: filters.areaMin || '',
        areaMax: filters.areaMax || '',
        beds: filters.beds || '',
        year: filters.handoverYear || '',
        qtr: filters.handoverQuarter || '',
        paymentPlan: filters.paymentPlan || '',
        furnishing: filters.furnishing || 'all',
        discount: filters.discount || 'all',
        propertyType: filters.propertyType || '',
      });

      const url = `https://v1-api.propertyseller.com/api/v1/projects/?${queryParams.toString()}`;
      console.log('Fetching properties from:', url);
      const response = await axios.get(url);
      if (response.data.success) {
        const newProjects = response.data.data;
        const pagination = response.data.pagination;

        const updatedProps = pageNum === 1 || isRefreshing
          ? newProjects
          : [...properties, ...newProjects];

        setProperties(updatedProps);
        setCombinedData(mergeAdsIntoProperties(updatedProps));
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

  const fetchAds = async (pageNum = 1, isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else if (pageNum === 1) {
        setLoading1(true);
      } else {
        setIsFetchingAdMore(true);
      }

      const res = await axios.get(`https://v1-api.propertyseller.com/api/v1/banners?page=${pageNum}&limit=10`); // Replace with real endpoint
      if (res.data.success) {
        const newAds = res.data.data;
        const pagination = res.data.pagination;
        setAds(prev =>
          pageNum === 1 || isRefreshing ? newAds : [...prev, ...newAds]
        );

        setCombinedData(mergeAdsIntoProperties(properties));
        setAdPage(pagination.currentPage);
        setTotalAdPages(pagination.totalAdPages);
      }
    } catch (err) {
      console.error('Error fetching ads:', err);
    } finally {
      setLoading1(false);
      setRefreshing(false);
      setIsFetchingAdMore(false);
    }
  };

  useEffect(() => {
    fetchProperties(1);
    fetchAds(1);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProperties(1); // Trigger a fresh search
    }, 500); // debounce delay

    return () => clearTimeout(delayDebounce); // cleanup timeout
  }, [searchQuery, filters]);

  const mergeAdsIntoProperties = (propertyList) => {
    const mixedList = [];

    for (let i = 0; i < propertyList.length; i++) {
      mixedList.push({ type: 'property', data: propertyList[i] });

      if ((i + 1) % 5 === 0) {
        mixedList.push({ type: 'ad' }); // Single placeholder
      }
    }

    return mixedList;
  };

  // const handleScroll = (event) => {
  //   const currentY = event.nativeEvent.contentOffset.y;
  //   const deltaY = currentY - lastScrollY.current;

  //   if (deltaY > 5 && !isFilterBarHidden.current) {
  //     Animated.timing(filterBarTranslateY, {
  //       toValue: -180,
  //       duration: 500,
  //       useNativeDriver: true,
  //     }).start();
  //     isFilterBarHidden.current = true;
  //   } else if (deltaY < -5 && isFilterBarHidden.current) {
  //     Animated.timing(filterBarTranslateY, {
  //       toValue: 0,
  //       duration: 200,
  //       useNativeDriver: true,
  //     }).start();
  //     isFilterBarHidden.current = false;
  //   }

  //   lastScrollY.current = currentY;
  // };

  const handleLoadMore = () => {
    if (!isFetchingMore && page < totalPages) {
      fetchProperties(page + 1);
      fetchAds(adPage + 1);
    }
  };

  const renderFooter = () => {
    if (!isFetchingMore && !isFetchingAdMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color={"#ff1645"} />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    if (item.type === 'ad') {
      return <AdCard ads={ads} />;
    }

    const property = item.data;
    return (
      <PropertyCard
        title={property.projectTitle}
        propType={property.propertyTypes}
        projectType={property.projectType}
        type={property.type}
        discount={property.discount}
        handOverQuarter={property.handOverQuarter}
        handOverYear={property.handOverYear}
        paymentPlan={property.paymentPlan}
        price={property.priceInAED}
        rooms={property.type}
        floors={property.totalFloors}
        baths="–"
        area="–"
        developerImageUrl={property.developerDetails?.image?.webp?.url}
        sqfeet={property.squareFeet}
        propertyId={property._id}
        location={property.address}
        createdAt={property.createdAt}
        image={property.mainImages}
      />
    );
  };

  const filterBarOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const filterBarTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -50], // slide up 50px
    extrapolate: 'clamp',
  });

  const [showFilterBar, setShowFilterBar] = useState(true);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value > 200 && showFilterBar) {
        setShowFilterBar(false); // remove from render
      } else if (value <= 200 && !showFilterBar) {
        setShowFilterBar(true); // add back
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, showFilterBar]);

  // console.log(filterBarHeight, 'filterBarHeight')


  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={"#000"}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

          <View style={styles.topHeaderWrapper}>

            {/* Scroll content here */}
            <TopHeader />
            <View style={[styles.searchBar, {
              marginBottom: showFilterBar ? 0 : 8
            }]}>
              <SearchIcon width={24} height={24} style={styles.searchIcon} />

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
                  fetchProperties(1); // Reset to original data
                }}>
                  <CloseIcon width={18} height={18} style={styles.clearIcon} />
                </TouchableOpacity>
              )}
            </View>

            {showFilterBar && (
              <Animated.View
                style={{
                  opacity: filterBarOpacity,
                  transform: [{ translateY: filterBarTranslateY }],
                }}
              >
                <FilterBar />
              </Animated.View>
            )}

          </View>

          <FlatList
            data={combinedData}
            keyExtractor={(item, index) =>
              item.type === 'ad'
                ? `ad-${item.data?._id || index}-${index}`
                : `property-${item.data?._id || index}-${index}`
            }
            renderItem={renderItem}
            contentContainerStyle={{ paddingTop: 8 }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: false,
              }
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            refreshing={refreshing}
            onRefresh={() => fetchProperties(1, true)}
            onContentSizeChange={(w, h) => setContentHeight(h)}
            onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)}
            ListEmptyComponent={
              !loading && !loading1 && !refreshing && properties.length === 0 ? <EmptyState /> : null
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
    </SafeAreaProvider>


  );
};

const styles = StyleSheet.create({
  topHeaderWrapper: {
    backgroundColor: '#fff',
    gap: 10,
    zIndex: 20,
  },
  scrollbarTrack: {
    position: 'absolute',
    right: 2,
    top: 180,
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
  searchBar: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: responsiveWidth(2),
    width: "96%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: 48,
    zIndex: 22,
    backgroundColor: "#fff",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    alignSelf: "center",
    fontSize: 16,
    color: '#000',
    width: "96%",
    paddingHorizontal: 0,
  },
  clearIcon: {
    marginLeft: 8,
    alignSelf: 'center',
  },
});

export default HomeScreen;
