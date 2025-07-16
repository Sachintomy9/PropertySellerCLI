import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import axios from 'axios';
import TopHeader2 from '../components/Headers/TopHeader2';
import { fonts } from '../../styles/fonts';
import { Dropdown } from 'react-native-element-dropdown';
import DropDownIcon from '../assets/svg/svgicons/Others/DropDownIcon';
import EnquirySubmitted from '../components/popups/EnquirySubmitted';
const API_URL = 'https://api.propertyseller.com/api/v1';

const THUMB_MIN_HEIGHT = 30;

const BlogReadScreen = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    const [selectedEmirate, setSelectedEmirate] = useState(null);
    const [city, setCity] = useState('');
    const [NosBedroom, setNosBedroom] = useState(null);
    const [askingPrice, setAskingPrice] = useState('');
    const [purchPrice, setPurchPrice] = useState('');
    const [errors, setErrors] = useState({});

    const [ showSuccessPrompt, setShowSuccessPrompt] = useState(false);

    const scrollY = useRef(new Animated.Value(0)).current;
    const [contentHeight, setContentHeight] = useState(1);
    const [scrollViewHeight, setScrollViewHeight] = useState(0);


    const emirates = [
        { label: "Abu Dhabi", value: "Abu Dhabi" },
        { label: "Dubai", value: "Dubai" },
        { label: "Sharjah", value: "Sharjah" },
        { label: "Ajman", value: "Ajman" },
        { label: "Umm Al-Quwain", value: "Umm Al-Quwain" },
        { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
        { label: "Fujeirah", value: "Fujeirah" },
        ];

    const propertyType = [
        { label: "Offplan Projects", value: "Offplan Projects" },
        { label: "Offplan Resale", value: "Offplan Resale" },
        { label: "Secondary", value: "Secondary" },
        { label: "Land", value: "Land" },
        // Add more cities as needed
    ];

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
        newErrors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
        newErrors.name = 'Name can only contain alphabets';
        }
        if (!number.trim()) {
            newErrors.number = 'Phone number is required';
        }
        if (!selectedPropertyType) {
            newErrors.propertyType = 'Select a property Type';
        }
        if (!selectedEmirate) {
            newErrors.emirate = 'Select an Emirate';
        }
        if (!city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!NosBedroom) {
            newErrors.NosBedroom = 'Select any number of bedrooms';
        }

        if (!askingPrice?.trim()) {
            newErrors.askingPrice = 'Asking Price required';
        }

  if (!NosBedroom) {
    newErrors.NosBedroom = 'Select number of bedrooms';
  }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
        try {
            const res = await axios.get(`${API_URL}/emirate`);
            const getEmirateId = (emirateName) => {
                const emirate = res.data.data.find(item => 
                    item.name.toLowerCase() === emirateName.toLowerCase()
                );
                return emirate ? emirate._id : null;
            };
            
            const payload = {
                name: name.trim(),
                number: number.trim(),
                propertyType: selectedPropertyType,
                emirateId: getEmirateId(selectedEmirate),
                cityId: city.trim(),
                numberOfBeds: NosBedroom,
                askingPrice: askingPrice.trim(),
                purchasedPrice: purchPrice.trim()
            };
            console.log('Sending payload:',payload);
        
            const response = await axios.post(`${API_URL}/sellers`,payload);

            console.log('Registration successful:', response.data);

            setShowSuccessPrompt(true);
            setName('');
            setNumber('')
            setSelectedEmirate(null);
            setSelectedPropertyType(null);
            setNosBedroom(null);
            setAskingPrice('')
            setCity('')
            setPurchPrice('');
            // Navigate to the next screen or show success message
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            if (error.response && error.response.data) {
            Alert.alert('Error', error.response.data.message || 'Registration failed');
            } else {
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
            }

        }
    };
    };

    const thumbHeight = scrollY.interpolate({
        inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
        outputRange: [
        THUMB_MIN_HEIGHT,
        Math.max((scrollViewHeight / contentHeight) * scrollViewHeight, THUMB_MIN_HEIGHT),
        ],
        extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
        inputRange: [0, Math.max(contentHeight - scrollViewHeight, 1)],
        outputRange: [0, scrollViewHeight - THUMB_MIN_HEIGHT],
        extrapolate: 'clamp',
    });





  return (
    <View style={styles.container}>
      <TopHeader2 title={"Seller Registration"} />
      <EnquirySubmitted
        visible={showSuccessPrompt}
        onClose={() => setShowSuccessPrompt(false)}
        />
      <View style={styles.scrollContainer}>
        <Animated.ScrollView
          style={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          onContentSizeChange={(_, height) => setContentHeight(height)}
          onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
        >
        
            <Text style={styles.title}>Sell Your Property Effortlessly with PropertySeller!</Text>
            <Text style={styles.blogContent}>Ready to sell your property? Our Seller Registration form makes it simple to list your
                 property on PropertySeller and connect with eager buyers. Fill out the required information, including your name,
                  contact details, property type, location, and asking price. Once submitted, our dedicated team will review your 
                  listing to ensure it reaches a broad audience of interested buyers. Begin your selling journey today and let us help
                   you achieve a successful sale!</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your First Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}


            <Text style={styles.label}>Phone</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Phone Number"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={number}
                onChangeText={setNumber}
            />
            {errors.number && <Text style={styles.error}>{errors.number}</Text>}

            <Text style={styles.label}>property Type</Text>
            <View style={styles.dropdownWrapper}>
                <Dropdown
                    data={propertyType}
                    labelField="label"
                    valueField="value"
                    placeholder="Choose Property Type"
                    value={selectedPropertyType}
                    onChange={(item) => setSelectedPropertyType(item.value)}
                    style={styles.dropdown}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownSelectedText}
                />
            </View>
            {errors.propertyType && <Text style={styles.error}>{errors.propertyType}</Text>}

            <Text style={styles.label}>Emirates</Text>
            <View style={styles.dropdownWrapper}>
                <Dropdown
                    data={emirates}
                    labelField="label"
                    valueField="value"
                    placeholder="Choose Emirate"
                    value={selectedEmirate}
                    onChange={(item) => setSelectedEmirate(item.value)}
                    style={styles.dropdown}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownSelectedText}
                />
            </View>
            {errors.emirate && <Text style={styles.error}>{errors.emirate}</Text>}

            <View style={{marginBottom:25}}>
                <Text style={styles.label}>City</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter City"
                    placeholderTextColor="#999"
                    value={city}
                    onChangeText={setCity}
                />
                {errors.city && <Text style={styles.error}>{errors.city}</Text>}
            </View>


            <Text style={styles.label}>No of Bedrooms</Text>
            <View style={styles.buttonRow}>
                {[1, 2, 3, 4, 5, 6].map((number) => (
                <TouchableOpacity
                    key={number}
                    onPress={() => setNosBedroom(number)}
                    style={[
                    styles.buttonRoom,
                    NosBedroom === number && styles.buttonSelected,
                    ]}
                >
                    <Text style={[styles.buttonText, NosBedroom === number && styles.buttonTextSelected]}>
                    {number}
                    </Text>
                </TouchableOpacity>
                ))}
            </View>
            {errors.NosBedroom && <Text style={styles.error}>{errors.NosBedroom}</Text>}

            <Text style={styles.label}>Asking Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Askng Price"
                placeholderTextColor="#999"
                value={askingPrice}
                onChangeText={setAskingPrice}
            />
            {errors.askingPrice && <Text style={styles.error}>{errors.askingPrice}</Text>}

            <Text style={styles.label}>purchased Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Askng Price"
                placeholderTextColor="#999"
                value={purchPrice}
                onChangeText={setPurchPrice}
            />

            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.submitText}> Submit </Text>
            </TouchableOpacity>
          
        </Animated.ScrollView>

        {/* Custom Scrollbar */}
        <View style={styles.scrollbarTrack}>
          <Animated.View
            style={[
              styles.scrollbarThumb,
              {
                height: thumbHeight,
                transform: [{ translateY }],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default BlogReadScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageWrapper: {
    height: 200,
    width: '100%',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  featuredBadge: {
    top: 10,
    left: 10,
    backgroundColor: '#FFDDE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredText: {
    color: '#ff1645',
    fontFamily: fonts.PoppinsRegular,
    fontSize: 13,
  },
  date: {
    color: '#000',
    fontSize: 13,
    fontFamily: fonts.PoppinsRegular,
    left: 30,
    top: 17,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.PoppinsSemiBold,
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 10,
    color: '#000',
    textAlign: "center"
  },
  blogContent: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingBottom: 50,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollbarTrack: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  scrollbarThumb: {
    width: 4,
    backgroundColor: '#FF1645',
    borderRadius: 2,
  },
  label: { 
    fontSize: 14, 
    color: '#000', 
    marginBottom: 6, 
    marginTop: 12 ,
    marginLeft:25,
    fontFamily: fonts.PoppinsRegular, },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    width: "90%",
    alignSelf: "center",
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  dropdownWrapper: {
    flex: 1,
    width:"90%",
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    alignSelf: "center",
    backgroundColor: '#f9f9f9',
    top: 0,
  },
  dropdown: {
    height: 48,
    paddingHorizontal: 10,
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#999',
  },
  dropdownSelectedText: {
    fontSize: 14,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: "center",
    width:"90%"
  },
  buttonRoom: {
    width: 45,
    height: 45,
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#ff1645',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  buttonTextSelected: {
    color: '#fff',
  },
  submit: {
    flexDirection: 'row',
    backgroundColor: '#ff1645',
    borderRadius: 4,
    alignSelf: "center",
    justifyContent: 'center',
    paddingVertical: 14,
    width: "90%",
    marginBottom: 50,
    marginTop:50,
  },
submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily:fonts.PoppinsMedium
  },
  error: { 
    color: 'red',
    fontSize: 12,
    marginTop: 2, 
    marginLeft:25
},
});
