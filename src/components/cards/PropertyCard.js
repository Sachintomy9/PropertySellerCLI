import React ,{useState, useEffect,useRef} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions,ActivityIndicator } from 'react-native';
import { fonts } from '../../../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BedIcon from '../../assets/svg/svgicons/Details/BedIcon';
import BuildingIcon from '../../assets/svg/svgicons/Others/BuildingIcon';
import EnquireIcon from '../../assets/svg/svgicons/Others/EnquireIcon';
import DetailsIcon from '../../assets/svg/svgicons/Others/DetailsIcon';
import SavedActive from '../../assets/svg/svgicons/BottomTabs/SavedActive';
import SavedInactive from '../../assets/svg/svgicons/BottomTabs/SavedInactive';
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
const PropertyCard = ({ propertyId,propType,projectType,sqfeet,createdAt,floors,discount,paymentPlan,handOverQuarter,handOverYear, title, price, rooms, baths, area, location,image }) => {
  const navigation=useNavigation();
  const [carouselWidth, setCarouselWidth] = useState(width - 18);
  const { wishlist,updateWishlist } = useWishlist();
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedCurrency, conversionRate } = useSelector((state) => state.currency);
  const {isGuest} = useAuth();
  const {profile} = useProfile();

  const [enquiry,setEnquiry] = useState(false);
  const [isSubmitted, setIsSubmitted] =useState(false);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessPrompt, setShowSuccessPrompt] =useState(false);
  const [showRemovedPrompt, setShowRemovedPrompt] =useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0); // image


  const handleDetails = () => {
    navigation.navigate('PropDetails', { propertyId});

  }

  const handleHeartPress = async () => {
    if (isGuest) {
      setShowLoginPrompt(true);
    } else {
      setIsLoading(true);
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




  return(
    
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
                  <View style={{ width: carouselWidth, height: 250 }}>
                    <Image
                      source={{ uri: item.webp?.url || item.png?.url }}
                      style={[styles.carouselImage, { width: carouselWidth, height: 250 }]}
                      resizeMode="cover"
                    />
                  </View>
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
              />
      
              <View style={styles.pagination}>
                  {image.map((_, index) => (
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
    
        {(handOverQuarter || handOverYear) && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>
              Handover Date: {handOverQuarter} {handOverYear}
            </Text>
          </View>
        )}

        { projectType && (
        <View style={styles.overlayZ}>
            <Text style={styles.overlaySubText}>{projectType}</Text>
        </View>
        )}

       {discount && (
        <View style={styles.overlay1}>
          <Text style={{fontSize: 12,color: '#fff',fontFamily:fonts.PoppinsMedium}}>{discount} Discount</Text>
        </View>
      )}


      {/* Heart Icon */}
      <TouchableOpacity style={styles.heartIconWrapper} onPress={handleHeartPress}>
        {isWishlisted ? (
          <SavedActive width={24} height={24} />
        ) : (
          <SavedInactive width={24} height={24} />
        )}
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
        <Text style={styles.dot}>  </Text>
        {Boolean(rooms) && (
          <>
            <BedIcon style={{ width: 24, height: 24 }}/>
            <Text style={styles.specText}> {rooms} </Text>
          </>
        )}

        
        {Boolean(floors) && (
          <>
            <Text style={styles.dot}>  </Text>
            <BuildingIcon width={16} height={16} />
            <Text style={styles.specText}>{floors} {floors === 1 ? 'floor' : 'floors'}</Text>
          </>
        )}
      </View>
        
        <View style={{flexDirection: "row"}}>
          <LocationIcon color='#000' size={24}/>
          <Text style={styles.location}>{location}</Text>
        </View>

          {Boolean(createdAt) && (
          <View style={{backgroundColor:"#FFDDE5", marginBottom:10, marginTop:5, borderRadius:3, height:30}}>
            <View style={{top: 5, marginLeft:20}}>
              <StarsIcon/> 
            </View>
            <View style={{bottom: 12, left:20}}>
              <Text style={styles.validated}>{getDaysAgoText(createdAt)}</Text>
            </View>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  overlay: {
    position: 'absolute',
    top: 20,
    height:25,
    left: 20,
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
    top: 50,
    left: 20,
    height:25,
    fontSize:16,
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
    elevation: 2,
    flexDirection: "column",
    gap: 10,
    color: "#000",
    fontFamily: fonts.PoppinsRegular
  },
  overlay1: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#54bc4c',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    elevation: 2,
  },
  overlayText: {
    fontSize: 12,
    color: '#000',
    fontFamily: fonts.PoppinsSemiBold,
  },
  overlaySubText: {
    fontSize: 12,
    color: '#00',
    fontFamily: fonts.PoppinsSemiBold,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
    fontFamily: fonts?.PoppinsSemiBold || undefined,
  },
  price: {
    fontSize: 20,
    color: '#000',
    marginBottom: 6,
    fontFamily:fonts.PoppinsSemiBold
  },
  pricePrefix: {
  fontSize: 16, // Smaller size for prefix
  fontFamily: fonts.PoppinsRegular, // Optional different font weight
  },
  priceValue: {
    fontSize: 24, // Larger size for the price
    fontFamily: fonts.PoppinsSemiBold,
  },
  priceSuffix: {
    fontSize: 16, // Smaller size for suffix
    fontFamily: fonts.PoppinsRegular,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  specText: {
    fontSize: 15,
    color: '#555',
    marginHorizontal: 2,
    fontFamily:fonts.PoppinsRegular
  },
  specText1: {
    fontSize: 15,
    color: '#555',
    marginHorizontal: 2,
    fontFamily: fonts.PoppinsRegular
  },
  location: {
    fontSize: 13,
    color: '#777',
    marginBottom: 8,
    top:3,
    left: 3,
  },
  validated: {
    fontSize: 13,
    color: '#D91E5B',
    marginBottom: 10,
    marginLeft:20,
    fontFamily: fonts.PoppinsRegular,
  },
  actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 8,
},
detailsButton: {
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
  marginTop:250,
  right: 8,
  backgroundColor: '#fff',
  padding: 6,
  borderRadius: 20,

},
carouselWrapper: {
  position: "relative",
  paddingHorizontal:0,
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
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  marginHorizontal: 4,
marginBottom:10,
},
activeDot: {
  backgroundColor: '#fff',
  width: 10,
  height: 10,
},
loadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(255,255,255,0.7)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
});
