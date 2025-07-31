import React, { useState,useEffect } from 'react';
import {
  View,
  Modal,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../styles/fonts';
import * as RNLocalize from 'react-native-localize';
import countries from 'world-countries';
import { Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DropDownIcon2 from '../assets/svg/svgicons/Others/DropDownIcon2';
import HidePassIcon from '../assets/svg/svgicons/Others/HidePassIcon';
import ShowPassIcon from '../assets/svg/svgicons/Others/ShowPassIcon';
import CheckBox from '@react-native-community/checkbox';
const API_URL = 'https://api.propertyseller.com/api/v1';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [selectedFlag, setSelectedFlag] = useState('');
  useEffect(() => {
      const deviceCountry = RNLocalize.getCountry(); // e.g., "AE", "IN"
      const countryData = countries.find(
        (country) => country.cca2 === deviceCountry
      );

      if (countryData) {
        setCountryCode(countryData.cca2);
        setCallingCode(`${countryData.idd.root}${countryData.idd.suffixes?.[0] || ''}`);
        setSelectedFlag(countryData.flag);
      } else {
        // fallback to AE if not found
        setCountryCode('AE');
        setCallingCode('971');
        setSelectedFlag('🇦🇪');
      }
      }, []);

  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleCountrySelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(`${country.idd.root}${country.idd.suffixes?.[0] || ''}`);
    setSelectedFlag(country.flag);
    setShowCountryPicker(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  );

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [agree, setAgree]     = useState(false);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [errors, setErrors] = useState({});
  const { loginUser, continueAsGuest } = useAuth();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = 'Name can only contain alphabets';
    }

    if (!/^\d{7,15}$/.test(number)) {
      newErrors.number = 'Phone number must be between 7 and 15 digits';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!validatePassword(password).isValid) {
      newErrors.password = 'Password does not meet all criteria';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agree) {
      newErrors.agree = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validate()) {
      setIsLoading(true); // show loader
      try {
        console.log('Sending payload:', {
        email,
        password,
        name,
        number
      });
      
        const response = await axios.post(`${API_URL}/auth/user/registration`, {
        email,
        password,
        name,
        number,
      });
        console.log('Registration successful:', response.data);
        const {token} = response.data
        console.log('Temp Token:', token);
        // Navigate to the next screen or show success message
        navigation.navigate('Otp', { email,token });
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

  // Function to handle guest login
  // This function sets a generic password in Keychain to indicate guest mode
  const handleGuest = async () => {
    setIsLoading(true); // show loader
      // navigate to home or guest screen
      try {
        await continueAsGuest();
        console.log('Guest mode enabled');
        navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });

      } catch (err) {
        console.error('Error setting guest mode, Error in LoginScreen', err);
        Alert.alert('Error', 'Failed to start guest session');
      } finally {
      setIsLoading(false); // hide loader regardless of success or failure
    }
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

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#FF1645" />
              </View>
            )}
      <ScrollView contentContainerStyle={styles.innerContainer}>

        <Text style={styles.heading}>Sign up</Text>
        <Text style={styles.subHeading}>Complete your registration for the full experience</Text>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your First Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        {/* Phone */}
        <Text style={styles.label}>Phone</Text>
        <View style={styles.phoneInputContainer}>
            <TouchableOpacity
              onPress={() => setShowCountryPicker(true)}
              style={styles.countryCodeWrapper}
            >
              <Text style={styles.flagText}>{selectedFlag}</Text>
              <DropDownIcon2 width={16} height={16} style={styles.dropdownIcon} />
            </TouchableOpacity>
            <Text style={styles.callingCodeText}>{callingCode}</Text>
            <TextInput
              placeholder="Enter your Phone Number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={number}
              onChangeText={setNumber}
              style={styles.phoneTextInput}
              maxLength={15}
            />
          </View>
          {errors.number && <Text style={styles.error}>{errors.number}</Text>}

            {showCountryPicker && (
              <Modal transparent animationType="slide">
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    <TextInput
                      placeholder="Search country"
                      placeholderTextColor="#999"
                      value={searchText}
                      onChangeText={setSearchText}
                      style={styles.searchInput}
                    />
                    <FlatList
                      data={filteredCountries}
                      keyExtractor={(item) => item.cca2}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.countryItem}
                          onPress={() => handleCountrySelect(item)}
                        >
                          <Text style={styles.countryText}>
                            {item.flag} {item.name.common} ({item.idd.root}
                            {item.idd.suffixes?.[0]})
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                    <TouchableOpacity onPress={() => setShowCountryPicker(false)} style={styles.closeBtn}>
                      <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}


        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInputWrapper}>
            <TextInput
            style={{ flex: 1, color: '#000' }}
            autoCapitalize="none"
            placeholder="Enter your Password"
            placeholderTextColor="#999"
            secureTextEntry={isPasswordHidden}
            value={password}
            onChangeText={setPassword}
            />

            <TouchableOpacity
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            >
                {isPasswordHidden ? (
                    <ShowPassIcon width={24} height={24} />
                ) : (
                    <HidePassIcon width={24} height={24} /> 
                )}
            </TouchableOpacity>

        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        
        {/* Password Rule Indicator */}
        <View style={styles.passwordCriteria}>
          {passwordCriteria.map((rule, index) => {
            const passed = rule.test(password);
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

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordInputWrapper}>
            <TextInput
            style={{ flex: 1, color: '#000' }}
            autoCapitalize="none"
            placeholder="Confirm your Password"
            placeholderTextColor="#999"
            secureTextEntry={isConfirmPasswordHidden}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
                onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
            >
                {isConfirmPasswordHidden ? (
                    <ShowPassIcon width={24} height={24} />
                ) : (
                    <HidePassIcon width={24} height={24} /> 
                )}
            </TouchableOpacity>



        </View>
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

         {/* Terms */}
        <View style={styles.termsRow}>
            <CheckBox
                value={agree}
                onValueChange={setAgree}
                tintColors={{ true: '#ff1645', false: '#000' }}
            />
            <Text style={styles.termsText}>
                I agree to the{' '}
                <Text
                style={styles.linkText}
                onPress={() => navigation.navigate("Terms")}
                >
                Terms & Conditions
                </Text>
            </Text>
        </View>      
        {errors.agree && <Text style={styles.error}>{errors.agree}</Text>}

        {/* Already have account */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Already Have An Account :  </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerLink}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Signup Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        {/* OR + Guest */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.guestContainer} onPress={handleGuest}>
          <Text style={styles.guestText}>Continue as guest →</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  innerContainer: { padding: 20, paddingBottom: 50 , marginTop: 30, },
  heading: { fontSize: 28, color: '#000',fontFamily: fonts.PoppinsSemiBold, alignSelf: "center" },
  subHeading: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 24,marginBottom: 10, alignSelf: "center", fontFamily: fonts.PoppinsRegular, },
  label: { fontSize: 14, color: '#000', marginBottom: 6, marginTop: 12 ,fontFamily: fonts.PoppinsRegular, },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
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
  registerRow: { flexDirection: 'row', marginTop: 12, alignItems: 'center' },
  registerText: { fontSize: 13, color: '#666',fontFamily: fonts.PoppinsRegular, },
  registerLink: { fontSize: 13, color: '#000', fontWeight: '600', fontFamily: fonts.PoppinsSemiBold, },
  signupButton: {
    backgroundColor: '#ff1645',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 24,
  },
  signupText: { color: '#fff', fontWeight: '600', fontSize: 16 , fontFamily: fonts.PoppinsSemiBold, },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: '#eee' },
  orText: { marginHorizontal: 10, color: '#aaa', fontWeight: '500' },
  guestContainer: { alignItems: 'center' },
  guestText: { fontSize: 14, color: '#333', fontWeight: '500', fontFamily: fonts.PoppinsMedium, },
  error: { color: 'red', fontSize: 12, marginTop: 2 },
  passwordCriteria: { marginTop: 6 },
  termsRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 8,
  gap: 8,
  flexWrap: 'wrap',
},

termsText: {
  fontSize: 13,
  color: '#000',
  flexShrink: 1, // Prevent text from overflowing
},

linkText: {
  color: '#1E90FF',
  textDecorationLine: 'underline',
  fontWeight: '500',
},
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 45,
  },
  countryCodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    height: '100%',
    width: 45,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  flagText: {
    fontSize: 18,
  },
  dropdownIcon: {
    position: 'absolute',
    right: -3,
  },
  callingCodeText: {
    fontSize: 16,
    right: 5,
  },
  phoneTextInput: {
    flex: 1,
    fontSize: 16,
  },
modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 8,
    padding: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
  },
  countryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryText: {
    fontSize: 16,
  },
  closeBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#ff1645',
    fontFamily: fonts.PoppinsSemiBold,
  },
  loadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(255,255,255,0.7)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
});
