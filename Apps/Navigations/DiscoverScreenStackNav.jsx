import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from '../Screen/DiscoverScreen';

const Stack = createStackNavigator();

export default function DiscoverScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discover" component={DiscoverScreen} options={{ headerShown: false }} />
      {/* You can add more screens related to profile settings or account management */}
    </Stack.Navigator>
  );
}
