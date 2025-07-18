import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EmptyState from '../components/others/EmptyScreen'
const FeaturedScreen = () => {
  return (
    <View style={{flex:1}}>
      <EmptyState message={"No featured Listings"} subMessage={"There are no featured property listings at the moment... Please try again some other time."}/>
    </View>
  )
}

export default FeaturedScreen

const styles = StyleSheet.create({})