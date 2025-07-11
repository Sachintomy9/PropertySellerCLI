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

import ShowPassIcon from '../assets/svg/svgicons/Others/ShowPassIcon';
import HidePassIcon from '../assets/svg/svgicons/Others/HidePassIcon';


const ResetPasswordScreen = () => {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isNewPassHidden, setIsNewPassHidden] = useState(true);
  const [isConfirmPassHidden, setIsConfirmPassHidden] = useState(true);

  const navigation=useNavigation();
  const handleSubmit = async () => {
    if (confirmPass!=newPass) {
      Alert.alert('Error', 'Passwords do not match!');
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



          
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInputWrapper}>
          <TextInput
            style={{ flex: 1, color: '#000' }}
            autoCapitalize="none"
            placeholder="Enter your new Password"
            placeholderTextColor="#999"
            secureTextEntry={isNewPassHidden}
            value={newPass}
            onChangeText={setNewPass}
          />

          <TouchableOpacity onPress={() => setIsNewPassHidden(!isNewPassHidden)}>
            {isNewPassHidden ? (
                <ShowPassIcon width={24} height={24} />
            ) : (
                <HidePassIcon width={24} height={24} /> 
            )}
          </TouchableOpacity>
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
            onChangeText={setConfirmPass}
            />

          <TouchableOpacity onPress={() => setIsConfirmPassHidden(!isConfirmPassHidden)}>
            {isConfirmPassHidden ? (
                <ShowPassIcon width={24} height={24} />
            ) : (
                <HidePassIcon width={24} height={24} /> 
            )}
          </TouchableOpacity>
        </View>

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
});
