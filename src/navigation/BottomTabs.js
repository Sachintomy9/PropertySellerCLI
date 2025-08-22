import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  SafeAreaView, 
  useSafeAreaInsets 
} from 'react-native-safe-area-context';
import HomeActive from '../assets/svg/svgicons/BottomTabs/HomeActive';
import HomeInactive from '../assets/svg/svgicons/BottomTabs/HomeInactive';
import SavedActive from '../assets/svg/svgicons/BottomTabs/SavedActive';
import SavedInactive from '../assets/svg/svgicons/BottomTabs/SavedInactive';
import AiagentActive from '../assets/svg/svgicons/BottomTabs/AiagentActive';
import AiagentInactive from '../assets/svg/svgicons/BottomTabs/AiagentInactive';
import FeaturedActive from '../assets/svg/svgicons/BottomTabs/FeaturedActive';
import FeaturedInactive from '../assets/svg/svgicons/BottomTabs/FeaturedInactive';
import MoreActive from '../assets/svg/svgicons/BottomTabs/MoreActive';
import MoreInactive from '../assets/svg/svgicons/BottomTabs/MoreInactive';

import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import AiAgentMain from '../screens/AiAgentMainScreen';
import AiAgentSplash from '../screens/AiagentSplashScreen';
import AiAgentIntro from '../screens/AiAgentIntroScreen';
import FeaturedScreen from '../screens/FeaturedScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();
const AiStack = createStackNavigator();

function AiAgentStack() {
  return (
    <AiStack.Navigator screenOptions={{ headerShown: false }}>
      <AiStack.Screen name="AiAgentSplash" component={AiAgentSplash} />
      <AiStack.Screen name="AiAgentIntro" component={AiAgentIntro} />
      <AiStack.Screen name="AiAgentMain" component={AiAgentMain} />
    </AiStack.Navigator>
  );
}

// Custom Tab Bar Component with Safe Area
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{ 
      flexDirection: 'row', 
      height: 60 + insets.bottom, // Add bottom inset to height
      paddingBottom: insets.bottom, // Add padding at the bottom
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#eee'
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let IconComponent;
        switch (route.name) {
          case 'Home':
            IconComponent = isFocused ? HomeActive : HomeInactive;
            break;
          case 'Saved':
            IconComponent = isFocused ? SavedActive : SavedInactive;
            break;
          case 'AiAgent':
            IconComponent = isFocused ? AiagentActive : AiagentInactive;
            break;
          case 'Featured':
            IconComponent = isFocused ? FeaturedActive : FeaturedInactive;
            break;
          case 'More':
            IconComponent = isFocused ? MoreActive : MoreInactive;
            break;
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ 
              flex: 1, 
              justifyContent: 'center', 
              alignItems: 'center',
              paddingVertical: 5
            }}
          >
            <View style={{ paddingTop: 5 }}>
              <IconComponent />
            </View>
            <Text style={{ 
              fontSize: 12, 
              color: isFocused ? '#FF1645' : '#999999',
              marginTop: 3,
            }}>
              {route.name === 'AiAgent' ? 'Ai Agent' : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="AiAgent" component={AiAgentStack} />
      <Tab.Screen name="Featured" component={FeaturedScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;