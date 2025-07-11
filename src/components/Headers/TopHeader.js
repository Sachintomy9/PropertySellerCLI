import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// Custom SVGs
import PropertySellerHeader from '../../assets/svg/svgimages/PropertySellerHeader';
import BellIcon from '../../assets/svg/svgicons/Others/BellIcon';
import DropDownIcon2 from '../../assets/svg/svgicons/Others/DropDownIcon2';
import SearchIcon from '../../assets/svg/svgicons/Others/SearchIcon';

const TopHeader = () => {
  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Currency Button */}
        <TouchableOpacity style={styles.currencyButton}>
          <Text style={styles.currencyText}>AED</Text>
          <DropDownIcon2 />
        </TouchableOpacity>

        <View style={styles.logo}>
            <PropertySellerHeader/>
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
  greyDropDown:{
    color: "#000"
  },
  currencyText: {
    fontSize: 14,
    color: '#000',
    marginRight: 6,
  },
  logo: {
    alignSelf: "center",
    right: 12,
  },
  logoBold: {
    fontWeight: 'bold',
    color: '#000',
  },
  logoLight: {
    fontWeight: '500',
    color: '#000',
  },
  logoDot: {
    fontWeight: '900',
    color: '#000',
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
});

export default TopHeader;
