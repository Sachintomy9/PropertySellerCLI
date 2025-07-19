import React, { useEffect, useState,useRef } from 'react';
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
} from 'react-native';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
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

// SVG icons (you should create/import these)
import BackIcon from '../assets/svg/svgicons/Details/BackIcon';
import SavedInactive from '../assets/svg/svgicons/BottomTabs/SavedInactive';
import SavedActive from '../assets/svg/svgicons/BottomTabs/SavedActive';
import ShareIcon from '../assets/svg/svgicons/Others/ShareIcon';
import LocationIcon from '../assets/svg/svgicons/Details/LocationIcon';
import BedIcon from '../assets/svg/svgicons/Details/BedIcon';
import BathIcon from '../assets/svg/svgicons/Details/BathIcon';
import AreaIcon from '../assets/svg/svgicons/Details/AreaIcon';
import PlayIcon from '../assets/svg/svgicons/Details/PlayIcon';
import MapIcon from '../assets/svg/svgicons/Details/LocationIcon';
import TickIcon from '../assets/svg/svgicons/Details/TickIcon';
import FilterIcon from '../assets/svg/svgicons/Others/FilterIcon';
import LoginPrompt from '../components/popups/LoginPrompt';
import SavedSuccess from '../components/popups/SavedSuccess';
import SavedRemoved from '../components/popups/SavedRemoved';
import EnquirySubmitted from '../components/popups/EnquirySubmitted';
const PropertyDetailScreen = () => {
  const route = useRoute();
  const {isGuest} = useAuth();
  const {profile} = useProfile();
  const { wishlist,updateWishlist } = useWishlist();
  const { mortgageData, applyCustomValues } = useMortgage();
  const dispatch = useDispatch();
  const { selectedCurrency, conversionRate } = useSelector((state) => state.currency);
  

  const navigation = useNavigation();
  const { propertyId } = route.params;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessPrompt, setShowSuccessPrompt] =useState(false);
  const [showRemovedPrompt, setShowRemovedPrompt] =useState(false);


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
        console.log(" Price value in PropDetailsScreen: ",parseFloat(priceStr.replace(/,/g, '')));
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
      try{  
          // Show corresponding popup
          if (!isWishlisted) {
            setShowSuccessPrompt(true); // now added
          } else {
            setShowRemovedPrompt(true); // now removed
          }
        

        const payload = {userId: profile.id, projectId: propertyId,}
        const response = await api.post('wishlist',payload);
        await collectWishlist(profile,updateWishlist);

        console.log("Successfully Added to wishlist:",response.data)
      } catch (error) {
        console.error('Profile update error:', error.response?.data || error.message);
        Alert.alert('Error', error.response?.data?.message || 'Profile update failed.');
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
        <ActivityIndicator size="large" color="#D91E5B" />
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


  return (
    <View style={styles.container} contentContainerStyle={styles.content}>

            {/* Top Navigation */}
      <View style={styles.headerRow}>
        <View style={{backgroundColor:"#FFE8EF",borderRadius:5, width:35,height:35}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={{left:10}}>
                <BackIcon />
              </View>
            </TouchableOpacity>
        </View>
        <View style={{marginLeft:250,backgroundColor:"#FFE8EF",borderRadius:5,width:35,height:35}}>
            <TouchableOpacity >
            <ShareIcon color="#000" width={32} height={32}/>
            </TouchableOpacity>
        </View>
        <View style={{backgroundColor:"#FFE8EF",borderRadius:5,width:35,height:35}}>
            <TouchableOpacity onPress={handleHeartPress}>
            {isWishlisted ? (
                <SavedActive width={32} height={32} />
              ) : (
                <SavedInactive width={32} height={32} />
              )}
            </TouchableOpacity>
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
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('ImageGallery')
            }}
            >
              <Image source={{ uri: item.secure_url }} style={styles.carouselImage} />
            </TouchableOpacity>
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />

        <View style={styles.pagination}>
            {property.mainImages.map((_, index) => (
            <View
                key={index}
                style={[
                styles.dot,
                index === activeImageIndex ? styles.activeDot : null,
                ]}
            />
            ))}
        </View>
        </View>

      {/* Tags */}
      <View style={styles.tagRow}>
        <Text style={styles.tag}>Handover Date :{property.handOverQuarter} - {property.handOverYear}</Text>
        <Text style={styles.tag}>{property.paymentPlan} Payment Plan</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => Linking.openURL(property.googleMapsUrl)}>
          <MapIcon />
          <Text style={styles.actionText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => Linking.openURL(property.youtubeVideoLink)}>
          <PlayIcon />
          <Text style={styles.actionText}>Watch Video</Text>
        </TouchableOpacity>
      </View>

      {/* Title & Price */}
      <Text style={styles.title}>{property.projectTitle}</Text>
      <Text style={styles.priceLabel}>{selectedCurrency} <Text style={styles.price}>{displayPrice(property.priceInAED)}</Text></Text>

      {/* Address */}
      <View style={styles.row}>
        <LocationIcon color='#000' size={24}/>
        <Text style={styles.address}>{property.address}</Text>
      </View>

      {/* Property Info */}
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{formatPropType(property.propertyTypes)}   </Text>
        <BedIcon />
        <Text style={styles.infoText}>Bedrooms: {property.type}</Text>
        {/*<BathIcon />
        <Text style={styles.infoText}> Bathrooms: 2 </Text>*/}

        
        {property.squareFeet && (
          <>
            <AreaIcon />
            <Text style={styles.infoText}>Area: {property.squareFeet} sqft </Text>
          </>
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
        <TouchableOpacity onPress={() => setReadMore(!readMore)} style={styles.readMoreBtn}>
          <Text style={styles.readMoreText}>{readMore ? 'Show Less' : 'Read More'}</Text>
        </TouchableOpacity>
      )}


      {/* Property Information */}
      <Text style={styles.sectionTitle}>Property Information</Text>
      <View style={styles.infoBlock}>
        <InfoRow label="Type" value={property.propertyTypes} />
        <InfoRow label="Purpose" value="For Sale" />
        <InfoRow label="Reference no" value="Bayut - NANCY\\102235" />
        <InfoRow label="Completion" value={property.completionType ?? "Offplan"} />
        <InfoRow label="Furnishing" value={property.furnishing} />
        <InfoRow label="Added on" value={formatDate(property.createdAt)} />
        <InfoRow label="Handover Date" value={property.handOverQuarter} />
        <InfoRow label="Property ID" value={property.uniqueId} />
      </View>

      {/* Validated Information */}
      
      <View style={styles.verifiedRow}>
        <Text style={styles.sectionTitle}>Validated Information</Text>
        <Text style={styles.verifiedText}>Verified  </Text>
        <TickIcon style={styles.verifiedText} />
      </View>
      <View style={styles.infoBlock}>
        <InfoRow label="Developer" value={property.developerDetails.name} />
        <InfoRow label="Ownership" value="Freehold" />
        <InfoRow label="Built-up Area" value={property.squareFeet} />
        <InfoRow label="Usage" value="Other" />
        <InfoRow label="Parking Availability" value="Yes" />
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
            <Image source={{ uri: item.image.secure_url }}  style={styles.amenityIcon} />
            <Text style={styles.amenityText}>{item.name}</Text>
            </View>
        ))}

        <TouchableOpacity style={styles.amenityCard} onPress={() => {
                navigation.navigate('AmenitiesInfo', {facilitiesAmenitiesDetails: property.facilitiesAmenitiesDetails,})
            }}>
            <Text style={[styles.amenityText, { color: '#ff1645', fontWeight: '600' }]}>
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
            <FilterIcon style={{ width: 20, height: 20 , color :"#ff1645"}}/>
            <Text style={styles.editBtnText}>  Edit Values</Text>
          </TouchableOpacity>
        </View>

        {/* Mortgage Banner */}
        

        {/* Payment Plan */}
        <Text style={styles.sectionTitle}>Payment Plan</Text>
        <View style={styles.infoBlock}>
         <PaymentOptions paymentOptions={property.paymentOptions} />
        </View>

        <Text style={styles.sectionTitle}>Regulatory Information</Text>
        <View style={styles.infoBlock}>
          <InfoRow label="Permit Number" value="" />
          <InfoRow label="DED" value="" />
          <InfoRow label="ORN" value="" />
          <InfoRow label="BRN" value="" />
        </View>

        <View style={{ 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image 
            source={{ uri: property.qrCodeImage.url }} 
            style={{ 
              width: 200,  // Set appropriate dimensions
              height: 200,
              resizeMode: 'contain'
            }}
          />
        </View>

      <Text style={styles.sectionTitle}>Recommended For You</Text>


  


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
        <BottomEnquireButton propertyId={propertyId}/>
    </View>
  );
};

