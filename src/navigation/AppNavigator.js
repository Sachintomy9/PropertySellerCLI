import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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
        <Stack.Screen name="Home" component={require('../screens/HomeScreen').default} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
