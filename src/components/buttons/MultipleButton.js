import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import SavedActive from '../../assets/svg/svgicons/BottomTabs/SavedActive';
import ShareIcon from '../../assets/svg/svgicons/Details/ShareRed';
import EnquireIcon from '../../assets/svg/svgicons/Others/EnquireIconRed';
import EnquiryPrompt from '../popups/EnquiryPrompt';
import SavedSuccess from '../popups/SavedSuccess';
import SavedRemoved from '../popups/SavedRemoved';
import LoginPrompt from '../popups/LoginPrompt';
import EnquirySubmitted from '../popups/EnquirySubmitted';
import EnquiryExists from '../popups/EnquiryExists';
import { collectWishlist } from '../../services/AuthService';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSelector } from 'react-redux';
import Share from 'react-native-share';
import api from '../../services/ApiClient';
import HeartIcon from '../../assets/svg/svgicons/Others/HeartIcon';
const MultipleButton = ({ onSave, onShare, onEnquire }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessPrompt, setShowSuccessPrompt] = useState(false);
  const [showRemovedPrompt, setShowRemovedPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [enquiry, setEnquiry] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { profile } = useProfile();
  const { isGuest } = useAuth();
  const { wishlist, updateWishlist } = useWishlist();
  const property = useSelector((state) => state.property.property);

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

        console.log("Profile id:", profile.id);
        const payload = { userId: profile.id, projectId: property._id, }
        console.log("payload: ", payload);
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


  const isWishlisted = wishlist.some(
    item => item.propertyDetails?._id === property._id
  );

  return (
    <View style={[styles.container]}>
      {showLoginPrompt && (
        <LoginPrompt
          visible={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
        />
      )}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF1645" />
        </View>
      )}

      <SavedSuccess
        visible={showSuccessPrompt}
        onClose={() => setShowSuccessPrompt(false)}
      />
      <SavedRemoved
        visible={showRemovedPrompt}
        onClose={() => setShowRemovedPrompt(false)}
      />

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

      <TouchableOpacity style={styles.button} onPress={handleHeartPress}>
        {isWishlisted ? (
          <>
            <SavedActive width={24} height={24} />
            <Text style={styles.text}>Saved</Text>
          </>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <HeartIcon width={24} height={24} stroke='#ff1645' />
            <Text style={styles.text}>Save</Text>
          </View>
        )}

      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }]} onPress={handleShare}>
        <ShareIcon
          style={{
            width: 20,
            height: 20,

          }}

        />
        <Text style={styles.text}>Share</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }]} onPress={() => setModalVisible(true)}>
        <View style={[styles.Icon]}>
          <EnquireIcon
            // fill="#ff1645"
            style={{ width: 24, height: 24 }} />
        </View>
        <Text style={styles.text}>Enquire</Text>
      </TouchableOpacity>

      <EnquiryPrompt
        projectId={property._id}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setIsSubmitted={setIsSubmitted}
        setEnquiry={setEnquiry}
      />
    </View>
  );
};

export default MultipleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 5,
    // borderTopWidth: 1,
    borderColor: '#f0f0f0',
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    zIndex: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // gap: 20,
    padding: 10,
    width: '32%',
    backgroundColor: '#FFE8EF',
    borderRadius: 4,
  },
  text: {
    color: '#D91E5B',
    fontWeight: '500',
    // right: 10,
    fontSize: 12,
  },
  Icon: {

  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
