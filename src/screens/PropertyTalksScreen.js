import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import axios from 'axios';
import BlogCard from '../components/cards/BlogCard';
import TopHeader2 from '../components/Headers/TopHeader2';
const PropertyTalksScreen = () => {
  const [propertyTalks, setPropertyTalks] = useState([]);
  const [loading, setLoading] = useState(true);

  return (

    <View style={{flex:1, backgroundColor: "#fff"}}> 
        <TopHeader2 title={"Property Talks"}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 40,
  },
    centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PropertyTalksScreen;
