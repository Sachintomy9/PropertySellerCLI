import React from 'react';
import { Text,View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
import AiAgentScreen from '../screens/AiagentScreen';
import FeaturedScreen from '../screens/FeaturedScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let IconComponent;

          switch (route.name) {
            case 'Home':
              IconComponent = focused ? HomeActive : HomeInactive;
              break;
            case 'Saved':
              IconComponent = focused ? SavedActive : SavedInactive;
              break;
            case 'AiAgent':
              IconComponent = focused ? AiagentActive : AiagentInactive;
              break;
            case 'Featured':
              IconComponent = focused ? FeaturedActive : FeaturedInactive;
              break;
            case 'More':
              IconComponent = focused ? MoreActive : MoreInactive;
              break;
          }

          return (
            <View style={{ paddingTop: 5 }}> 
              <IconComponent />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text style={{ 
                fontSize: 12, 
                color: focused ? '#FF1645' : '#999999',
                marginTop: 3,  /* Push label down slightly */
                marginBottom: 3, /* Optional: Adjust bottom spacing */
              }}
            
            
            >
              {route.name === 'AiAgent' ? 'Ai Agent' : route.name}
            </Text>
          );
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 5,
          
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="AiAgent" component={AiAgentScreen} />
      <Tab.Screen name="Featured" component={FeaturedScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;