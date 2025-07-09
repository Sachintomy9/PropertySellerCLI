import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { fonts } from '../../styles/fonts';

// Your custom SVGs
import PropertySellerHeader from '../assets/svg/svgimages/PropertySellerHeader';
import BellIcon from '../assets/svg/svgicons/Others/BellIcon';
import DropDownIcon from '../assets/svg/svgicons/Others/DropDownIcon';
import SearchIcon from '../assets/svg/svgicons/Others/SearchIcon';
import FilterIcon from '../assets/svg/svgicons/Others/FilterIcon';

const TopHeaderScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Offplan Projects');
  const [selectedType, setSelectedType] = useState('Residential');

  const categories = ['Offplan Projects', 'Offplan Resale', 'Secondary', 'Land'];
  const types = ['Residential', 'Commercial'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.currencyButton}>
          <Text style={styles.currencyText}>AED</Text>
          <DropDownIcon />
        </TouchableOpacity>

        <PropertySellerHeader style={styles.logo} />

        <TouchableOpacity style={styles.notification}>
          <BellIcon />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>4</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <SearchIcon />
        <TextInput
          placeholder="Search.."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      {/* Location Filters */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.dropdownBtn}>
          <Text style={styles.dropdownText}>Emirates</Text>
          <DropDownIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownBtn}>
          <Text style={styles.dropdownText}>City</Text>
          <DropDownIcon />
        </TouchableOpacity>
      </View>

      {/* Category Tabs - grouped container */}
      <View style={styles.categoryContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Type Tabs - grouped container with filter icon */}
      <View style={styles.typeContainer}>
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              selectedType === type && styles.typeButtonSelected,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.typeText,
                selectedType === type && styles.typeTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.filterIcon}>
          <FilterIcon />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TopHeaderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  currencyText: {
    marginRight: 4,
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
  },
  logo: {
    alignSelf: 'center',
    right:20,
  },
  notification: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#D91E5B',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    height: 48,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: 15,
    color: "#000"
 },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 48,

  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    height: 48,
    padding: 10,
    flex: 0.485,
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 6,
    fontFamily: fonts.PoppinsMedium,
  },

  // CATEGORY TABS STYLES
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    marginTop: 10,
    padding: 5,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 3,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  categoryButtonSelected: {
    backgroundColor: '#FFDDE5',
  },
  categoryText: {
    fontSize: 14,
    color: '#444',
    fontFamily: fonts.PoppinsMedium,
  },
  categoryTextSelected: {
    color: '#D91E5B',
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
  },

  // PROPERTY TYPE TABS
  typeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    marginTop: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    height: 55,
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    height: 40,
  },
  typeButtonSelected: {
    backgroundColor: '#FFDDE5',
  },
  typeText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
    color: '#444',
  },
  typeTextSelected: {
    color: '#D91E5B',
    fontWeight: 'bold',
  },
  filterIcon: {
    padding: 10,
    backgroundColor: '#FFDDE5',
    borderRadius: 10,
    marginLeft: 6,
  },
});
