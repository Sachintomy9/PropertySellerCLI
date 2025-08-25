import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from '../redux/slices/FilterSlice';
import DropDownIcon from '../assets/svg/svgicons/Others/DropDownIcon';
import ApartmentIcon from '../assets/svg/svgicons/Filters/ApartmentIcon';
import PenthHouseIcon from '../assets/svg/svgicons/Filters/PenthHouseIcon';
import TownhouseIcon from '../assets/svg/svgicons/Filters/TownhouseIcon';
import VillaIcon from '../assets/svg/svgicons/Filters/VillaIcon';
import { fonts } from '../../styles/fonts';
import { Dropdown } from 'react-native-element-dropdown';

const propertyTypes = [
  { label: 'Apartment', value: "townhouse", icon: <ApartmentIcon /> },
  { label: 'Penthouse', value: "penthouse", icon: <PenthHouseIcon /> },
  { label: 'Townhouse', value: "apartment", icon: <TownhouseIcon /> },
  { label: 'Villa', value: "villa", icon: <VillaIcon /> },
];

const completionStatuses = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "just-launched",
    label: "Just Launched",
  },
  {
    value: "under-construction",
    label: "Under Construction"
  },
  {
    value: "ready",
    label: "Ready"
  },
];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
const bedsOptions = ['Studio', '1', '2', '3', '4', '5', '6', '7+'];
const bathsOptions = ['Studio', '1', '2', '3', '4', '5', '6+'];

const PRIMARY_PINK = '#ff1645';
const SOFT_PINK_BG = '#ffe6ea';
const CARD_BORDER = '#e0e0e0';
const MUTED_TEXT = '#565656';

const FilterOptionsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const setFilter = (key, value) => dispatch(updateFilter({ key, value }));

  const [isEmirateOpen, setIsEmirateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const [emirates, setEmirates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loadingEmirates, setLoadingEmirates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [selectedEmirateId, setSelectedEmirateId] = useState(null);

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


  const resetFilters = () => {
    // Reset newly added filter fields to defaults (adapt if your slice uses different defaults)
    setFilter('emirateId', '');
    setFilter('cityId', '');
    setFilter('emirateName', '');
    setFilter('cityName', '');
    setFilter('category', '');
    setFilter('developers', '');
    setFilter('facilities', '');
    setFilter('propertyType', '');
    setFilter('handoverYear', '');
    setFilter('handoverQuarter', '');
    setFilter('paymentPlan', '');
    setFilter('completionType', 'all');
    setFilter('projectTypeFirst', 'off-plan-projects');
    setFilter('projectTypeLast', 'all');
    setFilter('priceMin', '');
    setFilter('priceMax', '');
    setFilter('areaMin', '');
    setFilter('areaMax', '');
    setFilter('beds', '');
    setFilter('baths', '');
    setFilter('furnishType', 'all');
    setFilter('discount', 'all');
    // keep previous filters intact (or reset them too if desired)
  };

  const changeYear = (direction) => {
    const newYear = direction === 'prev' ? (filters.handoverYear || 2026) - 1 : (filters.handoverYear || 2026) + 1;
    dispatch(updateFilter({ key: 'handoverYear', value: newYear }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Filters</Text>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Emirates dropdown card */}
        <View style={styles.dropdownWrapper}>
          {loadingEmirates ? (
            <ActivityIndicator size="small" color="#ff1645" style={{ marginTop: 10 }} />
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
              placeholderStyle={styles.dropdownText}
              selectedTextStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownItemText}
              renderRightIcon={() => (
                <View>
                  <DropDownIcon style={isEmirateOpen && { transform: [{ rotate: '180deg' }] }} />
                </View>
              )}
            />
          )}
        </View>

        {/* City dropdown card */}
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
              placeholderStyle={styles.dropdownText}
              selectedTextStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownItemText}
              renderRightIcon={() => (
                <DropDownIcon
                  style={isEmirateOpen ? { transform: [{ rotate: '180deg' }] } : {}}
                />
              )}
            />
          )}
        </View>

        {/* Residential / Commercial group */}
        <View style={styles.card}>
          <View style={styles.segmentRow}>
            {[{ label: "All", value: "all" }, { label: "Residential", value: "residential" }, { label: "Commercial", value: "commercial" },].map(({ label, value }) => {
              const active = filters.projectTypeLast === value;
              return (
                <TouchableOpacity
                  key={value}
                  onPress={() => dispatch(updateFilter({ key: 'projectTypeLast', value }))}
                  style={[styles.segmentBtn, active && styles.segmentBtnActive]}
                >
                  <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Project Category group */}
        <View style={styles.card}>
          <View style={styles.categoryWrap}>
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
                  onPress={() => setFilter('projectTypeFirst', value)}
                  style={[styles.categoryBtn, active && styles.categoryBtnActive]}
                >
                  <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Property Type */}
        <Text style={styles.sectionTitle}>Property Type</Text>
        <View style={styles.propertyTypeRow}>
          {propertyTypes.map(({ label, value, icon }) => {
            const active = filters.propertyType === value;
            return (
              <View key={value} style={styles.propertyTypeContainer}>
                <TouchableOpacity
                  onPress={() => setFilter('propertyType', active ? "" : value)}
                  style={[styles.propertyTypeButton, active && styles.propertyTypeButtonActive]}
                >
                  {icon}
                </TouchableOpacity>
                <Text style={styles.propertyTypeLabel}>{label}</Text>
              </View>
            );
          })}
        </View>

        {/* Completion */}
        <Text style={styles.sectionTitle}>Completion</Text>
        <View style={[styles.card, styles.completionCard]}>
          <View style={styles.completionRow}>
            {completionStatuses.map(({ value, label }) => {
              const active = filters.completionType === value;
              return (
                <TouchableOpacity
                  key={value}
                  onPress={() => setFilter('completionType', value)}
                  style={[styles.smallPill, active && styles.smallPillActive]}
                >
                  <Text style={[styles.smallPillText, active && styles.smallPillTextActive]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Handover */}
        <Text style={styles.sectionTitle}>Handover</Text>
        <Text style={styles.subTitle}>Choose Year</Text>
        <View style={styles.yearCard}>
          <TouchableOpacity style={styles.chevBtn} onPress={() => changeYear('prev')}>
            <Text style={styles.chevText}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.yearText}>{filters.handoverYear || 2026}</Text>

          <TouchableOpacity style={styles.chevBtn} onPress={() => changeYear('next')}>
            <Text style={styles.chevText}>{">"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subTitle}>Choose Quarter</Text>
        <View style={styles.rowWrapSmall}>
          {quarters.map((q) => {
            const active = filters.handoverQuarter === q;
            return (
              <TouchableOpacity
                key={q}
                onPress={() => setFilter('handoverQuarter', active ? null : q)}
                style={[styles.quarterBtn, active && styles.quarterBtnActive]}
              >
                <Text style={[styles.quarterText, active && styles.quarterTextActive]}>{q}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Payment Plan */}
        <Text style={styles.sectionTitle}>Payment Plan</Text>
        <View style={styles.row}>
          {[{ value: "all", label: "All", }, { value: "on-handover", label: "On Handover", }, { value: "post-handover", label: "Post Handover", },].map(({ value, label }) => {
            const active = filters.paymentPlan === value;
            return (
              <TouchableOpacity
                key={value}
                onPress={() => setFilter('paymentPlan', active ? null : value)}
                style={[styles.segmentBtn, active && styles.segmentBtnActive]}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* <Text style={styles.sectionTitle}>Price(AED)</Text> */}
        {/* <View style={styles.rowTwo}>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Min</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={MUTED_TEXT}
              value={filters.minPrice?.toString() ?? ''}
              onChangeText={(t) => setFilter('minPrice', t)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Max</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Any"
              placeholderTextColor={MUTED_TEXT}
              value={filters.maxPrice?.toString() ?? ''}
              onChangeText={(t) => setFilter('maxPrice', t)}
            />
          </View>
        </View> */}

        {/* Area inputs */}
        {/* <Text style={styles.sectionTitle}>Area(sqft)</Text> */}
        {/* <View style={styles.rowTwo}>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Min</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={MUTED_TEXT}
              value={filters.minArea?.toString() ?? ''}
              onChangeText={(t) => setFilter('minArea', t)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Max</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Any"
              placeholderTextColor={MUTED_TEXT}
              value={filters.maxArea?.toString() ?? ''}
              onChangeText={(t) => setFilter('maxArea', t)}
            />
          </View>
        </View> */}

        {/* No of Beds */}
        {/* <Text style={styles.sectionTitle}>No of Beds</Text> */}
        {/* <View style={styles.btnWrap}>
          {bedsOptions.map((b) => {
            const active = filters.beds === b;
            return (
              <TouchableOpacity
                key={b}
                onPress={() => setFilter('beds', active ? null : b)}
                style={[styles.smallSquare, active && styles.smallSquareActive]}
              >
                <Text style={[styles.smallSquareText, active && styles.smallSquareTextActive]}>{b}</Text>
              </TouchableOpacity>
            );
          })}
        </View> */}

        {/* No of Baths */}
        {/* <Text style={styles.sectionTitle}>No of Baths</Text> */}
        {/* <View style={styles.btnWrap}>
          {bathsOptions.map((b) => {
            const active = filters.baths === b;
            return (
              <TouchableOpacity
                key={b}
                onPress={() => setFilter('baths', active ? null : b)}
                style={[styles.smallSquare, active && styles.smallSquareActive]}
              >
                <Text style={[styles.smallSquareText, active && styles.smallSquareTextActive]}>{b}</Text>
              </TouchableOpacity>
            );
          })}
        </View> */}

        {/* Furnish Type */}
        <Text style={styles.sectionTitle}>Furnish Type</Text>
        <View style={styles.row}>
          {[{
            value: "fully-furnished",
            label: "Fully Furnished",
          },
          {
            value: "semi-furnished",
            label: "Semi Furnished"
          },
          {
            value: "un-furnishing",
            label: "UnFurnished"
          },
          ]
            .map(({ value, label }) => {
              const active = filters.furnishType === value;
              return (
                <TouchableOpacity
                  key={value}
                  onPress={() => setFilter('furnishType', active ? "all" : value)}
                  style={[styles.furnishBtn, active && styles.furnishBtnActive]}
                >
                  <Text style={[styles.furnishText, active && styles.furnishTextActive]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
        </View>

        {/* Discount */}
        <Text style={styles.sectionTitle}>Discount</Text>
        <View style={styles.row}>
          {[{ value: "with-discount", label: "With Discount", }, { value: "without-discount", label: "Without Discount", },].map(({ value, label }) => {
            const active = filters.discount === value;
            return (
              <TouchableOpacity
                key={value}
                onPress={() => setFilter('discount', active ? "all" : value)}
                style={[styles.discountBtn, active && styles.discountBtnActive]}
              >
                <Text style={[styles.discountText, active && styles.discountTextActive]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 10 }} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => {
            // possibly trigger a filter-apply action / fetch here
            navigation.goBack();
          }}
        >
          <Text style={styles.applyBtnText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FilterOptionsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fonts.PoppinsMedium,
    color: '#111',
  },
  closeText: {
    fontSize: 22,
    color: '#111',
    paddingHorizontal: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#efefef',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 10,
  },

  /* Cards that match the rounded boxes in the design */
  card: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 14,
    backgroundColor: '#fff',
  },

  /* Dropdown row */
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#111',
    fontFamily: fonts.PoppinsRegular,
  },
  dropIconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Segmented Residential/Commercial */
  segmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: {
    backgroundColor: SOFT_PINK_BG,
    borderColor: PRIMARY_PINK,
  },
  segmentText: {
    fontSize: 12,
    color: MUTED_TEXT,
    fontFamily: fonts.PoppinsRegular,
  },
  segmentTextActive: {
    color: PRIMARY_PINK,
    fontFamily: fonts.PoppinsMedium,
  },

  /* Category buttons inside card (like offplan projects) */
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  categoryBtn: {
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: 'center',
    width: '49.5%'
  },
  categoryBtnActive: {
    backgroundColor: SOFT_PINK_BG,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 13,
    color: MUTED_TEXT,
    fontFamily: fonts.PoppinsRegular,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: PRIMARY_PINK,
    fontFamily: fonts.PoppinsMedium,
    textAlign: 'center',
  },

  /* Property Type row */
  propertyTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 6,
    marginBottom: 12,
  },
  propertyTypeContainer: {
    alignItems: 'center',
    width: 80,
  },
  propertyTypeButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  propertyTypeButtonActive: {
    backgroundColor: SOFT_PINK_BG,
    borderColor: PRIMARY_PINK,
  },
  propertyTypeLabel: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    color: '#222',
    fontFamily: fonts.PoppinsRegular,
  },

  sectionTitle: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
    color: '#111',
  },

  subTitle: {
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 15,
    color: MUTED_TEXT,
    marginBottom: 8,
    fontFamily: fonts.PoppinsRegular,
  },

  /* Completion pills */
  completionCard: {
    paddingVertical: 5,
  },
  completionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor:"red",
    // paddingHorizontal: 3,
  },
  smallPill: {
    paddingVertical: 8,
    // paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  smallPillActive: {
    backgroundColor: SOFT_PINK_BG,
    paddingHorizontal: 14,
  },
  smallPillText: {
    fontSize: 12,
    color: MUTED_TEXT,
    fontFamily: fonts.PoppinsRegular,
  },
  smallPillTextActive: {
    color: PRIMARY_PINK,
    fontFamily: fonts.PoppinsMedium,
  },

  /* Year selector */
  yearCard: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  chevBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chevText: {
    fontSize: 32,
    color: PRIMARY_PINK,
    fontFamily: fonts.PoppinsMedium,
  },
  yearText: {
    fontSize: 28,
    fontFamily: fonts.PoppinsMedium,
    color: '#111',
    marginHorizontal: 16,
  },

  /* Quarter buttons */
  rowWrapSmall: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quarterBtn: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 4,
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    gap: 8,
    height: 55,
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  quarterBtnActive: {
    backgroundColor: SOFT_PINK_BG,
  },
  quarterText: {
    fontSize: 16,
    color: MUTED_TEXT,
    fontFamily: fonts.PoppinsMedium,
  },
  quarterTextActive: {
    color: PRIMARY_PINK,
    fontFamily: fonts.PoppinsMedium,
  },

  /* Generic row */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
    padding: 5,
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 4,
  },
  rowTwo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  inputBox: { width: '48%' },
  inputLabel: { fontSize: 13, color: MUTED_TEXT, marginBottom: 6, fontFamily: fonts.PoppinsRegular },
  input: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    backgroundColor: '#fff',
    textAlign: 'center',
  },

  /* Beds / Baths small square buttons */
  btnWrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  smallSquare: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  smallSquareActive: { backgroundColor: SOFT_PINK_BG },
  smallSquareText: { fontSize: 13, color: MUTED_TEXT, fontFamily: fonts.PoppinsRegular },
  smallSquareTextActive: { color: PRIMARY_PINK, fontFamily: fonts.PoppinsMedium },

  /* Furnish & Discount buttons */
  furnishBtn: {
    flex: 1, // each item takes equal space
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 4,
    // marginHorizontal: 4, // small gap between buttons
  },
  furnishBtnActive: { backgroundColor: SOFT_PINK_BG, paddingHorizontal: 8 },
  furnishText: { fontSize: 12, color: MUTED_TEXT, fontFamily: fonts.PoppinsRegular },
  furnishTextActive: { color: PRIMARY_PINK, fontFamily: fonts.PoppinsMedium },

  discountBtn: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'center',
    paddingVertical: 8,
    // paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  discountBtnActive: { backgroundColor: SOFT_PINK_BG },
  discountText: { fontSize: 12, color: MUTED_TEXT, fontFamily: fonts.PoppinsRegular },
  discountTextActive: { color: PRIMARY_PINK, fontFamily: fonts.PoppinsMedium },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingBottom: 12,
    paddingTop: 14,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  resetBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 0,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  resetText: { color: '#111', fontFamily: fonts.PoppinsRegular, fontSize: 14 },

  applyBtn: {
    flex: 1.2,
    backgroundColor: PRIMARY_PINK,
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  applyBtnText: { color: '#fff', fontFamily: fonts.PoppinsMedium, fontSize: 14 },

  dropdownWrapper: {
    marginBottom: 14,
  },
  dropdown: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 4,
  },

  dropdownText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color: '#444',
    textAlign: 'center',
  },
  dropdownItemText: {
    color: '#000', // Black text color for dropdown items
    fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
  },
  iconWrapper: {
    marginLeft: 6,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
