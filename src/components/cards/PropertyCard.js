import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { fonts } from '../../../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BedIcon from '../../assets/svg/svgicons/Others/BedIcon';
import BuildingIcon from '../../assets/svg/svgicons/Others/BuildingIcon';
import EnquireIcon from '../../assets/svg/svgicons/Others/EnquireIconWhite';
import DetailsIcon from '../../assets/svg/svgicons/Others/DetailsIcon';
import LocationIcon from '../../assets/svg/svgicons/Details/LocationIcon';
import StarsIcon from '../../assets/svg/svgicons/Others/StarsIcon';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProfile } from '../../context/ProfileContext';
import { collectWishlist } from '../../services/AuthService';
import EnquiryPrompt from '../popups/EnquiryPrompt';
import LoginPrompt from '../popups/LoginPrompt';
import SavedRemoved from '../popups/SavedRemoved';
import SavedSuccess from '../popups/SavedSuccess';
import EnquirySubmitted from '../popups/EnquirySubmitted';
import EnquiryExists from '../popups/EnquiryExists';
import { formatPropType } from '../../utils/formatPropType';
import api from '../../services/ApiClient';
const { width } = Dimensions.get('window');
const PropertyCard = ({ propertyId, propType, projectType, sqfeet, createdAt, floors, discount, paymentPlan, handOverQuarter, handOverYear, title, price, rooms, baths, area, location, image, developerImageUrl }) => {
  const navigation = useNavigation();
  const [carouselWidth, setCarouselWidth] = useState(width - 18);
  const { wishlist, updateWishlist } = useWishlist();
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedCurrency, conversionRate } = useSelector((state) => state.currency);
  const { isGuest } = useAuth();
  const { profile } = useProfile();

  const [enquiry, setEnquiry] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessPrompt, setShowSuccessPrompt] = useState(false);
  const [showRemovedPrompt, setShowRemovedPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0); // image


  const handleDetails = () => {
    navigation.navigate('PropDetails', { propertyId });

  }

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

  const getDaysAgoText = (createdAt) => {
    if (!createdAt) return '';

    const createdDate = new Date(createdAt);
    const today = new Date();

    // Reset time portion for accurate "days ago" calculation
    const createdUTC = Date.UTC(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());
    const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

    const daysAgo = Math.floor((todayUTC - createdUTC) / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) return 'This listing was newly introduced today';
    if (daysAgo === 1) return 'This listing was newly introduced yesterday';
    return `  This listing was newly introduced ${daysAgo} days ago`;
  };




  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveImageIndex(viewableItems[0].index);
    }
  }).current;

  const ProjectTypeNameRefference = (projectType) => {
    switch (projectType) {
      case "commercial-residential":
        return "Property Residential & Commercial";

      case "project-commercial":
        return "Project Commercial";
      case "project-residential":
        return "Project Residential";
      case "resale-commercial":
        return "Resale Commercial";
      case "resale-residential":
        return "Resale Residential";
      case "secondary-commercial":
        return "Secondary Commercial";
      case "secondary-residential":
        return "Secondary Residential";
      case "land-commercial":
        return "Land Commercial";
      case "land-residential":
        return "Land Residential";
      default:
        return "Unknown";
    }
  }



  return (

    <View style={styles.card}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF1645" />
        </View>
      )}
      {/* Property Image */}
      {isSubmitted && (
        <EnquirySubmitted
          visible={isSubmitted}
          onClose={() => (setIsSubmitted(false))}
          message={"Enquiry"}
        />
      )}

      {enquiry && (
        <EnquiryExists
          visible={enquiry}
          onClose={() => (setEnquiry(false))}
          message={"Enquiry"}
        />
      )}

      {showLoginPrompt && (
        <LoginPrompt
          visible={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
        />
      )}

      <SavedSuccess
        visible={showSuccessPrompt}
        onClose={() => setShowSuccessPrompt(false)}
      />
      <SavedRemoved
        visible={showRemovedPrompt}
        onClose={() => setShowRemovedPrompt(false)}
      />
      <View style={styles.imageWrapper}>
        <View
          style={[styles.imageWrapper, { overflow: 'hidden', borderRadius: 0 }]}
          onLayout={(e) => {
            const w = e.nativeEvent.layout.width;
            if (w && w !== carouselWidth) setCarouselWidth(w);
          }}
        >
          <FlatList
            data={image}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            snapToInterval={carouselWidth}
            snapToAlignment="center"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            renderItem={({ item, index }) => (
              <View style={{ width: carouselWidth, height: 200 }}>
                <Image
                  source={{ uri: item.webp?.url || item.png?.url || item.url }}
                  style={[styles.carouselImage, { width: carouselWidth, height: 250 }]}
                  resizeMode="cover"
                />
              </View>
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />

          <View style={styles.pagination}>
            {(() => {
              const total = image.length;
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

              return image.slice(start, end).map((_, index) => {
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

        {(handOverQuarter || handOverYear) && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>
              Handover Date: {handOverQuarter} {handOverYear}
            </Text>
          </View>
        )}

        {projectType && (
          <View style={styles.overlayZ}>
            <Text style={styles.overlaySubText}>{ProjectTypeNameRefference(projectType)}</Text>
          </View>
        )}

        {discount && (
          <View style={styles.overlay1}>
            <Text style={{ textAlign: "center", fontSize: 10, color: '#fff', fontFamily: fonts.PoppinsMedium }}>{discount} Discount</Text>
          </View>
        )}


        {/* Heart Icon */}
        <TouchableOpacity style={styles.heartIconWrapper} onPress={handleHeartPress}>
          {/* {isWishlisted ? (
            <SavedActive width={24} height={24} />
          ) : (
            <SavedInactive width={24} height={24} />
          )} */}
          <Image source={{ uri: developerImageUrl }} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>

      </View>

      {/* Property Info */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>
          <Text style={styles.pricePrefix}>Starting From </Text>
          <Text style={styles.priceValue}>{displayPrice(price)} </Text>
          <Text style={styles.priceSuffix}>{selectedCurrency}</Text>
        </Text>

        <View style={styles.specsRow}>
          <Text style={styles.specText1}>{formatPropType(propType)}</Text>
          <View style={styles.verticalLine}></View>
          {Boolean(rooms) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BedIcon style={{ width: 20, height: 20 }} />
              <Text style={styles.specText}> {rooms} </Text>
            </View>
          )}
          <View style={styles.verticalLine}></View>


          {Boolean(floors) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Text style={styles.dot}>  </Text> */}
              <BuildingIcon width={16} height={16} />
              <Text style={styles.specText}>{floors} {floors === 1 ? 'floor' : 'floors'}</Text>
            </View>
          )}
        </View>

        <View style={{ flexDirection: "row", marginBottom: 8, alignItems: "center" }}>
          <LocationIcon
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.location}>{location}</Text>
        </View>

        {Boolean(createdAt) && (
          <View style={{ paddingVertical: 4, backgroundColor: "#FFDDE5", marginBottom: 10, marginTop: 5, borderRadius: 3, justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
            {/* <View style={{ justifyContent:"center",alignItems:"flex-start" }}> */}
            <StarsIcon />
            {/* </View> */}
            {/* <View style={{ bottom: 12, left: 20 }}> */}
            <Text style={styles.validated}>{getDaysAgoText(createdAt)}</Text>
            {/* </View> */}
          </View>
        )}
        {/* Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.detailsButton} onPress={handleDetails}>
            <DetailsIcon width={20} height={20} fill="#fff" />
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.enquireButton} onPress={() => setModalVisible(true)}>
            <EnquireIcon width={20} height={20} fill="#fff" />
            <Text style={styles.buttonText}>Enquire Now</Text>
          </TouchableOpacity>

          <EnquiryPrompt
            projectId={propertyId}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            setIsSubmitted={setIsSubmitted}
            setEnquiry={setEnquiry}
          />
        </View>
      </View>

    </View>

  );
};





export default PropertyCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginHorizontal: 9,
    marginBottom: 5,
    overflow: 'hidden',
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: '#ddd',
    // shadowOffset: { width: 0, height: 2 },
  },
  overlay: {
    position: 'absolute',
    top: 10,
    height: 25,
    left: 10,
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 2,
    elevation: 2,
    flexDirection: "column",
    gap: 10,
    fontFamily: fonts.PoppinsRegular
  },
  overlayZ: {
    position: 'absolute',
    top: 44,
    justifyContent: "center",
    alignItems: "center",
    left: 10,
    height: 25,
    fontSize: 14,
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
    // elevation: 2,
    flexDirection: "column",
    gap: 10,
    color: "#000",
    fontFamily: fonts.PoppinsRegular
  },
  overlay1: {
    position: 'absolute',
    top: 10,
    right: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: '#54bc4c',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 2,
    // elevation: 2,
  },
  overlayText: {
    fontSize: 10,
    color: '#000',
    fontFamily: fonts.PoppinsMedium,
  },
  overlaySubText: {
    fontSize: 10,
    color: '#000',
    fontFamily: fonts.PoppinsMedium,
  },
  content: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    fontFamily: fonts?.PoppinsSemiBold || undefined,
  },
  price: {
    fontSize: 18,
    color: '#000',
    marginBottom: 8,
    fontFamily: fonts.PoppinsSemiBold
  },
  pricePrefix: {
    fontSize: 16, // Smaller size for prefix
    fontFamily: fonts.PoppinsSemiBold, // Optional different font weight
  },
  priceValue: {
    fontSize: 24, // Larger size for the price
    fontFamily: fonts.PoppinsSemiBold,
  },
  priceSuffix: {
    fontSize: 16, // Smaller size for suffix
    fontFamily: fonts.PoppinsSemiBold,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 8,
  },
  specText: {
    fontSize: 12,
    color: '#333333',
    marginHorizontal: 2,
    justifyContent: "center",
    marginLeft: 8,
    fontFamily: fonts.PoppinsRegular
  },
  specText1: {
    fontSize: 14,
    color: '#000',
    marginHorizontal: 2,
    fontFamily: fonts.PoppinsMedium
  },
  location: {
    fontSize: 12,
    color: '#333333',
    // marginBottom: 8,
    marginLeft: 8,
    fontFamily: fonts.PoppinsRegular,
    // top: 3,
    // backgroundColor:"green",
    // left: 3,
  },
  validated: {
    fontSize: 12,
    color: '#FF1645',
    // marginBottom: 10,
    // marginLeft: 20,
    fontFamily: fonts.PoppinsRegular,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  detailsButton: {
    flex: 1,
    minWidth: '40%', // Ensures minimum width
    backgroundColor: '#FF1645',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10, // Added horizontal padding
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enquireButton: {
    flex: 1,
    minWidth: '40%', // Ensures minimum width
    backgroundColor: '#FF1645',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12, // Added horizontal padding
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: fonts.PoppinsMedium,
    fontSize: 14,
    marginLeft: 10,
    top: 1, // Allows text to shrink if needed
  },
  heartIconWrapper: {
    position: 'absolute',
    marginTop: 220,
    right: 8,
    backgroundColor: '#fff',
    padding: 6,
    // borderRadius: 20,

  },
  carouselWrapper: {
    position: "relative",
    paddingHorizontal: 0,
  },
  carouselImage: {
    width: '100%',
    height: 250,
    borderRadius: 0,
  },
  pagination: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
    // marginBottom: 10,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    marginTop: -1
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
    marginHorizontal: 10,
  },
});
