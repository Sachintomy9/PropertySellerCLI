import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const BlogCard = ({ blog }) => {
    const navigation=useNavigation();
    const imageUrl = blog.image?.webp?.url || blog.image?.png?.url || null;
    const formatBlogDate = (isoDateString) => {
    const date = new Date(isoDateString);

      // Options for toLocaleDateString()
      const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      };

      return date.toLocaleDateString('en-US', options);
  };
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BlogRead', { blog })}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {blog.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>

      <Text style={styles.date}>
        Date Published : {formatBlogDate(blog.date)}
      </Text>

      <Text style={styles.title}>{blog.blogTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  imageWrapper: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF5A7E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  date: {
    color: '#888',
    fontSize: 13,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 4,
    color: '#000',
  },
});

export default BlogCard;
