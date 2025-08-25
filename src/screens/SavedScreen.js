import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import TopHeader2 from '../components/Headers/TopHeader2'
import PropertyCard from '../components/cards/PropertyCard'
import EmptyState from '../components/others/EmptyScreen'
import { useProfile } from '../context/ProfileContext'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { collectWishlist } from '../services/AuthService'
import api from '../services/ApiClient'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
const SavedScreen = () => {
  const { profile } = useProfile();
  const { wishlist, updateWishlist } = useWishlist();
  const { isGuest } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refreshWishlist = async () => {
    try {
      setRefreshing(true);
      await collectWishlist(profile, updateWishlist);
    } catch (error) {
      console.error('Error Reloading wishlist', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    refreshWishlist(1);
  }, []);



  const renderItem = ({ item }) => {
    const details = item.propertyDetails || {};
    console.log("createdd at: ", item);

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
        createdAt={details.createdAt}
        location={details.address}
        image={
          Array.isArray(details.mainImages) && details.mainImages.length > 0
            ? details.mainImages
            : null
        }
      />
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
      style={{
        flex:1,
        backgroundColor:"#fff"
      }}
      >
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <TopHeader2 title="Saved Properties" />

          {/* Empty State Handling */}
          {isGuest ? (
            <EmptyState
              message="You're Not Logged In"
              subMessage="To add properties to your wishlist and make your property buying journey easier, please log in."
            />
          ) : wishlist.length === 0 && !loading ? (
            <EmptyState
              message="Nothing to show here"
              subMessage="Please add some Properties to your wishlist, and they will be shown here."
            />
          ) : (
            <FlatList
              data={wishlist}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingTop: 10 }}
              scrollEventThrottle={16}
              refreshing={refreshing}
              onRefresh={refreshWishlist}
            />
          )}
        </View>
      </SafeAreaView>

    </SafeAreaProvider>

  );
}

export default SavedScreen

const styles = StyleSheet.create({})