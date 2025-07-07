import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../styles/fonts'; // Adjust the path as necessary
import axios from 'axios';
const API_URL = 'https://api.propertyseller.com/api/v1/';


const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    try{
        const response = await axios.post(`${API_URL}/auth/user/forgot-password`, {
        email,
        });
        console.log('Password reset link sent:', response.data);

    } catch (error) {
        console.error('Error sending password reset link:', error);
        Alert.alert('Error', error.response?.data?.message || 'Failed to send password reset link');
        return;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Reset Password</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  innerContainer: {
    marginTop: -120 // Adjusts for the top white space like your image
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
    fontFamily: fonts.PoppinsBold,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
    fontFamily: fonts.PoppinsRegular
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#FF004D',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiBold
  }
});
