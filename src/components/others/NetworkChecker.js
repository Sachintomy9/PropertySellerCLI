// components/NetworkProvider.js
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import NoInternetImage from '../../assets/svg/svgimages/NoInternetImage';

const NoInternetScreen = ({ onRetry }) => (
  <View style={styles.container}>
    <NoInternetImage/>
    <Text style={styles.title}>Oops!</Text>
    <Text style={styles.subtitle}>
      It seems there is something wrong with your internet connection.
      Please connect to the internet and try again.
    </Text>
    <TouchableOpacity style={styles.button} onPress={onRetry}>
      <Text style={styles.buttonText}>Retry ⟳</Text>
    </TouchableOpacity>
  </View>
);

const NetworkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    checkConnection(); // Initial check
    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return <NoInternetScreen onRetry={checkConnection} />;
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    color: '#555',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#e53935',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default NetworkProvider;
