import { StyleSheet, Text, View,FlatList } from 'react-native'
import React ,{useState,useEffect}from 'react'
import TopHeader2 from '../components/Headers/TopHeader2'
import PropertyCard from '../components/PropertyCard'
import { useProfile } from '../context/ProfileContext'
import { useWishlist } from '../context/WishlistContext'
import api from '../services/ApiClient'
const SavedScreen = () => {
  const { profile } = useProfile();
  const { updateWishlist } = useWishlist();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProperties = async () => {
      try {
        setRefreshing(true);
        const response = await api.get(`wishlist/${profile.id}`);
        if (response.data.success) {
            console.log("response",response.data.data);
            setProperties(response.data.data);
            updateWishlist(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };


  useEffect(() => {
    
    fetchProperties();
  }, []);


  const renderItem = ({ item }) => {
  const details = item.propertyDetails || {};

  return (
    <PropertyCard
      title={details.projectTitle}
      propType={details.propertyTypes}
      projectType={details.projectType}
      type={details.type}
      discount={details.discount}
      handOverQuarter={details.handOverQuarter}
      handOverYear={details.handOverYear}
      paymentPlan={details.paymentPlan}
      price={details.priceInAED}
      rooms={details.type}
      floors={details.totalFloors}
      baths="–"
      area="–"
      propertyId={item.propertyDetails?._id}
      location={details.address}
      image={
        Array.isArray(details.mainImages) && details.mainImages.length > 0
          ? details.mainImages[0].secure_url
          : null
      }
    />
  );
};
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopHeader2 title="Wishlist" />
      {/* Property List */}
            <FlatList
              data={properties}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingTop: 10 }}
              scrollEventThrottle={16}
              refreshing={refreshing}
              onRefresh={fetchProperties}
            />
    </View>
  )
}

export default SavedScreen

const styles = StyleSheet.create({})