import React, { useState,useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useProfile } from '../../context/ProfileContext';
import { fonts } from '../../../styles/fonts';
import * as RNLocalize from 'react-native-localize';
import DropDownIcon2 from '../../assets/svg/svgicons/Others/DropDownIcon2';
import CloseIcon from '../../assets/svg/svgicons/ProfileScreen/CloseIcon';
import countries from 'world-countries';
import axios from 'axios';
const API_URL = 'https://api.propertyseller.com/api/v1';
const { width,height } = Dimensions.get('window');

// Responsive sizing functions
const responsiveWidth = (w) => (width * w) / 100;
const responsiveHeight = (h) => (height * h) / 100;


const EnquiryPrompt = ({ projectId, visible, onClose,setEnquiry,setIsSubmitted }) => {
  const { profile } = useProfile();
  const [name, setName] = useState(profile.name || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [assignedTo, setAssignedTo] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const validateInputs = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Please enter your Name';
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = 'Name can only contain alphabets';
    } else if (name==="Guest") {
      newErrors.name = 'Guest name is not valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return; // Exit early if validation fails
    setIsLoading(true);
    try {
      const fullPhone = `${callingCode}${phone}`;
      if (profile.id) {
        setAssignedTo(profile.id);
        console.log("assignedTo", assignedTo);
      }

      const payload = {
        name: name.trim(),
        number: fullPhone.trim(),
        projectId: projectId,
      };
      console.log('Sending payload:', payload);

      const response = await axios.post(`${API_URL}/enquiry`, payload);

      // Handle API response
      if (response.data.message === "Enquiry already exist") {
        console.log('Enquiry already exists');
        (setEnquiry(true)); // Mark as existing enquiry
      } else {
        console.log('Enquiry does not exist');
        (setIsSubmitted(true)); // Mark as submitted
      }

      // Reset form and close modal
      setName('');
      setPhone('');
      setAssignedTo('');
      onClose(); // Close modal AFTER state updates

    } catch (error) { // <-- Fix: Added `error` parameter
      console.error('Registration error:', error.response?.data || error.message);
      if (error.response?.data) {
        Alert.alert('Error', error.response.data.message || 'Registration failed');
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleCountrySelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(`${country.idd.root}${country.idd.suffixes?.[0] || ''}`);
    setSelectedFlag(country.flag);
    setShowCountryPicker(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >

    {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF1645" />
        </View>
      )}

      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.crossButton} onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
          <Text style={styles.title}>Please enter your details</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

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
              value={phone}
              onChangeText={setPhone}
              style={styles.phoneTextInput}
              maxLength={10}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Country Picker Modal */}
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
      </View>
    </Modal>
  );
};

export default EnquiryPrompt;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 6,
    padding: responsiveWidth(4),
    elevation: 10,
  },
  title: {
    color: '#000',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: fonts.PoppinsMedium,
  },
  input: {
    color: '#000',
    fontSize:16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 45,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 45,
  },
  countryCodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    height: '100%',
    width: 45,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 6,
  },
  flagText: {
    fontSize: 18,
  },
  dropdownIcon: {
    position: 'absolute',
    right: -3,
  },
  callingCodeText: {
    color: '#000',
    fontSize: 16,
    right: 5,
  },
  phoneTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#ff1645',
    paddingVertical: responsiveHeight(1),
    borderRadius: 4,
  },
  submitText: {
    color: 'white',
    fontFamily: fonts.PoppinsMedium,
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
  },
  crossButton: {
    position: 'absolute',
    marginTop: 5,
    right: 5,
    backgroundColor: '#fff',
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000',
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
    fontSize: 14,
    color: '#000',
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
    color: '#000',
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
  },
  closeBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#ff1645',
    fontWeight: 'bold',
  },
    loadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(255,255,255,0.7)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
});
