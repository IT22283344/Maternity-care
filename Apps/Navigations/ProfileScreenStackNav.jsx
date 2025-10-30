import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screen/ProfileScreen';  // Your main Profile screen

const Stack = createStackNavigator();

export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      {/* You can add more screens related to profile settings or account management */}
    </Stack.Navigator>
  );
}
