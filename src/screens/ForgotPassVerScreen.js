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
  const navigation=useNavigation();
  const handleSubmit = async () => {

    console.log("Submit Pressed!")
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

   try { 
      const trimmedEmail = email.trim();
      
      // Basic email format validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        Alert.alert('Error', 'Please enter a Valid email');
      }

      const response = await axios.post(`${API_URL}/auth/user/forgot-password`, {
        email: trimmedEmail  // Fixed syntax - need to specify key: value
      });

      console.log('Response:', response.data);
      
      if (response.data.message === "mail is eligible for password reset") {
        console.log("The email is eligible for password reset.");
        // You might want to navigate to verification screen here



        navigation.navigate('ForgotPassSet');
        return { success: true, data: response.data };
      } else {
        // Handle other possible success messages
        return { success: true, data: response.data };
      }

    } catch (error) {
      console.error('Password reset error:', error);
      
      // Handle different error types
      let errorMessage = 'Failed to process password reset';
      
      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        errorMessage = error.response.data.message || error.response.statusText;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server';
      } else {
        // Something happened in setting up the request
        errorMessage = error.message;
      }

      // You might want to show this to the user
      Alert.alert('Error', errorMessage);
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
