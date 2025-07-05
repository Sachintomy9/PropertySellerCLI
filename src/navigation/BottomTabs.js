import React from 'react';
import { Text,View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeActive from '../assets/svg/svgicons/HomeActive';
import HomeInactive from '../assets/svg/svgicons/HomeInactive';
import SavedActive from '../assets/svg/svgicons/SavedActive';
import SavedInactive from '../assets/svg/svgicons/SavedInactive';
import AiagentActive from '../assets/svg/svgicons/AiagentActive';
import AiagentInactive from '../assets/svg/svgicons/AiagentInactive';
import NotificationActive from '../assets/svg/svgicons/NotiFavActive';
import NotificationInactive from '../assets/svg/svgicons/NotiFavInactive';
import MoreActive from '../assets/svg/svgicons/MoreActive';
import MoreInactive from '../assets/svg/svgicons/MoreInactive';

import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import AiAgentScreen from '../screens/AiagentScreen';
import NotificationScreen from '../screens/NotificationScreen';
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
            case 'Notification':
              IconComponent = focused ? NotificationActive : NotificationInactive;
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
                color: focused ? '#FF2D55' : '#00000090',
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
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;