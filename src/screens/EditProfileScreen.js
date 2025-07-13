import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { fonts } from '../../styles/fonts';
import api from '../services/ApiClient';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../context/ProfileContext';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { profile } = useProfile();
  const [name, setName] = useState(profile.name || '');
  const [nationality, setNationality] = useState('American'); // still static
  const [phone, setPhone] = useState(profile.phone || '');
  const [email, setEmail] = useState(profile.email || '');

  const handleSave = async () => {
    try{
      const payload = {
        name: name.trim(),
        number: phone.trim(),
      };
      const response = await api.put('auth/user/profile',payload);
      if (response.status === 200 || response.status === 204) {
        Alert.alert('Success', 'Profile updated successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Update Failed', 'Something went wrong.');
      }
    // TODO: Save logic here
    console.log('Saving profile:', { name, nationality, phone, email });
    } catch (error) {
      console.error('Profile update error:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Profile update failed.');
    }

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <Text style={styles.subtitle}>Personal Details</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Nationality</Text>
        <TextInput
          value={nationality}
          onChangeText={setNationality}
          style={styles.input}
          placeholder="Enter nationality"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Change Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Change Email ID</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholder="Enter email"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    paddingTop: 90,
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
    color: '#000',
    fontFamily: fonts.PoppinsSemiBold
  },
  subtitle: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#555',
    marginBottom: 20,
    fontFamily: fonts.PoppinsRegular
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
    fontFamily: fonts.PoppinsMedium
  },
  input: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.PoppinsRegular
  },
  saveButton: {
    backgroundColor: '#ffe5e5',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ff3b3b',
    fontSize: 16,
    fontWeight: '600',
  },
});
