import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import axios from 'axios';
import TopHeader2 from '../components/Headers/TopHeader2';
import { fonts } from '../../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'
import countries from 'world-countries';
import TickIcon from '../assets/svg/svgicons/Details/TickIcon';
import EmptyState from '../components/others/EmptyScreen';
import EnquirySubmitted from '../components/popups/EnquirySubmitted';
import DropDownIcon2 from '../assets/svg/svgicons/Others/DropDownIcon2';
const THUMB_MIN_HEIGHT = 30;
const API_URL = 'https://api.propertyseller.com/api/v1';
const CareersScreen = () => {
    const navigation = useNavigation();
    const {isGuest} = useAuth();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [Nationality, setNationality] = useState('');
    const [languages, setLanguages] = useState('');
    const [yearsOfExp, setYearsOfExp] = useState('');
    const [linkedinProfile, setLinkedinProfile] = useState('');
    const [comments,setComments] = useState('')
    const [errors, setErrors] = useState({});
    const [ showSuccessPrompt, setShowSuccessPrompt] = useState(false);

    const [countryCode, setCountryCode] = useState('AE');
    const [callingCode, setCallingCode] = useState('+971');
    const [selectedFlag, setSelectedFlag] = useState('🇦🇪');

    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [searchText, setSearchText] = useState('');

    const scrollY = useRef(new Animated.Value(0)).current;
    const [contentHeight, setContentHeight] = useState(1);
    const [scrollViewHeight, setScrollViewHeight] = useState(0);

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        } 
        else if (!/^[A-Za-z\s]+$/.test(name)) {
            newErrors.name = 'Name can only contain alphabets';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!number.trim()) {
            newErrors.number = 'Number is required';
        }
        if (!Nationality.trim()) {
            newErrors.Nationality = 'Nationality is required';
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!languages.trim()) {
            newErrors.languages = 'Enter any languages you are fluent';
        }
        if (!yearsOfExp.trim()) {
            newErrors.yearsOfExp = 'Enter any years of experience. ';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
        try {
            const payload = {
                name: name.trim(),
                number: number.trim(),
                email: email.trim(),
                nationality: Nationality.trim(),
                languages: languages,
                yearsOfExperience: yearsOfExp,
                linkedinProfileLink: linkedinProfile,
            };
            console.log('Sending payload:',payload);
        
            const response = await axios.post(`${API_URL}/carriers`,payload);

            console.log('Registration successful:', response.data);
            // Navigate to the next screen or show success message
            setShowSuccessPrompt(true);
            setName('');
            setEmail('');
            setNationality('');
            setNumber('');
            setLanguages('');
            setLinkedinProfile('');
            setYearsOfExp('');
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
    <View style={styles.container}>
      <TopHeader2 title={"Careers"} />

    <EnquirySubmitted
        visible={showSuccessPrompt}
        onClose={() => setShowSuccessPrompt(false)}
        message={"Interest"}
        />
    {isGuest ? (
        <EmptyState 
        message="You're Not Logged In"
        subMessage="To register for Career opportunities, please log in."
      />

      ) : (


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
        
            <Text style={styles.title}>Join PropertySeller – Grow Your Real Estate Career</Text>
            <Text style={{fontFamily: fonts.PoppinsSemiBold,fontSize: 16, paddingHorizontal: 12, paddingBottom: 10, textAlign: "center",}}> Why Work With Us?</Text>
            <Text style={styles.blogContent}>At PropertySeller, we empower real estate agents with the best tools, training, 
                and commission structures to help you succeed in Dubai’s competitive real estate market. Whether you’re an
                experienced agent or just starting, we provide a platform for you to maximize your earnings and grow your career.</Text>


            <Text style={styles.title}>What We Offer</Text>

            <View style={{flexDirection:"column"}}>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 20}}>
                        High Commission Payouts – Earn top-tier commissions on every deal.
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 35}}>
                        Exclusive Developer Partnerships – Get access to premium off-plan projects.
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 30}}>
                        Quality Leads – Benefit from our lead generation system.
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 30}}>
                        Advanced Technology – Use our innovative PropertySeller platform for seamless property sales.
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 30}}>
                        Marketing Support – Professional branding, digital promotions, and personalized marketing tools.
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 30}}>
                       Training & Mentorship – Enhance your skills with expert coaching and workshops.
                    </Text>
                </View>
            </View>

            <Text style={styles.title}>Who We Are Looking For:</Text>

            <View style={{flexDirection:"column"}}>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 20}}>
                        Passionate individuals with a drive for sales and success.
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 35}}>
                        Strong communication and negotiation skills.
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 30}}>
                        Knowledge of Dubai’s real estate market (preferred but not mandatory).
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 30}}>
                        Knowledge of Dubai’s real estate market (preferred but not mandatory).
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 30}}>
                        Marketing Support – Professional branding, digital promotions, and personalized marketing tools.
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 30}}>
                       Ability to build and maintain client relationships.
                    </Text>
                </View>
            </View>

        
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your First Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.label}>Nationality</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Nationality"
                placeholderTextColor="#999"
                value={Nationality}
                onChangeText={setNationality}
            />
            {errors.Nationality && <Text style={styles.error}>{errors.Nationality}</Text>}

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
                maxLength={10}
                />
          </View>
          {errors.number && <Text style={styles.error}>{errors.number}</Text>}


            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Languages</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your speaking languages."
                placeholderTextColor="#999"
                value={languages}
                onChangeText={setLanguages}
            />
            {errors.languages && <Text style={styles.error}>{errors.languages}</Text>}

            <Text style={styles.label}>Years of Experience</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your years of experience."
                placeholderTextColor="#999"
                value={yearsOfExp}
                onChangeText={setYearsOfExp}
            />
            {errors.yearsOfExp && <Text style={styles.error}>{errors.yearsOfExp}</Text>}

            <Text style={styles.label}> Linkedin Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="paste your linkedin profile link here."
                placeholderTextColor="#999"
                value={linkedinProfile}
                onChangeText={setLinkedinProfile}
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
      )}
    </View>
  );
};

export default CareersScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        marginTop: 12,
        marginLeft:25,
        fontFamily: fonts.PoppinsRegular,
    },
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
    inputComment: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 12,
        width: "90%",
        alignSelf: "center",
        fontSize: 14,
        backgroundColor: '#f9f9f9',
        height:150,
        marginBottom: 50,
    },
    submit: {
        flexDirection: 'row',
        backgroundColor: '#ff1645',
        borderRadius: 4,
        alignSelf: "center",
        justifyContent: 'center',
        paddingVertical: 14,
        width: "90%",
        marginBottom: 40,
        marginTop:20,
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
        marginLeft: 25,
    },
    countryCodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 10,
    borderWidth: 0.5,
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
    top:10,
  },
  phoneTextInput: {
    flex: 1,
    fontSize: 14,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignSelf: "center",
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 45,
    width: "90%",
    backgroundColor:"#f9f9f9"
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
    fontWeight: 'bold',
  },
});
