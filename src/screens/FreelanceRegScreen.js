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
import { useNavigation } from '@react-navigation/native';
import TickIcon from '../assets/svg/svgicons/Details/TickIcon';
import EnquirySubmitted from '../components/popups/EnquirySubmitted';
const THUMB_MIN_HEIGHT = 30;
const API_URL = 'https://api.propertyseller.com/api/v1';
const FreelanceRegScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [Nationality, setNationality] = useState('');
    const [comments,setComments] = useState('')
    const [errors, setErrors] = useState({});
    const [ showSuccessPrompt, setShowSuccessPrompt] = useState(false);

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
            };
            console.log('Sending payload:',payload);
        
            const response = await axios.post(`${API_URL}/freelancers`,payload);

            console.log('Registration successful:', response.data);
            // Navigate to the next screen or show success message
            setShowSuccessPrompt(true);
            setName('');
            setEmail('');
            setNationality('');
            setNumber('');
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
        
            <Text style={styles.title}>Freelancer – Empowering Real Estate Agents</Text>
            <Text style={styles.blogContent}>At PropertySeller, we provide freelance real estate agents in Dubai with a trusted
                 platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller
                  with an 80/20 commission split, where you receive 80% commission on every successful deal.</Text>

            <View style={{flexDirection:"column"}}>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 20}}>
                        Maximize Your Earnings – Keep 80% of your commission
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 35}}>
                        No Ties, No Limits – Work on your own terms
                    </Text>
                </View>
                <View style={{flexDirection: "row", width:"90%", alignSelf: "center"}}>
                    <TickIcon color='#ff1645' size={22}/>
                    <Text style={{fontFamily: fonts.PoppinsRegular,fontSize: 15,paddingHorizontal: 12,paddingBottom: 30}}>
                        Close Deals with Confidence – Use PropertySeller as your platform
                    </Text>
                </View>
            </View>

            <View style={styles.disclaimerBox}>
                <Text style={styles.disclaimerText}>
                    ⚠️ Disclaimer: PropertySeller provides a platform for freelance agents to close deals but PropertySeller 
                    is not responsible for any promises, commitments, or agreements made by agents to their clients. Agents are
                     fully accountable for their own transactions.
                </Text>
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
            <TextInput
                style={styles.input}
                placeholder="Enter your Phone Number"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={number}
                onChangeText={setNumber}
            />
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
            
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.submitText}> Submit </Text>
            </TouchableOpacity>

            <View>
                <TextInput
                style={styles.inputComment}
                placeholder="Comments"
                placeholderTextColor="#999"
                value={comments}
                onChangeText={setComments}
            />
            </View>

            <Text style={{ fontSize: 16, color: '#000', marginBottom: 20, marginTop: 12,marginLeft:25,fontFamily: fonts.PoppinsSemiBold,}}>
                Comments</Text>

          
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

export default FreelanceRegScreen;
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
    disclaimerBox: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        margin: 16,
        backgroundColor: '#fff',
    },
    disclaimerText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        fontFamily: fonts.PoppinsRegular,
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
});
