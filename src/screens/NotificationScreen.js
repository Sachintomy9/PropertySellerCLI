import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import axios from 'axios'; // or your preferred HTTP client
import TopHeader2 from '../components/Headers/TopHeader2';
import { fonts } from '../../styles/fonts';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, markAsRead, markAllAsRead } from '../redux/slices/NotificationSlice';

const NotificationScreen = () => {
    const dispatch = useDispatch();
    const { notifications, unreadCount, loading, error } = useSelector((state) => state.notifications);
    const [refreshing, setRefreshing] = useState(false);

  

    useEffect(() => {
        // Fetch notifications when screen mounts
        dispatch(fetchNotifications());
        
        // Set timeout to mark all as read after 3 seconds
        const markReadTimer = setTimeout(() => {
            dispatch(markAllAsRead());
        }, 1000); // 1000 milliseconds = 1 second

        // Clear the timeout if component unmounts before 1 second
        return () => clearTimeout(markReadTimer);
    }, [dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    // Fetch notifications again
    dispatch(fetchNotifications());
    setRefreshing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.messageBubble}>
        <Text style={styles.timeText}>{formatDate(item.createdAt)}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <TopHeader2 title="Notifications" showNotification={false}/>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No notifications available</Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  messageBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 12,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.PoppinsRegular,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontFamily: fonts.PoppinsRegular
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default NotificationScreen;