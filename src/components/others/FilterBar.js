import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { fonts } from '../../../styles/fonts';
import DropDownIcon from '../../assets/svg/svgicons/Others/DropDownIcon';
import FilterIcon from '../../assets/svg/svgicons/Others/FilterIcon';
import { Dropdown } from 'react-native-element-dropdown';

const FilterBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('Offplan Projects');
  const [selectedType, setSelectedType] = useState('Residential');
  const [selectedEmirate, setSelectedEmirate] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [isEmirateOpen, setIsEmirateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const categories = ['Offplan Projects', 'Offplan Resale', 'Secondary', 'Land'];
  const types = ['Residential', 'Commercial'];
  const emirates = [
    { label: "Abu Dhabi", value: "Abu Dhabi" },
    { label: "Dubai", value: "Dubai" },
    { label: "Sharjah", value: "Sharjah" },
    { label: "Ajman", value: "Ajman" },
    { label: "Umm Al Quwain", value: "Umm Al Quwain" },
    { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
    { label: "Fujairah", value: "Fujairah" },
  ];

  const cities = [
    { label: "Dubai City", value: "Dubai City" },
    { label: "Abu Dhabi City", value: "Abu Dhabi City" },
    // Add more cities as needed
  ];

  return (
    <View style={{ backgroundColor: '#fff', paddingHorizontal: 8, paddingBottom: 67, paddingTop: 2 }}>
      {/* Emirates & City Dropdown Row */}
      <View style={styles.filterRow}>
        <View style={styles.dropdownWrapper}>
          <Dropdown
            data={emirates}
            labelField="label"
            valueField="value"
            placeholder="Emirates"
            value={selectedEmirate}
            onChange={(item) => setSelectedEmirate(item.value)}
            onFocus={() => setIsEmirateOpen(true)}
            onBlur={() => setIsEmirateOpen(false)}
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            renderRightIcon={() => null}
          />
          <View style={[styles.customArrow, isEmirateOpen && styles.arrowUp]}>
            <DropDownIcon/>
          </View>
        </View>
        

        <View style={styles.dropdownWrapper}>
          
          <Dropdown
            data={cities}
            labelField="label"
            valueField="value"
            placeholder="City"
            value={selectedCity}
            onChange={(item) => setSelectedCity(item.value)}
            onFocus={() => setIsCityOpen(true)}
            onBlur={() => setIsCityOpen(false)}
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            renderRightIcon={() => null}
          />
          <View style={[styles.customArrow, isCityOpen && styles.arrowUp]}>
            <DropDownIcon/>
          </View>

        </View>
      </View>

      {/* Categories */}
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
            <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextSelected]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Type Tabs + Filter Icon */}
      <View style={{ flex: 1, flexDirection: "row" }}>
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
              <Text style={[styles.typeText, selectedType === type && styles.typeTextSelected]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.filterIcon}>
          <View style={{ alignSelf: "center", top: 4 }}>
            <FilterIcon />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 48,
  },
  dropdownWrapper: {
    flex: 0.493,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  dropdown: {
    height: 48,
    paddingHorizontal: 10,
  },
  customArrow: {
  position: 'absolute',
  right: 12,
  top: 12,
  zIndex: 2,
},
arrowUp: {
  transform: [{ rotate: '180deg' }],
},
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#444',
    fontFamily: fonts.PoppinsMedium,
  },
  dropdownSelectedText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
    color: '#444',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    marginTop: 5,
    padding: 5,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 3,
    height: 40,
    borderRadius: 4,
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
    color: '#ff1645',
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
  },
  typeContainer: {
    flexDirection: "row",
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 4,
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    height: 54,
    width: "85%",
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
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
    color: '#ff1645',
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
 
  },
  filterIcon: {
    padding: 10,
    backgroundColor: '#FFDDE5',
    borderRadius: 4,
    marginLeft: 6,
    width: "13%",
    height: 54,
    top: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});