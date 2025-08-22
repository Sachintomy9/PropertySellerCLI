import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { fonts } from '../../../styles/fonts';
import DropDownIcon from '../../assets/svg/svgicons/Others/DropDownIcon';
import FilterIcon from '../../assets/svg/svgicons/Others/FilterIcon';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../redux/slices/FilterSlice';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Responsive sizing functions
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;
const moderateScale = (size, factor = 0.5) => size + (responsiveWidth(size) - size) * factor;


const FilterBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);


  const [isEmirateOpen, setIsEmirateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const [emirates, setEmirates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loadingEmirates, setLoadingEmirates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [selectedEmirateId, setSelectedEmirateId] = useState(null);

    // Fetch emirates on component mount
  useEffect(() => {
    const fetchEmirates = async () => {
      try {
        setLoadingEmirates(true);
        const res = await fetch('https://v1-api.propertyseller.com/api/v1/emirate/names');
        const data = await res.json();
        if (data.success) {
          const formatted = data.data.map((item) => ({
            label: item.name,
            value: item._id,
          }));
          setEmirates(formatted);
        }
      } catch (error) {
        console.error('Error fetching emirates:', error);
      } finally {
        setLoadingEmirates(false);
      }
    };
    fetchEmirates();
  }, []);

  // Fetch cities when emirate changes
  useEffect(() => {
    if (!selectedEmirateId) return;
    const fetchCities = async () => {
      try {
        setLoadingCities(true);
        const res = await fetch(`https://v1-api.propertyseller.com/api/v1/city/names?emirate=${selectedEmirateId}`);
        const data = await res.json();
        if (data.success) {
          const formatted = data.data.map((item) => ({
            label: item.name,
            value: item._id,
          }));
          setCities(formatted);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [selectedEmirateId]);

  return (
    <View style={{ backgroundColor: '#fff', paddingHorizontal: 8, paddingBottom: 67, paddingTop: 2 }}>
      {/* Emirates & City Dropdown Row */}
      <View style={styles.filterRow}>
        <View style={styles.dropdownWrapper}>
          {loadingEmirates ? (
            <ActivityIndicator size="small" color= "#ff1645" style={{ marginTop: 10 }} />
          ) : (
            <Dropdown
              data={emirates}
              labelField="label"
              valueField="value"
              placeholder="Emirates"
              value={filters.emirateId || null}
              onChange={(item) => {
                setSelectedEmirateId(item.value);
                dispatch(updateFilter({ key: 'emirateId', value: item.value }));
                dispatch(updateFilter({ key: 'emirateName', value: item.label }));
                setCities([]); // Clear old cities
              }}
              onFocus={() => setIsEmirateOpen(true)}
              onBlur={() => setIsEmirateOpen(false)}
              style={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              renderRightIcon={() => null}
              itemTextStyle={styles.dropdownItemText} 
            />
          )}
          <View style={[styles.customArrow, isEmirateOpen && styles.arrowUp]}>
            <DropDownIcon />
          </View>
        </View>

        <View style={styles.dropdownWrapper}>
          {loadingCities ? (
            <ActivityIndicator size="small" color='#ff1645' style={{ marginTop: 10 }} />
          ) : (
            <Dropdown
              data={cities}
              labelField="label"
              valueField="value"
              placeholder="City"
              value={filters.cityId || null}
              onChange={(item) => {
                dispatch(updateFilter({ key: 'cityId', value: item.value }));
                dispatch(updateFilter({ key: 'cityName', value: item.label }));
              }}
              onFocus={() => setIsCityOpen(true)}
              onBlur={() => setIsCityOpen(false)}
              style={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              renderRightIcon={() => null}
              itemTextStyle={styles.dropdownItemText}
            />
          )}
          <View style={[styles.customArrow, isCityOpen && styles.arrowUp]}>
            <DropDownIcon />
          </View>
        </View>
      </View>

      {/* Categories */}

        <View style={styles.categoryContainer}>
          {[
            { label: "Off-Plan projects", value: "off-plan-projects" },
            { label: "Off-Plan Resale", value: "off-plan-resale" },
            { label: "Secondary", value: "off-plan-secondary" },
            { label: "Land", value: "off-plan-land" },
          ].map(({ label, value }) => {
            const active = filters.projectTypeFirst === value;
            return (
              <TouchableOpacity
                key={value}
                onPress={() => dispatch(updateFilter({ key: 'projectTypeFirst', value }))}
                style={[styles.categoryButton, active && styles.categoryButtonSelected]}
              >
                <Text style={[styles.categoryText, active && styles.categoryTextSelected]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>


      {/* Type Tabs + Filter Icon */}
      <View style={{ flex: 1, flexDirection: "row" }}>

      <View style={styles.typeContainer}>
          {[{ label: "All", value: "all" },{ label: "Residential", value: "residential" },{ label: "Commercial ", value: "commercial" },].map(({ label, value }) => {
            const active = filters.projectTypeLast === value;
            return (
              <TouchableOpacity
                key={value}
                onPress={() => dispatch(updateFilter({ key: 'projectTypeLast', value }))}
                style={[styles.typeButton, active && styles.typeButtonSelected]}
              >
                <Text style={[styles.typeText, active && styles.typeTextSelected]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>


        <TouchableOpacity style={styles.filterIcon} onPress={() => navigation.navigate('FilterOption')}>
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
    marginTop: responsiveHeight(1),
    height: responsiveHeight(5.5),
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
    fontSize: 13,
    color: '#444',
    fontFamily: fonts.PoppinsRegular,
  },
  dropdownSelectedText: {
    fontSize: 13,
    fontFamily: fonts.PoppinsRegular,
    color: '#444',
  },
  dropdownItemText: {
    color: '#000', // Black text color for dropdown items
    fontFamily: fonts.PoppinsRegular,
    fontSize: 13,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    marginTop: responsiveHeight(0.5),
    padding: responsiveWidth(1.3),
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  categoryButton: {
    paddingVertical: responsiveHeight(1.3),
    paddingHorizontal: responsiveWidth(2),
    height: responsiveHeight(5),
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  categoryButtonSelected: {
    backgroundColor: '#FFDDE5',
  },
  categoryText: {
    fontSize: 13,
    color: '#444',
    fontFamily: fonts.PoppinsRegular,
  },
  categoryTextSelected: {
    color: '#ff1645',
    fontSize: 13,
    fontFamily: fonts.PoppinsRegular,
  },
  typeContainer: {
    flexDirection: "row",
    backgroundColor: '#fff',
    marginTop: responsiveHeight(0.5),
    borderRadius: 4,
    padding: responsiveWidth(1.3),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    height: responsiveHeight(6),
    width: "85%",
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    padding: responsiveWidth(2.5),
    borderRadius: 4,
    height: responsiveHeight(4.6),
  },
  typeButtonSelected: {
    backgroundColor: '#FFDDE5',
  },
  typeText: {
    fontSize: 13,
    fontFamily: fonts.PoppinsRegular,
    color: '#444',
  },
  typeTextSelected: {
    color: '#ff1645',
    fontSize: 13,
    fontFamily: fonts.PoppinsRegular,
 
  },
  filterIcon: {
    padding: responsiveWidth(2.5),
    backgroundColor: '#FFDDE5',
    borderRadius: 4,
    marginLeft: responsiveWidth(1.3),
    height: responsiveHeight(6),
    width: responsiveWidth(13),
    top: responsiveHeight(0.5),
    borderWidth: 1,
    borderColor: '#ddd',
  },
});