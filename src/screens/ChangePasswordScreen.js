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
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useProfile } from '../context/ProfileContext';
import { fonts } from '../../styles/fonts'; // Adjust the path as necessary
import axios from 'axios';
import api from '../services/ApiClient';
const API_URL = 'https://api.propertyseller.com/api/v1/';

import ShowPassIcon from '../assets/svg/svgicons/Others/ShowPassIcon';
import HidePassIcon from '../assets/svg/svgicons/Others/HidePassIcon';


const ChangePasswordScreen = () => {
  const navigation=useNavigation();
  const { profile } = useProfile()
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isNewPassHidden, setIsNewPassHidden] = useState(true);
  const [isConfirmPassHidden, setIsConfirmPassHidden] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!validatePassword(newPass).isValid) {
      newErrors.newPass = 'Password does not meet all criteria';
    }

    if (confirmPass !== newPass) {
      newErrors.confirmPass = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  const passwordCriteria = [
    {
      label: 'At least 8 characters',
      test: (pw) => pw.length >= 8,
    },
    {
      label: 'At least one uppercase letter',
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      label: 'At least one lowercase letter',
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      label: 'At least one special character',
      test: (pw) => /[^A-Za-z0-9]/.test(pw),
    },
    {
      label: 'At least one digit',
      test: (pw) => /\d/.test(pw),
    },
  ];

  const validatePassword = (pw) => {
    const failed = passwordCriteria.filter((rule) => !rule.test(pw));
    return {
      isValid: failed.length === 0,
      failed,
    };
  };
  const handleSubmit = async () => {
    if (validate()) {
      setIsLoading(true); // show loader
      try {
        console.log('Sending payload:', {
        confirmPass
      });
      
        const response = await api.post(`/auth/user/request-password-change`, {
        newPassword : newPass
      });
        console.log('New password sent successfully:', response.data);
        const {token} = response.data
        // Navigate to the next screen or show success message
        navigation.navigate('Otp1', { email : profile.email,token });
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        if (error.response && error.response.data) {
          Alert.alert('Error', error.response.data.message || 'Registration failed');
        } else {
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
    } finally {
      setIsLoading(false); // hide loader regardless of success or failure
    }
  };
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FF1645" />
          </View>
        )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Change Password</Text>



          
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInputWrapper}>
          <TextInput
            style={{ flex: 1, color: '#000' }}
            autoCapitalize="none"
            placeholder="Enter your new Password"
            placeholderTextColor="#999"
            secureTextEntry={isNewPassHidden}
            value={newPass}
            onChangeText={(text) => {
              setNewPass(text);
              if (errors.newPass) {
                setErrors((prev) => ({ ...prev, newPass: undefined }));
              }
            }}
          />

          <TouchableOpacity onPress={() => setIsNewPassHidden(!isNewPassHidden)}>
            {isNewPassHidden ? (
                <ShowPassIcon width={24} height={24} />
            ) : (
                <HidePassIcon width={24} height={24} /> 
            )}
          </TouchableOpacity>
        </View>

          {errors.newPass && <Text style={styles.error}>{errors.newPass}</Text>}
          
        {/* Password Rule Indicator */}
            <View style={styles.passwordCriteria}>
              {passwordCriteria.map((rule, index) => {
                const passed = rule.test(newPass);
                return (
                  <Text
                    key={index}
                    style={{
                      color: passed ? 'green' : 'red',
                      fontSize: 12,
                      marginTop: 2,
                    }}>
                    • {rule.label}
                  </Text>
                );
              })}
            </View>

        
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordInputWrapper}>
          <TextInput
            style={{ flex: 1, color: '#000' }}
            autoCapitalize="none"
            placeholder="Confirm your new Password"
            placeholderTextColor="#999"
            secureTextEntry={isConfirmPassHidden}
            value={confirmPass}
            onChangeText={(text) => {
              setConfirmPass(text);
              if (errors.confirmPass) {
                setErrors((prev) => ({ ...prev, confirmPass: undefined }));
              }
            }}
            />

          <TouchableOpacity onPress={() => setIsConfirmPassHidden(!isConfirmPassHidden)}>
            {isConfirmPassHidden ? (
                <ShowPassIcon width={24} height={24} />
            ) : (
                <HidePassIcon width={24} height={24} /> 
            )}
          </TouchableOpacity>
        </View>
        {errors.confirmPass && <Text style={styles.error}>{errors.confirmPass}</Text>}
        

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

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
    alignSelf:"center",
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 30,
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
    color: '#000',
  },
  button: {
    backgroundColor: '#FF004D',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop:40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiBold
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12, // horizontal padding only
    paddingVertical: 0,    // no vertical padding here
    height: 48,  
    marginBottom:10,          // fixed height for consistency
},
  error: { 
    color: 'red', 
    fontSize: 12, 
    marginTop: 2 
  },
  loadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(255,255,255,0.7)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
});
