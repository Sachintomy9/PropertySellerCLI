import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Animated,
  FlatList,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setPropertyRed } from '../redux/slices/PropertySlice';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { Dimensions } from 'react-native';
import BottomEnquireButton from '../components/buttons/BottomEnquire';
const { width } = Dimensions.get('window');
import api from '../services/ApiClient';
import { fonts } from '../../styles/fonts';
import { collectWishlist } from '../services/AuthService';
import { useWishlist } from '../context/WishlistContext';
import { useMortgage } from '../context/MortgageContext';
import { formatPropType } from '../utils/formatPropType';
import Share from 'react-native-share';
import BackIcon from '../assets/svg/svgicons/Details/BackIcon';
import SavedActive from '../assets/svg/svgicons/BottomTabs/SavedActive';
import HeartIcon from '../assets/svg/svgicons/Details/HeartIcon';
import ShareIcon from '../assets/svg/svgicons/Others/ShareIcon';
import LocationIcon from '../assets/svg/svgicons/Details/LocationIcon';
import BedIcon from '../assets/svg/svgicons/Others/BedIcon';
import AreaIcon from '../assets/svg/svgicons/Details/AreaIcon';
import PlayIcon from '../assets/svg/svgicons/Details/PlayIcon';
import MapIcon from '../assets/svg/svgicons/Details/MapIconRed';
import TickIcon from '../assets/svg/svgicons/Details/TickIcon';
import FilterIcon from '../assets/svg/svgicons/Others/FilterIcon';
import LoginPrompt from '../components/popups/LoginPrompt';
import SavedSuccess from '../components/popups/SavedSuccess';
import SavedRemoved from '../components/popups/SavedRemoved';
import EnquirySubmitted from '../components/popups/EnquirySubmitted';
import BuildingIcon from '../assets/svg/svgicons/Others/BuildingIcon';
import AdCard from '../components/cards/AdCard';

const RecommendedCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item._id)}
    >
      <Image source={{ uri: item.mainImages?.[0]?.secure_url }} style={styles.cardImage} />

      <Text style={styles.cardPrice}>
        {parseFloat(item.priceInAED.replace(/,/g, '')).toLocaleString()} AED
      </Text>

      <View style={styles.cardDetails}>
        <BedIcon
          style={{
            width: 20,
            height: 20,
            marginRight: 8
          }}
        />
        <Text style={styles.cardText}>
          {item.type.length > 4 ? item.type.substring(0, 4) + "..." : item.type}
        </Text>

        <View style={styles.verticalLine}></View>


        {item.totalFloors && (
          <>
            <BuildingIcon size={15} />
            <Text numberOfLines={1} style={styles.cardText}>{item.totalFloors} floors</Text>
          </>
        )}
      </View>

      <View style={styles.cardLocation}>
        <LocationIcon
          style={{ width: 20, height: 20 }}
        />
        <Text numberOfLines={1} style={{ flexShrink: 1, color: '#000' }}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Responsive sizing functions
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;


