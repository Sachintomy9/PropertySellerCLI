// components/HeaderTab.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/svg/svgicons/Details/BackIcon';
import { useSelector } from 'react-redux';
import { fonts } from '../../../styles/fonts';
import ImageIcon from "../../assets/svg/svgicons/Details/ImageIcon"
import VideoIcon from "../../assets/svg/svgicons/Details/Video"
import LayoutIcon from "../../assets/svg/svgicons/Details/Layout"
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;
const { width, height } = Dimensions.get('window');


const HeaderTab = ({ activeTab }) => {
  const navigation = useNavigation();
  const property = useSelector((state) => state.property.property);
  const propertyId = property?._id || [];

  const tabs = [
    {
      key: 'Image Gallery',
      label: `Images${property.mainImages.length > 0 ? ` (${property.mainImages.length})` : ''}`,
      route: 'ImageGallery',
      icon: "ImageIcon",
    },
    // {
    //   key: 'Map', label: 'Map', route: 'MapScreen',
    //   icon: "Map",
    // },
    {
      key: 'Layout',
      label: `Layout${property?.layoutImages.length > 0 ? ` (${property.layoutImages.length})` : ''}`,
      route: 'FloorPlans',
      icon: "Layout",

    },
    {
      key: 'Video', label: 'Video', route: 'Video',
      icon: "Video",
    },
  ];

  const RenderIcon = (icon, active) => {
    // console.log(icon, "Icons Name")
    switch (icon) {
      case "ImageIcon":
        return <ImageIcon
          fill={active ? "#ff1645" : "#000"}
          style={{
            width: 20,
            height: 20,
          }}
        />;
      case "Video":
        return <VideoIcon
          color={active ? "#ff1645" : "#000"}
          width={20}
          height={20}
        />;
      case "Layout":
        return <LayoutIcon
          fill={active ? "#ff1645" : "#000"}
          style={{
            width: 20,
            height: 20,
          }}
        />;
      default:
        return <></>;
    }
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.replace('PropDetails', { propertyId })}>
        <BackIcon />
      </TouchableOpacity> */}
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab
          ]}
          onPress={() => {
            if (tab.route !== "MapScreen") {
              navigation.replace(tab.route)
            }
          }}
        >
          {RenderIcon(tab.icon, activeTab === tab.key)}

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
    justifyContent: 'space-between',
    marginVertical: 10,
    // height: responsiveHeight(6),
    // paddingVertical: responsiveHeight(0.3),
    backgroundColor: '#fff',
  },
  tab: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: 14,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#FFDDE5',
  },
  tabText: {
    fontSize: 12,
    color: '#000',
    fontFamily: fonts.PoppinsRegular
  },
  activeTabText: {
    color: '#ff1645',
    fontWeight: '700',
    fontFamily: fonts.PoppinsRegular
  },
});