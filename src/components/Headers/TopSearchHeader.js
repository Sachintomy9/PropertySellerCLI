import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { fonts } from '../../../styles/fonts';
// Custom SVGs
import DropDownIcon from '../../assets/svg/svgicons/Others/DropDownIcon';
import SearchIcon from '../../assets/svg/svgicons/Others/SearchIcon';

const TopSearchHeader = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <SearchIcon width={18} height={18} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search.."
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.filterRow}>
            <TouchableOpacity style={styles.dropdownBtn}>
                <Text style={{fontSize: 12, left:25 , marginRight:25 ,fontFamily: fonts.PoppinsMedium,}}>Emirates</Text>
                <DropDownIcon />
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdownBtn}>
                <Text style={{fontSize: 12, left:40 , marginRight:40 ,fontFamily: fonts.PoppinsMedium,}}>City</Text>
                <DropDownIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownBtn}>
                <Text style={{fontSize: 12, left:8 , marginRight:8 ,fontFamily: fonts.PoppinsMedium,}}>Property Types</Text>
                <DropDownIcon />
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 2,
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
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
  filterRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 6,

},
dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    height: 46,
    padding: 2,
    flex:1

},
dropdownText: {
    fontSize: 12,
    left:15,
    marginRight:20,
    fontFamily: fonts.PoppinsMedium,
},
});

export default TopSearchHeader;
