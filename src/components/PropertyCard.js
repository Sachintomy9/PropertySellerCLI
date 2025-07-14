import React ,{useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import BedIcon from '../assets/svg/svgicons/Details/BedIcon';
import BuildingIcon from '../assets/svg/svgicons/Others/BuildingIcon';
import EnquireIcon from '../assets/svg/svgicons/Others/EnquireIcon';
import DetailsIcon from '../assets/svg/svgicons/Others/DetailsIcon';
import SavedActive from '../assets/svg/svgicons/BottomTabs/SavedActive';
import SavedInactive from '../assets/svg/svgicons/BottomTabs/SavedInactive';
import LocationIcon from '../assets/svg/svgicons/Details/LocationIcon';
import { useWishlist } from '../context/WishlistContext';
import EnquiryPrompt from './popups/EnquiryPrompt';

const PropertyCard = ({ propertyId,propType,projectType,sqfeet,createdAt,floors,discount,paymentPlan,handOverQuarter,handOverYear, title, price, rooms, baths, area, location,image }) => {
  const navigation=useNavigation();
  const { wishlist } = useWishlist();
  const [modalVisible, setModalVisible] = useState(false);
  

  const handleDetails = () => {
    navigation.navigate('PropDetails', { propertyId});

  }
  const isWishlisted = wishlist.some(
    item => item.propertyDetails?._id === propertyId
  );  


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
    return `This listing was newly introduced ${daysAgo} days ago`;
  };

  return(
    <View style={styles.card}>
    {/* Property Image */}
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: image }} // Replace with dynamic if needed
        style={styles.image}
        resizeMode="cover"
      />

 
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Handover Date : {handOverQuarter} {handOverYear}</Text>
          <Text style={styles.overlaySubText}>{projectType}</Text>
        </View>


       {discount && (
        <View style={styles.overlay1}>
          <Text style={styles.overlaySubText}>{discount} Discount</Text>
        </View>
      )}


      {/* Heart Icon */}
      <TouchableOpacity style={styles.heartIconWrapper}>
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
        <Text style={styles.priceValue}>{price} </Text>
        <Text style={styles.priceSuffix}>AED</Text>
      </Text>
      <View style={styles.specsRow}>
        <Text style={styles.specText1}>{propType}</Text>
        <Text style={styles.dot}>     </Text>
        <BedIcon style={{ width: 24, height: 24 }}/>
        <Text style={styles.specText}> {rooms} </Text>
        {Boolean(floors) && (
          <>
            <Text style={styles.dot}>    </Text>
            <BuildingIcon width={16} height={16} />
            <Text style={styles.specText}>{floors} {floors === 1 ? 'floor' : 'floors'}</Text>
          </>
        )}
      </View>
        
        <View style={{flexDirection: "row"}}>
          <LocationIcon color='#000' size={24}/>
          <Text style={styles.location}>{location}</Text>
        </View>


      <Text style={styles.validated}>
        ⭐ {getDaysAgoText(createdAt)}
      </Text>

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
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
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
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  imageWrapper: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    elevation: 2,
  },
  overlay1: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#37f73d',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    elevation: 2,
  },
  overlayText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  overlaySubText: {
    fontSize: 12,
    color: '#555',
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
  dot: {
    fontSize: 14,
    color: '#aaa',
    marginHorizontal: 2,
  },
  location: {
    fontSize: 13,
    color: '#777',
    marginBottom: 8,
    top:3,
    left: 3,
  },
  validated: {
    fontSize: 12,
    color: '#D91E5B',
    marginBottom: 10,
    fontWeight: '600',
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
  marginTop:200,
  right: 2,
  backgroundColor: '#fff',
  padding: 6,
  borderRadius: 20,

},
});
