import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { fonts } from '../../../styles/fonts';
import DropDownIcon from '../../assets/svg/svgicons/Others/DropDownIcon';
import FilterIcon from '../../assets/svg/svgicons/Others/FilterIcon';

const FilterBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('Offplan Projects');
  const [selectedType, setSelectedType] = useState('Residential');
  const categories = ['Offplan Projects', 'Offplan Resale', 'Secondary', 'Land'];
  const types = ['Residential', 'Commercial'];

  return (
    <View style={{ backgroundColor: '#fff', paddingHorizontal: 8,paddingBottom:67, paddingTop:2 }}>
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
                    <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextSelected,]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

      {/* Type Tabs - grouped container with filter icon */}

      <View style={{flex:1 ,flexDirection: "row"}}>
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
      </View>
      <TouchableOpacity style={styles.filterIcon}>
        <View style={{alignSelf: "center", top:4}}>
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
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    height: 48,
    padding: 10,
    flex: 0.485,
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 6,
    fontFamily: fonts.PoppinsMedium,
  },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        marginTop: 10,
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
    
      // PROPERTY TYPE TABS
      typeContainer: {
        flexDirection: "row",
        backgroundColor: '#fff',
        marginTop: 10,
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
        fontWeight: 'bold',
      },
      filterIcon: {
        padding: 10,
        backgroundColor: '#FFDDE5',
        borderRadius: 4,
        marginLeft: 6,
        width: "13%",
        height: 54,
        top:10,
        borderWidth: 1,
        borderColor: '#ddd',

      },

});