export default PropertyDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',position: "relative",paddingHorizontal:12 },
  content: { paddingBottom: 60, paddingHorizontal: 16 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  carousel: {
  marginTop: 10,
  marginBottom: 12,
},
carouselWrapper: {
  position: 'relative',
  marginTop: 10,
  marginBottom: 12,
  paddingHorizontal:4,
},
carouselImage: {
  width: width - 32,
  height: 250,
  borderRadius: 10,
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
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  marginHorizontal: 4,
},
activeDot: {
  backgroundColor: '#ff1645',
  width: 10,
  height: 10,
},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 10,
    paddingHorizontal:10,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  tag: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: '600',
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection:"row",
    width: "48.5%"
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFDDE5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 6,
    width: "48%",
  },
  actionText: {
    color: '#ff1645',
    fontFamily: fonts.PoppinsSemiBold,
  },
  title: {
    fontSize: 25,
    marginTop: 20,
    fontFamily: fonts.PoppinsSemiBold,
  },
  priceLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  price: {
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
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
    fontFamily: fonts.PoppinsRegular,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 24,
    fontFamily: fonts.PoppinsMedium,
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    color: '#444',
    lineHeight: 20,
  },
  readMoreBtn: {
    marginTop: 8,
    backgroundColor: '#FFDDE5',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  readMoreText: {
    color: '#ff1645',
    fontWeight: 'bold',
  },
  infoBlock: {
    marginTop: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  infoItem: {
    marginBottom: 10,
    flexDirection: 'row',
    marginVertical: 4,

  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
    width: 170,
  },
  infoValue: {
    flex:1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    width: "60%"
  },
  verifiedText: {
    color: '#28a745',
    fontWeight: 'bold',
    top:10,
    left: 10,
  },
  floorPlanImageStyled: {
  width: '100%',
  height: 200,
  borderRadius: 10,
  marginBottom: 12,
  resizeMode: 'cover',
},

moreButton: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 14,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#FFDDE5',
  backgroundColor: '#fff',
  marginBottom: 16,
},

moreButtonText: {
  color: '#ff1645',
  fontSize: 16,
  fontWeight: '600',
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
  fontSize: 14,
  color: '#111',
  marginVertical: 4,
},

amenitiesRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: 10,
  marginTop: 12,
},

amenityCard: {
  width: '30%',
  backgroundColor: '#F9F9F9',
  borderRadius: 10,
  padding: 8,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#eee',
},

amenityIcon: {
  width: 50,
  height: 50,
  marginBottom: 8,
  resizeMode: 'contain',
},

amenityText: {
  fontSize: 13,
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
  borderRadius: 10,
  padding: 16,
  marginBottom: 12,
  backgroundColor: '#fff',
},

mortgagePrice: {
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
  borderRadius: 6,
},

editBtnText: {
  color: '#ff1645',
  fontWeight: 'bold',
},
  
});
