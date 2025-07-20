import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../../styles/fonts';
import CalenderIcon from '../../assets/svg/svgicons/Others/CalenderIcon'; // Ensure this path is correct

const NewsCard = ({ news }) => {
  const navigation = useNavigation();

  // Updated function to format date as DD-MM-YY
  const formatBlogDate = (isoDateString) => {
    if (!isoDateString) return "N/A";
    
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    
    // Use hyphens to match the image
    return `${day}-${month}-${year}`;
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('NewsRead', { news })}
    >
      {/* Image stays the same */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: news?.image?.secure_url }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      {/* All content below the image is wrapped in a container for padding */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{news?.newsTitle}</Text>


        <View style={styles.metaRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {news?.newCategoryDetails?.name || 'Market Insights'}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <CalenderIcon width={14} height={14} />
            <Text style={styles.dateText}>{formatBlogDate(news?.date)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default NewsCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  imageWrapper: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden', // Ensures the image corners are rounded
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop:10,
  },
  categoryBadge: {
    backgroundColor: '#FFDDE5', // Light pink background
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
  },
  categoryText: {
    color: '#FF1645', // Dark pink text
    fontWeight: '600',
    fontSize: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:180,
  },
  dateText: {
    color: '#888',
    fontSize: 15,
    marginLeft: 5, // Space between icon and text
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.PoppinsMedium,
    color: '#111',
  },
});