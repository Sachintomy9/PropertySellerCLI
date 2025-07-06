import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';


const Stack = createStackNavigator();

const AppNavigator = () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={require('../screens/SplashScreen').default} />
            <Stack.Screen name="Intro1" component={require('../screens/IntroScreen1').default} />
            <Stack.Screen name="Intro2" component={require('../screens/IntroScreen2').default} />
            <Stack.Screen name="Intro3" component={require('../screens/IntroScreen3').default} />
            <Stack.Screen name="Intro4" component={require('../screens/IntroScreen4').default} />
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name='Profile' component={require('../screens/ProfileScreen').default} />
            <Stack.Screen name='Login' component={require('../screens/LoginScreen').default} />
            <Stack.Screen name='Register' component={require('../screens/RegisterScreen').default} />
     

         
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;



        
        