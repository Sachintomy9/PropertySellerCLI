import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import { useAuth } from '../context/AuthContext';
import { hasSeenIntro } from '../utils/IntroStorage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrencyRates } from '../redux/slices/CurrencySlice';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, initializing } = useAuth();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const checkIntro = async () => {
      const seen = await hasSeenIntro();
      setShowIntro(!seen);
    };
    dispatch(fetchCurrencyRates());
    checkIntro();
  }, []);

  if (initializing) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? ( <>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="Login" component={require('../screens/LoginScreen').default} />
            <Stack.Screen name="Register" component={require('../screens/RegisterScreen').default} />
            <Stack.Screen name="Otp" component={require('../screens/OtpScreen').default} />
            <Stack.Screen name="ForgotPassVerify" component={require('../screens/ForgotPassVerScreen').default} />
            <Stack.Screen name="ForgotPassSet" component={require('../screens/ForgotPassSetScreen').default} />
          </>
        ) : showIntro ? (
          <>
            <Stack.Screen name="Intro1" component={require('../screens/IntroScreen1').default} />
            <Stack.Screen name="Intro2" component={require('../screens/IntroScreen2').default} />
            <Stack.Screen name="Intro3" component={require('../screens/IntroScreen3').default} />
            <Stack.Screen name="Intro4" component={require('../screens/IntroScreen4').default} />
            <Stack.Screen name="Login" component={require('../screens/LoginScreen').default} />
            <Stack.Screen name="Register" component={require('../screens/RegisterScreen').default} />
            <Stack.Screen name="Otp" component={require('../screens/OtpScreen').default} />
            <Stack.Screen name="ForgotPassVerify" component={require('../screens/ForgotPassVerScreen').default} />
            <Stack.Screen name="ForgotPassSet" component={require('../screens/ForgotPassSetScreen').default} />
            <Stack.Screen name="TermsCondi" component={require('../screens/TermsCondiScreen').default} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={require('../screens/LoginScreen').default} />
            <Stack.Screen name="Register" component={require('../screens/RegisterScreen').default} />
            <Stack.Screen name="Otp" component={require('../screens/OtpScreen').default} />
            <Stack.Screen name="ForgotPassVerify" component={require('../screens/ForgotPassVerScreen').default} />
            <Stack.Screen name="ForgotPassSet" component={require('../screens/ForgotPassSetScreen').default} />
            <Stack.Screen name="TermsCondi" component={require('../screens/TermsCondiScreen').default} />
          </>
        )}
        <Stack.Screen name="Profile" component={require('../screens/ProfileScreen').default} />
        <Stack.Screen name="Saved" component={require('../screens/SavedScreen').default} />
        <Stack.Screen name="EditProfile" component={require('../screens/EditProfileScreen').default} />
        <Stack.Screen name="ChangePass" component={require('../screens/ChangePasswordScreen').default} />
        <Stack.Screen name="Otp1" component={require('../screens/OtpChangePassScreen').default} />
        <Stack.Screen name="PropDetails" component={require('../screens/PropDetailsScreen').default} />
        <Stack.Screen name="FloorPlans" component={require('../screens/FloorPlansScreen').default} />
        <Stack.Screen name="ImageGallery" component={require('../screens/ImageGalleryScreen').default} />
        <Stack.Screen name="AmenitiesInfo" component={require('../screens/AmenitiesInfoScreen').default} />
        <Stack.Screen name="MortgageEdit" component={require('../screens/MortgageEditScreen').default} />
        <Stack.Screen name="City" component={require('../screens/CityScreen').default} />
        <Stack.Screen name="About" component={require('../screens/AboutUsScreen').default} />
        <Stack.Screen name="Developer" component={require('../screens/DeveloperScreen').default} />
        <Stack.Screen name="SellerReg" component={require('../screens/SellerRegScreen').default} />
        <Stack.Screen name="Terms" component={require('../screens/TermsScreen').default} />
        <Stack.Screen name="Blogs" component={require('../screens/BlogScreen').default} />
        <Stack.Screen name="News" component={require('../screens/NewsScreen').default} />
        <Stack.Screen name="NewsRead" component={require('../screens/NewsReadScreen').default} />
        <Stack.Screen name="BlogRead" component={require('../screens/BlogReadScreen').default} />
        <Stack.Screen name="Rental" component={require('../screens/RentalIncomeScreen').default} />
        <Stack.Screen name="Careers" component={require('../screens/CareersScreen').default} />
        <Stack.Screen name="WhyDubai" component={require('../screens/WhyDubaiScreen').default} />
        <Stack.Screen name="FreelanceReg" component={require('../screens/FreelanceRegScreen').default} />
        <Stack.Screen name="OpenHouse" component={require('../screens/OpenHouseScreen').default} />
        <Stack.Screen name="Privacy" component={require('../screens/PrivacyPolicyScreen').default} />
        <Stack.Screen name="AiAgentIntro" component={require('../screens/AiAgentIntroScreen').default} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
