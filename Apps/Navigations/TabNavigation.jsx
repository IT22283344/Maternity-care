import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreenStackNav from './HomeScreenStackNav';  // Stack for Home/Today screen
import ToolsScreenStackNav from './ToolsScreenStackNav';  // Stack for Tools section
import ProfileScreenStackNav from './ProfileScreenStackNav';  // Stack for Profile
import DiscoverScreen from '../Screen/DiscoverScreen';  // Direct screen for Discover

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Today') {
            iconName = 'calendar';
          } else if (route.name === 'Discover') {
            iconName = 'compass-outline';
          } else if (route.name === 'Tools') {
            iconName = 'briefcase-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ color }) => {
          let labelName = route.name;
          return <Text style={{ color, fontSize: 12, marginBottom: 3 }}>{labelName}</Text>;
        },
        tabBarActiveTintColor: '#EE66A6',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Today" component={HomeScreenStackNav} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Tools" component={ToolsScreenStackNav} />
      <Tab.Screen name="Profile" component={ProfileScreenStackNav} />
    </Tab.Navigator>
  );
}
