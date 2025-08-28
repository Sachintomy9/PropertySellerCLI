import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation,useRoute} from '@react-navigation/native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { fonts } from '../../styles/fonts';
import axios from 'axios';
import InvalidOtp from '../components/popups/InvalidOtp';
const CELL_COUNT = 6;
const API_URL = 'https://v1-api.propertyseller.com/api/v1/';

const OtpScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email,token } = route.params;
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const [showResendPop, setShowResendPop] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // State for resend timer
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  useEffect(() => {
    let interval = null;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false); // Enable resend
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // cleanup
  }, [isResendDisabled]);


  // Function to handle OTP submission
  const handleSubmitOtp = async () => {
    setIsLoading(true); // show loader
  try {
    const response = await axios.post(`${API_URL}/auth/user/registration-otp`, {
      email,
      otp: value,
      token,
    });
    console.log('OTP verification response:', response.data);
    if (response.data.success) {  
      setShowSuccess(true);
      navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    }); // Navigate to Login screen after successful OTP verification
    }
    else {   
      Alert.alert('Error', response.data.message || 'OTP verification failed');
    }
  } catch (error) { 
    console.log('Error verifying OTP:', error.response?.data?.message);
    setShowInvalid(true);
  } finally {
      setIsLoading(false); // hide loader regardless of success or failure
    }
};










  useEffect(() => {
    if (value.length === CELL_COUNT) {
      handleSubmitOtp();
    }
    }, [value]);

  const handleResendCode = async () => {
    setIsLoading(true); // show loader
    try{
      const response = await axios.post(`${API_URL}/auth/user/registration/resent-otp`, {
      email,
      token,
    });
    setResendTimer(60);
    setIsResendDisabled(true);
    console.log('OTP resent successfully');
    setShowResendPop(true);
    }catch (error) {
        console.error('Error resending OTP:', error);
      } finally {
      setIsLoading(false); // hide loader regardless of success or failure
    }
    
    // Trigger resend logic here
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FF1645" />
          </View>
        )}
      <InvalidOtp
        visible={showInvalid}
        onClose={() => setShowInvalid(false)}
        heading={"Invalid OTP"}
        subheading={"Please Enter the Correct OTP"}
        />

        <InvalidOtp
        visible={showResendPop}
        onClose={() => setShowResendPop(false)}
        heading={"OTP Resend"}
        subheading={"New OTP has been sent. Check email."}
        />

        <InvalidOtp
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
        heading={"OTP verifed successfully."}
        subheading={"OTP has been verified, Now please Log In."}
        />

      <Text style={styles.title}>Enter OTP To Continue</Text>
      <Text style={styles.subtitle}>
        Enter the code sent to <Text style={styles.email}>{email}</Text>
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <View style={styles.resendWrapper}>
        <Text style={styles.resendText}>Didn't get OTP Code?</Text>




        {isResendDisabled ? (
          <Text style={{ marginTop: 10, marginBottom: 10,bottom:10, color: '#555',fontFamily: fonts.PoppinsRegular }}>
            Resend OTP in {resendTimer}s
          </Text>
        ) : (
          <Text
            onPress={handleResendCode}
            style={{
              color: '#2196F3',
              bottom: 10,
              marginTop: 10,
              marginBottom: 10,
              fontFamily: fonts.PoppinsSemiBold,
              textDecorationLine: 'underline',
            }}
          >
            Re-send OTP
          </Text>
        )}


      </View>

      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    fontFamily: fonts.PoppinsSemiBold,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: fonts.PoppinsRegular,
  },
  email: {
    color: '#FF004D',
    fontWeight: '600',
  },
  codeFieldRoot: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Platform.OS === "ios" ? 20 : 0,
  },
  cell: {
    width: 48,
    height: 48,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#FF004D',
  },
  resendWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 13,
    color: '#666',
    fontFamily: fonts.PoppinsRegular,
  },
  resendLink: {
    fontSize: 14,
    color: '#FF004D',
    fontWeight: '600',
    marginTop: 4,
    fontFamily: fonts.PoppinsSemiBold,
  },
  backBtn: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    fontSize: 14,
    color: '#FF004D',
    fontWeight: '600',
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
