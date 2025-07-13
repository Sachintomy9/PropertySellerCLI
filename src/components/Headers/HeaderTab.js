// components/HeaderTab.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/svg/svgicons/Details/BackIcon';
import { useSelector } from 'react-redux';
import { fonts } from '../../../styles/fonts';


const HeaderTab = ({ activeTab }) => {
  const navigation = useNavigation();
  const property = useSelector((state) => state.property.property);
  const propertyId = property?._id || [];

  const tabs = [
    {
      key: 'Image Gallery',
      label: `Images${property.mainImages.length > 0 ? ` (${property.mainImages.length})` : ''}`,
      route: 'ImageGallery',
    },
    { key: 'Map', label: 'Map', route: 'MapScreen' },
    {
      key: 'Layout',
      label: `Layout${property?.layoutImages.length > 0 ? ` (${property.layoutImages.length})` : ''}`,
      route: 'FloorPlans',
    },
    { key: 'Video', label: 'Video', route: 'VideoScreen' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.replace('PropDetails', { propertyId})}>
            <BackIcon />
            </TouchableOpacity>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab
          ]}
          onPress={() => navigation.replace(tab.route)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HeaderTab;
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#FFDDE5',
  },
  tabText: {
    fontSize: 14,
    color: '#444',
    fontFamily: fonts.PoppinsMedium
  },
  activeTabText: {
    color: '#ff1645',
    fontWeight: '700',
    fontFamily: fonts.PoppinsRegular
  },
});