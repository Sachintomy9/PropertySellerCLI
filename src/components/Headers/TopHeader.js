// TopHeader.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrency } from '../../redux/slices/CurrencySlice';
import countries from 'world-countries';
// Custom SVGs
import PropertySellerHeader from '../../assets/svg/svgimages/PropertySellerHeader';
import BellIcon from '../../assets/svg/svgicons/Others/BellIcon';
import DropDownIcon2 from '../../assets/svg/svgicons/Others/DropDownIcon2';
import { fetchNotifications } from '../../redux/slices/NotificationSlice';

const { width, height } = Dimensions.get('window');

// Responsive sizing functions
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { selectedCurrency, rates } = useSelector((state) => state.currency);
  const { unreadCount } = useSelector((state) => state.notifications);

  const [showPicker, setShowPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  const handleCurrencySelect = (currencyCode) => {
    dispatch(setCurrency(currencyCode));
    setShowPicker(false);
    setSearchTerm('');
  };

  const countryCurrencyList = countries
    .map((country) => {
      const currencyCode = Object.keys(country.currencies || {})[0];
      return {
        name: country.name.common,
        flag: country.flag,
        currency: currencyCode,
      };
    })
    .filter(item => item.currency)  // Remove ones without currency
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredList = countryCurrencyList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Currency Button */}
        <TouchableOpacity
          style={styles.currencyButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.currencyText}>
            {selectedCurrency ? selectedCurrency.toUpperCase() : 'AED'}
          </Text>
          <DropDownIcon2 />
        </TouchableOpacity>

        <View style={styles.logo}>
          <PropertySellerHeader />
        </View>

        {/* Notification Icon with Badge */}
        <TouchableOpacity style={styles.notificationWrapper} onPress={() => navigation.navigate('Notification')}>
          <BellIcon width={24} height={24} />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>


      {/* Modal Dropdown */}
      <Modal visible={showPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput1}
              placeholder="Search currency or country here"
              placeholderTextColor="#999"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />

            <FlatList
              data={filteredList}
              keyExtractor={(item) => `${item.currency}_${item.name}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleCurrencySelect(item.currency)}
                >
                  <Text style={styles.modalText}>
                    {item.flag}  {item.name} ({item.currency})
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.closeBtn}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: responsiveHeight(Platform.OS === "ios" ? 0 : 1.5),

    // paddingBottom: responsiveHeight(Platform.OS === "ios" ? 1 : 1),
    paddingHorizontal: responsiveWidth(2),
    borderBottomColor: '#e0e0e0',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 8,
    // top: responsiveHeight(-0.3),
  },
  currencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    gap: 10,
    paddingVertical: responsiveHeight(0.4),
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(2),
    // width: responsiveWidth(17),
    // height: responsiveHeight(4),
  },
  currencyText: {
    fontSize: 12,
    color: '#000',
  },
  logo: {
    alignSelf: 'center',
    right: responsiveWidth(5),
  },
  notificationWrapper: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: responsiveHeight(-0.3),
    right: responsiveWidth(-0.5),
    backgroundColor: '#FF2D55',
    width: responsiveWidth(4.5),
    height: responsiveHeight(2),
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchInput1: {
    fontSize: 14,
    color: '#000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal:12,
    paddingVertical:12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: '60%',
    padding: 12,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  closeBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#ff1645',
    fontWeight: 'bold',
  },
});

export default TopHeader;
