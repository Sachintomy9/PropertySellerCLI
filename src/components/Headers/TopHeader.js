// TopHeader.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrency } from '../../redux/slices/CurrencySlice';
import countries from 'world-countries';
// Custom SVGs
import PropertySellerHeader from '../../assets/svg/svgimages/PropertySellerHeader';
import BellIcon from '../../assets/svg/svgicons/Others/BellIcon';
import DropDownIcon2 from '../../assets/svg/svgicons/Others/DropDownIcon2';
import SearchIcon from '../../assets/svg/svgicons/Others/SearchIcon';

const TopHeader = () => {
  const dispatch = useDispatch();
  const { selectedCurrency, rates } = useSelector((state) => state.currency);

  const [showPicker, setShowPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

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
        <TouchableOpacity style={styles.notificationWrapper}>
          <BellIcon width={24} height={24} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>4</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <SearchIcon width={18} height={18} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search.."
          placeholderTextColor="#999"
        />
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
    paddingTop: 12,
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  currencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  currencyText: {
    fontSize: 14,
    color: '#000',
    marginRight: 6,
  },
  logo: {
    alignSelf: 'center',
    right: 12,
  },
  notificationWrapper: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF2D55',
    width: 18,
    height: 18,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  searchInput1: {
    fontSize: 14,
    color: '#000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
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
