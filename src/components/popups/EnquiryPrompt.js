import React ,{useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useProfile } from '../../context/ProfileContext';
import { fonts } from '../../../styles/fonts';
import CountryPicker from 'react-native-country-picker-modal';
import DropDownIcon2 from '../../assets/svg/svgicons/Others/DropDownIcon2';
import CloseIcon from '../../assets/svg/svgicons/ProfileScreen/CloseIcon';

const EnquiryPrompt = ({ visible, onClose }) => {
    const { profile } = useProfile();

    const [name, setName] = useState(profile.name || '');
    const [phone, setPhone] = useState(profile.phone || '');
    const [errors, setErrors] = useState({});

    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState('91');

    const [showCountryPicker, setShowCountryPicker] = useState(false);
    



    const validateInputs = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = 'Please enter your Name';
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
            newErrors.name = 'Name can only contain alphabets';
        }

        if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Phonenumber must be exactly 10 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleCountrySelect = (country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
    };
    const handleSubmit = () => {
        if (validateInputs()) {
            const fullPhone = `+${callingCode}${phone}`;
            onSubmit( name, fullPhone );
            onClose();
        }
    };

    const onSubmit = (name,phone) => {
        
            console.log("Enquiry sumbmitted:");
            console.log("Name: ",name);
            console.log("phone: ",phone);
    }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.crossButton} onPress={() => onClose()}>
                <CloseIcon />
            </TouchableOpacity>
          <Text style={styles.title}>Please enter your details</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter your name"
          />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity onPress={() => setShowCountryPicker(true)} style={styles.countryCodeWrapper}>
                <CountryPicker
                countryCode={countryCode}
                withFlag
                withCallingCode
                withFilter
                withEmoji
                onSelect={handleCountrySelect}
                visible={showCountryPicker}
                onClose={() => setShowCountryPicker(false)}
                containerButtonStyle={styles.countryPickerButton}
                />
                <DropDownIcon2 width={16} height={16} style={styles.dropdownIcon} />
            </TouchableOpacity>
                <Text style={styles.callingCodeText}>+{callingCode}</Text>
            <TextInput
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                style={styles.phoneTextInput}
                maxLength={10}
            />
            </View>
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
            

        </View>
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
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: fonts.PoppinsSemiBold
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 45,
  },
  dropdownIcon:{
    right:17,
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
  height:"100%",
  width: 45,
  backgroundColor:"#f5f5f5"
},
countryPickerButton: {
  paddingRight: 4,
},
callingCodeText: {
  fontSize: 16,
  right: 5,
},
phoneTextInput: {
  flex: 1,
  fontSize: 16,
},
  submitButton: {
    backgroundColor: '#ff1645',
    paddingVertical: 12,
    borderRadius: 4,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop:0,
 },
 crossButton: {
  position: 'absolute',
  marginTop: 5,
  right: 5,
  backgroundColor: '#fff',
  padding: 6,
},
});