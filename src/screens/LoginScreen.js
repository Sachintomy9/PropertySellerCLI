// LoginScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../styles/fonts';
import { login } from '../services/AuthService';
import { useAuth } from '../context/AuthContext';


import ShowPassIcon from '../assets/svg/svgicons/Others/ShowPassIcon';
import HidePassIcon from '../assets/svg/svgicons/Others/HidePassIcon';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [errors, setErrors] = useState({});
  const { loginUser, continueAsGuest } = useAuth();



  const validateInputs = () => {
    const newErrors = {};
    if (!emailOrPhone) {
      newErrors.emailOrPhone = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleLogin = async () => {
    if (validateInputs()) {
      try {
      const { success, error } = await login(emailOrPhone, password);
      if (success) {
        console.log('Login success in LoginScreen');
        Alert.alert('Success', 'Login successful');
        await loginUser();
        navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
      } } catch (error) {
          console.error('Login Failed:', error.response?.data || error.message);
          
          if (error.response && error.response.data) {
            Alert.alert('Error', error.response.data.message || 'Login failed');
          } else {
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
          }

        }
    }
  };

  const handleGuest = async () => {
    // navigate to home or guest screen
    try {
      await continueAsGuest();
      console.log('Guest mode enabled');
      navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });

    } catch (err) {
      console.error('Error setting guest mode, Error Coming from LoginScreen', err);
      Alert.alert('Error', 'Failed to start guest session');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Log In</Text>
        <Text style={styles.subHeading}>Fill in the details to log back</Text>

        <Text style={styles.label}>Email/Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email/Phone"
          placeholderTextColor="#999"
          autoCapitalize='none'
          keyboardType='email-address'
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
        {errors.emailOrPhone && <Text style={styles.error}>{errors.emailOrPhone}</Text>}

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInputWrapper}>
          <TextInput
            style={{ flex: 1, color: '#000' }}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            autoCapitalize='none'
            secureTextEntry={isPasswordHidden}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
            {isPasswordHidden ? <ShowPassIcon /> : <HidePassIcon />}
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        {/*forgot password */}
        <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginTop: 8 }}
          onPress={() => navigation.navigate('ForgotVerify')}
        >
          <Text style={{ color: '#FF1645', fontFamily: fonts.PoppinsRegular, }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>



        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don' t Have An Account ? : </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.guestContainer} onPress={handleGuest}>
          <Text style={styles.guestText}>Continue as guest →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 200,
  },
  innerContainer: {
    padding: 20,
    marginTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    alignSelf: 'center',
    fontFamily: fonts.PoppinsSemiBold,
  },
  subHeading: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 24,
    alignSelf: 'center',
    fontFamily: fonts.PoppinsRegular,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
    marginTop: 12,
    fontFamily: fonts.PoppinsRegular,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',

  },
  registerRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 13,
    color: '#666',
    fontFamily: fonts.PoppinsRegular,
  },
  registerLink: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
    fontFamily: fonts.PoppinsSemiBold,
  },
  loginButton: {
    backgroundColor: '#FF1645',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiBold,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  orText: {
    marginHorizontal: 10,
    color: '#aaa',
    fontWeight: '500',
    fontFamily: fonts.PoppinsMedium,
  },
  guestContainer: {
    alignItems: 'center',
  },
  guestText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    fontFamily: fonts.PoppinsMedium,
  },
  error: { 
    color: 'red',
    fontSize: 12,
    marginTop: 2
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
    height: 48,            // fixed height for consistency
},
});