const PropertyDetailScreen = () => {
  const route = useRoute();
  const { isGuest } = useAuth();
  const { profile } = useProfile();
  const { wishlist, updateWishlist } = useWishlist();
  const { mortgageData, applyCustomValues } = useMortgage();
  const dispatch = useDispatch();
  const { selectedCurrency, conversionRate } = useSelector((state) => state.currency);


  const navigation = useNavigation();
  const { propertyId } = route.params;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessPrompt, setShowSuccessPrompt] = useState(false);
  const [showRemovedPrompt, setShowRemovedPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [ads, setAds] = useState([]);
  const [adsLoading, setAdsLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;

    const fetchAllAds = async () => {
      try {
        let allAds = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await axios.get(`https://api.propertyseller.com/api/v1/banners?page=${page}`);

          if (
            response.data.success &&
            Array.isArray(response.data.data) &&
            response.data.data.length > 0
          ) {
            allAds = [...allAds, ...response.data.data];
            page++;
            hasMore = page <= response.data.pagination.totalPages;
          } else {
            hasMore = false;
          }
        }

        if (isMounted) {
          setAds(allAds);
        }
      } catch (error) {
        console.error('Error fetching paginated ads:', error);
        setAds([]);
      } finally {
        if (isMounted) setAdsLoading(false);
      }
    };

    fetchAllAds();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const fetchRecommended = async () => {
      setRecommendedLoading(true);
      try {
        const response = await axios.get('https://api.propertyseller.com/api/v1/projects');

        if (response.data.success) {
          const all = response.data.data;

          // Exclude current property
          const filtered = all.filter(item => item._id !== propertyId);

          // Shuffle the list randomly
          const shuffled = filtered.sort(() => 0.5 - Math.random());

          // Take the first 4
          const selected = shuffled.slice(0, 4);

          setRecommended(selected);
        }
      } catch (err) {
        console.error('Error fetching recommended properties:', err);
      } finally {
        setRecommendedLoading(false);
      }
    };

    fetchRecommended();
  }, [propertyId]);

  const handleRecommendedPress = (id) => {
    navigation.push('PropDetails', { propertyId: id });
  };


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


  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const displayPrice = (aedPrice) => {
    // Step 1: Remove ALL non-digit characters (commas, periods, spaces)
    const cleanedPrice = String(aedPrice).replace(/[^\d]/g, '');

    // Step 2: Convert to number (now it won't stop at commas/periods)
    const numericPrice = parseFloat(cleanedPrice);

    const converted = numericPrice * conversionRate;

    return `${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };


  useEffect(() => {
    if (property?.priceInAED) {
      const cleanPrice = (priceStr) => {
        console.log(" Price value in PropDetailsScreen: ", parseFloat(priceStr.replace(/,/g, '')));
        return parseFloat(priceStr.replace(/,/g, ''));
      };
      const principal = cleanPrice(property.priceInAED);
      applyCustomValues({
        price: principal,
        loanTerm: 25,
        downPayment: 25,
        interestRate: 4,
      });
    }
  }, [property]);


  {/* Flatlist images settings*/ }
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveImageIndex(viewableItems[0].index);
    }
  }).current;


  const handleHeartPress = async () => {
    if (isGuest) {
      setShowLoginPrompt(true);
    } else {
      setIsLoading(true);
      try {
        // Show corresponding popup
        if (!isWishlisted) {
          setShowSuccessPrompt(true); // now added
        } else {
          setShowRemovedPrompt(true); // now removed
        }


        const payload = { userId: profile.id, projectId: propertyId, }
        const response = await api.post('wishlist', payload);
        await collectWishlist(profile, updateWishlist);

        console.log("Successfully Added to wishlist:", response.data)
      } catch (error) {
        console.error('Profile update error:', error.response?.data || error.message);
        Alert.alert('Error', error.response?.data?.message || 'Profile update failed.');
      } finally {
        setIsLoading(false); // hide loader regardless of success or failure
      }
    }
  };
  const isWishlisted = wishlist.some(
    item => item.propertyDetails?._id === propertyId
  );


  useEffect(() => {
    console.log('propertyId from route:', propertyId);
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`https://api.propertyseller.com/api/v1/projects/${propertyId}`);
        setProperty(res.data.data); // adjust if shape is different
        dispatch(setPropertyRed(res.data.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  if (loading || !property) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff1645" />
      </View>
    );
  }
  const InfoRow = ({ label, value }) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>




  );
  /*payment plan */
  const PaymentOptions = ({ paymentOptions }) => {
    // Function to clean and format each payment option
    const formatPaymentOption = (option) => {
      // Extract percentage (matches first number in string)
      const percentage = option.match(/\d+/)?.[0] || '';

      // Extract label (removes numbers and special characters, then trims)
      const label = option
        .replace(/[^a-zA-Z]/g, ' ') // Replace non-letters with space
        .replace(/\s+/g, ' ')       // Collapse multiple spaces
        .trim()                     // Trim whitespace
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letters

      return { label, percentage };
    };

    return (
      <View style={styles.infoBlock}>
        {paymentOptions?.map((option, index) => {
          const { label, percentage } = formatPaymentOption(option);
          return (
            <InfoRow
              key={index}
              label={label}
              value={`${percentage}%`}
            />
          );
        })}
      </View>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleShare = async () => {
    try {
      const shareLink = `https://www.propertyseller.com/projects/${property.slug}`;

      const shareOptions = {
        title: property.projectTitle || 'Check this out!',
        message: `${property.projectTitle}\n\nCheck this out on PropertySeller:\n${shareLink}\n`,
        failOnCancel: false,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Share failed:', error.message);
    }
  };

  const PropertyPaymentPlanRefferName = (paymentPlan) => {
    switch (paymentPlan) {
      case "onHandover":
        return "On Handover Payment Plan";
      case "postHandover":
        return "Post Handover Payment Plan";
      default:
        return "Unknown";
    }
  }



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} contentContainerStyle={styles.content}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FF1645" />
          </View>
        )}

        {/* Top Navigation */}
        <View style={styles.headerRow}>
          <View style={{ backgroundColor: "#FFDDE5", borderRadius: 4, width: 35, height: 35, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 4,
              flexDirection: "row",
              gap: 10,
            }}
          >

            <View style={{ backgroundColor: "#FFDDE5", borderRadius: 4, width: 35, height: 35, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleShare}>
                <ShareIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "#FFDDE5", borderRadius: 5, width: 35, height: 35, alignContent: "center", justifyContent: "center" }}>
              <TouchableOpacity onPress={handleHeartPress}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isWishlisted ? (
                  <SavedActive width={32} height={32} />
                ) : (
                  <HeartIcon width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>

          </View>


          <LoginPrompt
            visible={showLoginPrompt}
            onClose={() => setShowLoginPrompt(false)}
          />

          <SavedSuccess
            visible={showSuccessPrompt}
            onClose={() => setShowSuccessPrompt(false)}
          />
          <SavedRemoved
            visible={showRemovedPrompt}
            onClose={() => setShowRemovedPrompt(false)}
          />
          <EnquirySubmitted
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />


        </View>

        <Animated.ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(w, h) => setContentHeight(h)}
          onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >


          {/* Main Image */}
          <View style={styles.carouselWrapper}>
            <FlatList
              data={property.mainImages}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              style={{
                borderRadius: 4,
              }}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={{
                    width: width - responsiveWidth(4),
                    height: 230,
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    navigation.navigate('ImageGallery')
                  }}
                >
                  <Image source={{ uri: item?.secure_url }} style={styles.carouselImage} />

                </TouchableOpacity>

              )}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
            />

            {/* <View style={styles.pagination}>
              {property.mainImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === activeImageIndex ? styles.activeDot : null,
                  ]}
                />
              ))}
            </View> */}
            <View style={styles.pagination}>
              {(() => {
                const total = property.mainImages.length;
                const windowSize = 8;
                let start = activeImageIndex - Math.floor(windowSize / 2);
                let end = activeImageIndex + Math.ceil(windowSize / 2);

                // Clamp within bounds
                if (start < 0) {
                  start = 0;
                  end = windowSize;
                }
                if (end > total) {
                  end = total;
                  start = total - windowSize;
                }

                return property.mainImages.slice(start, end).map((_, index) => {
                  const realIndex = start + index;
                  return (
                    <View
                      key={realIndex}
                      style={[
                        styles.dot,
                        realIndex === activeImageIndex ? styles.activeDot : null,
                      ]}
                    />
                  );
                });
              })()}
            </View>

            <View style={styles.overlayTags}>
              <Text style={styles.tag}>Handover Date :{property.handOverQuarter} - {property.handOverYear}</Text>
              <Text style={styles.tag}>{PropertyPaymentPlanRefferName(property.paymentPlan)}</Text>
            </View>


            <View style={styles.pagination}>
              {(() => {
                const total = property.mainImages.length;
                const windowSize = 8;
                let start = activeImageIndex - Math.floor(windowSize / 2);
                let end = activeImageIndex + Math.ceil(windowSize / 2);

                // Clamp within bounds
                if (start < 0) {
                  start = 0;
                  end = windowSize;
                }
                if (end > total) {
                  end = total;
                  start = total - windowSize;
                }

                return property.mainImages.slice(start, end).map((_, index) => {
                  const realIndex = start + index;
                  return (
                    <View
                      key={realIndex}
                      style={[
                        styles.dot,
                        realIndex === activeImageIndex ? styles.activeDot : null,
                      ]}
                    />
                  );
                });
              })()}
            </View>

          </View>

          {/* Tags */}

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => Linking.openURL(property.googleMapsUrl)}>
              <MapIcon
                style={{
                  width: 24,
                  height: 24
                }}
              />
              <Text style={styles.actionText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate("Video")}>
              <PlayIcon
                style={{
                  width: 22,
                  height: 22
                }}
                fill={"#ff1645"}
              />
              <Text style={styles.actionText}>Watch Video</Text>
            </TouchableOpacity>
          </View>

          {/* Title & Price */}
          <Text style={styles.title}>{property.projectTitle}</Text>
          {/* <Text style={styles.priceLabel}>{selectedCurrency} <Text style={styles.price}>{displayPrice(property.priceInAED)}</Text></Text> */}
          <Text style={styles.price}>
            <Text style={styles.pricePrefix}>Starting From </Text>
            <Text style={styles.priceValue}>{displayPrice(property.priceInAED)} </Text>
            <Text style={styles.priceSuffix}>{selectedCurrency}</Text>
          </Text>
          {/* Address */}
          <View style={styles.row}>
            <LocationIcon
              style={{
                width: 22,
                height: 22,
                color: "#000"
              }}
            />
            <Text style={styles.address}>{property.address}</Text>
          </View>

          {/* Property Info */}
          <View style={styles.infoRow}>
            <Text style={styles.infoText1}>{formatPropType(property.propertyTypes)}</Text>
            <View style={styles.verticalLine}></View>

            <View style={styles.infoItem}>
              <BedIcon
                style={{
                  width: 20,
                  height: 20
                }}
              />
              <Text style={styles.infoText}>{property.type}</Text>
            </View>

            <View style={styles.verticalLine}></View>


            {Boolean(property?.totalFloors) && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BuildingIcon width={16} height={16} />
                <Text style={styles.specText}>{property?.totalFloors} {property?.totalFloors === 1 ? 'floor' : 'floors'}</Text>
              </View>
            )}

            {property.squareFeet && (
              <View style={styles.infoItem}>
                <View style={{ top: -1 }}>
                  <AreaIcon size={23} />
                </View>
                <Text style={styles.infoText}> Area: {property.squareFeet} sqft</Text>
              </View>
            )}
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {readMore
              ? property.description
              : (property.description?.slice(0, 200) || 'NA') + '...'}
          </Text>

          {property.description?.length > 200 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DescriptionRead', {
                  description: property.description,
                  descriptionInArabic: property.descriptionInArabic,
                })
              }
              style={styles.readMoreBtn}
            >
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          )}


          {/* Property Information */}
          <View style={styles.verifiedRow}>
            <Text style={styles.sectionTitle}>Property Information</Text>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TickIcon size={25} />
            </View>
          </View>
          <View style={styles.infoBlock}>
            <InfoRow label="Type" value={formatPropType(property.propertyTypes) ?? "NOT PROVIDED"} />
            <InfoRow label="Furnishing" value={property.furnishing ?? "NOT PROVIDED"} />
            <InfoRow label="Added on" value={formatDate(property.createdAt) ?? "NOT PROVIDED"} />
            <InfoRow label="Handover Date" value={property.handOverQuarter ?? "NOT PROVIDED"} />
            <InfoRow label="Completion" value={property.completionType ?? "Offplan"} />
            <InfoRow label="Developer" value={property.developerDetails.name ?? "NOT PROVIDED"} />
            <InfoRow label="Ownership" value="Freehold" />
            <InfoRow label="Built-up Area" value={property.squareFeet ?? "NOT PROVIDED"} />
            <InfoRow label="Total Parking Spaces" value={property.parking ?? "NOT PROVIDED"} />
            <InfoRow label="Total Floors" value={property.totalFloors ?? "NOT PROVIDED"} />
            <InfoRow label="Retail Centres" value={property.retailCentres ?? "NOT PROVIDED"} />
            <InfoRow label="Total Building Area" value={property.squareFeet ?? "NOT PROVIDED"} />
            <InfoRow label="Elevators" value={property.elevators ?? "NOT PROVIDED"} />
            <InfoRow label="Swimming pools" value={property.squareFeet ?? "NOT PROVIDED"} />
            <InfoRow label="Unique ID" value={property.uniqueId ?? "NOT PROVIDED"} />
            <InfoRow label="Project No" value={property.projectNo ?? "NOT PROVIDED"} />
          </View>


          {/* Floor Plans */}
          <Text style={styles.sectionTitle}>Floor Plans and Layouts</Text>

          <View style={{ marginTop: 10 }}>
            {property.layoutImages?.slice(0, 2).map((item, index) => (
              <Image
                key={index}
                source={{ uri: item.secure_url }}
                style={styles.floorPlanImageStyled}
              />
            ))}

            {/* "+N More" button */}
            {property.layoutImages?.length > 2 && (
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => {
                  navigation.navigate('FloorPlans')
                }}
              >
                <Text style={styles.moreButtonText}>+{property.layoutImages.length - 2} More</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Areas Nearby */}
          <Text style={styles.sectionTitle}>Areas Nearby</Text>
          {property.nearByAreas.map((place, index) => (
            <Text key={index} style={styles.nearbyText}>{place}</Text>
          ))}

          {/* Features / Amenities */}
          <Text style={styles.sectionTitle}>Features / Amenities</Text>
          <View style={styles.amenitiesRow}>
            {property.facilitiesAmenitiesDetails.slice(0, 2).map((item, index) => (
              <View key={index} style={styles.amenityCard}>
                <Image source={{ uri: item.image.secure_url }} style={styles.amenityIcon} />
                <Text style={styles.amenityText}>{item.name}</Text>
              </View>
            ))}

            <TouchableOpacity style={styles.amenityCard} onPress={() => {
              navigation.navigate('AmenitiesInfo', { facilitiesAmenitiesDetails: property.facilitiesAmenitiesDetails, })
            }}>
              <Text style={[styles.amenityText, { color: '#ff1645', fontWeight: '500', fontSize: 12 }]}>
                +{property.facilitiesAmenitiesDetails.length - 2} More More Amenities
              </Text>
            </TouchableOpacity>
          </View>

          {/* Mortgage Section */}
          <Text style={styles.sectionTitle}>Mortgage</Text>
          <Text style={styles.subText}>Calculate and view the monthly mortgage on this apartment</Text>

          <View style={styles.mortgageCard}>
            <Text style={styles.mortgagePrice}><Text style={styles.aed}>AED</Text> {mortgageData.monthlyPayment || '0'} <Text style={styles.perMonth}>Per Month</Text></Text>
            <Text style={styles.mortgageLine}>Loan Period : <Text style={styles.boldText}>{mortgageData.loanTerm} Years</Text></Text>
            <Text style={styles.mortgageLine}>Down Payment : ({mortgageData.downPayment}%)<Text style={styles.boldText}> AED {(mortgageData.price * mortgageData.downPayment / 100).toLocaleString()}</Text></Text>
            <Text style={styles.mortgageLine}>Interest Rate : <Text style={styles.boldText}>{mortgageData.interestRate}%</Text></Text>
            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('MortgageEdit')}>
              <FilterIcon style={{ width: 20, height: 20, color: "#ff1645" }} />
              <Text style={styles.editBtnText}>  Edit Values</Text>
            </TouchableOpacity>
          </View>

          {/* Add section */}
          {!adsLoading && ads.length > 0 && (
            <AdCard ads={ads} />
          )}



          {/* Payment Plan */}
          <Text style={styles.sectionTitle}>Payment Plan</Text>
          <View style={[styles.infoBlock, { borderBottomWidth: 0 }]} >
            <PaymentOptions paymentOptions={property.paymentOptions} />
          </View>

          <Text style={styles.sectionTitle}>Regulatory Information</Text>
          <View style={styles.infoBlock}>
            <InfoRow label="Permit Number" value="" />
            <InfoRow label="DED" value="1058671" />
            <InfoRow label="ORN" value="44709" />
            <InfoRow label="BRN" value="74446" />
          </View>

          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {<Image
              source={{ uri: property.qrCodeImage.url }}
              style={{
                width: 200,  // Set appropriate dimensions
                height: 200,
                resizeMode: 'contain'
              }}
            />}
          </View>

          <Text style={styles.sectionTitle}>Recommended For You</Text>

          {recommendedLoading ? (
            <ActivityIndicator size="large" color="#ff1645" style={{ marginVertical: 20 }} />
          ) : (
            <View style={styles.recommendationGrid}>
              {recommended.map((item) => (
                <RecommendedCard key={item._id} item={item} onPress={handleRecommendedPress} />
              ))}
            </View>
          )}



        </Animated.ScrollView>

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
        <BottomEnquireButton propertyId={propertyId} />
      </SafeAreaView>
      <StatusBar
        backgroundColor={"#000"}
        barStyle={"dark-content"}
      />
    </SafeAreaProvider>

  );
};

