import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import axios from 'axios';
import BlogCard from '../components/cards/BlogCard';
import TopHeader2 from '../components/Headers/TopHeader2';
const BlogScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('https://v1-api.propertyseller.com/api/v1/blogs');
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (

    <View style={{flex:1, backgroundColor: "#fff"}}> 
        <TopHeader2 title={"Blogs"}/>
        {loading ? (
          <View style={styles.centerLoading}>
                    <ActivityIndicator size="large" color="#ff1645" />
                  </View>
                ) : (
        <FlatList
        data={blogs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <BlogCard blog={item} />}
        contentContainerStyle={styles.container}
        />
                )}
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

export default BlogScreen;
