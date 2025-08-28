// context/ProfileContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/ApiClient';
import * as Keychain from 'react-native-keychain';
const API_URL = 'https://v1-api.propertyseller.com/api/v1/';

// Sample data-fetching function (replace with real API call if needed)
const fetchUserProfile = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) {
      console.warn('No credentials found in Keychain.');
      console.log(' fetchUserProfile case 1');
      return { name: '', email: '', phone: '', id: '' };
    }

    const tokenData = JSON.parse(credentials.password);
    if (tokenData?.isGuest) {
      console.log('Guest user, skipping profile fetch');
      return { name: 'Guest', email: '', phone: '', id: '' };
    }

    const accessToken = tokenData.accessToken;
    if (!accessToken) {
      console.warn('Access token missing.');
      console.log(' fetchUserProfile case 3');
      return { name: '', email: '', phone: '', id: '' };
    }
    // Fetching details
    const response = await api.get('auth/user/profile');
    console.log("details from ProfilContext",response.data);

    if (response.status === 200) {
      const { name, email, number : phone, _id : id} = response.data.user;
      return { name, email, phone, id };
    }
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
  }

  return { name: '', email: '', phone: '' };
};


const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    id: '',
  });

  const loadProfile = async () => {
    const data = await fetchUserProfile();
    console.log(" loadProfile function run")
    if (data) {
        setProfile(data);
        return data;
    } else {
        setProfile({ name: 'Unknown', email: '', phone: '' });
  }
  };

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    // Optionally persist to backend here
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, loadProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