export default PropertyDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: "relative",
    paddingHorizontal: responsiveWidth(2)
  },
  content: { paddingBottom: 60, paddingHorizontal: 16 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  carousel: {
    marginTop: 10,
    marginBottom: 12,
  },
  carouselWrapper: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 8,
    // paddingHorizontal: 4,
    flexDirection: "column",
  },
  carouselImage: {
    width: '100%',
    // width: width - responsiveWidth(6.3),
    height: 230,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
  },
  pricePrefix: {
    fontSize: 16, // Smaller size for prefix
    fontFamily: fonts.PoppinsMedium, // Optional different font weight
  },
  priceValue: {
    fontSize: 24, // Larger size for the price
    fontFamily: fonts.PoppinsSemiBold,
  },
  priceSuffix: {
    fontSize: 16, // Smaller size for suffix
    fontFamily: fonts.PoppinsSemiBold,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    backgroundColor: "#fff",
    // paddingHorizontal: 10,
  },
  overlayTags: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'column',
    gap: 6,
  },
  tag: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 10,
    fontWeight: '600',
    // borderColor: '#ccc',
    // borderWidth: 1,
    color: '#333',
    fontFamily: fonts.PoppinsMedium,
  },
  actionRow: {
    flexDirection: 'row',
    // marginTop: 16,
    gap: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFDDE5',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: 'center',
    gap: 6,
    width: "48%",
  },
  actionText: {
    color: '#ff1645',
    fontSize: 12,
    fontFamily: fonts.PoppinsRegular,
  },
  title: {
    fontSize: 22,
    color: '#111',
    marginTop: 14,
    fontFamily: fonts.PoppinsSemiBold,
  },
  priceLabel: {
    fontFamily: fonts.PoppinsSemiBold,
    color: '#000',
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    fontFamily: fonts.PoppinsMedium,
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  address: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: "#fff",
    marginTop: 10,
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
    fontFamily: fonts.PoppinsRegular,
  },
  specText: {
    fontSize: 12,
    color: '#333333',
    marginHorizontal: 2,
    justifyContent: "center",
    marginLeft: 8,
    fontFamily: fonts.PoppinsRegular
  },
  infoText1: {
    fontSize: 14,
    color: '#333',
    backgroundColor: "#fff",
    fontFamily: fonts.PoppinsMedium,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 12,
    gap: 4, // spacing between icon and text
    // paddingBotto .m: 10,
  },
  sectionTitle: {
    color: '#111',
    fontSize: 20,
    marginTop: 14,
    fontFamily: fonts.PoppinsMedium,
  },
  description: {
    fontSize: 12,
    marginTop: 6,
    color: '#000',
    lineHeight: 20,
    fontFamily: fonts.PoppinsRegular,
  },
  readMoreBtn: {
    marginTop: 8,
    backgroundColor: '#FFDDE5',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 4,
  },
  readMoreText: {
    color: '#ff1645',
    fontSize: 12,
    fontFamily: fonts.PoppinsMedium,
  },
  infoBlock: {
    marginTop: 12,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    // paddingBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color: '#000',
    width: 170,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '600',
    color: '#111',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    // width: "60%"
  },

  floorPlanImageStyled: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 12,
    resizeMode: 'cover',
  },

  moreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFDDE5',
    backgroundColor: '#fff',
    marginBottom: 12,
  },

  moreButtonText: {
    color: '#ff1645',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fonts.PoppinsMedium,
  },
  scrollbarTrack: {
    position: 'absolute',
    top: 40,
    right: 6,
    bottom: 100, // leave space for buttons
    width: 4,
    backgroundColor: 'transparent',
    zIndex: 99,
  },
  scrollbarThumb: {
    width: 4,
    borderRadius: 2,
    backgroundColor: '#FF1645',
  },
  nearbyText: {
    fontSize: 12,
    color: '#111',
    marginVertical: 4,
    fontFamily: fonts.PoppinsRegular,
  },

  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 12,
  },

  amenityCard: {
    // width: '33.33%',
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 4,
    // flex:1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },

  amenityIcon: {
    width: 38,
    height: 38,
    marginBottom: 8,
    resizeMode: 'contain',
  },

  amenityText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',

  },
  subText: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    marginBottom: 10,
  },

  mortgageCard: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 4,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  mortgagePrice: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  aed: {
    fontSize: 14,
    fontWeight: '600',
  },

  perMonth: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888',
  },

  mortgageLine: {
    fontSize: 14,
    marginVertical: 2,
    color: '#333',
    fontFamily: fonts.PoppinsRegular,
  },

  boldText: {
    fontWeight: '600',
    color: '#111',
  },

  editBtn: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff0f6',
    borderRadius: 4,
  },

  editBtnText: {
    color: '#ff1645',
    fontFamily: fonts.PoppinsMedium,
  },
  recommendationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 6,
    backgroundColor: "#fff",
    rowGap: 14,
  },
  card: {
    // width: '50%',
    width: '49%',
    // flex:1,
    backgroundColor: '#fff',
    borderRadius: 4,
    // padding: 8,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  cardPrice: {
    color: '#000',
    fontFamily: fonts.PoppinsMedium,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 5
  },
  cardText: {
    color: '#000',
    fontSize: 12,
    marginRight: 8,
    flexShrink: 1
  },
  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  verticalLine: {
    width: 1,
    height: 20,
    backgroundColor: '#000',
    marginHorizontal: 0,
  },

});
